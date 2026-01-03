export class LoginModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="login-overlay">
        <form class="login-form">
          <h2>Илүү их үйлдэл хийхийн тулд та нэвтрэх эсвэл бүртгүүлээрэй</h2>
          <input type="email" placeholder="Gmail-ээ оруулна уу" required>
          <input type="password" placeholder="Нууц үгээ оруулна уу" required>
          <button type="submit">Нэвтрэх</button>
          <a class="links" href="#">Утсаар нэвтрэх</a>
          <p class="or-text">Эсвэл</p>
          <button type="button" class="google-login-btn">
              <img src="images/icon-images/google-logo.png" alt="Google logo">
              <span>Google-ээр үргэлжлүүлэх</span>
          </button>
          <a class="links" href="#">Бүртгүүлэх</a>
        </form>
      </div>
    `;

    const overlay = this.querySelector(".login-overlay");
    const form = this.querySelector(".login-form");

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) this.close();
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = form.querySelector('input[type="email"]').value.trim();
      const password = form.querySelector('input[type="password"]').value.trim();

      try {
        const res = await fetch("./data/security.json");
        const users = await res.json();

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
          alert("Gmail эсвэл нууц үг буруу");
          return;
        }

        localStorage.setItem("userId", user.userId);
        localStorage.setItem("email", user.email);

        alert(`Амжилттай нэвтэрлээ: ${user.email}`);
        this.close();
      } catch (err) {
        console.error("Login error:", err);
        alert("Алдаа гарлаа. Дахин оролдоно уу.");
      }
    });
  }

  open() {
    const overlay = this.querySelector(".login-overlay");
    overlay.style.display = "flex";
    document.body.classList.add("modal-open"); 
  }

  close() {
      const overlay = this.querySelector(".login-overlay");
      overlay.style.display = "none";
      document.body.classList.remove("modal-open");
      const header = document.querySelector("header-section");
      if (header) {
          const loginBtn = header.querySelector(".login-btn");
          if (loginBtn) loginBtn.style.display = "none";
      }
  }

}

customElements.define("login-modal", LoginModal);
