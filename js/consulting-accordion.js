/* FLUX7 Consulting: mouse hover opens one solution; touch and keyboard use native details. */
(() => {
  const accordion = document.querySelector('.consulting-accordion');
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll('details'));
  let closeTimer = null;
  let lastPointerType = 'mouse';

  const openOnly = (selected) => {
    items.forEach((item) => { item.open = item === selected; });
  };

  // Detect the actual input, not a media query (which fails on some touch laptops).
  accordion.addEventListener('pointerover', (event) => {
    lastPointerType = event.pointerType;
    if (event.pointerType !== 'mouse') return;
    const item = event.target.closest('details');
    if (!item || !accordion.contains(item)) return;
    clearTimeout(closeTimer);
    if (!item.open) openOnly(item);
  });

  accordion.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'mouse') return;
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => openOnly(null), 200);
  });

  accordion.addEventListener('pointerenter', (event) => {
    if (event.pointerType === 'mouse') clearTimeout(closeTimer);
  });

  // Keep a single section open when visitors click or use the keyboard.
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      items.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });
})();
