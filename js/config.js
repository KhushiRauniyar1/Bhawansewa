/* =========================================================================
   BHAWAN SEWA — GLOBAL SITE CONFIGURATION
   -------------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT FOR SITE-WIDE INFORMATION.
   Change a value here and it updates the header, footer, contact buttons,
   WhatsApp link, call button, logo and SEO defaults across EVERY page.
   ========================================================================= */

window.SITE_CONFIG = {

  /* ----------------------------------------------------------------------
     BOOKING CALENDAR (Cal.com)  — the consultation page shows a live
     scheduler that automatically hides day/time slots that are already booked.

     SETUP (one time, ~3 minutes):
       1. Create a free account at https://cal.com
       2. Add an event type — e.g. a 30-minute "Free Consultation"
          (Optional: under that event's "Booking questions", add fields for
           Phone, Address and Service so they appear in the calendar form.)
       3. Your booking link looks like:  yourname/free-consultation
       4. Paste just that "username/event-slug" part below.

     Until you set this, the normal request form (Formspree) is shown instead.
     ---------------------------------------------------------------------- */
  calcom: "YOUR_CAL_USERNAME/free-consultation",

  /* ----------------------------------------------------------------------
     COMPANY IDENTITY
     ---------------------------------------------------------------------- */
  company: {
    name: "Bhawan Sewa",
    tagline: "सपनादेखि निर्माणसम्म",          // Nepali tagline
    taglineEnglish: "From Dream to Construction",
    legalName: "Bhawan Sewa Civil Engineering Consultancy",
    shortDescription:
      "A Nepal-based civil engineering consultancy offering free door-to-door " +
      "consultation, structural design, municipality drawings and end-to-end " +
      "supervision — engineered to code, delivered with care.",
    foundedYear: 2018,
    established: "Serving homeowners across Kathmandu Valley"
  },

  /* ----------------------------------------------------------------------
     CONTACT DETAILS
     Phone numbers must stay in international format for tel:/wa.me links.
     ---------------------------------------------------------------------- */
  contact: {
    phone: "+9779852800195",                 // used in tel: links
    phoneDisplay: "+977 9852800195",          // shown to users
    email: "consult.bhawansewa@gmail.com",
    addressLine: "Maharajgunj, Kathmandu, Nepal",
    addressFull: "Maharajgunj Ring Road, Kathmandu 44600, Bagmati, Nepal",
    mapQuery: "Maharajgunj, Kathmandu, Nepal",
    hours: "Sun – Fri: 9:00 AM – 6:00 PM"
  },

  /* ----------------------------------------------------------------------
     WHATSAPP  (floating button + inline CTAs)
     ---------------------------------------------------------------------- */
  whatsapp: {
    number: "9779852800195",                  // digits only for wa.me
    message:
      "Hello Bhawan Sewa,\n\nI would like to book a FREE Door-to-Door " +
      "Civil Engineering Consultation."
  },

  /* ----------------------------------------------------------------------
     SOCIAL MEDIA  (reusable everywhere)
     Replace the "#" values with your real profile URLs.
     ---------------------------------------------------------------------- */
  social: {
    facebook:  "https://www.facebook.com/officialbhawansewa",
    instagram: "https://www.instagram.com/officialbhawansewa",
    tiktok:  "https://www.tiktok.com/@bhawansewa?_r=1&_t=ZS-98SmeWJ2bUS",
  },

  /* ----------------------------------------------------------------------
     PRIMARY NAVIGATION
     order = menu order. cta:true renders the highlighted button.
     ---------------------------------------------------------------------- */
  nav: [
    { label: "Home",         href: "index.html" },
    { label: "About",        href: "about.html" },
    { label: "Services",     href: "services.html" },
    { label: "Projects",     href: "projects.html" },
    { label: "Blog",         href: "blog.html" },
    { label: "Free Consultation", href: "consultation.html", cta: true }
  ],

  /* ----------------------------------------------------------------------
     ENGINEERING SERVICES
     Rendered on the home page and services page. icon = key in ICONS map
     (see js/main.js). Edit / reorder freely.
     ---------------------------------------------------------------------- */
  services: [
    { icon: "house",       title: "House Design",            desc: "Functional, light-filled home layouts tailored to your plot, budget and family." },
    { icon: "structure",   title: "Structural Design",       desc: "RCC framing designed to NBC 105:2020 seismic standards for lasting safety." },
    { icon: "drawing",     title: "Municipality Drawing",    desc: "Approval-ready drawings prepared to your local ward and municipality norms." },
    { icon: "consult",     title: "Construction Consultation",desc: "Independent, unbiased engineering advice at every stage of your build." },
    { icon: "renovation",  title: "Renovation",              desc: "Structural upgrades and remodels that respect the existing frame." },
    { icon: "waterproof",  title: "Waterproofing",           desc: "Basement, terrace and wet-area systems that keep leaks out for good." },
    { icon: "inspection",  title: "Structural Inspection",   desc: "Condition assessment and load evaluation for existing structures." },
    { icon: "soil",        title: "Soil Test",               desc: "Bearing-capacity investigation so your foundation is designed on evidence." },
    { icon: "supervision", title: "Site Supervision",        desc: "On-site quality checks that keep contractors honest and work on-code." },
    { icon: "estimate",    title: "Cost Estimation",         desc: "Transparent BOQ and rate analysis so you know every rupee up front." },
    { icon: "interior",    title: "Interior Design",         desc: "Interiors that balance aesthetics, function and Nepali living habits." },
    { icon: "elevation",   title: "3D Elevation",            desc: "Photoreal exterior visualisation so you see the home before you build." }
  ],

  /* ----------------------------------------------------------------------
     LOGO  (single reusable component)
     The header and footer both render this SVG. Edit it ONCE here and the
     whole site updates. Keep it monochrome — colour is applied via CSS
     using currentColor so it adapts to light/dark placements.
     ---------------------------------------------------------------------- */
  logo: {
    // Mark: a stylised building profile inside a surveyor's angle bracket.
    svg:
      '<svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
        '<rect x="1" y="1" width="38" height="38" rx="9" class="logo-plate"/>' +
        '<path d="M11 28V17.5L20 11l9 6.5V28" class="logo-roof" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<path d="M11 28h18" class="logo-base" stroke-width="2.1" stroke-linecap="round"/>' +
        '<path d="M17 28v-6h6v6" class="logo-door" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<circle cx="20" cy="11" r="1.6" class="logo-node"/>' +
      '</svg>',
    // Standalone file used for favicon / social share image.
    file: "images/logo/logo.svg",
    alt: "Bhawan Sewa"
  },

  /* ----------------------------------------------------------------------
     SEO DEFAULTS  (per-page tags live in each page's <head>; these are
     fallbacks and Organisation-level structured data values)
     ---------------------------------------------------------------------- */
  seo: {
    siteUrl: "https://www.bhawansewa.com",
    defaultTitle: "Bhawan Sewa — Civil Engineering Consultancy in Kathmandu",
    defaultDescription:
      "Free door-to-door civil engineering consultation in Kathmandu. " +
      "House design, structural design, municipality drawings, supervision & more.",
    ogImage: "images/logo/og-image.png",
    twitterHandle: "@bhawansewa",
    locale: "en_NP"
  }
};
