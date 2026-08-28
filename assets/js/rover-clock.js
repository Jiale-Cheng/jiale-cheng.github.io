(function () {
  "use strict";

  var clock = document.querySelector("[data-planet-clock]");
  var orbit = document.querySelector("[data-rover-orbit]");
  if (!clock || !orbit) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var animation = null;
  var timer = null;
  var formatter = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });

  function clockAngle(date) {
    return (
      (date.getHours() % 12) +
      date.getMinutes() / 60 +
      date.getSeconds() / 3600 +
      date.getMilliseconds() / 3600000
    ) * 30;
  }

  function updateLabel(date) {
    clock.setAttribute(
      "aria-label",
      "Mars rover clock: " + formatter.format(date) + " local time"
    );
  }

  function stopClock() {
    if (animation) {
      animation.cancel();
      animation = null;
    }
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  function setStaticPosition() {
    var now = new Date();
    orbit.style.transform = "rotate(" + clockAngle(now) + "deg)";
    updateLabel(now);
  }

  function syncClock() {
    stopClock();
    var now = new Date();
    var angle = clockAngle(now);
    updateLabel(now);

    if (reducedMotion.matches || typeof orbit.animate !== "function") {
      orbit.style.transform = "rotate(" + angle + "deg)";
      timer = window.setInterval(setStaticPosition, 60000);
      return;
    }

    orbit.style.transform = "rotate(" + angle + "deg)";
    animation = orbit.animate(
      [
        { transform: "rotate(" + angle + "deg)" },
        { transform: "rotate(" + (angle + 360) + "deg)" }
      ],
      {
        duration: 43200000,
        iterations: Infinity,
        easing: "linear"
      }
    );
    var minuteTicks = 0;
    timer = window.setInterval(function () {
      updateLabel(new Date());
      minuteTicks += 1;
      if (minuteTicks >= 60) syncClock();
    }, 60000);
  }

  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", syncClock);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(syncClock);
  }

  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) syncClock();
  });
  window.addEventListener("pageshow", syncClock);
  syncClock();
})();
