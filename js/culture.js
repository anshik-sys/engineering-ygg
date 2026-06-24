/* Life at YOUGotaGift — section reveal */
(function(){
  var sec = document.querySelector('.culture');
  if (sec && 'IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting){ sec.classList.add('in'); io.disconnect(); } });
    }, { threshold: 0.18 });
    io.observe(sec);
    requestAnimationFrame(function(){
      var r = sec.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0){ sec.classList.add('in'); io.disconnect(); }
    });
  } else if (sec){ sec.classList.add('in'); }
})();
