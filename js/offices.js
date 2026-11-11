(() => {
  'use strict';
  const offices = [
    { country: 'Japan', city: 'Amagasaki, Hyogo', type: 'Corporate headquarters', address: '1-22-9, Tsukaguchi-cho, Amagasaki, Hyogo, Japan 661-0002' },
    { country: 'India', city: 'Mumbai', type: 'Partner office', address: '612 Maker Chambers V, Nariman Point, Mumbai 400021, India' },
    { country: 'Singapore', city: 'Singapore', type: 'Partner office', address: '531 Upper Cross Street, #02-11 Hong Lim Complex, Singapore 050531' },
    { country: 'Brunei', city: 'Salambigar', type: 'Partner office', address: 'Plot 5C1B, Salambigar Industrial Park, Brunei Darussalam, BU1129' },
  ];
  const buttons = [...document.querySelectorAll('[data-office]')];
  const name = document.getElementById('office-name');
  const type = document.getElementById('office-type');
  const address = document.getElementById('office-address');
  const phone = document.getElementById('office-phone');
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
    if (phone) {
      phone.textContent = office.country === 'Japan' ? 'Tel: +81-6-6415-9764' : '';
      phone.hidden = office.country !== 'Japan';
    }
    const query = encodeURIComponent(office.address);
    map.src = office.country === 'Japan' ? "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d300.3424293043841!2d135.412002183079!3d34.75500204035112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000f1d34bed3501%3A0x2ff03b33a20f1258!2z44CSNjYxLTAwMDIgSHlvZ28sIEFtYWdhc2FraSwgVHN1a2FndWNoaWNoxY0sIDEtY2jFjW1l4oiSMjItOSDplbflhYnjg5Pjg6sgM-majg!5e1!3m2!1sen!2sjp!4v1794299968203!5m2!1sen!2sjp" : `https://www.google.com/maps?q=${query}&output=embed`;
    map.title = `Map showing ${office.city}, ${office.country}`;
    directions.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
  }));
})();
