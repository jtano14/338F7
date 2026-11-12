
'use strict';

(() => {
  const form = document.getElementById('inquiry-form');
  const division = document.getElementById('division');
  if (!form || !division) return;

  const endpoint = 'https://formspree.io/f/xrppnqgq';
  const mappings = {
    metals: 'Metals',
    chemicals: 'Chemicals',
    'food-processing': 'Food Processing',
    'consumer-goods': 'Consumer Goods',
    consulting: 'Corporate consulting'
  };
  const selected = new URLSearchParams(location.search).get('division');
  if (selected && mappings[selected]) division.value = mappings[selected];

  const countryInput = document.getElementById('country');
  const countryPicker = document.getElementById('country-picker');
  const countryOptions = document.getElementById('country-options');
  const countryToggle = document.querySelector('.country-picker-toggle');
  const countries = [
    'Japan', 'India', 'Australia', 'Canada', 'China', 'France',
    'Germany', 'Indonesia', 'Malaysia', 'Philippines', 'Singapore',
    'South Korea', 'Taiwan', 'Thailand', 'United Arab Emirates',
    'United Kingdom', 'United States', 'Vietnam'
  ];
  let matches = [];
  let activeCountryIndex = -1;

  if (countryInput && countryPicker && countryOptions && countryToggle) {
    // Browsers may offer saved addresses despite autocomplete="off".
    countryInput.setAttribute('autocomplete', 'off');
    countryInput.setAttribute('aria-autocomplete', 'list');
    countryInput.setAttribute('aria-controls', 'country-options');
    countryInput.setAttribute('aria-expanded', 'false');

    function closeCountries() {
      countryOptions.hidden = true;
      countryInput.setAttribute('aria-expanded', 'false');
      countryInput.removeAttribute('aria-activedescendant');
      activeCountryIndex = -1;
    }

    function setActive(index) {
      const options = [...countryOptions.querySelectorAll('[role="option"]')];
      if (!options.length) return;
      activeCountryIndex = (index + options.length) % options.length;
      options.forEach((option, i) => {
        const active = i === activeCountryIndex;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-selected', String(active));
      });
      const activeOption = options[activeCountryIndex];
      countryInput.setAttribute('aria-activedescendant', activeOption.id);
      activeOption.scrollIntoView({ block: 'nearest' });
    }

    function selectCountry(country) {
      countryInput.value = country;
      closeCountries();
    }

    function showCountries(query = '') {
      const search = query.trim().toLowerCase();
      matches = countries.filter(country =>
        country.toLowerCase().includes(search)
      );
      countryOptions.replaceChildren();
      activeCountryIndex = -1;
      countryInput.removeAttribute('aria-activedescendant');

      matches.forEach((country, index) => {
        const option = document.createElement('div');
        option.className = 'country-picker-option';
        option.id = `country-option-${index}`;
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.textContent = country;
        option.addEventListener('mousedown', event => {
          event.preventDefault();
          selectCountry(country);
        });
        option.addEventListener('click', () => selectCountry(country));
        countryOptions.appendChild(option);
      });
      countryOptions.hidden = matches.length === 0;
      countryInput.setAttribute('aria-expanded', String(matches.length > 0));
    }

    countryInput.addEventListener('input', () => showCountries(countryInput.value));
    countryInput.addEventListener('focus', () => showCountries(countryInput.value));

    countryToggle.addEventListener('click', () => {
      if (countryOptions.hidden) {
        countryInput.focus();
        showCountries('');
      } else {
        closeCountries();
        countryToggle.blur();
      }
    });

    countryInput.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeCountries();
        return;
      }
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (countryOptions.hidden) showCountries(countryInput.value);
        if (!matches.length) return;
        const direction = event.key === 'ArrowDown' ? 1 : -1;
        setActive(activeCountryIndex < 0
          ? (direction === 1 ? 0 : matches.length - 1)
          : activeCountryIndex + direction);
      } else if (event.key === 'Enter' && !countryOptions.hidden && activeCountryIndex >= 0) {
        event.preventDefault();
        selectCountry(matches[activeCountryIndex]);
      }
    });

    document.addEventListener('pointerdown', event => {
      if (!countryPicker.contains(event.target)) closeCountries();
    });
    countryPicker.addEventListener('focusout', event => {
      if (!countryPicker.contains(event.relatedTarget)) closeCountries();
    });
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const status = document.getElementById('form-status');
    const button = form.querySelector('[type="submit"]');
    const data = new FormData(form);
    if (String(data.get('_gotcha') || '').trim()) return;
    if (!button) return;

    button.disabled = true;
    button.textContent = 'SENDING...';
    if (status) {
      status.textContent = 'Sending your inquiry...';
      status.setAttribute('role', 'status');
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Submission failed');
      // GA4: Record successful inquiries only with analytics consent.
      if (
        localStorage.getItem('flux7-analytics-consent-v1') === 'accepted' &&
        typeof window.gtag === 'function'
      ) {
        window.gtag('event', 'form_submit_success', {
          business_division: division.value,
          site_language: 'en'
        });
      }
      form.reset();
      if (countryOptions) {
        countryOptions.hidden = true;
        countryInput.setAttribute('aria-expanded', 'false');
        countryInput.removeAttribute('aria-activedescendant');
      }
      if (status) {
        status.textContent = 'Thank you. Your inquiry has been submitted successfully.';
        status.setAttribute('role', 'status');
      }
    } catch (error) {
      if (status) {
        status.textContent = 'Unable to submit your inquiry. Please email info@flux7.co.jp directly.';
        status.setAttribute('role', 'alert');
      }
    } finally {
      button.disabled = false;
      button.textContent = 'SEND INQUIRY';
    }
  });
})();
