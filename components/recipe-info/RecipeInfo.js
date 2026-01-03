export class RecipesInfo extends HTMLElement {
  constructor() {
    super();
    this.recipeId = null;
  }

  connectedCallback() {
    this.innerHTML = `<main class="recipes"></main>`;
  }

  async showRecipe(id) {
    this.recipeId = id;

    const [infoRes, detailsRes] = await Promise.all([
      fetch("./data/info.json"),
      fetch("./data/recipes-details.json")
    ]);

    const infoData = await infoRes.json();
    const detailsData = await detailsRes.json();

    const recipe = infoData.find(r => r.id === id);
    if (!recipe) return;

    const details = detailsData.find(d => d.id === id);

    const ingredientsHTML = details?.ingredients.map(i => `<li>${i}</li>`).join("") || "";
    const stepsHTML = details?.steps.map(s => `<li>${s}</li>`).join("") || "";
    const extraHTML = details?.extra.map(e => `<p>${e}</p>`).join("") || "";
    const username = details?.username ?? "Нэргүй";

    const similarFoods = infoData
      .filter(f => f.type === recipe.type && f.id !== id)
      .sort((a, b) => {
        const parseView = v => {
          if (typeof v === "string" && v.toLowerCase().endsWith("k")) {
            return parseFloat(v) * 1000;
          }
          return Number(v) || 0;
        };
        return parseView(b.view) - parseView(a.view);
      })
      .slice(0, 4);

    const similarHTML = similarFoods.map(f => `
      <card-section
        id="${f.id}"
        name="${f.name}"
        type="${f.type}"
        rating="${f.rating}"
        view="${f.view}"
        time="${f.time}"
        portion="${f.portion}"
        cal="${f.cal}"
        image="${f.image}">
      </card-section>
    `).join("");

    this.innerHTML = `
      <main class="recipes">
        <section class="recipe-information">
          <aside>
            <img class="food-images" src="${recipe.image}" alt="${recipe.name}">
            <article class="ingredients">
              <h2>Орц</h2>
              <ol>${ingredientsHTML}</ol>
            </article>
          </aside>
          <aside>
            <section class="recipe-detail">
              <h2 class="food-name">${recipe.name}</h2>
              <p class="food-detail-info">${extraHTML}</p>
              <p class="user-name">~${username}</p>
              <section class="buttons">
                <button class="save">❤️Хадгалах</button>
                <button class="rate">⭐Үнэлгээ өгөх</button>
              </section>
            </section>
            <article class="steps">
              <h2>Хийх дараалал</h2>
              <ol>${stepsHTML}</ol>
            </article>
          </aside>
        </section>

        <section class="foods-section">
          <section class="food-title">
            <h2>✨Ойролцоо хоолнууд✨</h2>
          </section>
          <section class="food-info">
            ${similarHTML}
          </section>
        </section>
      </main>
    `;
  }
}

customElements.define('recipe-info', RecipesInfo);