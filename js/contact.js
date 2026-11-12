
'use strict';

(() => {
  const form = document.getElementById('inquiry-form');
  const division = document.getElementById('division');
  if (!form || !division) return;

  const ja = document.documentElement.lang === 'ja';
  const endpoint = 'https://formspree.io/f/xrppnqgq';
  const mappings = {
    metals: 'Metals',
    chemicals: 'Chemicals',
    'food-processing': 'Food Processing',
    'consumer-goods': 'Consumer Goods',
    consulting: 'Corporate consulting'
  };

  const selected = new URLSearchParams(location.search)
    .get('division');
  if (selected && mappings[selected]) {
    division.value = mappings[selected];
  }

  window.Flux7Contact = {
    form, division, ja, endpoint,
    countryInput: document.getElementById('country'),
    countryPicker: document.getElementById('country-picker'),
    countryOptions: document.getElementById('country-options'),
    countryToggle: document.querySelector('.country-picker-toggle')
  };
})();

(() => {
  const c = window.Flux7Contact;
  if (!c) return;
  const { countryInput, countryPicker, countryOptions, countryToggle } = c;
  if (!countryInput || !countryPicker ||
      !countryOptions || !countryToggle) return;

  const countries = [
    'Japan', 'India', 'Australia', 'Canada', 'China',
    'France', 'Germany', 'Indonesia', 'Malaysia',
    'Philippines', 'Singapore', 'South Korea', 'Taiwan',
    'Thailand', 'United Arab Emirates', 'United Kingdom',
    'United States', 'Vietnam'
  ];

  let matches = [];
  let activeIndex = -1;

  function close() {
    countryOptions.hidden = true;
    countryInput.setAttribute('aria-expanded', 'false');
    countryInput.removeAttribute('aria-activedescendant');
    activeIndex = -1;
  }

  function choose(value) {
    countryInput.value = value;
    close();
  }

  c.countryState = { close };
  c.countryData = { countries, choose };
})();

(() => {
  const c = window.Flux7Contact;
  if (!c || !c.countryData) return;
  const { countryInput: input, countryPicker: picker,
    countryOptions: options, countryToggle: toggle } = c;
  const { countries, choose } = c.countryData;
  let matches = [], active = -1;

  function show(query = '') {
    matches = countries.filter(x =>
      x.toLowerCase().includes(query.trim().toLowerCase()));
    options.replaceChildren();
    active = -1;
    input.removeAttribute('aria-activedescendant');
    matches.forEach((name, i) => {
      const item = document.createElement('div');
      item.id = `country-option-${i}`;
      item.className = 'country-picker-option';
      item.setAttribute('role', 'option');
      item.setAttribute('aria-selected', 'false');
      item.textContent = name;
      item.addEventListener('mousedown', e => e.preventDefault());
      item.addEventListener('click', () => choose(name));
      options.appendChild(item);
    });
    options.hidden = matches.length === 0;
    input.setAttribute('aria-expanded', String(matches.length > 0));
  }

  input.addEventListener('input', () => show(input.value));
  input.addEventListener('focus', () => show(input.value));
  toggle.addEventListener('click', () => {
    if (options.hidden) { input.focus(); show(''); }
    else { c.countryState.close(); toggle.blur(); }
  });
})();

(() => {
  const c = window.Flux7Contact;
  if (!c || !c.countryData) return;
  const input = c.countryInput;
  const options = c.countryOptions;
  let active = -1;

  input.addEventListener('keydown', event => {
    if (event.key === 'Escape') c.countryState.close();
    const items = [...options.querySelectorAll('[role="option"]')];
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!items.length) return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      active = (active + direction + items.length) % items.length;
      items.forEach((item, i) => {
        item.classList.toggle('is-active', i === active);
        item.setAttribute('aria-selected', String(i === active));
      });
      input.setAttribute('aria-activedescendant', items[active].id);
      items[active].scrollIntoView({ block: 'nearest' });
    } else if (event.key === 'Enter' && active >= 0 &&
               !options.hidden && items[active]) {
      event.preventDefault();
      c.countryData.choose(items[active].textContent);
      active = -1;
    }
  });
  document.addEventListener('pointerdown', event => {
    if (!c.countryPicker.contains(event.target)) c.countryState.close();
  });
})();

(() => {
  const c = window.Flux7Contact;
  if (!c) return;
  const { form, division, ja, endpoint } = c;
  const status = document.getElementById('form-status');
  const button = form.querySelector('[type="submit"]');
  const translate = (en, jp) => ja ? jp : en;
  if (!button) return;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity() || button.disabled) return;
    const data = new FormData(form);
    if (String(data.get('_gotcha') || '').trim()) return;
    button.disabled = true;
    button.textContent = translate('SENDING...', '送信中...');
    if (status) {
      status.textContent = translate('Sending your inquiry...',
        'お問い合わせを送信しています...');
      status.setAttribute('role', 'status');
    }
    try {
      const response = await fetch(endpoint, {
        method: 'POST', body: data,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      if (localStorage.getItem('flux7-analytics-consent-v1')
          === 'accepted' && typeof window.gtag === 'function') {
        window.gtag('event', 'form_submit_success', {
          business_division: division.value,
          site_language: ja ? 'ja' : 'en'
        });
      }
      form.reset();
      if (c.countryState) c.countryState.close();
      if (status) {
        status.textContent = translate(
          'Thank you. Your inquiry has been submitted successfully.',
          'お問い合わせを受け付けました。ありがとうございます。');
        status.setAttribute('role', 'status');
      }
    } catch (error) {
      if (status) {
        status.textContent = translate(
          'Unable to submit your inquiry. Please email info@flux7.co.jp directly.',
          '送信できませんでした。info@flux7.co.jp まで直接メールでお問い合わせください。');
        status.setAttribute('role', 'alert');
      }
    } finally {
      button.disabled = false;
      button.textContent = translate('SEND INQUIRY', 'お問い合わせを送信');
    }
  });
})();
