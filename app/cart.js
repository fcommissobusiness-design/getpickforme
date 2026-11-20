/* Shortlist cart: user accumulates products while browsing, then opens them
   all on Amazon.co.uk in one go (with our affiliate tag). Mirrors the IT
   site's shop.js:216 implementation. State in localStorage; only ASIN, name,
   price, image are stored — no personal data. */
(function () {
  const KEY = 'gpfm_cart', TAG = 'getpickforme-21';
  const get = () => { try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch (e) { return []; } };
  const set = a => { try { localStorage.setItem(KEY, JSON.stringify(a)); } catch (e) { } };
  const amazonCartUrl = a => {
    if (!a.length) return '#';
    let u = 'https://www.amazon.co.uk/associates/addtocart?AssociateTag=' + TAG;
    a.forEach((it, i) => { u += '&ASIN.' + (i + 1) + '=' + encodeURIComponent(it.asin) + '&Quantity.' + (i + 1) + '=1'; });
    return u;
  };

  const fab = document.createElement('button');
  fab.className = 'cartfab'; fab.type = 'button'; fab.hidden = true;
  fab.innerHTML = '<svg class="cartfab-i" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h2.2l2.2 12.2a1.5 1.5 0 0 0 1.5 1.2h8.9a1.5 1.5 0 0 0 1.5-1.2L21 7H5.3"/></svg><span class="cartfab-n">0</span>';
  const panel = document.createElement('div'); panel.className = 'cartpanel'; panel.hidden = true;
  document.body.appendChild(fab); document.body.appendChild(panel);

  const pulse = () => { fab.classList.add('pulse'); setTimeout(() => fab.classList.remove('pulse'), 600); };
  function render() {
    const a = get();
    fab.hidden = a.length === 0; fab.querySelector('.cartfab-n').textContent = a.length;
    if (a.length === 0) { panel.hidden = true; }
    panel.innerHTML = '<div class="cartpanel-h"><b>Your shortlist</b><button data-cart-close type="button" aria-label="Close">✕</button></div>' +
      (a.length ? '<div class="cartpanel-list">' + a.map(it => '<div class="cart-item"><span class="cart-im">' + (it.img ? '<img src="' + it.img + '" alt="">' : '') + '</span><span class="cart-t">' + it.name + (it.price ? '<span class="cart-p">£' + it.price + '</span>' : '') + '</span><button class="cart-x" data-cart-remove="' + it.asin + '" type="button" aria-label="Remove">✕</button></div>').join('') + '</div>' +
        '<a class="cartpanel-go" href="' + amazonCartUrl(a) + '" target="_blank" rel="noopener nofollow sponsored">Open your shortlist on Amazon</a>' +
        '<p class="cartpanel-note">They open in your Amazon basket. You confirm the purchase there.</p>' +
        '<button class="cartpanel-clear" data-cart-clear type="button">Clear shortlist</button>'
        : '<p class="cartpanel-empty">Save products you like with the + button, then open them all together on Amazon.</p>');
  }
  function openPanel() { render(); panel.hidden = false; }

  document.addEventListener('click', e => {
    const add = e.target.closest('[data-cart]');
    if (add) {
      e.preventDefault();
      const el = add.closest('[data-asin]') || add;
      const asin = el.getAttribute('data-asin'); if (!asin) return;
      const a = get();
      if (a.some(x => x.asin === asin)) { openPanel(); return; }
      a.push({ asin: asin, name: el.getAttribute('data-name') || 'Product', price: el.getAttribute('data-price') || '', img: el.getAttribute('data-img') || '' });
      set(a); render(); pulse();
      return;
    }
    if (e.target.closest('[data-cart-open]')) { openPanel(); return; }
    if (e.target.closest('[data-resume-close]')) { const r = document.querySelector('.cartresume'); if (r) r.remove(); return; }
    if (e.target === fab || e.target.closest('.cartfab')) { openPanel(); return; }
    if (e.target.closest('[data-cart-close]')) { panel.hidden = true; return; }
    const rm = e.target.closest('[data-cart-remove]');
    if (rm) { set(get().filter(x => x.asin !== rm.getAttribute('data-cart-remove'))); render(); return; }
    if (e.target.closest('[data-cart-clear]')) { set([]); render(); return; }
  });
  render();

  /* Return-visit resume popup: shown once per session if items are saved. */
  try {
    const a0 = get();
    if (a0.length && !sessionStorage.getItem('gpfm_resume_seen')) {
      sessionStorage.setItem('gpfm_resume_seen', '1');
      const rz = document.createElement('div'); rz.className = 'cartresume';
      rz.innerHTML = '<div class="cartresume-b"><b>Pick up where you left off</b><span>You have ' + a0.length + (a0.length === 1 ? ' product' : ' products') + ' in your shortlist.</span></div><button class="cartresume-go" data-cart-open type="button">See the list</button><button class="cartresume-x" data-resume-close type="button" aria-label="Close">✕</button>';
      document.body.appendChild(rz);
      setTimeout(() => { const r = document.querySelector('.cartresume'); if (r) r.remove(); }, 12000);
    }
  } catch (e) { }
})();
