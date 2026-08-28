(function () {
  "use strict";

  document.querySelectorAll(".blog-article table, .blog-page__content table").forEach(function (table) {
    if (table.parentElement && table.parentElement.classList.contains("blog-table-scroll")) return;

    var wrapper = document.createElement("div");
    wrapper.className = "blog-table-scroll";
    wrapper.setAttribute("role", "region");
    wrapper.setAttribute("aria-label", "Scrollable table");
    wrapper.setAttribute("tabindex", "0");
    table.parentNode.insertBefore(wrapper, table);
    wrapper.appendChild(table);
  });
})();
