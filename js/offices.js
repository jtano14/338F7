(() => {
  'use strict';
  const offices = [
    { country: 'Japan', city: 'Amagasaki, Hyogo', type: 'Corporate headquarters', address: '1-22-9, Tsukaguchi-cho, Amagasaki, Hyogo, Japan 661-0002' },
    { country: 'India', city: 'Mumbai', type: 'International office', address: '612 Maker Chambers V, Nariman Point, Mumbai 400021, India' },
    { country: 'Singapore', city: 'Singapore', type: 'International office', address: '531 Upper Cross Street, #02-11 Hong Lim Complex, Singapore 050531' },
    { country: 'Brunei', city: 'Salambigar', type: 'International office', address: 'Plot 5C1B, Salambigar Industrial Park, Brunei Darussalam, BU1129' },
  ];
  const buttons = [...document.querySelectorAll('[data-office]')];
  const name = document.getElementById('office-name');
  const type = document.getElementById('office-type');
  const address = document.getElementById('office-address');
  const map = document.getElementById('office-map');
  const directions = document.getElementById('office-directions');
  if (!buttons.length || !name || !type || !address || !map || !directions) return;
  buttons.forEach(button => button.addEventListener('click', () => {
    const office = offices[Number(button.dataset.office)];
    if (!office) return;
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    name.textContent = `${office.country} · ${office.city}`;
    type.textContent = office.type.toUpperCase();
    address.textContent = office.address;
    const query = encodeURIComponent(office.address);
    map.src = `https://www.google.com/maps?q=${query}&output=embed`;
    map.title = `Map showing ${office.city}, ${office.country}`;
    directions.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }));
})();
