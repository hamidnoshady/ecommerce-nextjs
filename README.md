# Atelier Éclat — Headless WordPress + WooCommerce Storefront

Production-oriented starter architecture for a premium beauty storefront built with Next.js App Router, WordPress CMS, WooCommerce Store API, and a shadcn-inspired luxury/editorial design system.

## 1) Architecture plan (first)

### Goals
- Reusable multi-industry frontend architecture with clean separation between content and commerce.
- Editor-controlled flexible sections for homepage and marketing pages.
- WooCommerce-driven storefront/cart/checkout flows.

### Structure
- `app/` — Next.js App Router routes and page composition.
- `components/ui/` — reusable UI primitives (button/input/accordion).
- `components/layout/` — shell/header/footer and global layout composition.
- `components/commerce/` — product cards, grids, and cart summary UI.
- `components/sections/` — flexible content section renderer from WP layouts.
- `lib/api/` — API clients split by concern: `wp-client.ts` and `woocommerce-client.ts`.
- `lib/types/` — typed CMS and commerce contracts.
- `lib/config/` — shared app/site configuration.

## 2) WordPress data model recommendation

### Recommended CPT/field approach
- Keep WP pages/posts for editorial content.
- Add a custom headless endpoint (`/wp-json/headless/v1/pages/{slug}`) returning normalized flexible sections.
- Homepage and marketing pages use ACF Flexible Content (`layout` keys mapped to approved section types).
- Suggested ACF layouts:
  - hero
  - promo banner
  - rich text
  - image + text
  - split editorial
  - featured categories
  - featured products
  - new arrivals
  - bundle offer
  - trust benefits
  - results/social proof
  - testimonials
  - FAQ
  - newsletter
  - CTA

## 3) Commerce strategy

- WooCommerce Store API for product listing, single product, cart, and checkout.
- Keep payment gateway logic in WooCommerce (Stripe/PayPal plugins), UI in Next.js.
- Use cart/checkout tokens from Store API and secure cookies as configured by WooCommerce.

## 4) Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WP_API_URL=https://your-wordpress-site.com
WC_STORE_API_URL=https://your-wordpress-site.com/wp-json/wc/store/v1
```

Notes:
- If `WP_API_URL` or `WC_STORE_API_URL` are missing, this starter falls back to local mock data for development.
- Production must point both variables to live WordPress/WooCommerce endpoints.

Additional production env notes:
- `WC_STORE_API_URL` must include the full Store API base ending in `/wp-json/wc/store/v1`.
- For authenticated account/order history or protected WP endpoints, configure WordPress auth separately (JWT/Application Password/plugin strategy) and add corresponding server-only env variables.
- Cart and checkout session continuity depends on WooCommerce cookies/tokens and same-site domain configuration in production.

## 5) Setup

```bash
npm install
npm run dev
```

## 6) Included v1 pages

- Home (flexible sections)
- Shop all
- Category collection page
- Single product page
- Cart
- Checkout
- Account
- About
- Contact
- FAQ
- Blog index + article page
- Collections/offers page

## 7) Notes requiring live production configuration

- Real checkout submission/validation should be wired to WooCommerce checkout endpoint with nonce/token handling.
- Payment methods and express wallets require gateway plugin setup in WooCommerce admin.
- Real WordPress menu + flexible section endpoint contract must be finalized with backend field group keys.
- Image CDN, caching policy, and edge revalidation strategy should be tuned per hosting environment.


## 8) Manual setup still required for production

- Configure WooCommerce session/cookie behavior across your frontend and WP domains (reverse proxy and SameSite settings).
- Connect real checkout submission to Store API checkout endpoints and verify payment gateway callbacks/webhooks.
- Replace placeholder search and recommended-product logic with real backend queries and merchandising rules.
- Replace static mobile filter options with taxonomy-driven filters from WooCommerce categories/attributes.
