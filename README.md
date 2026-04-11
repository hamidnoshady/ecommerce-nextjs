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


## WordPress backend endpoint requirement

This frontend expects a **custom WordPress REST route** at:
- `/wp-json/headless/v1/pages/{slug}`

The current repository does **not** include WordPress plugin/mu-plugin/backend PHP code that registers this route.
That backend route must be implemented and activated on the WordPress server for full flexible-section page payloads.

### Development-safe fallback behavior
- If `/wp-json/headless/v1/pages/{slug}` returns `404`, the frontend now falls back to standard WordPress REST pages: `/wp-json/wp/v2/pages?slug={slug}`.
- Fallback pages render a minimal hero section (title/excerpt) so homepage/page routes still load in local/staging environments.
- For production flexible content composition, you still need the custom `headless/v1` route.

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
- `WP_API_URL` should be the **WordPress site root** (for example `https://cms.example.com`). The app composes paths like `/wp-json/wp/v2/...` and normalizes accidental `/wp-json` suffixes.

Additional production env notes:
- `WC_STORE_API_URL` must include the full Store API base ending in `/wp-json/wc/store/v1`.
- For authenticated account/order history or protected WP endpoints, configure WordPress auth separately (JWT/Application Password/plugin strategy) and add corresponding server-only env variables.
- Cart and checkout session continuity depends on WooCommerce cookies/tokens and same-site domain configuration in production.


### Variable ownership and usage
- **WordPress variables**: `WP_API_URL` (WordPress site root used to build CMS REST/custom headless endpoint requests).
- **WooCommerce variables**: `WC_STORE_API_URL` (products/cart/checkout Store API).
- **Public frontend variable**: `NEXT_PUBLIC_SITE_URL` (browser-safe canonical/site URL).

### NEXT_PUBLIC naming review
- `NEXT_PUBLIC_SITE_URL` is intentionally public because it can be consumed in client-rendered metadata/links.
- `WP_API_URL` and `WC_STORE_API_URL` are server-only integration endpoints and should **not** be prefixed with `NEXT_PUBLIC_`.

## 5) Setup

### Install dependencies
```bash
npm install
```

### Create local environment file
```bash
cp .env.example .env.local
```

Working local/staging example:
```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WP_API_URL=https://cms.example.com
WC_STORE_API_URL=https://cms.example.com/wp-json/wc/store/v1
```

### Run development server
```bash
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
- Real WordPress menu + flexible section endpoint contract must be finalized with backend field group keys (custom `/wp-json/headless/v1` route is required and not shipped in this repo).
- Image CDN, caching policy, and edge revalidation strategy should be tuned per hosting environment.


## 8) Manual setup still required for production

- Configure WooCommerce session/cookie behavior across your frontend and WP domains (reverse proxy and SameSite settings).
- Connect real checkout submission to Store API checkout endpoints and verify payment gateway callbacks/webhooks.
- Replace placeholder search and recommended-product logic with real backend queries and merchandising rules.
- Replace static mobile filter options with taxonomy-driven filters from WooCommerce categories/attributes.


## 9) What will not fully work without live backend config

- **Real cart persistence**: requires WooCommerce session cookies/tokens on matching domains.
- **Checkout completion**: requires live checkout endpoint wiring and payment gateway setup (Stripe/PayPal/etc.).
- **Account/order history**: requires authenticated WordPress/WooCommerce endpoints and auth strategy.
- **Dynamic merchandising/search/filters**: currently placeholder UI must be backed by real taxonomy/query integrations.

## 10) Environment variable summary

- `NEXT_PUBLIC_SITE_URL`: frontend base URL for canonical links and public app URL context.
- `WP_API_URL`: server-side WordPress origin used to fetch pages/posts/flexible content payloads.
- `WC_STORE_API_URL`: server-side WooCommerce Store API base used for products, cart, and checkout flows.
