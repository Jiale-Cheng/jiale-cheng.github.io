(function () {
  "use strict";

  var article = document.querySelector(".blog-article");
  if (!article) return;

  var names = {
    theorem: "Theorem",
    lemma: "Lemma",
    proposition: "Proposition",
    corollary: "Corollary",
    definition: "Definition",
    axiom: "Axiom",
    remark: "Remark",
    example: "Example"
  };

  var counterGroups = {
    theorem: "result",
    lemma: "result",
    proposition: "result",
    corollary: "result",
    definition: "definition",
    axiom: "axiom",
    remark: "remark",
    example: "example"
  };

  var section = 0;
  var counters = {};

  function resetCounters() {
    counters = {
      result: 0,
      definition: 0,
      axiom: 0,
      remark: 0,
      example: 0
    };
  }

  function safeIdPart(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }

  resetCounters();

  article.querySelectorAll("h2, .math-statement[data-statement]").forEach(function (element) {
    if (element.tagName === "H2") {
      section += 1;
      resetCounters();
      return;
    }

    var kind = (element.getAttribute("data-statement") || "").toLowerCase();
    var name = names[kind];
    var group = counterGroups[kind];
    if (!name || !group) return;

    if (section === 0) section = 1;
    counters[group] += 1;

    var number = section + "." + counters[group];
    var label = name + " " + number;
    var labelElement = element.querySelector("[data-statement-label]");
    if (labelElement) labelElement.textContent = label;

    element.setAttribute("data-statement-number", number);
    element.setAttribute("data-statement-label", label);
    if (!element.id) element.id = safeIdPart(kind + "-" + number);
  });

  article.querySelectorAll("a.statement-ref[href^='#']").forEach(function (reference) {
    var rawTarget = reference.getAttribute("href").slice(1);
    var targetId;

    try {
      targetId = decodeURIComponent(rawTarget);
    } catch (error) {
      targetId = rawTarget;
    }

    var target = document.getElementById(targetId);
    if (!target) return;

    var label = target.getAttribute("data-statement-label");
    if (!label) return;

    if (!reference.textContent.trim()) reference.textContent = label;
    reference.setAttribute("aria-label", "Go to " + label);
  });
})();
