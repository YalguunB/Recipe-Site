export class ProfileMain extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
    <main>
        <section class="profile-main">
            <aside>
                <section class="profile-image-title">
                    <img class="img-profile" src="images/icon-images/profile.svg" alt="profile picture">
                    <h2>Миний Мэдээлэл</h2>
                </section>
                <section class="user-info">
                    <p>Хэрэглэгчийн нэр</p>
                    <span>Бадамжав</span>
                    <p>Цахим хаяг</p>
                    <span>badamjav@gmail.com</span>
                    <button>Profile засах</button>
                </section>
            </aside>
            <section class="right-side">
                <form>
                    <h2>Жор нэмэх</h2>
                    <section class="name-type">
                        <label for="name">Хоолны нэр</label><br>
                        <input type="text" id="name" name="name" placeholder="Хоолны нэр"><br>

                        <label for="type">Хоолны төрөл</label><br>
                        <input type="text" id="type" name="type" placeholder="Хоолны төрөл"><br>
                    </section>
                    
                    <label class="upload-box" for="image" name="image" accept="image/*" >Зураг оруулах</label><br>
                    <input type="file" id="image" name="image"><br>

                    <section class="detail-info-recipe">
                        <label for="time">Хугацаа</label><br>
                        <input type="text" id="time" name="time" placeholder="Минут"><br>
                        <label for="portion">Порц</label><br>
                        <input type="number" id="portion" name="portion" placeholder="Хүний тоо"><br>
                        <label for="cal">Калори</label><br>
                        <input type="number" id="cal" name="cal" placeholder="Калори"><br>
                    </section>

                    <label for="ingredients">Орц</label><br>
                    <textarea id="ingredients" name="ingredients" placeholder="Орцоо оруулна уу..."></textarea><br>
                    
                    <label for="instructions">Хийх дараалал</label><br>
                    <textarea id="instructions" name="instructions" placeholder="Хийх дарааллыг оруулна уу..."></textarea><br>
                    
                    <label for="info">Нэмэлт мэдээлэл, зөвлөмж</label><br>
                    <textarea id="info" name="info" placeholder="Нэмэлт зөвлөмж, санамж..."></textarea><br>
                    
                    <button>Жор нэмэх</button>
                </form>
            </section>
        </section>
        <foods-section title="Хадгалсан жорууд"></foods-section>
        <foods-section title="Оруулсан жорууд"></foods-section>
    </main>
    `;
  }
}
customElements.define('profile-main', ProfileMain);
