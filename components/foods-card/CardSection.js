export class CardSection extends HTMLElement {
  constructor() {
    super();
    this.cardData = {};
  }

  connectedCallback() {
    this.initializeData();
    this.render();
    this.attachEventListeners();
  }

  // Attributes-аас өгөгдөл авах
  initializeData() {
    this.cardData = {
      id: this.getAttribute("id"),
      name: this.getAttribute("name") ?? "-",
      type: this.getAttribute("type") ?? "-",
      rating: this.formatRating(this.getAttribute("rating")),
      time: this.getAttribute("time") ?? "-",
      portion: this.getAttribute("portion") ?? "-",
      cal: this.getAttribute("cal") ?? "-",
      view: this.getAttribute("view") ?? 0,
      image: this.getAttribute("image") ?? "images/food-images/default.jpg"
    };
  }

  // Rating форматлах
  formatRating(rating) {
    return Number(rating ?? 0).toFixed(1);
  }

  // Card header HTML
  createHeaderHTML() {
    return `
      <img class="food-image" src="${this.cardData.image}" alt="${this.cardData.name}">
    `;
  }

  // Type болон rating HTML
  createTypeRatingHTML() {
    return `
      <section class="type-rate">
        <h4>${this.cardData.type}</h4>
        <article class="rate">
          <img src="images/food.svg" alt="food-image">
          <p>
            ${this.cardData.rating}
            <span>(${this.cardData.view})</span>
          </p>
        </article>
      </section>
    `;
  }

  // Хоолны нэр HTML
  createNameHTML() {
    return `<h3 class="food-name">${this.cardData.name}</h3>`;
  }

  // Хугацаа, порц, калори HTML
  createDetailsHTML() {
    return `
      <section class="time-member-kalore">
        ${this.createDetailItem("images/time.svg", "time-icon", `${this.cardData.time} мин`)}
        ${this.createDetailItem("images/people.svg", "people-icon", this.cardData.portion)}
        ${this.createDetailItem("images/calore.svg", "calore-icon", `${this.cardData.cal} ккал`)}
      </section>
    `;
  }

  // Detail item үүсгэх
  createDetailItem(icon, alt, text) {
    return `
      <section>
        <img src="${icon}" alt="${alt}">
        <span>${text}</span>
      </section>
    `;
  }

  // Бүрэн HTML
  createCardHTML() {
    return `
      <article class="cards">
        ${this.createHeaderHTML()}
        ${this.createTypeRatingHTML()}
        ${this.createNameHTML()}
        ${this.createDetailsHTML()}
      </article>
    `;
  }

  // DOM элементүүд авах
  getElements() {
    return {
      recipeInfo: document.getElementById('recipe'),
      home: document.getElementById('home'),
      recipes: document.getElementById('recipes'),
      profileSection: document.querySelector('profile-main')
    };
  }

  // Бүх секшн хаах
  hideAllSections(elements) {
    if (elements.home) elements.home.style.display = 'none';
    if (elements.recipes) elements.recipes.style.display = 'none';
    if (elements.profileSection) elements.profileSection.style.display = 'none';
  }

  // Recipe харуулах
  showRecipe(recipeInfo) {
    const recipeId = Number(this.cardData.id);
    
    if (typeof recipeInfo.showRecipe === 'function') {
      recipeInfo.showRecipe(recipeId);
    } else {
      console.error('showRecipe функц олдсонгүй');
    }
  }

  // Card дарахад
  handleCardClick() {
    try {
      const elements = this.getElements();

      if (!elements.recipeInfo) {
        console.error('recipe элемент олдсонгүй');
        return;
      }

      this.hideAllSections(elements);
      elements.recipeInfo.style.display = 'block';
      this.showRecipe(elements.recipeInfo);
      
    } catch (error) {
      console.error('Card дарахад алдаа гарлаа:', error);
    }
  }

  // Event listeners нэмэх
  attachEventListeners() {
    this.addEventListener('click', () => this.handleCardClick());
  }

  // Render
  render() {
    this.innerHTML = this.createCardHTML();
  }

  // Cleanup
  disconnectedCallback() {
    // Event listener автоматаар устгагдана
  }
}

customElements.define('card-section', CardSection);