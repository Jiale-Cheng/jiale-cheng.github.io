(function () {
  "use strict";

  var button = document.querySelector("[data-rover-fact]");
  if (!button) return;

  button.addEventListener("click", function () {
    var revealed = button.classList.toggle("is-revealed");
    button.setAttribute("aria-expanded", String(revealed));
  });
})();
