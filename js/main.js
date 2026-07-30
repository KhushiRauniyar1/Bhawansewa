/* =========================================================================
   BHAWAN SEWA — main.js
   Builds the shared chrome (header, footer, floating actions) from
   window.SITE_CONFIG so every page stays in sync. Also exposes the icon
   library used across the site and binds [data-cfg] placeholders.
   ========================================================================= */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};

  /* ---------------------------------------------------------------------
     ICON LIBRARY  — 24×24 line icons, inherit currentColor.
     Add new icons here; reference by key in HTML/JS.
     --------------------------------------------------------------------- */
  var ICONS = {
    // service icons
    house:       '<path d="M3 11.2 12 4l9 7.2M5 9.8V20h14V9.8"/><path d="M9.5 20v-5h5v5"/>',
    structure:   '<path d="M4 20V5l8-2 8 2v15"/><path d="M4 20h16M8 8v9M16 8v9M12 6.5v13"/>',
    drawing:     '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M9 9v11M7 6h.01"/>',
    consult:     '<path d="M21 15a2 2 0 0 1-2 2H8l-4 4V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z"/><path d="M8 9h6M8 12h4"/>',
    renovation:  '<path d="m14.7 6.3 3 3M3 21l3.5-.8L20 6.7a2 2 0 0 0 0-2.8l-.9-.9a2 2 0 0 0-2.8 0L2.8 16.5z"/>',
    waterproof:  '<path d="M12 3s6 6.4 6 10.5A6 6 0 0 1 6 13.5C6 9.4 12 3 12 3z"/><path d="M9.5 13.5a2.5 2.5 0 0 0 2.5 2.5"/>',
    inspection:  '<circle cx="10.5" cy="10.5" r="6"/><path d="m20 20-5.2-5.2"/><path d="M8 10.5h5M10.5 8v5"/>',
    soil:        '<path d="M4 8h16M6 8V5a3 3 0 0 1 6 0v3"/><path d="M4 8v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M8 12v3M12 12v3M16 12v3"/>',
    supervision: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="2.6"/>',
    estimate:    '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 7h8M8 11h8M8 15h5"/>',
    interior:    '<path d="M4 20v-6a4 4 0 0 1 4-4h1V6a2 2 0 0 1 4 0v4h1a4 4 0 0 1 4 4v6"/><path d="M4 20h16"/>',
    elevation:   '<path d="M3 20V9l6-5 6 5M15 20V12l3-2.5 3 2.5V20"/><path d="M2 20h20"/>',
    // ui icons
    whatsapp:    '<path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Z"/><path d="M8.5 7.8c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.2-.2.3 0 .6a6 6 0 0 0 2.7 2.4c.3.1.4 0 .6-.1l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5s0 .9-.4 1.4c-.4.5-1.3 1-2 1a7 7 0 0 1-6.4-6.5c0-.7.4-1.6.9-2Z"/>',
    phone:       '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
    mail:        '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m3 7 9 6 9-6"/>',
    pin:         '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="2.8"/>',
    clock:       '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    check:       '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9.5"/><path d="m8 12 2.5 2.5L16 9"/>',
    alert:       '<circle cx="12" cy="12" r="9.5"/><path d="M12 7.5v5M12 16h.01"/>',
    arrowRight:  '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowUp:     '<path d="M12 19V5M6 11l6-6 6 6"/>',
    star:        '<path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.5 9.2l5.9-.9z" fill="currentColor" stroke="none"/>',
    search:      '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    calendar:    '<rect x="3.5" y="5" width="17" height="16" rx="2.5"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    shield:      '<path d="M12 2.5 5 5.2v6c0 4.5 3 8 7 10.3 4-2.3 7-5.8 7-10.3v-6z"/><path d="m9 12 2 2 4-4"/>',
    users:       '<circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M20.5 20a5.5 5.5 0 0 0-4-5.3"/>',
    award:       '<circle cx="12" cy="9" r="5.5"/><path d="m8.5 13.5-1.5 7 5-2.5 5 2.5-1.5-7"/>',
    ruler:       '<rect x="3" y="8" width="18" height="8" rx="2" transform="rotate(0)"/><path d="M7 8v3M11 8v4M15 8v3M19 8v4"/>',
    // social
    facebook:    '<path d="M14 8.5h2.5V5H14c-2 0-3.5 1.5-3.5 3.5V11H8v3.5h2.5V22H14v-7.5h2.6L17 11h-3V8.9c0-.2.2-.4.5-.4Z" fill="currentColor" stroke="none"/>',
    instagram:   '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r="1" fill="currentColor" stroke="none"/>',
    linkedin:    '<rect x="3.5" y="3.5" width="17" height="17" rx="3"/><path d="M8 10.5V17M8 7.5v.01M12 17v-3.4c0-1.6 2.4-1.7 2.4 0V17M12 17v-6.5" stroke-linecap="round"/>',
    youtube:     '<rect x="2.5" y="6" width="19" height="12" rx="4"/><path d="m10.5 9.2 4.5 2.8-4.5 2.8z" fill="currentColor" stroke="none"/>',
    tiktok:      '<path d="M14 4c.3 1.9 1.5 3.3 3.6 3.6v2.6c-1.3 0-2.5-.4-3.6-1.1v5c0 2.7-2.1 4.9-4.8 4.9a4.8 4.8 0 0 1-.9-9.6c.3 0 .6 0 .9.1v2.7a2.1 2.1 0 1 0 1.4 2V4H14Z" fill="currentColor" stroke="none"/>'
  };

  function icon(name, cls) {
    var body = ICONS[name] || "";
    return '<svg class="' + (cls || "") + '" viewBox="0 0 24 24" fill="none" ' +
           'stroke="currentColor" stroke-width="1.8" stroke-linecap="round" ' +
           'stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }
  window.BhawanIcons = ICONS;
  window.bhawanIcon = icon;

  /* ---------------------------------------------------------------------
     Small helpers
     --------------------------------------------------------------------- */
  function el(id) { return document.getElementById(id); }
  function currentPage() {
    var p = location.pathname.split("/").pop();
    return p === "" ? "index.html" : p;
  }
  /* Opens WhatsApp DIRECTLY:
       • on phones/tablets  -> the WhatsApp app (wa.me)
       • on computers       -> WhatsApp Web / desktop chat (skips the
                               "Continue to Chat" landing page)
     Number + message still come from config.js (whatsapp.number / .message). */
  function waLink() {
    var num  = C.whatsapp.number;
    var text = encodeURIComponent(C.whatsapp.message);
    var isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i
                     .test(navigator.userAgent || "");
    return isMobile
      ? "https://wa.me/" + num + "?text=" + text
      : "https://web.whatsapp.com/send?phone=" + num + "&text=" + text;
  }
  /* Opens the phone dialer directly. The number is stripped to digits + a
     leading "+" so tel: always works (spaces/dashes can break some dialers).
     On a phone this opens the dialer straight away; on a computer it hands
     off to the system calling app (Skype, Phone Link, FaceTime, etc.). */
  function telLink() {
    var num = String(C.contact.phone || "").replace(/[^\d+]/g, "");
    return "tel:" + num;
  }
  function logoMarkup() {
    return '<img class="logo-img" src="images/logo/logo-mark.png" alt="' +
           C.company.name + ' logo" width="46" height="46">';
  }
  function logoMarkupLight() {
    return '<img class="logo-img" src="images/logo/logo-mark-light.png" alt="' +
           C.company.name + ' logo" width="46" height="46">';
  }

  /* ---------------------------------------------------------------------
     HEADER
     --------------------------------------------------------------------- */
  function buildHeader() {
    var mount = el("site-header");
    if (!mount) return;
    var page = currentPage();

    var links = C.nav.map(function (item) {
      if (item.cta) {
        return '<li class="nav-cta"><a class="btn btn--primary" href="' + item.href + '">' +
               item.label + '</a></li>';
      }
      var active = item.href === page ? " is-active" : "";
      return '<li><a class="nav-link' + active + '" href="' + item.href + '">' +
             item.label + '</a></li>';
    }).join("");

    mount.className = "site-header";
    mount.innerHTML =
      '<div class="container">' +
        '<a class="brand" href="index.html" aria-label="' + C.company.name + ' home">' +
          logoMarkup() +
          '<span class="brand-text">' +
            '<span class="brand-name">' + C.company.name + '</span>' +
            '<span class="brand-tag">' + C.company.tagline + '</span>' +
          '</span>' +
        '</a>' +
        '<nav class="nav" id="primary-nav" aria-label="Primary">' +
          '<ul style="display:contents">' + links + '</ul>' +
        '</nav>' +
        '<button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu" ' +
          'aria-expanded="false" aria-controls="primary-nav"><span></span></button>' +
      '</div>';
  }

  /* ---------------------------------------------------------------------
     FOOTER
     --------------------------------------------------------------------- */
  function buildFooter() {
    var mount = el("site-footer");
    if (!mount) return;

    var quick = [
      ["About", "about.html"], ["Services", "services.html"],
      ["Projects", "projects.html"], ["Blog", "blog.html"],
      ["Free Consultation", "consultation.html"]
    ];
    var svc = C.services.slice(0, 6).map(function (s) {
      return '<li><a href="services.html">' + s.title + '</a></li>';
    }).join("");
    var quickLinks = quick.map(function (q) {
      return '<li><a href="' + q[1] + '">' + q[0] + '</a></li>';
    }).join("");

    var socials = [
      ["facebook", C.social.facebook], ["instagram", C.social.instagram],
      ["tiktok", C.social.tiktok]
    ].map(function (s) {
      return '<a href="' + s[1] + '" target="_blank" rel="noopener" aria-label="' +
             s[0] + '">' + icon(s[0]) + '</a>';
    }).join("");

    mount.className = "site-footer";
    mount.innerHTML =
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            '<a class="brand" href="index.html">' + logoMarkupLight() +
              '<span class="brand-text"><span class="brand-name">' + C.company.name +
              '</span><span class="brand-tag">' + C.company.tagline + '</span></span></a>' +
            '<p class="footer-about">' + C.company.shortDescription + '</p>' +
            '<div class="footer-social">' + socials + '</div>' +
          '</div>' +
          '<div class="footer-col"><h4>Company</h4><ul>' + quickLinks + '</ul></div>' +
          '<div class="footer-col"><h4>Services</h4><ul>' + svc + '</ul></div>' +
          '<div class="footer-col footer-contact-col"><h4>Get in touch</h4>' +
            '<ul class="footer-contact">' +
              '<li>' + icon("pin") + '<span>' + C.contact.addressFull + '</span></li>' +
              '<li>' + icon("phone") + '<a href="' + telLink() + '">' + C.contact.phoneDisplay + '</a></li>' +
              '<li>' + icon("mail") + '<a href="mailto:' + C.contact.email + '">' + C.contact.email + '</a></li>' +
              '<li>' + icon("clock") + '<span>' + C.contact.hours + '</span></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<p>© <span id="year"></span> ' + C.company.legalName + '. All rights reserved.</p>' +
          '<nav class="footer-legal" aria-label="Legal">' +
            '<a href="privacy-policy.html">Privacy Policy</a>' +
            '<a href="terms.html">Terms &amp; Conditions</a>' +
          '</nav>' +
        '</div>' +
      '</div>';
  }

  /* ---------------------------------------------------------------------
     FLOATING ACTIONS  (WhatsApp · Call · Back-to-top)
     --------------------------------------------------------------------- */
  function buildFloating() {
    var mount = el("floating-actions");
    if (!mount) return;
    mount.className = "floating";
    mount.innerHTML =
      '<a class="fab fab--wa" href="' + waLink() + '" target="_blank" rel="noopener" ' +
        'aria-label="Chat on WhatsApp"><span class="fab-tip">Chat on WhatsApp</span>' + icon("whatsapp") + '</a>' +
      '<a class="fab fab--call" href="' + telLink() + '" ' +
        'aria-label="Call us"><span class="fab-tip">Call ' + C.contact.phoneDisplay + '</span>' + icon("phone") + '</a>' +
      '<button class="back-to-top" id="back-to-top" aria-label="Back to top">' + icon("arrowUp") + '</button>';
  }

  /* ---------------------------------------------------------------------
     Bind [data-cfg] / [data-cfg-href] placeholders inside page content.
       <span data-cfg="contact.phoneDisplay"></span>
       <a data-cfg-href="wa"></a>  (special: wa | tel | mail | map)
     --------------------------------------------------------------------- */
  function resolve(path) {
    return path.split(".").reduce(function (o, k) {
      return (o && o[k] != null) ? o[k] : "";
    }, C);
  }
  function bindConfig() {
    document.querySelectorAll("[data-cfg]").forEach(function (n) {
      n.textContent = resolve(n.getAttribute("data-cfg"));
    });
    document.querySelectorAll("[data-cfg-href]").forEach(function (n) {
      var key = n.getAttribute("data-cfg-href");
      if (key === "wa") n.href = waLink();
      else if (key === "tel") n.href = telLink();
      else if (key === "mail") n.href = "mailto:" + C.contact.email;
      else if (key === "map") n.href = "https://www.google.com/maps/search/?api=1&query=" +
             encodeURIComponent(C.contact.mapQuery);
      else n.href = resolve(key);
    });
    document.querySelectorAll("[data-services-grid]").forEach(function (grid) {
      renderServices(grid);
    });
    // Inline icon placeholders:  <span data-icon="pin"></span>
    document.querySelectorAll("[data-icon]").forEach(function (n) {
      if (n.querySelector("svg")) return;
      n.insertAdjacentHTML("afterbegin", icon(n.getAttribute("data-icon")));
    });
    // Star ratings:  <div data-stars="5"></div>
    document.querySelectorAll("[data-stars]").forEach(function (n) {
      var count = parseInt(n.getAttribute("data-stars"), 10) || 5, html = "";
      for (var i = 0; i < count; i++) html += icon("star");
      n.innerHTML = html;
    });
    var yr = el("year"); if (yr) yr.textContent = new Date().getFullYear();
  }

  /* Render the full services grid from config (used on services.html & home) */
  function renderServices(grid) {
    var limit = parseInt(grid.getAttribute("data-limit"), 10) || C.services.length;
    grid.innerHTML = C.services.slice(0, limit).map(function (s, i) {
      return '<article class="card card--tick" data-reveal="up" style="--i:' + (i % 4) + '">' +
        '<div class="card-icon">' + icon(s.icon) + '</div>' +
        '<h3>' + s.title + '</h3><p>' + s.desc + '</p>' +
        '<a class="card-link" href="consultation.html">Book consultation ' + icon("arrowRight") + '</a>' +
      '</article>';
    }).join("");
  }

  /* ---------------------------------------------------------------------
     Boot
     --------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    buildHeader();
    buildFooter();
    buildFloating();
    bindConfig();
    // Signal other modules that shared chrome now exists in the DOM.
    document.dispatchEvent(new CustomEvent("bhawan:ready"));
  });
})();