/* =========================================================================
   BHAWAN SEWA — animation.js
   Scroll-reveal (IntersectionObserver), counter animation, FAQ accordion,
   back-to-top visibility, and smooth in-page scrolling.
   ========================================================================= */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- 1. Scroll reveal ---- */
  function initReveal() {
    var items = document.querySelectorAll("[data-reveal], [data-reveal-group]");
    if (!items.length) return;
    if (reduce || !("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("is-inview"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("is-inview");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---- 2. Counter animation ---- */
  function animateCounter(node) {
    var target = parseFloat(node.getAttribute("data-count"));
    var suffix = node.getAttribute("data-suffix") || "";
    var dur = 1500, start = null;
    if (reduce) { node.textContent = target + suffix; return; }
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.floor(eased * target);
      node.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else { node.textContent = target.toLocaleString() + suffix; node.classList.add("is-done"); }
    }
    requestAnimationFrame(tick);
  }
  function initCounters() {
    var counters = document.querySelectorAll(".counter[data-count]");
    if (!counters.length) return;
    if (!("IntersectionObserver" in window)) {
      counters.forEach(animateCounter); return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animateCounter(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { io.observe(c); });
  }

  /* ---- 3. FAQ accordion ---- */
  function initFaq() {
    var items = document.querySelectorAll(".faq-item");
    items.forEach(function (item) {
      var q = item.querySelector(".faq-q");
      var a = item.querySelector(".faq-a");
      if (!q || !a) return;
      q.setAttribute("aria-expanded", "false");
      q.addEventListener("click", function () {
        var open = item.classList.contains("is-open");
        // optional single-open behaviour: close siblings
        items.forEach(function (other) {
          if (other !== item && other.classList.contains("is-open")) {
            other.classList.remove("is-open");
            other.querySelector(".faq-a").style.height = "0px";
            other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
          }
        });
        if (open) {
          item.classList.remove("is-open");
          a.style.height = "0px";
          q.setAttribute("aria-expanded", "false");
        } else {
          item.classList.add("is-open");
          a.style.height = a.querySelector(".faq-a-inner").offsetHeight + "px";
          q.setAttribute("aria-expanded", "true");
        }
      });
    });
    // recalc open heights on resize
    window.addEventListener("resize", function () {
      document.querySelectorAll(".faq-item.is-open .faq-a").forEach(function (a) {
        a.style.height = a.querySelector(".faq-a-inner").offsetHeight + "px";
      });
    });
  }

  /* ---- 4. Back to top ---- */
  function initBackToTop() {
    var btn = document.getElementById("back-to-top");
    if (!btn) return;
    function onScroll() {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    });
  }

  /* ---- 5. Smooth anchor scroll (offset for sticky header) ---- */
  function initAnchors() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
    });
  }

  function init() {
    initReveal();
    initCounters();
    initFaq();
    initBackToTop();
    initAnchors();
  }
  document.addEventListener("bhawan:ready", init);
})();
