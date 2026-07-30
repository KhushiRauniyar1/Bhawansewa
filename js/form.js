/* =========================================================================
   BHAWAN SEWA — form.js
   Client-side validation + AJAX submission for the consultation form.
   Submits to Formspree (https://formspree.io/f/YOUR_FORM_ID) with
   Accept: application/json, and reads Formspree's JSON response
   ({ ok: true } on success, { errors: [...] } on failure).
   ========================================================================= */
(function () {
  "use strict";

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^[+]?[\d\s().-]{7,20}$/;

  function fieldWrap(input) { return input.closest(".field"); }
  function setError(input, msg) {
    var f = fieldWrap(input);
    if (!f) return;
    f.classList.add("has-error");
    var e = f.querySelector(".error-msg");
    if (e) e.textContent = msg;
    input.setAttribute("aria-invalid", "true");
  }
  function clearError(input) {
    var f = fieldWrap(input);
    if (!f) return;
    f.classList.remove("has-error");
    input.removeAttribute("aria-invalid");
  }

  function validateField(input) {
    var val = (input.value || "").trim();
    var type = input.getAttribute("data-validate") || input.type;
    var required = input.hasAttribute("required");

    if (required && !val) { setError(input, "This field is required."); return false; }
    if (!val) { clearError(input); return true; }

    if (type === "email" && !EMAIL_RE.test(val)) {
      setError(input, "Enter a valid email address."); return false;
    }
    if (type === "tel" && !PHONE_RE.test(val)) {
      setError(input, "Enter a valid phone number."); return false;
    }
    if (input.name === "fullname" && val.length < 2) {
      setError(input, "Please enter your full name."); return false;
    }
    if (input.type === "date" && input.hasAttribute("data-nopast")) {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      if (new Date(val) < today) { setError(input, "Choose today or a later date."); return false; }
    }
    if (input.name === "message" && required && val.length < 10) {
      setError(input, "Tell us a little more (10+ characters)."); return false;
    }
    clearError(input);
    return true;
  }

  function showAlert(form, kind, message) {
    var box = form.querySelector(".form-alert");
    if (!box) return;
    box.className = "form-alert form-alert--" + kind + " is-visible";
    var iconName = kind === "success" ? "checkCircle" : "alert";
    box.innerHTML = (window.bhawanIcon ? window.bhawanIcon(iconName) : "") +
                    "<span>" + message + "</span>";
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }
  function hideAlert(form) {
    var box = form.querySelector(".form-alert");
    if (box) box.classList.remove("is-visible");
  }

  function initForm(form) {
    var fields = form.querySelectorAll("input, select, textarea");

    // live validation on blur / input
    fields.forEach(function (input) {
      input.addEventListener("blur", function () { validateField(input); });
      input.addEventListener("input", function () {
        if (fieldWrap(input) && fieldWrap(input).classList.contains("has-error")) {
          validateField(input);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      // validate all
      var ok = true, firstBad = null;
      fields.forEach(function (input) {
        if (input.type === "hidden") return;
        if (!validateField(input)) { ok = false; if (!firstBad) firstBad = input; }
      });
      if (!ok) {
        e.preventDefault();
        if (firstBad) firstBad.focus();
        showAlert(form, "error", "Please fix the highlighted fields and try again.");
        return;
      }

      // If the page itself was opened as a local file (file://), the browser
      // blocks our AJAX fetch() call to Formspree via CORS (this only affects
      // local files, not real websites). In that case, let the form submit
      // the normal way instead of via fetch — Formspree still receives it,
      // it just redirects to its own confirmation page instead of showing
      // our inline success message.
      if (window.location.protocol === "file:") {
        return; // don't preventDefault — allow native form submission
      }

      e.preventDefault();
      hideAlert(form);

      // honeypot (spam trap)
      var hp = form.querySelector('input[name="website"]');
      if (hp && hp.value) return; // silently drop bots

      var btn = form.querySelector('[type="submit"]');
      btn.classList.add("is-loading");
      btn.disabled = true;

      var data = new FormData(form);
      fetch(form.getAttribute("action"), {
        method: "POST",
        body: data,
        headers: { "Accept": "application/json" }
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (res) {
            return { ok: r.ok, res: res };
          });
        })
        .then(function (out) {
          if (out.ok) {
            form.reset();
            showAlert(form, "success",
              "Thank you! Your request has been received. We'll be in touch shortly.");
          } else {
            var msg = "Something went wrong. Please try again or call us directly.";
            if (out.res && Array.isArray(out.res.errors) && out.res.errors.length) {
              msg = out.res.errors.map(function (e) { return e.message; }).join(" ");
            } else if (out.res && out.res.error) {
              msg = out.res.error;
            }
            showAlert(form, "error", msg);
          }
        })
        .catch(function () {
          showAlert(form, "error",
            "We couldn't send your message right now. Please call or WhatsApp us instead.");
        })
        .finally(function () {
          btn.classList.remove("is-loading");
          btn.disabled = false;
        });
    });
  }

  var booted = false;
  function init() {
    if (booted) return;
    booted = true;
    document.querySelectorAll("form[data-ajax]").forEach(initForm);

    // set min date on any no-past date input
    document.querySelectorAll('input[type="date"][data-nopast]').forEach(function (d) {
      var t = new Date(); d.min = t.toISOString().split("T")[0];
    });
  }
  document.addEventListener("bhawan:ready", init);
  // forms may exist even if bhawan:ready already fired
  if (document.readyState !== "loading") init();
  else document.addEventListener("DOMContentLoaded", init);
})();
