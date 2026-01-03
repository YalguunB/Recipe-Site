export class FoodsSection extends HTMLElement {
  constructor() {
    super();
    this.title = "";
    this.category = null;
    this.foods = [];
  }

  async connectedCallback() {
    this.initializeAttributes();
    await this.loadData();
    this.render();
  }

  // Attributes-уудыг эхлүүлэх
  initializeAttributes() {
    this.title = this.getAttribute("title") ?? "Онцлох хоолнууд";
    this.category = this.getAttribute("category") ?? null;
  }

  // JSON өгөгдөл ачаалах
  async loadData() {
    try {
      const result = await fetch("./data/info.json");
      
      if (!result.ok) {
        throw new Error('Файл уншихад алдаа гарлаа');
      }
      
      const data = await result.json();
      this.foods = this.filterFoods(data);
      
    } catch (error) {
      console.error('FoodsSection өгөгдөл ачааллахад алдаа:', error);
      this.foods = [];
    }
  }

  // Category-аар шүүх
  filterFoods(data) {
    if (this.category) {
      return data.filter(f => f.category === this.category).slice(0, 4);
    }
    return data.slice(0, 4);
  }

  // Card HTML үүсгэх
  createCardHTML(food) {
    return `
      <card-section 
        id="${food.id}"
        name="${food.name}"
        type="${food.type}"
        rating="${food.rating}"
        view="${food.view}"
        time="${food.time}"
        portion="${food.portion}"
        cal="${food.cal}"
        image="${food.image}">
      </card-section>
    `;
  }

  // Бүх card-уудыг үүсгэх
  createCardsHTML() {
    return this.foods.map(f => this.createCardHTML(f)).join('');
  }

  // Error харуулах
  renderError() {
    return `
      <section class="foods-section">
        <section class="food-title">
          <h2>${this.title}</h2>
        </section>
        <p style="text-align: center; color: #777; padding: 1rem;">
          Өгөгдөл ачааллахад алдаа гарлаа.
        </p>
      </section>
    `;
  }

  // Success харуулах
  renderSuccess() {
    return `
      <section class="foods-section">
        <section class="food-title">
          <h2>${this.title}</h2>
          <a href="#" class="view-all-link">Бүгдийг үзэх &#8594;</a>
        </section>
        <section class="food-info">
          ${this.createCardsHTML()}
        </section>
      </section>
    `;
  }

  // Бүх хоол харуулах
  showAllRecipes() {
    const recipes = document.querySelector("#recipes");
    const home = document.querySelector("#home");
    
    if (home) home.style.display = "none";
    if (recipes) {
      recipes.style.display = "block";
      if (typeof recipes.loadFoods === 'function') {
        recipes.loadFoods();
      }
    }
  }

  // Event listeners нэмэх
  attachEventListeners() {
    const viewAllLink = this.querySelector(".view-all-link");
    if (viewAllLink) {
      viewAllLink.addEventListener("click", (e) => {
        e.preventDefault();
        this.showAllRecipes();
      });
    }
  }

  // Render хийх
  render() {
    if (this.foods.length === 0) {
      this.innerHTML = this.renderError();
    } else {
      this.innerHTML = this.renderSuccess();
      this.attachEventListeners();
    }
  }
}

customElements.define('foods-section', FoodsSection);