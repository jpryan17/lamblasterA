// MaxCalc Web Client Controller

document.addEventListener("DOMContentLoaded", () => {
  // State
  let currentMode = "rational";
  let isTreeExpanded = false;
  let lastResultData = null;

  // DOM Elements
  const tabBtns = document.querySelectorAll(".tab-btn");
  const templateViews = document.querySelectorAll(".template-view");
  const livePreview = document.getElementById("liveMathPreview");
  const computeBtn = document.getElementById("computeBtn");
  const presetChips = document.querySelectorAll(".chip");
  const serverStatusBadge = document.getElementById("serverStatusBadge");

  // Output DOM Elements
  const emptyState = document.getElementById("emptyState");
  const loadingState = document.getElementById("loadingState");
  const resultContent = document.getElementById("resultContent");
  const displayQuery = document.getElementById("displayQuery");
  const displayResult = document.getElementById("displayResult");
  const displayAic = document.getElementById("displayAic");
  const displayAlgorithmName = document.getElementById("displayAlgorithmName");
  const displayAlgorithmDesc = document.getElementById("displayAlgorithmDesc");
  const cascadeTimeline = document.getElementById("cascadeTimeline");
  const callTreeViewer = document.getElementById("callTreeViewer");
  const rawTracePre = document.getElementById("rawTracePre");
  const copyResultBtn = document.getElementById("copyResultBtn");
  const toggleTreeBtn = document.getElementById("toggleTreeBtn");

  // Form Inputs
  const ratNum = document.getElementById("ratNum");
  const ratDen = document.getElementById("ratDen");
  const trigFunc = document.getElementById("trigFunc");
  const trigPower = document.getElementById("trigPower");
  const trigMultiplier = document.getElementById("trigMultiplier");
  const expPrefactor = document.getElementById("expPrefactor");
  const expPower = document.getElementById("expPower");
  const radNumerator = document.getElementById("radNumerator");
  const radInside = document.getElementById("radInside");
  const freeformExpr = document.getElementById("freeformExpr");

  // --- Text Size Control ---
  const sizeBtns = document.querySelectorAll(".size-btn");
  function setTextSize(size) {
    document.documentElement.dataset.fontSize = size;
    sizeBtns.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.size === size);
    });
    try {
      localStorage.setItem("maxcalc_text_size", size);
    } catch {}
  }

  sizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      setTextSize(btn.dataset.size);
    });
  });

  const savedSize = (() => {
    try { return localStorage.getItem("maxcalc_text_size") || "md"; } catch { return "md"; }
  })();
  setTextSize(savedSize);

  // --- Health Check ---
  let isOnline = false;

  async function checkServerHealth() {
    try {
      const res = await fetch("/api/health");
      if (res.ok) {
        isOnline = true;
        document.body.classList.remove("static-mode");
        serverStatusBadge.textContent = "● Maxima Engine Online";
        serverStatusBadge.className = "badge badge-status";
        serverStatusBadge.title = "Connected to live Maxima SBCL backend on port 8000";
      } else {
        throw new Error();
      }
    } catch {
      isOnline = false;
      document.body.classList.add("static-mode");
      serverStatusBadge.textContent = "○ Static Showcase Mode";
      serverStatusBadge.style.backgroundColor = "#1e1b4b";
      serverStatusBadge.style.color = "#a5b4fc";
      serverStatusBadge.style.border = "1px solid #3730a3";
      serverStatusBadge.title = "Running on GitHub Pages with pre-mined Common Lisp traces";
    }
  }
  checkServerHealth();

  // --- Mode Switching ---
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      templateViews.forEach(v => v.classList.remove("active"));

      btn.classList.add("active");
      currentMode = btn.dataset.mode;
      const targetView = document.getElementById(`view${capitalize(currentMode)}`);
      if (targetView) targetView.classList.add("active");

      // In static mode, automatically sync to the matching preset chip
      if (!isOnline) {
        const matchingChip = document.querySelector(`.chip[data-mode="${currentMode}"]`) ||
          (currentMode === "exp" ? document.querySelector('.chip[data-expr*="exp(x^2)"]') : null);
        if (matchingChip && !matchingChip.classList.contains("active")) {
          matchingChip.click();
          return;
        }
      }

      updateLivePreview();
    });
  });

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // --- Live Expression Construction ---
  function buildExpression() {
    switch (currentMode) {
      case "rational": {
        const num = ratNum.value.trim() || "1";
        const den = ratDen.value.trim() || "x";
        return `(${num}) / (${den})`;
      }
      case "trig": {
        const fn = trigFunc.value;
        const power = parseInt(trigPower.value, 10) || 1;
        const mult = trigMultiplier.value.trim();
        const trigPart = power === 1 ? `${fn}(x)` : `${fn}(x)^${power}`;
        if (!mult || mult === "1") return trigPart;
        return `(${mult}) * ${trigPart}`;
      }
      case "exp": {
        const prefactor = expPrefactor.value.trim();
        const exponent = expPower.value.trim() || "x";
        if (!prefactor || prefactor === "1") return `exp(${exponent})`;
        return `(${prefactor}) * exp(${exponent})`;
      }
      case "radical": {
        const num = radNumerator.value.trim() || "1";
        const inside = radInside.value.trim() || "x^2 + 1";
        if (num === "1") return `1 / sqrt(${inside})`;
        return `(${num}) / sqrt(${inside})`;
      }
      case "freeform":
      default:
        return freeformExpr.value.trim() || "x";
    }
  }

  function updateLivePreview() {
    const expr = buildExpression();
    livePreview.textContent = `∫ [ ${expr} ] dx`;
  }

  // Attach live listeners to all input fields
  const allInputs = [
    ratNum, ratDen, trigFunc, trigPower, trigMultiplier,
    expPrefactor, expPower, radNumerator, radInside, freeformExpr
  ];
  allInputs.forEach(input => {
    if (input) {
      input.addEventListener("input", updateLivePreview);
      input.addEventListener("change", updateLivePreview);
      input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") handleCompute();
      });
    }
  });

  // Initial preview
  updateLivePreview();

  // --- Preset Chips ---
  presetChips.forEach(chip => {
    chip.addEventListener("click", () => {
      presetChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");

      const mode = chip.dataset.mode;
      const tabTarget = document.getElementById(`tab${capitalize(mode)}`);
      if (tabTarget && !tabTarget.classList.contains("active")) {
        tabBtns.forEach(b => b.classList.remove("active"));
        templateViews.forEach(v => v.classList.remove("active"));
        tabTarget.classList.add("active");
        currentMode = mode;
        const targetView = document.getElementById(`view${capitalize(currentMode)}`);
        if (targetView) targetView.classList.add("active");
      }

      if (mode === "rational") {
        ratNum.value = chip.dataset.num || "1";
        ratDen.value = chip.dataset.den || "x^3 + 1";
      } else if (mode === "trig") {
        trigFunc.value = chip.dataset.func || "sin";
        trigPower.value = chip.dataset.power || "3";
        trigMultiplier.value = chip.dataset.mult || "1";
      } else if (mode === "radical") {
        radNumerator.value = chip.dataset.num || "1";
        radInside.value = chip.dataset.inside || "x^2 + 1";
      } else if (mode === "freeform") {
        freeformExpr.value = chip.dataset.expr;
      }

      updateLivePreview();
      handleCompute();
    });
  });

  // Auto-select and compute the first preset chip on startup!
  const defaultInitialChip = document.querySelector(".chip");
  if (defaultInitialChip) {
    defaultInitialChip.click();
  }

  // --- Calculate & Mine API Call ---
  async function handleCompute() {
    const expr = buildExpression();
    if (!expr) return;

    // Show loading state
    emptyState.classList.add("hidden");
    resultContent.classList.add("hidden");
    loadingState.classList.remove("hidden");
    computeBtn.disabled = true;
    computeBtn.innerHTML = `<span class="spinner" style="width:16px;height:16px;border-width:2px;display:inline-block;"></span> Mining Maxima...`;

    // Try live server if online
    if (isOnline) {
      try {
        const response = await fetch("/api/calc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: jsonSafeStringify({
            operation: "integrate",
            expression: expr,
            variable: "x"
          })
        });

        const json = await response.json();
        if (json.success) {
          renderResult(json.data);
          return;
        }
      } catch (err) {
        console.warn("[MaxCalc] Live backend failed, checking pre-mined database...", err);
      }
    }

    // Static Showcase Mode: check pre-mined database
    const normalizedKey = expr.replace(/\s+/g, "").replace(/\(/g, "").replace(/\)/g, "").toLowerCase();
    
    // Look for best match in PREMINED_DATABASE
    let matchedData = null;
    if (window.PREMINED_DATABASE) {
      for (const [key, data] of Object.entries(window.PREMINED_DATABASE)) {
        const cleanDbKey = key.replace(/\s+/g, "").replace(/\(/g, "").replace(/\)/g, "").toLowerCase();
        if (cleanDbKey === normalizedKey || expr.includes(key) || key.includes(normalizedKey)) {
          matchedData = data;
          break;
        }
      }
    }

    if (matchedData) {
      setTimeout(() => {
        renderResult(matchedData);
      }, 250);
      return;
    }

    // If offline and expression is not premined
    loadingState.classList.add("hidden");
    emptyState.classList.remove("hidden");
    computeBtn.disabled = false;
    computeBtn.innerHTML = `<span class="btn-icon">⚡</span> Calculate &amp; Mine Execution Trace`;

    alert(
      "Static Showcase Mode Notice:\n\n" +
      "This public web deployment hosts pre-mined Common Lisp traces for the 8 Benchmark Archetypes.\n\n" +
      "Please click one of the '⚡ Benchmark Archetype Presets' chips above to view its full execution tree!\n\n" +
      "(To run arbitrary custom expressions, run the MaxCalc backend locally on your PC)."
    );
    return;
  }

  computeBtn.addEventListener("click", handleCompute);

  function jsonSafeStringify(obj) {
    return JSON.stringify(obj);
  }

  // --- Render Result & Trace Drawer ---
  function renderResult(data) {
    lastResultData = data;
    loadingState.classList.add("hidden");
    resultContent.classList.remove("hidden");

    // Hero result
    displayQuery.textContent = `∫ [ ${data.input} ] d${data.variable}`;
    displayResult.textContent = data.final_result ? `${data.final_result} + C` : "(No result returned)";

    // Algorithm metadata
    const algo = data.algorithm || {};
    displayAic.textContent = algo.aic || "ALG-GENERIC";
    displayAlgorithmName.textContent = algo.name || "Symbolic Routine";
    displayAlgorithmDesc.textContent = algo.description || "Identified through Common Lisp execution tracing.";

    // Render Cascade Timeline
    cascadeTimeline.innerHTML = "";
    
    // Attempted & Failed steps
    if (data.attempted_heuristics && data.attempted_heuristics.length > 0) {
      data.attempted_heuristics.forEach(att => {
        const step = document.createElement("div");
        step.className = "timeline-step failed";
        step.innerHTML = `
          <span class="step-badge fail">FAIL</span>
          <span><b>Attempted:</b> ${escapeHtml(att)}</span>
        `;
        cascadeTimeline.appendChild(step);
      });
    }

    // Resolving winning step
    const winStep = document.createElement("div");
    winStep.className = "timeline-step success";
    winStep.innerHTML = `
      <span class="step-badge pass">PASS</span>
      <span><b>Resolving Routine:</b> ${escapeHtml(algo.name)} &mdash; ${escapeHtml(algo.description)}</span>
    `;
    cascadeTimeline.appendChild(winStep);

    // Render Call Tree
    renderCallTree(data.call_tree || [], data.call_tree_text);

    // Raw trace pre
    rawTracePre.textContent = data.raw_output || "(No raw output)";
  }

  // --- Tree Rendering ---
  function renderCallTree(treeNodes, fallbackText) {
    callTreeViewer.innerHTML = "";
    if (!treeNodes || treeNodes.length === 0) {
      callTreeViewer.textContent = fallbackText || "(No call tree available)";
      return;
    }

    const container = document.createElement("div");
    container.className = "tree-root-container";

    treeNodes.forEach(root => {
      container.appendChild(createTreeNodeElement(root, 0));
    });

    callTreeViewer.appendChild(container);
  }

  function createTreeNodeElement(node, depth) {
    const el = document.createElement("div");
    el.className = "tree-node-item";
    el.style.marginLeft = `${depth * 18}px`;

    const row = document.createElement("div");
    row.className = "tree-node-row";

    const symbol = document.createElement("span");
    symbol.className = "node-bullet";
    symbol.textContent = node.children && node.children.length > 0 ? "▾" : "•";

    const fnName = document.createElement("span");
    fnName.className = "node-fn";
    fnName.textContent = `[${node.func}]`;

    const args = document.createElement("span");
    args.className = "node-args";
    args.textContent = `args: ${node.args}`;

    const arrow = document.createElement("span");
    arrow.textContent = " ➜ ";
    arrow.style.color = "#64748b";

    const res = document.createElement("span");
    res.className = "node-res";
    res.textContent = node.result !== null ? node.result : "(in progress)";

    row.appendChild(symbol);
    row.appendChild(fnName);
    row.appendChild(args);
    row.appendChild(arrow);
    row.appendChild(res);

    el.appendChild(row);

    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        el.appendChild(createTreeNodeElement(child, depth + 1));
      });
    }

    return el;
  }

  function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // Copy result to clipboard
  copyResultBtn.addEventListener("click", () => {
    if (displayResult.textContent) {
      navigator.clipboard.writeText(displayResult.textContent).then(() => {
        copyResultBtn.textContent = "✓ Copied!";
        setTimeout(() => { copyResultBtn.textContent = "📋 Copy Result"; }, 1500);
      });
    }
  });

  // Toggle tree height
  toggleTreeBtn.addEventListener("click", () => {
    isTreeExpanded = !isTreeExpanded;
    if (isTreeExpanded) {
      callTreeViewer.style.maxHeight = "none";
      toggleTreeBtn.textContent = "Collapse Tree";
    } else {
      callTreeViewer.style.maxHeight = "280px";
      toggleTreeBtn.textContent = "Expand Full Tree";
    }
  });
});
