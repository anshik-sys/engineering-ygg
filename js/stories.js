/* Stories — blog grid: category filter + live search */
(function(){
  var grid    = document.getElementById('blogGrid');
  var filters = document.getElementById('blogFilters');
  var search  = document.getElementById('blogSearch');
  var empty   = document.getElementById('blogEmpty');
  if (!grid) return;

  var posts = Array.prototype.slice.call(grid.querySelectorAll('.post'));
  var activeFilter = 'all';

  function textOf(p){
    var title = (p.querySelector('.post-title') || {}).textContent || '';
    var tags  = p.getAttribute('data-tags') || '';
    var ex    = (p.querySelector('.post-excerpt') || {}).textContent || '';
    return (title + ' ' + tags + ' ' + ex).toLowerCase();
  }

  function apply(){
    var q = (search && search.value || '').trim().toLowerCase();
    var shown = 0;
    posts.forEach(function(p){
      var cats = (p.getAttribute('data-category') || '').split(/\s+/);
      var matchCat = activeFilter === 'all' || cats.indexOf(activeFilter) !== -1;
      var matchSearch = !q || textOf(p).indexOf(q) !== -1;
      var visible = matchCat && matchSearch;
      p.classList.toggle('is-hidden', !visible);
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown !== 0;
  }

  if (filters){
    filters.addEventListener('click', function(e){
      var chip = e.target.closest('.chip');
      if (!chip) return;
      filters.querySelectorAll('.chip').forEach(function(c){ c.classList.remove('active'); });
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter') || 'all';
      apply();
    });
  }

  if (search){
    search.addEventListener('input', apply);
    document.addEventListener('keydown', function(e){
      if (e.key === '/' && document.activeElement !== search){
        e.preventDefault(); search.focus();
      }
    });
  }

  apply();

  /* ---- Entrance reveal ---- */
  (function(){
    var section = document.getElementById('stories');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (section) requestAnimationFrame(function(){ requestAnimationFrame(function(){ section.classList.add('is-lit'); }); });

    if (reduce || !('IntersectionObserver' in window)){
      posts.forEach(function(p){ p.classList.add('revealed'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      // stagger cards that enter together (e.g. a row), then reset baseline
      var batch = entries.filter(function(en){ return en.isIntersecting; });
      batch.forEach(function(en, i){
        en.target.style.setProperty('--rd', (i * 80) + 'ms');
        en.target.classList.add('revealed');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    posts.forEach(function(p){ io.observe(p); });
  })();
})();
