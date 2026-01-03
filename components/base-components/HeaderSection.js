export class HeaderSection extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <a href="#"><img class="logo" src="images/icon-images/logo.png"></a>
        <nav>
          <a class="nav-home" href="#">Нүүр хуудас</a>
          <a class="nav-recipes" href="#">Жорууд</a>
        </nav>
        <section class="nevtreh-search">
          <input type="text" placeholder="Хайх..." class="search-input">
          <img class="search-logo" src="images/icon-images/search-logo.svg">
          <button class="login-btn">Нэвтрэх</button>
          <button class="more-search">Дэлгэрэнгүй хайлт</button>
        </section>
      </header>
    `;

    const home = document.querySelector("#home");
    const recipes = document.querySelector("#recipes");
    const recipeInfo = document.querySelector("#recipe");
    const searchInput = this.querySelector(".search-input");
    const searchSection = this.querySelector(".nevtreh-search");
    const loginBtn = this.querySelector(".login-btn");
    const loginModal = document.querySelector("login-modal");
    const profileSection = document.querySelector("profile-main"); // ProfileMain.js компонент

    // Хэрэглэгч нэвтэрсэн эсэхийг шалгах
    const userId = localStorage.getItem("userId");
    if (userId) {
      // login товчийг устгах
      if (loginBtn) loginBtn.remove();

      // profile товч нэмэх
      const profileBtn = document.createElement("button");
      profileBtn.classList.add("profile-btn");
      profileBtn.innerHTML = `<img src="images/icon-images/profile.svg" alt="profile">`;
      searchSection.insertBefore(profileBtn, searchSection.querySelector(".more-search"));

      // profile товч дээр дарахад profile-main-г харуулах
      profileBtn.addEventListener("click", () => {
        if (!profileSection) return;

        // Бусад секшнүүдийг хаах
        home.style.display = "none";
        recipes.style.display = "none";
        recipeInfo.style.display = "none";

        // profile-main-г харуулах
        profileSection.style.display = "block";
        if (profileSection.showProfile) profileSection.showProfile(); // showProfile функц ProfileMain.js-д байх
      });
    }

    // Нүүр хуудас товч
    this.querySelector(".nav-home").onclick = (e) => {
      e.preventDefault();
      home.style.display = "block";
      recipes.style.display = "none";
      recipeInfo.style.display = "none";
      if (profileSection) profileSection.style.display = "none";
    };

    // Жорууд товч
    this.querySelector(".nav-recipes").onclick = (e) => {
      e.preventDefault();
      home.style.display = "none";
      recipes.style.display = "block";
      recipeInfo.style.display = "none";
      if (profileSection) profileSection.style.display = "none";
      recipes.loadFoods();
    };

    // Хайлт
    searchInput.addEventListener("input", async (e) => {
      const query = e.target.value.toLowerCase();

      const res = await fetch("./data/info.json");
      const foods = await res.json();

      const filtered = foods.filter(f =>
        f.name.toLowerCase().includes(query) ||
        f.type.toLowerCase().includes(query)
      );

      home.style.display = "none";
      recipes.style.display = "block";
      recipeInfo.style.display = "none";
      if (profileSection) profileSection.style.display = "none";

      recipes.querySelector(".all-recipes").innerHTML = filtered.map(f => `
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
    });

    // Нэвтрэх товч
    if (loginBtn) {
      loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if (loginModal) loginModal.open();
      });
    }
  }
}

customElements.define("header-section", HeaderSection);
