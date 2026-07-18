/* Linea Italiana — main.js
   PLUMBING_V 1 (fix flash: reveal generico immediateRender:false, nessuna doppia-animazione).
   Gesto-firma: la FOGLIA che si disegna (strokeDashoffset — NON opacity). Concept: colorazione vegetale.
   GSAP SUBITO; reveal once; watchdog SOLO fallback. */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'linea-italiana',
    hours: {
      0: [],
      1: [],
      2: [['09:30', '19:00']],
      3: [['09:30', '19:00']],
      4: [['09:30', '19:00']],
      5: [['09:30', '19:00']],
      6: [['09:30', '18:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '#orariTable tr[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 2000,
    inViewClass: 'in-view',
    breakpointMenu: 900,
    EN: {
      'nav.vegetale': 'Botanical colour', 'nav.salone': 'The salon', 'nav.storia': 'Since 1996', 'nav.dove': 'Where & hours', 'nav.chiama': 'Call',
      'hero.kicker': 'Hairdressers on Corso Vercelli · since 1996',
      'hero.sub': '<strong>Botanical colouring</strong> — henna, indigo, cassia — instead of chemical dyes. Gentle on your hair, done with care.',
      'hero.cta1': 'Call: 02 481 2624', 'hero.cta2': 'Botanical colouring', 'hero.rec': '37 reviews',
      'veg.kicker': 'Our signature', 'veg.t1': 'The raw', 'veg.t2': 'materials',
      'veg.lead': 'No chemical dyes: the colour comes from <strong>plant pigments</strong>, «the precious raw materials». A natural colour that respects the hair and scalp — «done with exceptional care and skill».',
      'veg.l1': 'warm reds and browns', 'veg.l2': 'deep browns and blacks', 'veg.l3': 'shine and reflections', 'veg.l4': 'the care, from nature',
      'veg.note': 'The colour that comes from nature, with the gentleness that is our watchword.',
      'serv.kicker': 'The salon', 'serv.t1': 'Colour, cut', 'serv.t2': 'and care',
      'serv.lead': 'A salon where you feel welcome: <strong>gentleness and kindness</strong>, skill and great value for money. «A place you’re glad to come back to.»',
      'c1.t': 'Botanical colouring', 'c1.d': 'Natural colour from henna, indigo and cassia — gentle and luminous.',
      'c2.t': 'Cut for men & women', 'c2.d': 'A careful, «impeccable» cut, tailored to you.',
      'c3.t': 'Hair care', 'c3.d': 'Washing, treatment and styling, with products that respect the hair.',
      'sto.kicker': 'Our story', 'sto.t1': 'Since 1996,', 'sto.t2': 'our roots',
      'sto.p1': 'Linea Italiana was born in <strong>1996</strong>: the name, created by a group of friends and colleagues, means to underline our roots and our culture.',
      'sto.p2': 'Since then, the same care: the gentleness, the skill, the joy of revealing a new kind of beauty.',
      'sto.quote': '«We live only to discover new beauty. Everything else is a form of waiting.»',
      'gal.kicker': 'The results', 'gal.t1': 'The colour,', 'gal.t2': 'live',
      'rec.kicker': 'What people say', 'rec.t2': 'from 37 Google reviews',
      'rec.r1': '«Botanical colouring done with exceptional care and skill. Impeccably kind and professional.»',
      'rec.r2': '«Gentleness and kindness is the watchword. Both the person who washed my hair and the one who cut it were impeccable. A place you’re glad to come back to. The price lower than I expected.»',
      'rec.r3': '«Fully satisfied with the final result and great value for money!»',
      'rec.r4': '«Impeccable and helpful every time I’ve been there.»',
      'dove.kicker': 'Where & hours', 'dove.t1': 'On Via Cimarosa,', 'dove.t2': 'off Corso Vercelli',
      'dove.metro': 'Via Domenico Cimarosa 3, 20144 Milan · Corso Vercelli / Piazzale Wagner area (M1 Wagner).',
      'dove.chiama': 'Call 02 481 2624', 'dove.apri': 'Open in Maps',
      'giorni.lun': 'Monday', 'giorni.mar': 'Tuesday', 'giorni.mer': 'Wednesday', 'giorni.gio': 'Thursday', 'giorni.ven': 'Friday', 'giorni.sab': 'Saturday', 'giorni.dom': 'Sunday', 'giorni.chiuso': 'Closed',
      'faq.kicker': 'Frequently asked questions',
      'faq.q1': 'What is botanical colouring?', 'faq.a1': 'It’s the colour that comes from nature: plant pigments like henna, indigo and cassia — «the raw materials» — instead of chemical dyes. A colour that’s gentle on hair and scalp, done with care and skill.',
      'faq.q2': 'What services do you offer?', 'faq.a2': 'Botanical colouring, cut and hair care, for men and women. With the gentleness and kindness that are our watchword.',
      'faq.q3': 'How long have you been around?', 'faq.a3': 'Linea Italiana was born in 1996: the name means to underline our roots and our culture.',
      'faq.q4': 'When are you open?', 'faq.a4': 'Tuesday to Friday 9:30am–7:00pm; Saturday 9:30am–6:30pm. Closed Sunday and Monday. Best to call for an appointment: 02 481 2624.',
      'faq.q5': 'Where are you?', 'faq.a5': 'At Via Domenico Cimarosa 3 in Milan, Corso Vercelli / Piazzale Wagner area. Phone 02 481 2624.',
      'foot.dove': 'Via Domenico Cimarosa 3, 20144 Milan · <a href="tel:+39024812624">02 481 2624</a>',
      'foot.demo': 'Demo website (concept) by Bespoke Studio, built from public data and photos — this is not the official website of the business.',
      'bar.chiama': 'Call', 'bar.orari': 'Hours', 'bar.mappa': 'Map'
    },
  };
  /* ══════════════════════════════════════ */

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    document.querySelectorAll('.reveal, .reveal-hero').forEach(function (el) { el.classList.add(SITE.inViewClass); el.style.opacity = 1; });
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray('.reveal').forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: .7, ease: 'power2.out', immediateRender: false, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    gsap.to('#heroPhoto', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    /* GESTO-FIRMA: la foglia dell'intro che si disegna (strokeDashoffset, NON opacity) */
    var leaf = document.querySelector('.leaf-draw');
    if (leaf && leaf.getTotalLength) {
      var len = leaf.getTotalLength();
      leaf.style.strokeDasharray = len; leaf.style.strokeDashoffset = len;
      gsap.to(leaf, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut', delay: .1 });
    }
  } else {
    showAllReveals();
    var lf = document.querySelector('.leaf-draw'); if (lf) lf.style.strokeDashoffset = 0;
  }

  /* hero entrance */
  function heroEntrance() {
    if (!hasGsap || reducedMotion) { document.querySelectorAll('.reveal-hero').forEach(function (el) { el.style.opacity = 1; }); return; }
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero__kicker', { opacity: 1, y: 0, duration: .5 }, .1)
      .fromTo('.hero__title', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .8 }, .2)
      .to('.hero__sub', { opacity: 1, y: 0, duration: .6 }, .5)
      .to('.hero__cta', { opacity: 1, y: 0, duration: .6 }, .7)
      .to('.hero__badge', { opacity: 1, y: 0, duration: .5 }, .85);
  }
  var intro = document.getElementById(SITE.introId);
  function hideIntro() { if (!intro) return; var el = intro; intro = null; el.classList.add('hide'); setTimeout(function () { el.remove(); }, 650); heroEntrance(); }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger'), nav = document.getElementById('mainNav');
  if (burger && nav) {
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); };
    burger.addEventListener('click', function () { var open = nav.classList.toggle('nav-open'); burger.setAttribute('aria-expanded', open ? 'true' : 'false'); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lightboxImg'), lbClose = document.getElementById('lightboxClose');
  function openLb(src, alt) { if (!lb) return; lbImg.src = src; lbImg.alt = alt || ''; lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); }
  function closeLb() { if (!lb) return; lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true'); lbImg.src = ''; }
  document.querySelectorAll('[data-full]').forEach(function (el) {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', function () { var img = el.querySelector('img'); openLb(el.getAttribute('data-full'), img ? img.alt : ''); });
  });
  if (lbClose) lbClose.addEventListener('click', closeLb);
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });

  /* ══════════ ORARI DINAMICI (Europe/Rome) ══════════ */
  var DIT = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
  var DEN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  function romeNow() { var d = new Date().toLocaleString('en-US', { timeZone: 'Europe/Rome' }); var dt = new Date(d); return { day: dt.getDay(), mins: dt.getHours() * 60 + dt.getMinutes() }; }
  function toMin(t) { var p = t.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
  function fmt(m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return h + ':' + (mm < 10 ? '0' + mm : mm); }
  function hoursState() {
    var now = romeNow(), w = SITE.hours[now.day] || [];
    for (var i = 0; i < w.length; i++) { var s = toMin(w[i][0]), e = toMin(w[i][1]); if (now.mins >= s && now.mins < e) return { open: true, day: now.day, closesAt: fmt(e) }; }
    for (var k = 0; k < w.length; k++) { if (now.mins < toMin(w[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(w[k][0])) }; }
    for (var dd = 1; dd <= 7; dd++) { var nd = (now.day + dd) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var st = hoursState(), en = root.lang === 'en';
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    var el = document.getElementById(SITE.hoursStatusId); if (!el) return;
    var txt;
    if (st.open) txt = (en ? 'Open now · closes at ' : 'Aperto ora · chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DEN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DIT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt; el.classList.toggle('is-open', st.open); el.classList.toggle('is-closed', !st.open);
  }

  /* ══════════ i18n IT/EN ══════════ */
  var langBtn = document.getElementById('langToggle');
  function applyLang(lang) {
    root.lang = lang;
    if (lang === 'en') {
      document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var k = el.getAttribute('data-i18n'), v = SITE.EN[k];
        if (v == null) return;
        if (/[<&]/.test(v)) el.innerHTML = v; else el.textContent = v;
      });
      if (langBtn) { langBtn.textContent = 'IT'; langBtn.setAttribute('aria-label', 'Passa all\'italiano'); }
    } else {
      document.querySelectorAll('[data-i18n][data-it]').forEach(function (el) {
        var v = el.getAttribute('data-it'); if (/[<&]/.test(v)) el.innerHTML = v; else el.textContent = v;
      });
      if (langBtn) { langBtn.textContent = 'EN'; langBtn.setAttribute('aria-label', 'Switch language to English'); }
    }
    renderHours();
  }
  document.querySelectorAll('[data-i18n]').forEach(function (el) { el.setAttribute('data-it', el.innerHTML); });
  if (langBtn) langBtn.addEventListener('click', function () { applyLang(root.lang === 'en' ? 'it' : 'en'); });

  renderHours();
  setInterval(renderHours, 60000);
})();
