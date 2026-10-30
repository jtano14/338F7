/* Navigation Behavior */
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#site-header");
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-navigation");
  if (!header || !toggle || !nav) return;

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) setMenu(false);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) setMenu(false);
  });

  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
});
