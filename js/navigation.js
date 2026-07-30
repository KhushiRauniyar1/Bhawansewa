/* =========================================================================
   BHAWAN SEWA — navigation.js
   Sticky-header scroll state + accessible mobile menu.
   Runs after main.js has injected the header (same DOMContentLoaded queue).
   ========================================================================= */
(function () {
  "use strict";

  function init() {
    var header = document.getElementById("site-header");
    var toggle = document.getElementById("nav-toggle");
    var nav    = document.getElementById("primary-nav");
    if (!header) return;

    /* ---- shrink / border on scroll ---- */
    var lastState = false;
    function onScroll() {
      var scrolled = window.scrollY > 8;
      if (scrolled !== lastState) {
        header.classList.toggle("is-scrolled", scrolled);
        lastState = scrolled;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ---- mobile menu ---- */
    if (toggle && nav) {
      function closeMenu() {
        toggle.classList.remove("is-open");
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
      function openMenu() {
        toggle.classList.add("is-open");
        nav.classList.add("is-open");
        toggle.setAttribute("aria-expanded", "true");
      }
      toggle.addEventListener("click", function () {
        if (nav.classList.contains("is-open")) closeMenu(); else openMenu();
      });
      // close when a link is tapped
      nav.addEventListener("click", function (e) {
        if (e.target.closest("a")) closeMenu();
      });
      // close on escape / resize to desktop
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeMenu();
      });
      window.addEventListener("resize", function () {
        if (window.innerWidth > 900) closeMenu();
      });
    }
  }

  // main.js dispatches this once the header exists.
  document.addEventListener("bhawan:ready", init);
})();
