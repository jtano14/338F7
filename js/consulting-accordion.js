/* FLUX7 Consulting: hover for mouse, native tap/click for touch and keyboard. */
(() => {
  const accordion = document.querySelector('.consulting-accordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('details'));
  const mouseHover = window.matchMedia('(hover: hover) and (pointer: fine)');

  // Preserve standard <details> behavior for touch, keyboard, and accessibility.
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (!mouseHover.matches) return;
      items.forEach((other) => { if (other !== item) other.open = false; });
      item.open = true;
    });
    item.addEventListener('mouseleave', () => {
      if (mouseHover.matches) item.open = false;
    });
  });
});
