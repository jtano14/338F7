(() => {
  document.querySelectorAll('.consulting-flip-card').forEach(card => {
    card.addEventListener('click', () => {
      const flipped = card.classList.toggle('is-flipped');
      card.setAttribute('aria-pressed', String(flipped));
      card.setAttribute('aria-label', flipped ? 'Show solution heading' : 'Show solution description');
    });
  });
})();
