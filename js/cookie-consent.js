/* FLUX7 GA4: analytics loads only after opt-in. */
(() => {
  'use strict';
  const id = 'G-J99E03C6YL';
  const key = 'flux7-analytics-consent-v1';
  const ja = document.documentElement.lang.toLowerCase().startsWith('ja');
  const t = ja ? {
    aria: 'アクセス解析Cookieの設定',
    message: 'FLUX7では、ウェブサイトの利用状況、アクセス地域、サービス・製品への関心を把握するため、任意のアクセス解析Cookieを使用します。同意いただいた場合に限り、Google アナリティクス 4を使用します。同意・拒否のいずれを選んでも、ウェブサイトをご利用いただけます。',
    policy: 'プライバシーポリシー', accept: '同意する', reject: '拒否する', settings: 'Cookie設定'
  } : {
    aria: 'Analytics cookie preferences',
    message: 'FLUX7 uses optional analytics cookies to understand website traffic, visitor geography, and interest in our services and products. With your permission, we use Google Analytics 4 to improve our website. You can accept or reject analytics cookies without affecting access.',
    policy: 'Privacy Policy', accept: 'Accept', reject: 'Reject', settings: 'Cookie Settings'
  };
  let banner;
  let started = false;
  function read() { try { return localStorage.getItem(key); } catch (_) { return null; } }
  function store(value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function clearAnalyticsCookies() {
    const hosts = [location.hostname, '.' + location.hostname, '.flux7.co.jp'];
    const paths = ['/', location.pathname];
    document.cookie.split(';').forEach(part => {
      const name = part.split('=')[0].trim();
      if (!/^(_ga|_gid|_gat)(_|$)/.test(name)) return;
      hosts.forEach(domain => paths.forEach(path => {
        document.cookie = name + '=; Max-Age=0; path=' + path + '; domain=' + domain + '; SameSite=Lax';
      }));
      document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax';
    });
  }
  function enable() {
    if (started) return;
    started = true;
    window['ga-disable-' + id] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id);
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(script);
  }
  function choose(value) {
    store(value);
    if (value === 'accepted') enable();
    else {
      window['ga-disable-' + id] = true;
      if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: 'denied' });
      clearAnalyticsCookies();
      if (started) { location.reload(); return; }
    }
    banner.hidden = true;
  }
  function button(label, className, fn) {
    const el = document.createElement('button');
    el.type = 'button'; el.className = className; el.textContent = label;
    el.addEventListener('click', fn); return el;
  }
  /* Business-intent events: no names, email addresses or message contents. */
  document.addEventListener('click', event => {
    if (read() !== 'accepted' || typeof window.gtag !== 'function') return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const raw = link.getAttribute('href') || '';
    const label = (link.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 80);
    const pathname = location.pathname;
    const language = document.documentElement.lang.toLowerCase().startsWith('ja') ? 'ja' : 'en';
    const division = /metals|antimony|tungsten/i.test(pathname) ? 'metals'
      : /consulting/i.test(pathname) ? 'consulting'
      : /chemicals/i.test(pathname) ? 'chemicals'
      : /food-processing/i.test(pathname) ? 'food_processing'
      : /consumer-goods/i.test(pathname) ? 'consumer_goods' : 'general';
    const base = { page_path: pathname, site_language: language, business_division: division };
    const quote = /(?:[?&]division=|\bquote\b|見積|お見積)/i.test(raw + ' ' + label) ||
      link.classList.contains('flux7-quote-button') || link.classList.contains('quote');
    const spec = /\.(?:pdf|docx?|xlsx?)(?:[?#]|$)/i.test(raw) ||
      link.classList.contains('flux7-spec-button') || /(?:specification|仕様書|規格)/i.test(label);
    let name;
    if (/^mailto:/i.test(raw)) name = 'email_click';
    else if (quote) name = 'quote_request_click';
    else if (spec) name = 'specification_click';
    else if (/(?:^|\\/)contact\.html(?:[?#]|$)/i.test(raw)) name = 'contact_click';
    if (!name) return;
    const details = { ...base, link_path: raw.split('?')[0].split('#')[0] };
    window.gtag('event', name, details);
  });
  function init() {
    banner = document.createElement('section');
    banner.className = 'flux7-consent-banner';
    banner.setAttribute('aria-label', t.aria);
    banner.hidden = true;
    const message = document.createElement('p');
    message.textContent = t.message;
    const actions = document.createElement('div');
    actions.className = 'flux7-consent-actions';
    const policy = document.createElement('a');
    policy.href = 'privacy-policy.html'; policy.textContent = t.policy;
    actions.append(policy,
      button(t.accept, 'flux7-consent-accept', () => choose('accepted')),
      button(t.reject, 'flux7-consent-reject', () => choose('rejected')));
    banner.append(message, actions);
    document.body.appendChild(banner);
    const nav = document.querySelector('.flux7-footer-legal');
    const settings = button(t.settings, 'flux7-cookie-settings', () => { banner.hidden = false; });
    if (nav) nav.appendChild(settings);
    else { settings.classList.add('flux7-cookie-settings-fixed'); document.body.appendChild(settings); }
    const choice = read();
    if (choice === 'accepted') enable();
    else if (choice !== 'rejected') banner.hidden = false;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();