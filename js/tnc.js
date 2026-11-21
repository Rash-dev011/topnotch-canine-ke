// Top Notch Canine Capability: site behaviour
(() => {
  const doc = document.documentElement;
  doc.classList.add('js');

  // Phone menu
  const toggle = document.querySelector('.nav__toggle');
  const nav = document.getElementById('site-nav');
  const mq = window.matchMedia('(max-width: 1023px)');
  const setOpen = (open) => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.nav__toggle-label').textContent = open ? 'Close' : 'Menu';
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (mq.matches) nav.hidden = !open;
  };
  const sync = () => { if (!nav) return; nav.hidden = mq.matches; if (toggle) setOpen(false); };
  if (toggle && nav) {
    sync();
    mq.addEventListener('change', sync);
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a') && mq.matches) setOpen(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { setOpen(false); toggle.focus(); }
    });
  }

  // Phone action bar: shows once the hero's main button has scrolled away
  const bar = document.querySelector('.actionbar');
  const heroBtn = document.querySelector('.hero .btn');
  const footer = document.querySelector('.footer');
  if (bar && 'IntersectionObserver' in window) {
    let heroGone = false, footerIn = false;
    const update = () => {
      const show = heroGone && !footerIn && !bar.contains(document.activeElement);
      bar.dataset.shown = String(show || bar.contains(document.activeElement));
      bar.inert = !(show || bar.contains(document.activeElement));
    };
    if (heroBtn) new IntersectionObserver(([e]) => { heroGone = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(heroBtn);
    else heroGone = true;
    if (footer) new IntersectionObserver(([e]) => { footerIn = e.isIntersecting; update(); }).observe(footer);
    update();
  }

  // Request form: checks each field, then sends to data-endpoint, or opens the email app
  document.querySelectorAll('form.form').forEach((form) => {
    const status = form.querySelector('.form__status');
    const messages = {
      valueMissing: (el) => el.dataset.missing || 'Fill in this field.',
      typeMismatch: (el) => el.dataset.mismatch || 'Check the format of this field.',
      patternMismatch: (el) => el.dataset.mismatch || 'Check the format of this field.',
    };
    const check = (el) => {
      const err = document.getElementById(el.getAttribute('aria-describedby')?.split(' ').find((id) => id.endsWith('-err')));
      let msg = '';
      if (!el.validity.valid) {
        for (const k of Object.keys(messages)) if (el.validity[k]) { msg = messages[k](el); break; }
      }
      el.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (err) err.textContent = msg;
      return !msg;
    };
    form.querySelectorAll('.input').forEach((el) => {
      el.addEventListener('blur', () => { if (el.value) check(el); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') check(el); });
    });
    form.addEventListener('submit', async (e) => {
      const fields = [...form.querySelectorAll('.input')];
      const bad = fields.filter((el) => !check(el));
      if (bad.length) {
        e.preventDefault();
        status.dataset.state = 'error';
        status.textContent = bad.length === 1 ? 'One field needs fixing before this can be sent.' : `${bad.length} fields need fixing before this can be sent.`;
        bad[0].focus();
        return;
      }
      const endpoint = form.dataset.endpoint;
      if (!endpoint) {
        status.dataset.state = 'ok';
        status.textContent = 'Your email app is opening with the request filled in. Send it from there, or call +254 721 448 555.';
        return; // the mailto action handles it
      }
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      status.dataset.state = '';
      status.textContent = 'Sending your request…';
      try {
        const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
        if (!res.ok) throw new Error(String(res.status));
        form.reset();
        status.dataset.state = 'ok';
        status.textContent = form.dataset.sent || 'Your request is in. We will be in touch.';
      } catch {
        status.dataset.state = 'error';
        status.textContent = 'The request did not send. Call +254 721 448 555 or message us on WhatsApp, and we will take it from there.';
      } finally {
        btn.disabled = false;
      }
    });
  });

  // Header compacts once the page scrolls
  const header = document.querySelector('.header');
  if (header) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { header.dataset.scrolled = String(window.scrollY > 24); ticking = false; });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Photographs develop on a diagonal wipe the first time they enter the screen
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -12% 0px' });
    // Anything already on screen shows at once; only what is below the fold waits
    reveals.forEach((el) => { if (el.getBoundingClientRect().top < window.innerHeight * 0.88) el.classList.add('is-in'); else io.observe(el); });
    doc.classList.add('reveal-ready');
  }

  const y = document.querySelector('[data-year]');
  if (y) y.textContent = String(new Date().getFullYear());
})();
