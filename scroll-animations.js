const revealTargets = [
  ".hero-copy",
  ".hero-media",
  ".problem .section-eyebrow",
  ".problem .section-headline",
  ".problem .problem-metrics",
  ".problem .questions-grid",
  ".problem .problem-callout",
  ".value-prop .container",
  ".features .section-eyebrow",
  ".features .section-headline",
  ".features .section-sub",
  ".state-carousel",
  ".feature-card",
  ".how-it-works .container",
  ".why-different .container",
  ".proof-card",
  ".final-cta .container",
  ".footer-inner"
];

const elements = revealTargets.flatMap((selector) => Array.from(document.querySelectorAll(selector)));

elements.forEach((el, index) => {
  el.classList.add("reveal");
  el.style.setProperty("--reveal-delay", `${Math.min(index * 28, 260)}ms`);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: "0px 0px -10% 0px" }
);

elements.forEach((el) => observer.observe(el));

const heroImage = document.querySelector(".hero-image");
if (heroImage) {
  const onScroll = () => {
    const shift = Math.min(window.scrollY * 0.08, 16);
    heroImage.style.setProperty("--hero-shift", `${shift}px`);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const carousel = document.querySelector(".state-carousel");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll(".state-slide"));
  const tabs = Array.from(carousel.querySelectorAll(".state-tab"));
  const dots = Array.from(carousel.querySelectorAll(".state-dot"));
  const prev = carousel.querySelector("[data-state-prev]");
  const next = carousel.querySelector("[data-state-next]");
  const track = carousel.querySelector(".state-track");

  let active = slides.findIndex((slide) => slide.classList.contains("is-active"));
  if (active < 0) active = 0;

  const setTrackHeight = () => {
    const current = slides[active];
    if (track && current) {
      track.style.height = `${current.offsetHeight}px`;
    }
  };

  const setActive = (index) => {
    active = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const isActive = i === active;
      slide.classList.toggle("is-active", isActive);
      slide.hidden = !isActive;
    });

    tabs.forEach((tab, i) => {
      const isActive = i === active;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
      tab.tabIndex = isActive ? 0 : -1;
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
    });

    setTrackHeight();
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => setActive(i));
    tab.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActive(i + 1);
        tabs[(i + 1) % tabs.length].focus();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActive(i - 1);
        tabs[(i - 1 + tabs.length) % tabs.length].focus();
      }
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => setActive(i));
  });

  if (prev) prev.addEventListener("click", () => setActive(active - 1));
  if (next) next.addEventListener("click", () => setActive(active + 1));

  setActive(active);
  window.addEventListener("resize", setTrackHeight, { passive: true });
}
