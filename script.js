const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav]");
const header = document.querySelector(".site-header");
const year = document.querySelector("[data-year]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
    });
  });
}

const syncHeader = () => {
  header?.classList.toggle("scrolled", window.scrollY > 12);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll("img[data-placeholder]").forEach((image) => {
  const showPlaceholder = () => {
    if (image.nextElementSibling?.classList.contains("image-placeholder")) {
      return;
    }

    const placeholder = document.createElement("div");
    placeholder.className = "image-placeholder";
    placeholder.textContent = image.dataset.placeholder || "SyncForge preview";
    image.classList.add("is-missing");
    image.insertAdjacentElement("afterend", placeholder);
  };

  image.addEventListener("error", showPlaceholder);

  if (image.complete && image.naturalWidth === 0) {
    showPlaceholder();
  }
});
