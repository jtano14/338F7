/* One-time progressive FLUX7 logo reveal, with reduced-motion fallback. */
(() => {
  const mark = document.querySelector('[data-flux7-build]');
  if (!mark) return;
  const main = mark.querySelector('.wordmark-main');
  const company = mark.querySelector('.wordmark-company');
  const incoming = mark.querySelector('.flux7-build-incoming');
  if (!main || !company || !incoming) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced || !('IntersectionObserver' in window)) return;
  mark.classList.add('is-waiting');
  main.innerHTML = ['F','L','U','X','7'].map((letter, i) =>
    `<span class="flux7-built-letter" data-letter="${i}"${i === 4 ? ' style="color:var(--accent-blue)"' : ''}>${letter}</span>`).join('');
  const letters = [...main.querySelectorAll('.flux7-built-letter')];
  const sleep = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  let played = false;
  async function run() {
    if (played) return;
    played = true;
    mark.classList.remove('is-waiting');
    const words = ['FLOW', 'LINK', 'UNITE', 'X-PAND', '7'];
    for (let i = 0; i < words.length; i++) {
      incoming.textContent = words[i];
      incoming.classList.remove('is-moving', 'is-leaving');
      void incoming.offsetWidth;
      incoming.classList.add('is-moving');
      await sleep(800);
      incoming.classList.remove('is-moving');
      incoming.style.opacity = '1';
      incoming.style.transform = 'translate(0,-50%)';
      await sleep(220);
      incoming.classList.add('is-leaving');
      letters[i].classList.add('is-visible');
      await sleep(300);
      incoming.style.opacity = '';
      incoming.style.transform = '';
    }
    incoming.textContent = 'CO., LTD.';
    incoming.classList.remove('is-leaving');
    void incoming.offsetWidth;
    incoming.classList.add('is-moving');
    await sleep(800);
    incoming.classList.remove('is-moving');
    incoming.classList.add('is-leaving');
    mark.classList.add('is-complete');
    await sleep(250);
    incoming.remove();
  }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      run();
    }
  }, { threshold: 0.2 });
  observer.observe(mark);
})();
