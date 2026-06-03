# Get AI Coach — Sales / Pricing Landing Page

A standalone, static (Bangla-first) landing page that sells the **AI Coach**
offering for MigrateProperly. This is the page the **"Get AI Coach"** nav link
in the main site is intended to point to. It is plain HTML/CSS/JS with no build
step — open `index.html` in a browser and it runs.

---

## What's in this folder

| File | Purpose |
|------|---------|
| `index.html` | The sales/pricing page. Hero, problem/solution, the three services, "how it works", countries, testimonials, **pricing packages**, guarantee, FAQ, and final CTA. Bilingual (Bangla default, English toggle). |
| `payment.html` | The checkout page. Collects the buyer's name, WhatsApp/phone number, and a manual payment **Transaction ID (TrxID)**. Supports bKash, Nagad, and Rocket. |
| `success.html` | Confirmation page the buyer is redirected to **once payment is confirmed**. Reads the order from `sessionStorage`, shows the payment as **confirmed**, and points them to **log in to MigrateProperly** (primary CTA) and **join the WhatsApp student community**. |
| `images/logo.png` | The MigrateProperly logo (the only locally-hosted asset). |

> The hero/section background images are loaded from remote CloudFront URLs that
> are hard-coded in `index.html`, so they render online but **will not appear
> offline**. Only `images/logo.png` is bundled locally.

---

## How it works (user flow)

```
index.html  ──(pick a package)──►  payment.html  ──(submit TrxID)──►  success.html
```

1. **Browse & choose a package** — `index.html`
   The pricing section offers two paid packages. Each "buy" button links to the
   checkout with the price pre-selected via a URL parameter:

   | Package | Price | Button link |
   |---------|-------|-------------|
   | Profile Review (one-time Expert AI review) | ~~৳800~~ **৳251** | `payment.html?pkg=251` |
   | AI Coach Package (60-day personal AI mentor) | ~~৳1,200~~ **৳388** | `payment.html?pkg=388` |

   Every package also includes the free *Ultimate Study Abroad PDF Guide*.

2. **Pay manually & submit proof** — `payment.html`
   The buyer sends the amount to the shown bKash / Nagad / Rocket number, then
   enters their **name**, **phone number**, and the **Transaction ID** from the
   payment app. The `?pkg=` parameter pre-selects the package (defaults to ৳251).

3. **Confirmation** — `success.html`
   On submit, the order is saved to the browser's `sessionStorage` under the key
   `mp_order` (name, phone, txid, package, method) and the user is redirected to
   the success page **only after the payment is confirmed**, which:
   - shows the order summary with a **"নিশ্চিত হয়েছে ✓" (confirmed)** status;
   - presents **"Login to MigrateProperly"** as the primary next action. The
     button links to the login page (`https://www.migrateproperly.com/login` by
     default — update the `href` if login lives elsewhere) and **pre-fills the
     buyer's WhatsApp number** via `?phone=` so sign-in is one tap;
   - invites the buyer to **join the WhatsApp student community** to connect with
     fellow students (the group is framed as community, not paid support).

   > Confirming the payment and provisioning the account is backend work (see
   > below). The page assumes the user only lands here once payment is confirmed;
   > the redirect/verification logic behind it still needs to be wired in.

---

## ⚠️ Important: this is currently a front-end demo

The checkout does **not** talk to any backend yet. On submit, `payment.html`
just waits ~2 seconds, stores the order in `sessionStorage`, and redirects to
`success.html`. **No payment is verified and no order is recorded anywhere
server-side.**

To make it production-ready you need to wire in:

- **A backend endpoint** that receives `{ name, phone, txid, pkg, method }` and
  persists the order (DB / Google Sheet / CRM).
- **Payment verification** of the submitted bKash/Nagad/Rocket Transaction ID
  (manual admin review, or an automated payment-gateway / webhook check).
- **Fulfilment** — grant AI Coach access and email/WhatsApp the PDF guide once
  payment is confirmed.

Search the codebase for the `setTimeout(... sessionStorage.setItem('mp_order' ...`
block in `payment.html` — that's the single place to replace with a real
`fetch()` call to your API.

---

## How to run / deploy

- **Locally:** open `index.html` directly in a browser (no server needed).
- **Hosting:** drop the folder on any static host (Vercel, Netlify, GitHub
  Pages, S3, or the main project's `public/`). All links are relative, so the
  folder is self-contained.
- **Linking from the main site:** once deployed, set the `openAICoach` action in
  `migrate-app/migrate properly main home page/src/components/Hero.tsx` to this
  page's URL.

---

## Editing notes

- **Prices** appear in both `index.html` (pricing cards) and `payment.html`
  (the `pkgData` object + displayed amounts). Update both if a price changes.
- **Payment numbers** (bKash/Nagad/Rocket) live in `payment.html`.
- **Language:** Bangla is the default; the EN/বাং toggle in the nav switches
  copy. New copy should be added for both languages to stay consistent.
