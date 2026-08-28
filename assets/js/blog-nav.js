(function () {
  "use strict";

  var nav = document.querySelector(".blog-nav");
  if (!nav) return;

  var toggle = nav.querySelector(".blog-nav__toggle");
  var menu = nav.querySelector(".blog-nav__menu");
  var lastScrollY = window.scrollY;
  var ticking = false;

  function closeMenu() {
    nav.classList.remove("is-open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }
  }

  function updateNavigation() {
    var currentScrollY = window.scrollY;
    nav.classList.toggle("is-scrolled", currentScrollY > 24);

    var scrollingDown = currentScrollY > lastScrollY && currentScrollY > 180;
    nav.classList.toggle("is-hidden", scrollingDown && !nav.classList.contains("is-open"));

    lastScrollY = currentScrollY;
    ticking = false;
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var opening = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", opening);
      toggle.setAttribute("aria-expanded", opening ? "true" : "false");
      toggle.setAttribute("aria-label", opening ? "Close navigation" : "Open navigation");
    });

    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth >= 768) closeMenu();
    });
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(updateNavigation);
      ticking = true;
    }
  }, { passive: true });

  updateNavigation();
})();
