/* Project B English pages: shared accessible hamburger controller. */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const button = header?.querySelector('.flux7-mobile-toggle');
  const menu = header?.querySelector('nav.flux7-unified-nav');
  if (!button || !menu) return;
  const close = () => {
    menu.classList.remove('flux7-mobile-open');
    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-label', 'Open navigation menu');
  };
  close();
  button.addEventListener('click', event => {
    event.stopPropagation();
    const opening = button.getAttribute('aria-expanded') !== 'true';
    menu.classList.toggle('flux7-mobile-open', opening);
    button.setAttribute('aria-expanded', String(opening));
    button.setAttribute('aria-label', opening ? 'Close navigation menu' : 'Open navigation menu');
  });
  menu.addEventListener('click', event => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) close();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(); button.focus(); }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) close();
  });
});
