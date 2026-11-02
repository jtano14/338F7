/* Consulting solutions: one open at a time, hover on desktop, tap on touch. */
(() => {
  const accordion = document.querySelector('.consulting-accordion');
  if (!accordion) return;
  const items = [...accordion.querySelectorAll('details')];
  const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');
  let closeTimer;
  const openOnly = (selected) => {
    items.forEach((item) => { item.open = item === selected; });
  };
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (!desktop.matches) return;
      clearTimeout(closeTimer);
      openOnly(item);
    });
    item.addEventListener('toggle', () => {
      if (item.open) items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
  accordion.addEventListener('mouseleave', () => {
    if (!desktop.matches) return;
    closeTimer = setTimeout(() => openOnly(null), 180);
  });
  accordion.addEventListener('mouseenter', () => clearTimeout(closeTimer));
  window.addEventListener('blur', () => clearTimeout(closeTimer));
})();
