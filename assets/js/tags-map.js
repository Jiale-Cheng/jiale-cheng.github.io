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
  var goldenAngle = Math.PI * (3 - Math.sqrt(5));
  var animationFrame = null;
  var lastFrame = 0;
  var stageWidth = 0;
  var stageHeight = 0;
  var selected = null;
  var activeDrag = null;

  var results = document.querySelector("[data-tag-map-results]");
  var resultsType = document.querySelector("[data-tag-map-results-type]");
  var resultsTitle = document.querySelector("[data-tag-map-results-title]");
  var resultsSummary = document.querySelector("[data-tag-map-results-summary]");
  var resultsList = document.querySelector("[data-tag-map-results-list]");
  var closeResultsButton = document.querySelector("[data-tag-map-close]");
  var emptyMessage = document.querySelector("[data-tag-map-empty]");
  var searchForm = document.querySelector("[data-tag-map-search]");
  var searchInput = document.querySelector("[data-tag-map-search-input]");
  var searchOptions = document.querySelector("[data-tag-map-search-options]");
  var searchStatus = document.querySelector("[data-tag-map-search-status]");
  var resetButton = document.querySelector("[data-tag-map-reset]");

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
          edges: [],
          neighborIds: Object.create(null),
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          radius: 48,
          phase: 0,
          index: 0,
          pinned: false,
          pinReason: null,
          dragging: false,
          suppressClickUntil: 0,
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
    node.index = index;
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

  var edges = Object.keys(edgesById).map(function (id) {
    return edgesById[id];
  });

  edges.forEach(function (edge) {
    edge.source.edges.push(edge);
    edge.target.edges.push(edge);
    edge.source.neighborIds[edge.target.id] = true;
    edge.target.neighborIds[edge.source.id] = true;
  });

  function postCountLabel(count) {
    return count + (count === 1 ? " post" : " posts");
  }

  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }

  function nodeAriaLabel(node) {
    return node.label + ", " + postCountLabel(node.posts.length) +
      (node.pinned ? ", pinned. Double-click or press Shift+Enter to release." : ". Drag to reposition.");
  }

  function updatePinnedState(node, pinned, reason) {
    node.pinned = pinned;
    node.pinReason = pinned ? (reason || node.pinReason || "manual") : null;
    node.vx = 0;
    node.vy = 0;
    if (!node.element) return;
    node.element.classList.toggle("is-pinned", pinned);
    node.element.setAttribute("aria-label", nodeAriaLabel(node));
  }

  function createNodes() {
    nodes.forEach(function (node, index) {
      var button = document.createElement("button");
      var label = document.createElement("span");
      var count = document.createElement("span");

      button.type = "button";
      button.className = "tag-map-node";
      button.style.setProperty("--node-hue", String(palette[index % palette.length]));
      button.setAttribute("aria-label", nodeAriaLabel(node));
      label.className = "tag-map-node__label";
      label.textContent = node.label;
      count.className = "tag-map-node__count";
      count.textContent = postCountLabel(node.posts.length);
      button.appendChild(label);
      button.appendChild(count);
      button.addEventListener("click", function (event) {
        if (Date.now() < node.suppressClickUntil) {
          event.preventDefault();
          return;
        }
        showNodeResults(node);
      });
      button.addEventListener("dblclick", function (event) {
        event.preventDefault();
        updatePinnedState(node, false);
        setSearchStatus(node.label + " released back into the moving layout.");
      });
      button.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && event.shiftKey) {
          event.preventDefault();
          updatePinnedState(node, !node.pinned, "keyboard");
          setSearchStatus(
            node.label + (node.pinned ? " pinned in place." : " released back into the moving layout.")
          );
        }
      });
      button.addEventListener("pointerdown", function (event) { beginDrag(event, node); });
      button.addEventListener("pointermove", continueDrag);
      button.addEventListener("pointerup", finishDrag);
      button.addEventListener("pointercancel", finishDrag);
      button.addEventListener("lostpointercapture", finishDrag);
      button.addEventListener("mouseenter", function () { highlightNode(node); });
      button.addEventListener("mouseleave", function () {
        if (!node.dragging) clearHighlight();
      });
      button.addEventListener("focus", function () { highlightNode(node); });
      button.addEventListener("blur", function () {
        if (!node.dragging) clearHighlight();
      });
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
    nodes.forEach(function (node) {
      node.element.classList.remove("is-muted", "is-neighbor", "is-focus");
    });
    edges.forEach(function (edge) {
      edge.element.classList.remove("is-muted", "is-related", "is-focus");
    });
  }

  function highlightNode(activeNode) {
    clearHighlight();
    nodes.forEach(function (node) {
      if (node === activeNode) {
        node.element.classList.add("is-focus");
      } else if (activeNode.neighborIds[node.id]) {
        node.element.classList.add("is-neighbor");
      } else {
        node.element.classList.add("is-muted");
      }
    });
    edges.forEach(function (edge) {
      edge.element.classList.add(
        edge.source === activeNode || edge.target === activeNode ? "is-related" : "is-muted"
      );
    });
  }

  function highlightEdge(activeEdge) {
    clearHighlight();
    edges.forEach(function (edge) {
      edge.element.classList.add(edge === activeEdge ? "is-focus" : "is-muted");
    });
    nodes.forEach(function (node) {
      node.element.classList.add(
        node === activeEdge.source || node === activeEdge.target ? "is-focus" : "is-muted"
      );
    });
  }

  function beginDrag(event, node) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    activeDrag = {
      node: node,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false
    };
    node.dragging = true;
    node.vx = 0;
    node.vy = 0;
    node.element.classList.add("is-dragging");
    node.element.setPointerCapture(event.pointerId);
    highlightNode(node);
  }

  function continueDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    var movementX = event.clientX - activeDrag.startX;
    var movementY = event.clientY - activeDrag.startY;
    if (!activeDrag.moved && Math.sqrt(movementX * movementX + movementY * movementY) < 5) return;

    activeDrag.moved = true;
    event.preventDefault();
    var bounds = stage.getBoundingClientRect();
    var node = activeDrag.node;
    var padding = node.radius + 18;
    node.x = clamp(event.clientX - bounds.left, padding, stageWidth - padding);
    node.y = clamp(event.clientY - bounds.top, padding, stageHeight - padding);
    node.vx = 0;
    node.vy = 0;
    highlightNode(node);
    render();
  }

  function finishDrag(event) {
    if (!activeDrag || event.pointerId !== activeDrag.pointerId) return;
    var completedDrag = activeDrag;
    var node = completedDrag.node;
    activeDrag = null;
    if (completedDrag.moved) {
      updatePinnedState(node, true, "drag");
      node.suppressClickUntil = Date.now() + 350;
      setSearchStatus(node.label + " pinned in its new position.");
    }
    node.dragging = false;
    node.element.classList.remove("is-dragging");
    if (node.element.hasPointerCapture(event.pointerId)) {
      node.element.releasePointerCapture(event.pointerId);
    }
    render();
  }

  function positionNodes() {
    var centerX = stageWidth / 2;
    var centerY = stageHeight / 2;
    var maximumRadius = nodes.reduce(function (maximum, node) {
      return Math.max(maximum, node.radius);
    }, 0);
    var availableX = Math.max(0, stageWidth / 2 - maximumRadius - 30);
    var availableY = Math.max(0, stageHeight / 2 - maximumRadius - 30);

    nodes.forEach(function (node, index) {
      var progress = nodes.length > 1 ? Math.sqrt((index + 0.5) / nodes.length) : 0;
      var angle = -Math.PI / 2 + index * goldenAngle;
      node.x = centerX + Math.cos(angle) * availableX * progress;
      node.y = centerY + Math.sin(angle) * availableY * progress;
      node.vx = 0;
      node.vy = 0;
    });
  }

  function measure() {
    var bounds = stage.getBoundingClientRect();
    var oldWidth = stageWidth;
    var oldHeight = stageHeight;
    stageWidth = bounds.width;
    stageHeight = bounds.height;

    var compact = stageWidth < 600;
    nodes.forEach(function (node) {
      node.radius = Math.min(compact ? 42 : 52, 36 + node.posts.length * 7);
      node.element.style.setProperty("--node-size", (node.radius * 2) + "px");
    });

    if (!oldWidth || !oldHeight) {
      positionNodes();
    } else {
      nodes.forEach(function (node) {
        node.x = node.x * stageWidth / oldWidth;
        node.y = node.y * stageHeight / oldHeight;
        var padding = node.radius + 18;
        node.x = clamp(node.x, padding, stageWidth - padding);
        node.y = clamp(node.y, padding, stageHeight - padding);
      });
    }
    render();
  }

  function applyNodePairForce(left, right, delta) {
    var dx = right.x - left.x;
    var dy = right.y - left.y;
    var distanceSquared = dx * dx + dy * dy;
    if (distanceSquared < 1) {
      var separationAngle = (left.index + right.index + 1) * goldenAngle;
      dx = Math.cos(separationAngle);
      dy = Math.sin(separationAngle);
      distanceSquared = 1;
    }

    var distance = Math.sqrt(distanceSquared);
    var desiredDistance = (left.radius + right.radius) * 0.88 + 18;
    var repulsion = Math.min(0.065, 620 / Math.max(distanceSquared, 100)) * delta;
    if (distance < desiredDistance) {
      repulsion += (desiredDistance - distance) * 0.0026 * delta;
    }

    var nx = dx / distance;
    var ny = dy / distance;
    if (!left.pinned && !left.dragging) {
      left.vx -= nx * repulsion;
      left.vy -= ny * repulsion;
    }
    if (!right.pinned && !right.dragging) {
      right.vx += nx * repulsion;
      right.vy += ny * repulsion;
    }
  }

  function applyLocalRepulsion(delta) {
    var cellSize = 150;
    var grid = Object.create(null);

    nodes.forEach(function (node) {
      node.cellX = Math.floor(node.x / cellSize);
      node.cellY = Math.floor(node.y / cellSize);
      var key = node.cellX + ":" + node.cellY;
      if (!grid[key]) grid[key] = [];
      grid[key].push(node);
    });

    nodes.forEach(function (left) {
      for (var offsetX = -1; offsetX <= 1; offsetX += 1) {
        for (var offsetY = -1; offsetY <= 1; offsetY += 1) {
          var key = (left.cellX + offsetX) + ":" + (left.cellY + offsetY);
          var nearby = grid[key] || [];
          nearby.forEach(function (right) {
            if (right.index <= left.index) return;
            applyNodePairForce(left, right, delta);
          });
        }
      }
    });
  }

  function applyForces(time, delta) {
    var centerX = stageWidth / 2;
    var centerY = stageHeight / 2;

    nodes.forEach(function (node) {
      if (node.pinned || node.dragging) return;
      node.vx += (centerX - node.x) * 0.0001 * delta;
      node.vy += (centerY - node.y) * 0.0001 * delta;
      node.vx += Math.cos(time * 0.00016 + node.phase) * 0.0011 * delta;
      node.vy += Math.sin(time * 0.00013 + node.phase) * 0.0011 * delta;
    });

    applyLocalRepulsion(delta);

    edges.forEach(function (edge) {
      var dx = edge.target.x - edge.source.x;
      var dy = edge.target.y - edge.source.y;
      var distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
      var targetDistance = Math.min(270, Math.max(150, stageWidth * 0.18));
      var spring = (distance - targetDistance) * 0.00016 * delta;
      var nx = dx / distance;
      var ny = dy / distance;
      if (!edge.source.pinned && !edge.source.dragging) {
        edge.source.vx += nx * spring;
        edge.source.vy += ny * spring;
      }
      if (!edge.target.pinned && !edge.target.dragging) {
        edge.target.vx -= nx * spring;
        edge.target.vy -= ny * spring;
      }
    });

    nodes.forEach(function (node) {
      if (node.pinned || node.dragging) {
        node.vx = 0;
        node.vy = 0;
      } else {
        node.vx *= Math.pow(0.965, delta);
        node.vy *= Math.pow(0.965, delta);
        var speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.42) {
          node.vx = node.vx / speed * 0.42;
          node.vy = node.vy / speed * 0.42;
        }
        node.x += node.vx * delta;
        node.y += node.vy * delta;
      }

      var padding = node.radius + 18;
      if (node.x < padding) { node.x = padding; node.vx = Math.abs(node.vx) * 0.7; }
      if (node.x > stageWidth - padding) { node.x = stageWidth - padding; node.vx = -Math.abs(node.vx) * 0.7; }
      if (node.y < padding) { node.y = padding; node.vy = Math.abs(node.vy) * 0.7; }
      if (node.y > stageHeight - padding) { node.y = stageHeight - padding; node.vy = -Math.abs(node.vy) * 0.7; }
    });
  }

  function nodeScale(node) {
    var halfWidth = Math.max(stageWidth / 2, 1);
    var halfHeight = Math.max(stageHeight / 2, 1);
    var relativeX = (node.x - halfWidth) / halfWidth;
    var relativeY = (node.y - halfHeight) / halfHeight;
    var distance = Math.min(1, Math.sqrt(relativeX * relativeX + relativeY * relativeY));
    var edgeProgress = clamp((distance - 0.42) / 0.58, 0, 1);
    return 1 - edgeProgress * 0.22;
  }

  function render() {
    nodes.forEach(function (node) {
      node.element.style.left = node.x + "px";
      node.element.style.top = node.y + "px";
      node.element.style.setProperty("--node-scale", nodeScale(node).toFixed(3));
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

  function setSearchStatus(message) {
    if (searchStatus) searchStatus.textContent = message;
  }

  function populateSearchOptions() {
    if (!searchOptions) return;
    nodes.forEach(function (node) {
      var option = document.createElement("option");
      option.value = node.label;
      searchOptions.appendChild(option);
    });
  }

  function findNode(query) {
    var normalized = String(query || "").trim().toLocaleLowerCase();
    if (!normalized) return null;
    return nodes.find(function (node) {
      return node.label.toLocaleLowerCase() === normalized || node.id.toLocaleLowerCase() === normalized;
    }) || nodes.find(function (node) {
      return node.label.toLocaleLowerCase().indexOf(normalized) === 0;
    }) || nodes.find(function (node) {
      return node.label.toLocaleLowerCase().indexOf(normalized) !== -1;
    }) || null;
  }

  function locateNode(node) {
    nodes.forEach(function (otherNode) {
      if (otherNode !== node && otherNode.pinReason === "search") {
        updatePinnedState(otherNode, false);
      }
    });
    node.x = stageWidth / 2;
    node.y = stageHeight / 2;
    updatePinnedState(node, true, "search");
    render();
    showNodeResults(node);
    highlightNode(node);
    setSearchStatus(node.label + " moved to the center and pinned.");
    try {
      node.element.focus({ preventScroll: true });
    } catch (error) {
      node.element.focus();
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    var query = searchInput ? searchInput.value : "";
    var node = findNode(query);
    if (!node) {
      setSearchStatus(query.trim() ? "No matching tag found." : "Enter a tag name to locate it.");
      if (searchInput) searchInput.focus();
      return;
    }
    if (searchInput) searchInput.value = node.label;
    locateNode(node);
  }

  function resetLayout() {
    if (activeDrag) {
      activeDrag.node.dragging = false;
      activeDrag.node.element.classList.remove("is-dragging");
      activeDrag = null;
    }
    nodes.forEach(function (node) { updatePinnedState(node, false); });
    positionNodes();
    clearHighlight();
    closeResults();
    if (searchInput) searchInput.value = "";
    setSearchStatus(nodes.length + (nodes.length === 1 ? " tag available." : " tags available."));
    render();
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
  populateSearchOptions();
  if (nodes.length === 0) emptyMessage.hidden = false;
  setSearchStatus(nodes.length + (nodes.length === 1 ? " tag available." : " tags available."));
  measure();
  initializeStars();
  updateMotion();

  if (searchForm) searchForm.addEventListener("submit", handleSearch);
  if (resetButton) resetButton.addEventListener("click", resetLayout);
  if (closeResultsButton) closeResultsButton.addEventListener("click", closeResults);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && results && !results.hidden) closeResults();
  });
  document.addEventListener("visibilitychange", updateMotion);
  window.addEventListener("pointerup", finishDrag, true);
  window.addEventListener("pointercancel", finishDrag, true);
  window.addEventListener("resize", measure, { passive: true });
  if (typeof reducedMotion.addEventListener === "function") {
    reducedMotion.addEventListener("change", updateMotion);
  } else if (typeof reducedMotion.addListener === "function") {
    reducedMotion.addListener(updateMotion);
  }
})();
