# Bhawan Sewa — Civil Engineering Consultancy Website

A premium, production-ready website for **Bhawan Sewa**, a Nepal-based civil
engineering consultancy. Built with plain **HTML5, CSS3 and vanilla
JavaScript (ES6)** — no frameworks, no build step, no backend server
required. The free-consultation form submits straight to **Formspree**, so
this can be hosted anywhere, including static hosts (Netlify, Vercel,
GitHub Pages, Cloudflare Pages) as well as any regular web host.

Tagline: **सपनादेखि निर्माणसम्म** — *From dream to construction.*

---

## What's inside

```
Bhawan-Sewa/
├── index.html            Home (hero, services, process, projects, FAQ…)
├── about.html            Story, values, team, stats
├── services.html         All 12 engineering services
├── projects.html         Filterable project gallery
├── blog.html             Searchable, filterable article listing
├── consultation.html     FREE consultation booking form (→ Formspree)
├── privacy-policy.html    Legal
├── terms.html            Legal
├── 404.html              Custom error page
│
├── css/
│   ├── style.css         Design system + all components
│   ├── responsive.css    Breakpoints (laptop / tablet / mobile)
│   └── animations.css    Scroll reveals + micro-interactions
│
├── js/
│   ├── config.js         ★ SINGLE SOURCE OF TRUTH (edit this first)
│   ├── main.js           Builds header/footer/buttons + icon library
│   ├── navigation.js     Sticky nav + mobile menu
│   ├── animation.js      Reveals, counters, FAQ, back-to-top
│   └── form.js           Validation + AJAX submission to Formspree
│
├── images/               Logo + labelled placeholders (replace freely)
├── robots.txt · sitemap.xml · .htaccess · README.md
```

---

## Quick start

### 1. Edit your business details — one file

Open **`js/config.js`**. Everything site-wide lives here: company name,
tagline, phone, email, address, WhatsApp number + message, social links, the
services list, the logo, and SEO defaults. Change a value once and it
updates the header, footer, buttons, WhatsApp/call links and logo **on
every page**. No HTML editing required.

### 2. Connect the consultation form to Formspree

The site uses [Formspree](https://formspree.io) to handle the "Book free
consultation" form — no PHP or SMTP setup needed.

1. Create a free account at <https://formspree.io> and add a new form.
2. Copy the form endpoint it gives you (looks like
   `https://formspree.io/f/xxxxxxxx`).
3. Open **`consultation.html`** and replace `YOUR_FORM_ID` in the form's
   `action` attribute with your real endpoint:
   ```html
   <form class="form-card" id="consultation-form" data-ajax
         action="https://formspree.io/f/xxxxxxxx" method="POST" novalidate>
   ```
4. Submit the form once yourself and confirm it in the Formspree dashboard
   (Formspree requires one confirmed test submission before a new form goes
   live).

That's it — submissions arrive in the inbox connected to your Formspree
account. `js/form.js` handles validation, the loading state, and shows
inline success/error messages using Formspree's JSON response.

### 3. Replace the images

Drop your real photos into the `images/` sub-folders, keeping the same file
names as the placeholders (or update the paths). Each placeholder is
labelled with its recommended dimensions.

### 4. Deploy

Upload the **entire `Bhawan-Sewa/` folder contents** to your host, or drag
the folder into a static host such as Netlify or Vercel. If you're using
Apache hosting, keep the `.htaccess` file (it enables the custom 404,
compression and caching).

---

## Customising

| I want to… | Edit |
|---|---|
| Change phone / email / address / socials | `js/config.js` → `contact`, `social` |
| Add / reorder services | `js/config.js` → `services` |
| Change the logo | `js/config.js` → `logo.svg` (and `images/logo/logo.svg`) |
| Change WhatsApp message | `js/config.js` → `whatsapp.message` |
| Change where the consultation form is delivered | Your Formspree dashboard (add/change the connected inbox) |
| Change colours / fonts | `css/style.css` → `:root` design tokens |
| Add an icon | `js/main.js` → `ICONS` map |
| Update per-page SEO | the `<head>` of each `.html` page |

### Design tokens

Brand colours and type live at the top of `css/style.css`:

```css
--navy:  #041737;   /* primary   */
--amber: #d9890c;   /* accent    */
--bg:    #ffffff;   /* background */
```

Fonts are **Poppins** (headings) + **Inter** (body), loaded from Google Fonts.

---

## Features

- Fully responsive (desktop / laptop / tablet / mobile) with an accessible
  mobile menu.
- Working **free consultation** form (Formspree + client-side validation +
  loading / success / error states + spam honeypot).
- Floating **WhatsApp** and **Call** buttons + **Back-to-top**.
- Embedded **Google Map** (Maharajgunj, Kathmandu).
- Scroll-reveal animations, animated counters, FAQ accordion, project & blog
  filters, blog search.
- SEO on every page: unique title, meta description, Open Graph, Twitter Card,
  canonical URL, JSON-LD structured data + `robots.txt` and `sitemap.xml`.
- Accessible: semantic HTML, skip link, keyboard focus states, `prefers-
  reduced-motion` support, lazy-loaded map.

---

## Before going live — checklist

- [ ] Set real values in `js/config.js`
- [ ] Replace `YOUR_FORM_ID` in `consultation.html` with your real Formspree
      endpoint, and send + confirm one test submission
- [ ] Replace placeholder images in `images/`
- [ ] Update the domain in each page's canonical/OG tags and in `sitemap.xml`
      / `robots.txt` (currently `https://www.bhawansewa.com`)
- [ ] Point the Google Map / socials to your real profiles
- [ ] Enable HTTPS, then uncomment the "Force HTTPS" block in `.htaccess`

---

*All code is yours to use and modify.*
