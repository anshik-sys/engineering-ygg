/* Newsroom — milestone card stagger */
(function(){
  var cards = document.querySelectorAll('.nm-card');
  if (!cards.length || !('IntersectionObserver' in window)) return;
  cards.forEach(function(el, i){
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = 'opacity .65s ' + (i * 0.12) + 's var(--ease, cubic-bezier(.2,0,0,1)), transform .65s ' + (i * 0.12) + 's var(--ease, cubic-bezier(.2,0,0,1))';
  });
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if (en.isIntersecting){ en.target.style.opacity='1'; en.target.style.transform='translateY(0)'; io.unobserve(en.target); }
    });
  }, { rootMargin:'0px 0px -8% 0px', threshold:0.05 });
  cards.forEach(function(el){ io.observe(el); });
})();
