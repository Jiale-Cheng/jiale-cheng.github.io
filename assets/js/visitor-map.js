(function () {
  "use strict";

  var section = document.querySelector("[data-visitor-map]");
  if (!section) return;

  section.setAttribute("aria-hidden", "true");

  function secureMapLinks() {
    section.querySelectorAll("a[href^='http://mapmyvisitors.com/']").forEach(function (link) {
      link.setAttribute("href", link.getAttribute("href").replace("http://", "https://"));
    });
  }

  function revealWhenReady() {
    var widget = section.querySelector(
      "a[href*='mapmyvisitors.com/web/'], img[src*='mapmyvisitors.com/map.png'], canvas, iframe, svg"
    );

    if (widget) {
      secureMapLinks();
      window.setTimeout(secureMapLinks, 500);
      window.setTimeout(secureMapLinks, 2000);
      section.classList.remove("is-pending");
      section.removeAttribute("aria-hidden");
      return true;
    }

    return false;
  }

  if (revealWhenReady()) return;

  var observer = new MutationObserver(function () {
    if (revealWhenReady()) observer.disconnect();
  });

  observer.observe(section, { childList: true, subtree: true });
})();
