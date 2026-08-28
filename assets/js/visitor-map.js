(function () {
  "use strict";

  var section = document.querySelector("[data-visitor-map]");
  if (!section) return;

  section.setAttribute("aria-hidden", "true");

  function revealWhenReady() {
    var widget = section.querySelector(
      "a[href*='mapmyvisitors.com/web/'], img[src*='mapmyvisitors.com/map.png'], canvas, iframe, svg"
    );

    if (widget) {
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
