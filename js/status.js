/* Status — group cards + uptime bars + live timestamp */
(function(){
  var GROUPS = [
    { name:'B2B APIs', components:[
      {n:'B2B API',up:100.0},{n:'OB2B API',up:100.0},{n:'SB2B API',up:100.0},
      {n:'YOUGift API',up:100.0},{n:'YOUProcess',up:99.99},{n:'GCP',up:100.0},{n:'GCA',up:100.0}
    ]},
    { name:'YOUGotaGift.com', components:[
      {n:'Web Portal',up:99.75},{n:'Gifting — Web Portal',up:99.99},
      {n:'eGift Cards Catalogue',up:100.0},{n:'eGift Personalization',up:100.0}
    ]},
    { name:'GroupGift', components:[
      {n:'Web Portal',up:100.0},{n:'Support Services',up:98.62},
      {n:'Email Delivery',up:98.92},{n:'SMS Delivery',up:100.0}
    ]},
    { name:'Payment Processing', components:[
      {n:'Web Portal',up:100.0},{n:'Support Services',up:99.78},
      {n:'Card Payments',up:99.98},{n:'Points Payments',up:99.95}
    ]},
    { name:'Rewards & @Work', components:[
      {n:'Rewards',up:99.99},{n:'MyRewards',up:100.0},{n:'MyCredits Console',up:99.82},
      {n:'@Work',up:99.7},{n:'YOUReward (SA)',up:100.0},{n:'YOUReward (Other regions)',up:98.23}
    ]},
    { name:'Merchant & MPOS', components:[
      {n:'Merchant Portal',up:100.0},{n:'Merchant API',up:99.8},
      {n:'MPOS — Web Portal',up:99.99},{n:'MPOS Support Services',up:100.0},
      {n:'Mail Delivery',up:99.99},{n:'SMS Delivery',up:99.99}
    ]}
  ];
  var DAYS = 90;
  function rng(seed){ var s = seed % 2147483647; if (s <= 0) s += 2147483646; return function(){ return (s = s * 16807 % 2147483647) / 2147483647; }; }
  function strSeed(str){ var h=0; for(var i=0;i<str.length;i++){ h=(h*31 + str.charCodeAt(i))|0; } return Math.abs(h)+7; }
  var dateFmt = new Intl.DateTimeFormat('en-US', { month:'short', day:'numeric' });
  function buildDays(uptime, seed){
    var rand = rng(seed);
    var states = new Array(DAYS).fill('op');
    var downDays = Math.round((100 - uptime) / 100 * DAYS);
    if (uptime < 100 && downDays === 0) downDays = 1;
    var today = new Date(2026, 4, 30);
    var placed = new Set(), guard = 0;
    while (placed.size < downDays && guard < 500){
      guard++;
      var idx = Math.floor(Math.pow(rand(), 1.4) * DAYS);
      if (idx >= DAYS || placed.has(idx)) continue;
      placed.add(idx);
    }
    Array.prototype.slice.call(placed).forEach(function(idx){
      var r = rand();
      states[idx] = uptime < 98.7 && r < .4 ? 'part' : 'deg';
    });
    return states.map(function(st, i){
      var d = new Date(today); d.setDate(d.getDate() - (DAYS - 1 - i));
      return { st: st, date: d };
    });
  }
  var STATE_LABEL = { op:'Operational', deg:'Degraded performance', part:'Partial outage', maj:'Major outage' };
  function renderBar(el, days){
    el.innerHTML = '';
    days.forEach(function(o){
      var b = document.createElement('div');
      b.className = 'bar ' + o.st;
      b.setAttribute('data-tip', dateFmt.format(o.date) + ' — ' + STATE_LABEL[o.st]);
      el.appendChild(b);
    });
  }
  var grid = document.getElementById('statusGrid');
  if (grid){
    GROUPS.forEach(function(g){
      var avgUp = g.components.reduce(function(a,c){ return a+c.up; },0)/g.components.length;
      var days = buildDays(avgUp, strSeed(g.name));
      var card = document.createElement('div');
      card.className = 'status-card';
      card.innerHTML =
        '<div class="card-head">' +
          '<span class="card-name"><span class="gdot"></span>' + g.name + '</span>' +
          '<span class="card-count">' + g.components.length + ' services</span>' +
        '</div>' +
        '<div class="uptime-bar"></div>' +
        '<div class="card-foot"><span>Operational</span><b>' + avgUp.toFixed(2) + '%</b></div>';
      renderBar(card.querySelector('.uptime-bar'), days);
      grid.appendChild(card);
    });
  }
  var tEl = document.getElementById('statusTime');
  function setTime(){
    if (!tEl) return;
    var f = new Intl.DateTimeFormat('en-US', { hour:'numeric', minute:'2-digit', hour12:true, timeZoneName:'short' });
    tEl.textContent = f.format(new Date());
  }
  setTime();
  setInterval(setTime, 30000);
})();
