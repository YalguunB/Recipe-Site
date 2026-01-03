export class RecipesMain extends HTMLElement {
  constructor() {
    super();
    this.categories = [];
    this.currentCategory = "Бүх хоол";
  }

  async connectedCallback() {
    this.render();
    await this.loadCategories();
    await this.loadFoods();
  }

  // HTML бүтэц үүсгэх
  createHTML() {
    return `
      <main class="main-recipes">
        ${this.createCategorySection()}
        ${this.createRecipesSection()}
      </main>
    `;
  }

  // Category хэсэг HTML
  createCategorySection() {
    return `
      <section class="category">
        <h2>Ангилалууд</h2>
      </section>
    `;
  }

  // Recipes хэсэг HTML
  createRecipesSection() {
    return `
      <section class="selected-cat">
        <h2>${this.currentCategory}</h2>
        <section class="all-recipes"></section>
      </section>
    `;
  }

  // Categories JSON татах
  async fetchCategories() {
    const response = await fetch("./data/categories-info.json");
    
    if (!response.ok) {
      throw new Error('Категори ачааллахад алдаа гарлаа');
    }
    
    return await response.json();
  }

  // Foods JSON татах
  async fetchFoods() {
    const response = await fetch("./data/info.json");
    
    if (!response.ok) {
      throw new Error('Хоол ачааллахад алдаа гарлаа');
    }
    
    return await response.json();
  }

  // Category link үүсгэх
  createCategoryLink(category) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = category;
    link.onclick = (e) => this.handleCategoryClick(e, category);
    return link;
  }

  // Category дарахад
  handleCategoryClick(e, category) {
    e.preventDefault();
    this.currentCategory = category;
    this.updateCategoryTitle();
    this.loadFoods(category);
  }

  // Category title шинэчлэх
  updateCategoryTitle() {
    const titleElement = this.querySelector(".selected-cat h2");
    if (titleElement) {
      titleElement.textContent = this.currentCategory;
    }
  }

  // Category links харуулах
  renderCategoryLinks() {
    const categoryBox = this.querySelector(".category");
    
    if (!categoryBox) return;

    this.categories.forEach(category => {
      const link = this.createCategoryLink(category);
      categoryBox.appendChild(link);
    });
  }

  // Category error харуулах
  showCategoryError() {
    const categoryBox = this.querySelector(".category");
    if (categoryBox) {
      categoryBox.innerHTML += `
        <p style="color: #777; padding: 1rem;">
          Ангилал ачааллахад алдаа гарлаа
        </p>
      `;
    }
  }

  // Categories ачаалах
  async loadCategories() {
    try {
      this.categories = await this.fetchCategories();
      this.renderCategoryLinks();
    } catch (error) {
      console.error('Categories ачааллахад алдаа:', error);
      this.showCategoryError();
    }
  }

  // Foods шүүх
  filterFoods(foods, category) {
    if (category === "Бүх хоол") {
      return foods;
    }
    return foods.filter(f => f.type === category);
  }

  // Food card HTML үүсгэх
  createFoodCard(food) {
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

  // Хоол олдоогүй HTML
  createEmptyStateHTML(category) {
    return `
      <p style="text-align: center; width: 100%; padding: 2rem; color: #777;">
        "${category}" ангилалд хоол олдсонгүй.
      </p>
    `;
  }

  // Error HTML
  createErrorHTML() {
    return `
      <p style="text-align: center; width: 100%; padding: 2rem; color: #777;">
        Хоол ачааллахад алдаа гарлаа. Дахин оролдоно уу.
      </p>
    `;
  }

  // Food cards харуулах
  renderFoodCards(foods) {
    const container = this.querySelector(".all-recipes");
    
    if (!container) {
      console.error('.all-recipes элемент олдсонгүй');
      return;
    }

    if (foods.length === 0) {
      container.innerHTML = this.createEmptyStateHTML(this.currentCategory);
      return;
    }

    container.innerHTML = foods.map(f => this.createFoodCard(f)).join("");
  }

  // Error харуулах
  showFoodsError() {
    const container = this.querySelector(".all-recipes");
    if (container) {
      container.innerHTML = this.createErrorHTML();
    }
  }

  // Foods ачаалах
  async loadFoods(category = "Бүх хоол") {
    try {
      this.currentCategory = category;
      
      const allFoods = await this.fetchFoods();
      const filteredFoods = this.filterFoods(allFoods, category);
      
      this.renderFoodCards(filteredFoods);
      
    } catch (error) {
      console.error('Хоол ачааллахад алдаа:', error);
      this.showFoodsError();
    }
  }

  // Render
  render() {
    this.innerHTML = this.createHTML();
  }
}

customElements.define("recipes-main", RecipesMain);