/* ============================================================
   YOUGotaGift Engineering — shared site behaviour
   Loaded on every dedicated section page.
   Every block no-ops gracefully if its target elements are absent.
   ============================================================ */

/* ===== Smooth Scroll with Inertia ===== */
(function () {
  if ('ontouchstart' in window) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var currentY = window.scrollY, targetY = window.scrollY, running = false, EASE = 0.11;
  function tick() {
    var dist = targetY - currentY;
    if (Math.abs(dist) < 0.5) { currentY = targetY; window.scrollTo(0, currentY); running = false; return; }
    currentY += dist * EASE; window.scrollTo(0, currentY); requestAnimationFrame(tick);
  }
  function scrollTo(y) {
    targetY = Math.max(0, Math.min(document.scrollingElement.scrollHeight - window.innerHeight, y));
    if (!running) { running = true; currentY = window.scrollY; requestAnimationFrame(tick); }
  }
  document.addEventListener('wheel', function (e) {
    var el = e.target;
    while (el && el !== document.documentElement) {
      var cs = getComputedStyle(el);
      if ((cs.overflowY === 'scroll' || cs.overflowY === 'auto') && el.scrollHeight > el.clientHeight + 1) return;
      el = el.parentElement;
    }
    e.preventDefault();
    var delta = e.deltaMode === 1 ? e.deltaY * 28 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
    scrollTo(targetY + delta);
  }, { passive: false });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var hash = a.getAttribute('href');
    if (hash === '#') { e.preventDefault(); scrollTo(0); return; }
    var target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    scrollTo(target.getBoundingClientRect().top + window.scrollY - 80);
  });
})();

/* ===== Theme toggle (sun/moon) ===== */
(function(){
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  var ICONS = {
    light: '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    dark:  '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'
  };
  function apply(t, animate){
    var svg = btn && btn.querySelector('svg');
    var setNow = function(){
      root.setAttribute('data-theme', t);
      if (svg) svg.innerHTML = ICONS[t] || ICONS.dark;
      if (btn) btn.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      try{ localStorage.setItem('theme', t); }catch(e){}
    };
    if (animate && svg){
      btn.classList.add('swapping');
      setTimeout(function(){ setNow(); requestAnimationFrame(function(){ requestAnimationFrame(function(){ btn.classList.remove('swapping'); }); }); }, 220);
    } else { setNow(); }
  }
  var saved = 'dark';
  try{ saved = localStorage.getItem('theme') || 'dark'; }catch(e){}
  apply(saved, false);
  if (btn) btn.addEventListener('click', function(){
    var cur = root.getAttribute('data-theme') || 'dark';
    apply(cur === 'light' ? 'dark' : 'light', true);
  });
})();

/* ===== Scroll-direction nav hide/show ===== */
(function(){
  var navWrap = document.querySelector('.nav-wrap');
  if (!navWrap) return;
  var ctrls = document.querySelector('.top-right-controls');
  var THRESHOLD = 80;
  window.addEventListener('wheel', function(e){
    if (window.scrollY < THRESHOLD) {
      navWrap.classList.remove('nav-hidden');
      if (ctrls) ctrls.classList.remove('controls-hidden');
      return;
    }
    if (e.deltaY > 0) {
      navWrap.classList.add('nav-hidden');
      if (ctrls) ctrls.classList.add('controls-hidden');
    } else if (e.deltaY < 0) {
      navWrap.classList.remove('nav-hidden');
      navWrap.classList.add('nav-compact');
      if (ctrls) ctrls.classList.remove('controls-hidden');
    }
  }, { passive: true });
  window.addEventListener('scroll', function(){
    if (window.scrollY < THRESHOLD) {
      navWrap.classList.remove('nav-hidden', 'nav-compact');
      if (ctrls) ctrls.classList.remove('controls-hidden');
    }
  }, { passive: true });
})();

/* ===== Mobile hamburger menu ===== */
(function(){
  var btn = document.querySelector('.mobile-menu-btn');
  var drawer = document.getElementById('mobileDrawer');
  if (!btn || !drawer) return;
  btn.addEventListener('click', function(){
    var open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    drawer.setAttribute('aria-hidden', String(open));
    drawer.classList.toggle('open', !open);
  });
  drawer.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('open');
    });
  });
  document.addEventListener('click', function(e){
    if (!btn.contains(e.target) && !drawer.contains(e.target)){
      btn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      drawer.classList.remove('open');
    }
  });
})();

/* ===== Generic reveal-left for any element with .reveal-left ===== */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = Array.prototype.slice.call(document.querySelectorAll('.reveal-left'));
  if (!els.length) return;
  if (reduce){ els.forEach(function(el){ el.classList.add('in'); }); return; }
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){ if (en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.01 });
    els.forEach(function(el){ io.observe(el); });
    requestAnimationFrame(function(){
      var vh = window.innerHeight || document.documentElement.clientHeight;
      els.forEach(function(el){
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0){ el.classList.add('in'); io.unobserve(el); }
      });
    });
  } else { els.forEach(function(el){ el.classList.add('in'); }); }
})();

