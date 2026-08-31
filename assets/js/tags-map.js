(function () {
  "use strict";

  var root = document.querySelector("[data-tag-map]");
  var stage = document.querySelector("[data-tag-map-stage]");
  var nodesLayer = document.querySelector("[data-tag-map-nodes]");
  var edgesLayer = document.querySelector("[data-tag-map-edges]");
  var dataElement = document.getElementById("tag-map-data");
  if (!root || !stage || !nodesLayer || !edgesLayer || !dataElement) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var palette = [174, 192, 207, 224, 254, 286, 326, 35];
  var animationFrame = null;
  var lastFrame = 0;
  var stageWidth = 0;
  var stageHeight = 0;
  var selected = null;

  var results = document.querySelector("[data-tag-map-results]");
  var resultsType = document.querySelector("[data-tag-map-results-type]");
  var resultsTitle = document.querySelector("[data-tag-map-results-title]");
  var resultsSummary = document.querySelector("[data-tag-map-results-summary]");
  var resultsList = document.querySelector("[data-tag-map-results-list]");
  var closeResultsButton = document.querySelector("[data-tag-map-close]");
  var emptyMessage = document.querySelector("[data-tag-map-empty]");

  var sourcePosts;
  try {
    sourcePosts = JSON.parse(dataElement.textContent);
  } catch (error) {
    sourcePosts = [];
  }

  function normalizeTags(tags) {
    if (Array.isArray(tags)) return tags.filter(Boolean);
    if (typeof tags === "string") return tags.split(/\s+/).filter(Boolean);
    return [];
  }

  var posts = sourcePosts.map(function (post) {
    return {
      title: String(post.title || "Untitled post"),
      url: String(post.url || "#"),
      date: String(post.date || ""),
      tags: normalizeTags(post.tags)
    };
  }).filter(function (post) {
    return post.tags.length > 0;
  });

  var nodesById = Object.create(null);
  posts.forEach(function (post) {
    post.tags.forEach(function (tag) {
      if (!nodesById[tag]) {
        nodesById[tag] = {
          id: tag,
          label: tag.replace(/-/g, " "),
          posts: [],
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: 48,
          phase: 0,
          element: null
        };
      }
      if (nodesById[tag].posts.indexOf(post) === -1) {
        nodesById[tag].posts.push(post);
      }
    });
  });

  var nodes = Object.keys(nodesById).sort(function (a, b) {
    return a.localeCompare(b);
  }).map(function (id, index) {
    var node = nodesById[id];
    node.phase = index * 1.618;
    return node;
  });

  var edgesById = Object.create(null);
  posts.forEach(function (post) {
    var uniqueTags = post.tags.filter(function (tag, index, allTags) {
      return allTags.indexOf(tag) === index;
    }).sort();

    for (var first = 0; first < uniqueTags.length; first += 1) {
      for (var second = first + 1; second < uniqueTags.length; second += 1) {
        var source = uniqueTags[first];
        var target = uniqueTags[second];
        var id = source + "\u0000" + target;
        if (!edgesById[id]) {
          edgesById[id] = {
            id: id,
            source: nodesById[source],
            target: nodesById[target],
            posts: [],
            element: null,
            countElement: null
          };
        }
        edgesById[id].posts.push(post);
      }
    }
  });
  var edges = Object.keys(edgesById).map(function (id) { return edgesById[id]; });

  function postCountLabel(count) {
    return count + (count === 1 ? " post" : " posts");
  }

  function createNodes() {
    nodes.forEach(function (node, index) {
      var button = document.createElement("button");
      var label = document.createElement("span");
      var count = document.createElement("span");

      button.type = "button";
      button.className = "tag-map-node";
      button.style.setProperty("--node-hue", String(palette[index % palette.length]));
      button.setAttribute("aria-label", node.label + ", " + postCountLabel(node.posts.length));
      label.className = "tag-map-node__label";
      label.textContent = node.label;
      count.className = "tag-map-node__count";
      count.textContent = postCountLabel(node.posts.length);
      button.appendChild(label);
      button.appendChild(count);
      button.addEventListener("click", function () { showNodeResults(node); });
      button.addEventListener("mouseenter", function () { highlightNode(node); });
      button.addEventListener("mouseleave", clearHighlight);
      button.addEventListener("focus", function () { highlightNode(node); });
      button.addEventListener("blur", clearHighlight);
      nodesLayer.appendChild(button);
      node.element = button;
    });
  }

  function createEdges() {
    edges.forEach(function (edge) {
      var button = document.createElement("button");
      var line = document.createElement("span");
      var count = document.createElement("span");

      button.type = "button";
      button.className = "tag-map-edge";
      button.style.setProperty("--edge-width", (1.4 + Math.sqrt(edge.posts.length) * 1.8) + "px");
      button.setAttribute(
        "aria-label",
        edge.source.label + " and " + edge.target.label + ", " + postCountLabel(edge.posts.length)
      );
      line.className = "tag-map-edge__line";
      line.setAttribute("aria-hidden", "true");
      count.className = "tag-map-edge__count";
      count.setAttribute("aria-hidden", "true");
      count.textContent = String(edge.posts.length);
      button.appendChild(line);
      button.appendChild(count);
      button.addEventListener("click", function () { showEdgeResults(edge); });
      button.addEventListener("mouseenter", function () { highlightEdge(edge); });
      button.addEventListener("mouseleave", clearHighlight);
      button.addEventListener("focus", function () { highlightEdge(edge); });
      button.addEventListener("blur", clearHighlight);
      edgesLayer.appendChild(button);
      edge.element = button;
      edge.countElement = count;
    });
  }

  function setSelection(kind, item) {
    selected = { kind: kind, item: item };
    nodes.forEach(function (node) {
      node.element.classList.toggle("is-selected", kind === "node" && node === item);
    });
    edges.forEach(function (edge) {
      edge.element.classList.toggle("is-selected", kind === "edge" && edge === item);
    });
  }

  function showResults(type, title, summary, matchingPosts) {
    resultsType.textContent = type;
    resultsTitle.textContent = title;
    resultsSummary.textContent = summary;
    resultsList.textContent = "";

    matchingPosts.forEach(function (post) {
      var item = document.createElement("li");
      var link = document.createElement("a");
      var label = document.createElement("span");
      var date = document.createElement("time");

      link.href = post.url;
      label.textContent = post.title;
      date.dateTime = post.date;
      date.textContent = post.date;
      link.appendChild(label);
      link.appendChild(date);
      item.appendChild(link);
      resultsList.appendChild(item);
    });

    results.hidden = false;
  }

  function showNodeResults(node) {
    setSelection("node", node);
    showResults(
      "Tag",
      node.label,
      postCountLabel(node.posts.length) + " filed under this tag.",
      node.posts
    );
  }

  function showEdgeResults(edge) {
    setSelection("edge", edge);
    showResults(
      "Shared tags",
      edge.source.label + " + " + edge.target.label,
      postCountLabel(edge.posts.length) + " shared by both tags.",
      edge.posts
    );
  }

  function closeResults() {
    results.hidden = true;
    selected = null;
    nodes.forEach(function (node) { node.element.classList.remove("is-selected"); });
    edges.forEach(function (edge) { edge.element.classList.remove("is-selected"); });
  }

  function clearHighlight() {
    nodes.forEach(function (node) { node.element.classList.remove("is-muted"); });
    edges.forEach(function (edge) { edge.element.classList.remove("is-muted"); });
  }

  function highlightNode(activeNode) {
    edges.forEach(function (edge) {
      edge.element.classList.add("is-muted");
    });
    nodes.forEach(function (node) {
      node.element.classList.toggle("is-muted", node !== activeNode);
    });
  }

  function highlightEdge(activeEdge) {
    edges.forEach(function (edge) {
      edge.element.classList.toggle("is-muted", edge !== activeEdge);
    });
    nodes.forEach(function (node) {
      node.element.classList.toggle(
        "is-muted",
        node !== activeEdge.source && node !== activeEdge.target
      );
    });
  }

  function measure() {
    var bounds = stage.getBoundingClientRect();
    var oldWidth = stageWidth;
    var oldHeight = stageHeight;
    stageWidth = bounds.width;
    stageHeight = bounds.height;

    var compact = stageWidth < 600;
    nodes.forEach(function (node, index) {
      node.radius = Math.min(compact ? 42 : 52, 36 + node.posts.length * 7);
      node.element.style.setProperty("--node-size", (node.radius * 2) + "px");

      if (!oldWidth || !oldHeight) {
        var angle = -Math.PI / 2 + (Math.PI * 2 * index) / Math.max(nodes.length, 1);
        var ringX = Math.min(stageWidth * 0.31, 350);
        var ringY = Math.min(stageHeight * 0.28, 220);
        node.x = stageWidth / 2 + Math.cos(angle) * ringX;
        node.y = stageHeight / 2 + Math.sin(angle) * ringY;
      } else {
        node.x = node.x * stageWidth / oldWidth;
        node.y = node.y * stageHeight / oldHeight;
      }
    });
    render();
  }

  function applyForces(time, delta) {
    var centerX = stageWidth / 2;
    var centerY = stageHeight / 2;

    nodes.forEach(function (node) {
      node.vx += (centerX - node.x) * 0.00012 * delta;
      node.vy += (centerY - node.y) * 0.00012 * delta;
      node.vx += Math.cos(time * 0.00016 + node.phase) * 0.0013 * delta;
      node.vy += Math.sin(time * 0.00013 + node.phase) * 0.0013 * delta;
    });

    for (var first = 0; first < nodes.length; first += 1) {
      for (var second = first + 1; second < nodes.length; second += 1) {
        var left = nodes[first];
        var right = nodes[second];
        var dx = right.x - left.x;
        var dy = right.y - left.y;
        var distanceSquared = Math.max(dx * dx + dy * dy, 100);
        var distance = Math.sqrt(distanceSquared);
        var repulsion = Math.min(0.11, 850 / distanceSquared) * delta;
        var nx = dx / distance;
        var ny = dy / distance;
        left.vx -= nx * repulsion;
        left.vy -= ny * repulsion;
        right.vx += nx * repulsion;
        right.vy += ny * repulsion;
      }
    }

    edges.forEach(function (edge) {
      var dx = edge.target.x - edge.source.x;
      var dy = edge.target.y - edge.source.y;
      var distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      var targetDistance = Math.min(250, Math.max(155, stageWidth * 0.23));
      var spring = (distance - targetDistance) * 0.00018 * delta;
      var nx = dx / distance;
      var ny = dy / distance;
      edge.source.vx += nx * spring;
      edge.source.vy += ny * spring;
      edge.target.vx -= nx * spring;
      edge.target.vy -= ny * spring;
    });

    nodes.forEach(function (node) {
      node.vx *= Math.pow(0.965, delta);
      node.vy *= Math.pow(0.965, delta);
      var speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > 0.42) {
        node.vx = node.vx / speed * 0.42;
        node.vy = node.vy / speed * 0.42;
      }
      node.x += node.vx * delta;
      node.y += node.vy * delta;

      var padding = node.radius + 18;
      if (node.x < padding) { node.x = padding; node.vx = Math.abs(node.vx) * 0.7; }
      if (node.x > stageWidth - padding) { node.x = stageWidth - padding; node.vx = -Math.abs(node.vx) * 0.7; }
      if (node.y < padding) { node.y = padding; node.vy = Math.abs(node.vy) * 0.7; }
      if (node.y > stageHeight - padding) { node.y = stageHeight - padding; node.vy = -Math.abs(node.vy) * 0.7; }
    });
  }

  function render() {
    nodes.forEach(function (node) {
      node.element.style.left = node.x + "px";
      node.element.style.top = node.y + "px";
    });

    edges.forEach(function (edge) {
      var dx = edge.target.x - edge.source.x;
      var dy = edge.target.y - edge.source.y;
      var distance = Math.sqrt(dx * dx + dy * dy);
      var angle = Math.atan2(dy, dx);
      edge.element.style.left = edge.source.x + "px";
      edge.element.style.top = (edge.source.y - 16) + "px";
      edge.element.style.width = distance + "px";
      edge.element.style.transform = "rotate(" + angle + "rad)";
      edge.countElement.style.transform = "translate(-50%, -50%) rotate(" + (-angle) + "rad)";
    });
  }

  function animate(time) {
    var delta = lastFrame ? Math.min((time - lastFrame) / 16.667, 2) : 1;
    lastFrame = time;
    applyForces(time, delta);
    render();
    animationFrame = window.requestAnimationFrame(animate);
  }

  function stopAnimation() {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
    lastFrame = 0;
  }

  function updateMotion() {
    stopAnimation();
    if (!reducedMotion.matches && !document.hidden && nodes.length > 0) {
      animationFrame = window.requestAnimationFrame(animate);
    } else {
      render();
    }
  }

  function initializeStars() {
    if (typeof window.particlesJS !== "function" || reducedMotion.matches) return;
    window.particlesJS("tag-map-stars", {
      particles: {
        number: { value: 56, density: { enable: true, value_area: 900 } },
        color: { value: "#ffffff" },
        shape: { type: "circle", stroke: { width: 0, color: "#000000" } },
        opacity: { value: 0.62, random: true, anim: { enable: false } },
        size: { value: 2.4, random: true, anim: { enable: false } },
        line_linked: { enable: true, distance: 210, color: "#bdece1", opacity: 0.14, width: 1 },
        move: { enable: true, speed: 0.42, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
      },
      interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
      retina_detect: true
    });
  }

  createEdges();
  createNodes();
  if (nodes.length === 0) emptyMessage.hidden = false;
  measure();
  initializeStars();
  updateMotion();

  if (closeResultsButton) closeResultsButton.addEventListener("click", closeResults);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && results && !results.hidden) closeResults();
  });
  document.addEventListener("visibilitychange", updateMotion);
  window.addEventListener("resize", measure, { passive: true });
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", updateMotion);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(updateMotion);
  }
})();
