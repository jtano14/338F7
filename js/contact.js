'use strict';
(() => {
  const form = document.getElementById('inquiry-form');
  const division = document.getElementById('division');
  if (!form || !division) return;
  const queryDivision = new URLSearchParams(window.location.search).get('division');
  const mappings = {
    'metals': 'Metals',
    'chemicals': 'Chemicals',
    'food-processing': 'Food Processing',
    'consumer-goods': 'Consumer Goods',
    'consulting': 'Corporate consulting'
  };
  if (queryDivision && mappings[queryDivision]) division.value = mappings[queryDivision];
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const get = key => String(data.get(key) || '').trim();
    const subject = `FLUX7 Inquiry: ${get('division')} / ${get('company')}`;
    const body = [
      `Name: ${get('name')}`,
      `Company: ${get('company')}`,
      `Email: ${get('email')}`,
      `Country / region: ${get('country') || 'Not specified'}`,
      `Inquiry type: ${get('division')}`,
      '', 'Message:', get('message')
    ].join('\n');
    window.location.href = `mailto:info@flux7.co.jp?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
})();