/* ===== Footer globe ===== */
(function(){
  var canvas = document.getElementById('footerGlobe');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var CENTER_LAT = 24, CENTER_LON = 56;
  var regions = [
    { name:'UAE', lat:25.2, lon:55.3 }, { name:'Saudi Arabia', lat:23.9, lon:45.1 },
    { name:'Qatar', lat:25.4, lon:51.2 }, { name:'Bahrain', lat:26.1, lon:50.6 },
    { name:'Oman', lat:21.5, lon:56.0 }, { name:'Kuwait', lat:29.4, lon:47.9 },
    { name:'India', lat:20.6, lon:79.0 }
  ];
  function resize(){
    var card = canvas.parentElement;
    canvas.width = card.offsetWidth || 800;
    canvas.height = card.offsetHeight || 400;
  }
  resize();
  window.addEventListener('resize', resize);
  setTimeout(resize, 300);
  function project(lat, lon, cx, cy, r){
    var RAD = Math.PI / 180;
    var phi = (90 - lat) * RAD, lam = (lon - CENTER_LON) * RAD, cp = (90 - CENTER_LAT) * RAD;
    var sinPhi = Math.sin(phi), cosPhi = Math.cos(phi), sinLam = Math.sin(lam), cosLam = Math.cos(lam);
    var sinCP = Math.sin(cp), cosCP = Math.cos(cp);
    var x = sinPhi * sinLam, y = cosCP * cosPhi - sinCP * sinPhi * cosLam, z = sinCP * cosPhi + cosCP * sinPhi * cosLam;
    if (z < 0) return null;
    return { x: cx + r * x, y: cy - r * y };
  }
  var tick = 0, raf = null;
  function draw(){
    var w = canvas.width, h = canvas.height;
    if (!w || !h){ raf = requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, w, h);
    var cx = w * 0.5, cy = h * 0.75, r = w * 0.38;
    var grd = ctx.createRadialGradient(cx, cy, r*0.2, cx, cy, r);
    grd.addColorStop(0, 'rgba(184,0,196,.18)'); grd.addColorStop(1, 'rgba(184,0,196,0)');
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI*2);
    ctx.strokeStyle = 'rgba(184,0,196,.30)'; ctx.lineWidth = 1.5; ctx.stroke();
    var lon, lat, p, first;
    for(lat=-60; lat<=80; lat+=20){
      ctx.beginPath(); first=true;
      for(lon=-180; lon<=180; lon+=4){ p = project(lat, lon, cx, cy, r); if(!p){ first=true; continue; } if(first){ ctx.moveTo(p.x, p.y); first=false; } else { ctx.lineTo(p.x, p.y); } }
      ctx.strokeStyle='rgba(184,0,196,.14)'; ctx.lineWidth=0.6; ctx.stroke();
    }
    for(lon=-180; lon<180; lon+=20){
      ctx.beginPath(); first=true;
      for(lat=-80; lat<=80; lat+=4){ p = project(lat, lon, cx, cy, r); if(!p){ first=true; continue; } if(first){ ctx.moveTo(p.x, p.y); first=false; } else { ctx.lineTo(p.x, p.y); } }
      ctx.strokeStyle='rgba(184,0,196,.14)'; ctx.lineWidth=0.6; ctx.stroke();
    }
    var pts = [], i;
    for(i=0; i<regions.length; i++){ var pt = project(regions[i].lat, regions[i].lon, cx, cy, r); if(pt) pts.push({ pt:pt, idx:i }); }
    var a, b, mx, my;
    for(i=0; i<pts.length; i++){
      for(var j=i+1; j<pts.length; j++){
        a=pts[i].pt; b=pts[j].pt; mx=(a.x+b.x)/2; my=(a.y+b.y)/2 - r*0.05;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.quadraticCurveTo(mx, my, b.x, b.y);
        ctx.strokeStyle='rgba(184,0,196,.18)'; ctx.lineWidth=1; ctx.stroke();
      }
    }
    for(i=0; i<pts.length; i++){
      var x = pts[i].pt.x, y = pts[i].pt.y;
      var pulse = (Math.sin(tick*0.035 + pts[i].idx*0.9)+1)/2, outerR = 14 + pulse*10;
      var og = ctx.createRadialGradient(x,y,0,x,y,outerR);
      og.addColorStop(0, 'rgba(220,60,240,'+(0.45+pulse*0.25).toFixed(2)+')'); og.addColorStop(1, 'rgba(184,0,196,0)');
      ctx.beginPath(); ctx.arc(x,y,outerR,0,Math.PI*2); ctx.fillStyle=og; ctx.fill();
      ctx.beginPath(); ctx.arc(x,y,5,0,Math.PI*2); ctx.fillStyle='rgba(230,100,245,'+(0.85+pulse*0.15).toFixed(2)+')'; ctx.fill();
    }
    tick++; raf = requestAnimationFrame(draw);
  }
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      if(entries[0].isIntersecting){ if(!raf) draw(); } else { cancelAnimationFrame(raf); raf=null; }
    }, {threshold:0});
    io.observe(canvas);
  }
  draw();
})();

/* ===== SmileLoader exit ===== */
(function(){
  var bd = document.getElementById('sl-backdrop');
  var lw = document.getElementById('sl-logo-wrap');
  var li = document.getElementById('sl-logo-inner');
  var dl = document.getElementById('sl-dot-l');
  var dr = document.getElementById('sl-dot-r');
  if (!bd || !lw || !li) return;
  var interior = (92 / 200) * 114;
  var diag = Math.sqrt(window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight);
  var exitScale = Math.ceil(diag / interior) + 6;
  function runExit() {
    if (dl) dl.classList.add('exit');
    if (dr) dr.classList.add('exit');
    li.style.transform = 'scale(' + exitScale + ')';
    li.classList.add('exit');
    bd.classList.add('exit');
    setTimeout(function(){ bd.remove(); lw.remove(); }, 2750);
  }
  setTimeout(runExit, 1100);
})();
