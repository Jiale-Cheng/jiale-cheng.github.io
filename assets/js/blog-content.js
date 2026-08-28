(function () {
  "use strict";

  var wrappers = [];

  function updateScrollState(wrapper) {
    var scrollable = wrapper.scrollWidth > wrapper.clientWidth + 1;
    if (scrollable) {
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", "Scrollable table");
      wrapper.setAttribute("tabindex", "0");
    } else {
      wrapper.removeAttribute("role");
      wrapper.removeAttribute("aria-label");
      wrapper.removeAttribute("tabindex");
    }
  }

  document.querySelectorAll(".blog-article table, .blog-page__content table").forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains("blog-table-scroll")) return;

    var wrapper = document.createElement("div");
    wrapper.className = "blog-table-scroll";
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
    wrappers.push(wrapper);
  });

  function updateAllTables() {
    wrappers.forEach(updateScrollState);
  }

  window.requestAnimationFrame(updateAllTables);
  window.addEventListener("load", updateAllTables);
  window.setTimeout(updateAllTables, 1800);

  var catalog = document.querySelector(".blog-toc");
  if (!catalog) return;

  var catalogToggle = catalog.querySelector(".catalog-toggle");
  var catalogLinks = Array.prototype.slice.call(catalog.querySelectorAll(".catalog-body a[href^='#']"));
  var catalogEntries = catalogLinks.map(function (link) {
    var id;
    try {
      id = decodeURIComponent(link.getAttribute("href").slice(1));
    } catch (error) {
      id = link.getAttribute("href").slice(1);
    }

    return {
      link: link,
      item: link.closest("li"),
      target: document.getElementById(id)
    };
  }).filter(function (entry) {
    return entry.item && entry.target;
  });

  if (catalogToggle) {
    catalogToggle.addEventListener("click", function () {
      var folded = catalog.classList.toggle("is-folded");
      catalogToggle.setAttribute("aria-expanded", String(!folded));
    });
  }

  function setActiveCatalogEntry(activeEntry) {
    catalogEntries.forEach(function (entry) {
      var active = entry === activeEntry;
      entry.item.classList.toggle("active", active);
      if (active) {
        entry.link.setAttribute("aria-current", "location");
      } else {
        entry.link.removeAttribute("aria-current");
      }
    });
  }

  function updateCatalogEntry() {
    var triggerLine = window.scrollY + window.innerHeight * 0.2;
    var activeEntry = null;

    catalogEntries.forEach(function (entry) {
      var headingTop = entry.target.getBoundingClientRect().top + window.scrollY;
      if (headingTop <= triggerLine) activeEntry = entry;
    });

    setActiveCatalogEntry(activeEntry);
  }

  function animateCatalogScroll(targetTop) {
    var startTop = window.scrollY;
    var distance = targetTop - startTop;
    var duration = 700;
    var startTime = null;
    var root = document.documentElement;
    var previousScrollBehavior = root.style.scrollBehavior;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      root.style.scrollBehavior = "auto";
      window.scrollTo(0, targetTop);
      root.style.scrollBehavior = previousScrollBehavior;
      return;
    }

    root.style.scrollBehavior = "auto";

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 0.5 - Math.cos(Math.PI * progress) / 2;
      window.scrollTo(0, startTop + distance * eased);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        root.style.scrollBehavior = previousScrollBehavior;
      }
    }

    window.requestAnimationFrame(step);
  }

  catalogEntries.forEach(function (entry) {
    entry.link.addEventListener("click", function (event) {
      event.preventDefault();
      var targetTop = entry.target.getBoundingClientRect().top + window.scrollY - 80;
      setActiveCatalogEntry(entry);
      animateCatalogScroll(Math.max(0, targetTop));
    });
  });

  var catalogTicking = false;
  window.addEventListener("scroll", function () {
    if (catalogTicking) return;
    catalogTicking = true;
    window.requestAnimationFrame(function () {
      updateCatalogEntry();
      catalogTicking = false;
    });
  }, { passive: true });

  window.addEventListener("resize", updateCatalogEntry);
  window.addEventListener("load", updateCatalogEntry);
  updateCatalogEntry();
})();
