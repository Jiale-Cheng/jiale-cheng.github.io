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
})();
