(function () {
  "use strict";

  var section = document.querySelector("[data-visitor-map]");
  if (!section) return;

  var attempts = 0;
  var maximumAttempts = 20;

  function revealWhenReady() {
    var widget = section.querySelector(
      "#clustrmaps-widget, .clustrmaps-map, .clustrmaps-map-container, a[href*='clustrmaps.com'], canvas, iframe, svg"
    );

    if (widget) {
      section.hidden = false;
      return;
    }

    attempts += 1;
    if (attempts < maximumAttempts) window.setTimeout(revealWhenReady, 400);
  }

  revealWhenReady();
})();
