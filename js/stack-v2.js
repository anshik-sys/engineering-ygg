/* Tech Stack — categorized "stack map": domains grouped by use case */
(function(){
  var URLS = {
    "Python":            "https://www.python.org/",
    "JavaScript":        "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    "TypeScript":        "https://www.typescriptlang.org/",
    "Kotlin":            "https://kotlinlang.org/",
    "Swift":             "https://developer.apple.com/swift/",
    "Go":                "https://go.dev/",
    "FastAPI":           "https://fastapi.tiangolo.com/",
    "Django":            "https://www.djangoproject.com/",
    "Django REST":       "https://www.django-rest-framework.org/",
    "GraphQL":           "https://graphql.org/",
    "Ionic":             "https://ionicframework.com/",
    "React":             "https://react.dev/",
    "Next.js":           "https://nextjs.org/",
    "Redux":             "https://redux.js.org/",
    "Vite":              "https://vitejs.dev/",
    "Apollo GraphQL":    "https://www.apollographql.com/docs/",
    "MUI":               "https://mui.com/",
    "Ant Design":        "https://ant.design/",
    "Strapi":            "https://strapi.io/",
    "WordPress":         "https://wordpress.org/",
    "PostgreSQL":        "https://www.postgresql.org/",
    "Redis":             "https://redis.io/",
    "MongoDB":           "https://www.mongodb.com/docs/",
    "MySQL":             "https://dev.mysql.com/doc/",
    "DynamoDB":          "https://aws.amazon.com/dynamodb/",
    "Apache Kafka":      "https://kafka.apache.org/",
    "Celery":            "https://docs.celeryq.dev/",
    "RabbitMQ":          "https://www.rabbitmq.com/",
    "OpenAI":            "https://platform.openai.com/docs/",
    "Gemini":            "https://ai.google.dev/",
    "Copilot":           "https://github.com/features/copilot",
    "LangChain":         "https://python.langchain.com/",
    "scikit-learn":      "https://scikit-learn.org/",
    "Pandas":            "https://pandas.pydata.org/",
    "Kubernetes":        "https://kubernetes.io/",
    "GitHub":            "https://github.com/",
    "Terraform":         "https://developer.hashicorp.com/terraform",
    "Apache Airflow":    "https://airflow.apache.org/",
    "Fastlane":          "https://fastlane.tools/",
    "Nginx":             "https://nginx.org/",
    "HAProxy":           "https://www.haproxy.org/",
    "Grafana":           "https://grafana.com/",
    "Prometheus":        "https://prometheus.io/",
    "ELK Stack":         "https://www.elastic.co/elastic-stack",
    "Sentry":            "https://sentry.io/",
    "Statuspage":        "https://www.atlassian.com/software/statuspage",
    "StatusCake":        "https://www.statuscake.com/",
    "UserCheck":         "https://www.usercheck.com/",
    "Metabase":          "https://www.metabase.com/",
    "QuickSight":        "https://aws.amazon.com/quicksight/",
    "BrowserStack":      "https://www.browserstack.com/",
    "Selenium":          "https://www.selenium.dev/",
    "Playwright":        "https://playwright.dev/",
    "Appium":            "https://appium.io/",
    "Postman":           "https://www.postman.com/",
    "JMeter":            "https://jmeter.apache.org/",
    "Cucumber":          "https://cucumber.io/",
    "Zephyr Scale":      "https://smartbear.com/test-management/zephyr-scale/",
    "Burp Suite":        "https://portswigger.net/burp",
    "Rest Assured":      "https://rest-assured.io/",
    "Figma":             "https://www.figma.com/",
    "Photoshop":         "https://www.adobe.com/products/photoshop.html",
    "Illustrator":       "https://www.adobe.com/products/illustrator.html",
    "Zeplin":            "https://zeplin.io/",
    "Jira":              "https://www.atlassian.com/software/jira",
    "Confluence":        "https://www.atlassian.com/software/confluence",
    "Jira Service Mgmt": "https://www.atlassian.com/software/jira/service-management",
    "Product Discovery": "https://www.atlassian.com/software/jira/product-discovery",
    "Trello":            "https://trello.com/",
    "Apidog":            "https://apidog.com/",
    "Scroll Viewport":   "https://K15t.com/scroll-viewport",
    "Slack":             "https://slack.com/"
  };

  var DOMAINS = [
    { name: "Languages", use: "The core languages across backend, web and mobile.",
      items: [
        { n: "Python", slug: "python" }, { n: "JavaScript", slug: "javascript" },
        { n: "TypeScript", slug: "typescript" }, { n: "Kotlin", slug: "kotlin" },
        { n: "Swift", slug: "swift" }, { n: "Go", slug: "go" }
      ] },
    { name: "Backend & APIs", use: "Services, frameworks and the contracts between them.",
      items: [
        { n: "FastAPI", slug: "fastapi" }, { n: "Django", slug: "django" },
        { n: "Django REST", slug: "django" }, { n: "GraphQL", slug: "graphql" },
        { n: "Ionic", slug: "ionic" }
      ] },
    { name: "Frontend & Web", use: "Everything customers see, touch and interact with.",
      items: [
        { n: "React", slug: "react" }, { n: "Next.js", slug: "nextdotjs" },
        { n: "Redux", slug: "redux" }, { n: "Vite", slug: "vite" },
        { n: "Apollo GraphQL", slug: "apollographql" }, { n: "MUI", slug: "mui" },
        { n: "Ant Design", slug: "antdesign" }
      ] },
    { name: "Content & CMS", use: "Powering marketing sites and editorial content.",
      items: [
        { n: "Strapi", slug: "strapi" }, { n: "WordPress", slug: "wordpress" }
      ] },
    { name: "Data & Storage", use: "Where every transaction, balance and reward lives.",
      items: [
        { n: "PostgreSQL", slug: "postgresql" }, { n: "Redis", slug: "redis" },
        { n: "MongoDB", slug: "mongodb" }, { n: "MySQL", slug: "mysql" },
        { n: "DynamoDB", slug: null }
      ] },
    { name: "Streaming & Queues", use: "Moving events and async work at scale.",
      items: [
        { n: "Apache Kafka", slug: "apachekafka" }, { n: "Celery", slug: "celery" },
        { n: "RabbitMQ", slug: "rabbitmq" }
      ] },
    { name: "AI / ML", use: "Intelligence in the product and the engineering workflow.",
      items: [
        { n: "OpenAI", slug: "openai" }, { n: "Gemini", slug: "googlegemini" },
        { n: "Copilot", slug: "githubcopilot" }, { n: "LangChain", slug: "langchain" },
        { n: "scikit-learn", slug: "scikitlearn" }, { n: "Pandas", slug: "pandas" }
      ] },
    { name: "DevOps & Infra", use: "How we build, ship and run in production.",
      items: [
        { n: "Kubernetes", slug: "kubernetes" }, { n: "GitHub", slug: "github" },
        { n: "Terraform", slug: "terraform" }, { n: "Apache Airflow", slug: "apacheairflow" },
        { n: "Fastlane", slug: "fastlane" }, { n: "Nginx", slug: "nginx" },
        { n: "HAProxy", slug: null }
      ] },
    { name: "Observability", use: "Knowing the system is healthy — before anyone asks.",
      items: [
        { n: "Grafana", slug: "grafana" }, { n: "Prometheus", slug: "prometheus" },
        { n: "ELK Stack", slug: "elasticstack" }, { n: "Sentry", slug: "sentry" },
        { n: "Statuspage", slug: "statuspage" }, { n: "StatusCake", slug: null },
        { n: "UserCheck", slug: null }
      ] },
    { name: "Analytics & BI", use: "Turning raw data into decisions.",
      items: [
        { n: "Metabase", slug: "metabase" }, { n: "QuickSight", slug: null }
      ] },
    { name: "QA & Testing", use: "Proving it works before customers ever do.",
      items: [
        { n: "BrowserStack", slug: "browserstack" }, { n: "Selenium", slug: "selenium" },
        { n: "Playwright", slug: "playwright" }, { n: "Appium", slug: "appium" },
        { n: "Postman", slug: "postman" }, { n: "JMeter", slug: "apachejmeter" },
        { n: "Cucumber", slug: "cucumber" }, { n: "Zephyr Scale", slug: null },
        { n: "Burp Suite", slug: null }, { n: "Rest Assured", slug: null }
      ] },
    { name: "Design", use: "Crafting how the experience looks and feels.",
      items: [
        { n: "Figma", slug: "figma" }, { n: "Photoshop", slug: "adobephotoshop" },
        { n: "Illustrator", slug: "adobeillustrator" }, { n: "Zeplin", slug: "zeplin" }
      ] },
    { name: "Project & Docs", use: "How teams plan, document and stay in sync.",
      items: [
        { n: "Jira", slug: "jira" }, { n: "Confluence", slug: "confluence" },
        { n: "Jira Service Mgmt", slug: "jira" }, { n: "Product Discovery", slug: "jira" },
        { n: "Trello", slug: "trello" }, { n: "Apidog", slug: null },
        { n: "Scroll Viewport", slug: null }, { n: "Slack", slug: "slack" }
      ] }
  ];

  function monogram(name){
    var cleaned = name.replace(/[^A-Za-z0-9 .]/g, "").trim();
    var words = cleaned.split(/[\s.]+/).filter(Boolean);
    var m;
    if (words.length >= 2) m = (words[0][0] + words[1][0]); else m = cleaned.slice(0, 2);
    return m.toUpperCase();
  }

  function chipEl(item){
    var url = URLS[item.n];
    var chip = document.createElement(url ? "a" : "div");
    chip.className = "sm-chip";
    if (url) {
      chip.href = url;
      chip.target = "_blank";
      chip.rel = "noopener noreferrer";
    }
    var logo = document.createElement("span"); logo.className = "ts-logo";
    if (item.slug){ logo.dataset.slug = item.slug; logo.dataset.name = item.n; }
    else { logo.classList.add("mono"); logo.textContent = monogram(item.n); }
    var name = document.createElement("span"); name.className = "sm-name"; name.textContent = item.n;
    chip.appendChild(logo); chip.appendChild(name);
    return chip;
  }

  function pad(n){ return (n < 10 ? "0" : "") + n; }

  function build(){
    var host = document.getElementById("domains");
    if (!host) return;
    host.innerHTML = "";
    DOMAINS.forEach(function(dom, i){
      var row = document.createElement("section"); row.className = "sm-dom";

      var label = document.createElement("div"); label.className = "sm-dom-label";
      var idx = document.createElement("div"); idx.className = "sm-dom-idx"; idx.textContent = pad(i + 1);
      var name = document.createElement("h2"); name.className = "sm-dom-name"; name.textContent = dom.name;
      var use = document.createElement("p"); use.className = "sm-dom-use"; use.textContent = dom.use;
      var count = document.createElement("div"); count.className = "sm-dom-count";
      count.textContent = dom.items.length + (dom.items.length === 1 ? " tool" : " tools");
      label.appendChild(idx); label.appendChild(name); label.appendChild(use); label.appendChild(count);

      var chips = document.createElement("div"); chips.className = "sm-chips";
      var frag = document.createDocumentFragment();
      dom.items.forEach(function(item, ci){
        var chip = chipEl(item);
        chip.style.setProperty("--d", (ci * 45) + "ms");
        frag.appendChild(chip);
      });
      chips.appendChild(frag);

      row.appendChild(label); row.appendChild(chips);
      host.appendChild(row);
    });
    setTimeout(loadLogos, 0);
    setTimeout(revealOnScroll, 0);
  }

  function revealOnScroll(){
    var section = document.getElementById("techstack");
    var rows = Array.prototype.slice.call(document.querySelectorAll(".sm-dom"));
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (section) requestAnimationFrame(function(){ requestAnimationFrame(function(){ section.classList.add("sm-lit"); }); });

    if (reduce || !("IntersectionObserver" in window)){
      rows.forEach(function(r){ r.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if (en.isIntersecting){ en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.08 });
    rows.forEach(function(r){ io.observe(r); });
  }

  var SI_VER = "13";
  var SI_URL = function(slug){ return "https://cdn.jsdelivr.net/npm/simple-icons@" + SI_VER + "/icons/" + slug + ".svg"; };
  var COLORS = {
    python:"#3776AB", javascript:"#C9A800", typescript:"#3178C6", kotlin:"#7F52FF",
    swift:"#F05138", go:"#00ADD8", fastapi:"#009688", django:"#0C4B33", ionic:"#3880FF",
    react:"#15B8CF", nextdotjs:"#1A1A1A", redux:"#764ABC", vite:"#7B61FF",
    apollographql:"#311C87", mui:"#007FFF", antdesign:"#0170FE", strapi:"#4945FF", wordpress:"#21759B",
    postgresql:"#4169E1", redis:"#D82C20", mongodb:"#3FA037", mysql:"#00618A",
    graphql:"#E10098", apachekafka:"#231F20", celery:"#2E8B57", rabbitmq:"#FF6600",
    openai:"#1A1A1A", googlegemini:"#8E75B2", githubcopilot:"#1A1A1A", langchain:"#1C3C3C",
    scikitlearn:"#F7931E", pandas:"#150458",
    kubernetes:"#326CE5", github:"#1A1A1A", terraform:"#7B42BC", apacheairflow:"#017CEE", fastlane:"#46A35E",
    grafana:"#F46800", prometheus:"#E6522C", elasticstack:"#005571", sentry:"#362D59", statuspage:"#172B4D",
    nginx:"#009639", metabase:"#509EE3",
    browserstack:"#E66F32", selenium:"#43B02A", playwright:"#2EAD33", appium:"#662D91",
    postman:"#FF6C37", apachejmeter:"#C0271A", cucumber:"#1DA34E",
    figma:"#F24E1E", adobephotoshop:"#1473C4", adobeillustrator:"#E8800F", zeplin:"#E0A800",
    jira:"#0052CC", confluence:"#172B4D", trello:"#0052CC", slack:"#4A154B"
  };

  function loadLogos(){
    var els = Array.prototype.slice.call(document.querySelectorAll(".ts-logo[data-slug]"));
    var bySlug = {};
    els.forEach(function(el){ (bySlug[el.dataset.slug] = bySlug[el.dataset.slug] || []).push(el); });
    var slugs = Object.keys(bySlug);
    var fill = function(slug, src){ bySlug[slug].forEach(function(el){
      var mark = document.createElement("i"); mark.className = "mark";
      mark.style.setProperty("--m", 'url("' + src + '")');
      mark.style.setProperty("--c", COLORS[slug] || "#2A2A2A");
      el.appendChild(mark);
    }); };
    var fail = function(slug){ bySlug[slug].forEach(function(el){ el.classList.add("mono"); el.textContent = monogram(el.dataset.name || ""); }); };
    var loadOne = function(slug, attempt){ return new Promise(function(res){
      var probe = new Image();
      probe.onload = function(){ (probe.naturalWidth > 0 ? fill(slug, SI_URL(slug)) : fail(slug)); res(); };
      probe.onerror = function(){ if (attempt < 1) setTimeout(function(){ loadOne(slug, attempt + 1).then(res); }, 650); else { fail(slug); res(); } };
      probe.src = SI_URL(slug);
    }); };
    var CONCURRENCY = 6, idx = 0;
    var pump = function(){ if (idx >= slugs.length) return; var slug = slugs[idx++]; loadOne(slug, 0).then(function(){ setTimeout(pump, 40); }); };
    for (var i = 0; i < CONCURRENCY; i++) pump();
  }

  build();
})();
