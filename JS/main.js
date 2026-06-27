document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".site-navbar .nav-link").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll(".site-navbar .nav-link, .site-navbar .btn").forEach((item) => {
    item.addEventListener("click", () => {
      const menu = document.getElementById("mainNav");
      if (menu && menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  const backToTop = document.getElementById("backToTop");
  const toggleBackToTop = () => {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 450);
  };
  window.addEventListener("scroll", toggleBackToTop, { passive: true });
  toggleBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  document.querySelectorAll(".skill-bar").forEach((item) => {
    const bar = item.querySelector("i");
    if (bar) bar.style.width = `${item.dataset.width || 0}%`;
  });

  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        if (note) note.textContent = "Please fix the highlighted fields.";
        return;
      }

      form.classList.remove("was-validated");
      form.reset();
      if (note) note.textContent = "Thank you. Your message is ready to be sent.";
    });
  }
});
