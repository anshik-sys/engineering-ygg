/* Trust Center — stat count-up + staggers */
(function(){
  var stats = document.querySelectorAll('.trust-stat');
  if (stats.length && 'IntersectionObserver' in window){
    stats.forEach(function(el, i){
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity .6s ' + (i * 0.09) + 's var(--ease, cubic-bezier(.2,0,0,1)), transform .6s ' + (i * 0.09) + 's var(--ease, cubic-bezier(.2,0,0,1))';
    });
    var counters = [
      { sel: '.trust-stat:nth-child(1) .trust-stat-num', target: 200, decimals: 0, suffix: '+' },
      { sel: '.trust-stat:nth-child(2) .trust-stat-num', target: 24,  decimals: 0, suffix: '/7' },
      { sel: '.trust-stat:nth-child(3) .trust-stat-num', target: 99.94, decimals: 2, suffix: '%' },
      { sel: '.trust-stat:nth-child(4) .trust-stat-num', target: 100, decimals: 0, suffix: '%' }
    ];
    counters.forEach(function(c){ var el = document.querySelector(c.sel); if (el) c.el = el; });
    function animateCount(c, duration){
      if (!c.el) return;
      var start = null, from = 0;
      function ease(t){ return t < .5 ? 2*t*t : -1+(4-2*t)*t; }
      function step(ts){
        if (!start) start = ts;
        var prog = Math.min((ts - start) / duration, 1);
        var val = from + (c.target - from) * ease(prog);
        c.el.textContent = val.toFixed(c.decimals) + (c.suffix || '');
        if (prog < 1) requestAnimationFrame(step);
        else c.el.textContent = c.target.toFixed(c.decimals) + (c.suffix || '');
      }
      requestAnimationFrame(step);
    }
    var counted = false;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){
          en.target.style.opacity = '1';
          en.target.style.transform = 'translateY(0)';
          io.unobserve(en.target);
          if (!counted){
            counted = true;
            counters.forEach(function(c, i){ setTimeout(function(){ animateCount(c, 1400); }, i * 90); });
          }
        }
      });
    }, { rootMargin:'0px 0px -8% 0px', threshold:0.05 });
    stats.forEach(function(el){ io.observe(el); });
  }

  var cards = document.querySelectorAll('.trust-policy-card');
  if (cards.length && 'IntersectionObserver' in window){
    cards.forEach(function(el, i){
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = 'opacity .5s ' + (i * 0.055) + 's ease, transform .5s ' + (i * 0.055) + 's ease, background .2s, border-color .2s, box-shadow .2s';
    });
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.style.opacity='1'; en.target.style.transform='translateY(0)'; io2.unobserve(en.target); }
      });
    }, { rootMargin:'0px 0px -5% 0px', threshold:0.05 });
    cards.forEach(function(el){ io2.observe(el); });
  }
})();
