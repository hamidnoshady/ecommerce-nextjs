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
- Expose page + flexible section data through WPGraphQL (with WPGraphQL for ACF enabled for section fields).
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

This frontend uses **WPGraphQL** for WordPress content:
- Pages/homepage content
- Blog index and article content
- Flexible section fields via ACF

Required WordPress plugins:
1. **WPGraphQL** (active)
2. **Advanced Custom Fields Pro** (or compatible ACF setup)
3. **WPGraphQL for ACF** (active)

Required WordPress field settings:
- Flexible content field groups must be set to **Show in GraphQL**.
- Field groups should expose stable GraphQL field names used by the frontend queries.
- Homepage/page flexible fields should be attached to the `Page` post type.


### Quick import file included in this repo
- File: `wordpress/acf/page-builder.acf.json`
- In WordPress Admin: **Custom Fields → Tools → Import Field Groups** and import that file.
- This import matches the current frontend query contract in `lib/api/wp-client.ts` (`pageBuilder.flexibleSections` with `hero`, `richtext`, `featuredproducts`, `faq`).

GraphQL endpoint example:
- `https://cms.example.com/graphql`


### Troubleshooting: `Cannot query field "flexibleSections" on type "PageBuilder"`
- This means the ACF GraphQL field name on your `Page Builder` group does not match the frontend query expectation.
- Ensure the nested field is exposed as GraphQL field name: `flexibleSections`.
- The frontend now falls back to a basic page query (`slug`, `title`, `content`) so pages still load while you fix ACF GraphQL field names.

Note: this repository does **not** include WordPress plugin PHP code; plugin installation/activation happens in your WordPress environment.

## 3) Commerce strategy

- WooCommerce Store API for product listing, single product, cart, and checkout.
- Keep payment gateway logic in WooCommerce (Stripe/PayPal plugins), UI in Next.js.
- Use cart/checkout tokens from Store API and secure cookies as configured by WooCommerce.

## 4) Environment variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WP_GRAPHQL_URL=https://your-wordpress-site.com/graphql
WP_API_URL=https://your-wordpress-site.com
WC_STORE_API_URL=https://your-wordpress-site.com/wp-json/wc/store/v1
```

Notes:
- If `WP_GRAPHQL_URL` (or `WP_API_URL`) / `WC_STORE_API_URL` are missing, this starter falls back to local mock data for development.
- Production must point content to a live WordPress GraphQL endpoint and commerce to a live WooCommerce Store API endpoint.
- Preferred content config is `WP_GRAPHQL_URL=https://cms.example.com/graphql`.

Additional production env notes:
- `WC_STORE_API_URL` must include the full Store API base ending in `/wp-json/wc/store/v1`.
- For authenticated account/order history or protected WP endpoints, configure WordPress auth separately (JWT/Application Password/plugin strategy) and add corresponding server-only env variables.
- Cart and checkout session continuity depends on WooCommerce cookies/tokens and same-site domain configuration in production.


### Variable ownership and usage
- **WordPress variables**: `WP_GRAPHQL_URL` (primary WPGraphQL endpoint for pages/posts/flexible fields). Optional `WP_API_URL` can be used as a fallback base to derive `/graphql`.
- **WooCommerce variables**: `WC_STORE_API_URL` (products/cart/checkout Store API).
- **Public frontend variable**: `NEXT_PUBLIC_SITE_URL` (browser-safe canonical/site URL).

### NEXT_PUBLIC naming review
- `NEXT_PUBLIC_SITE_URL` is intentionally public because it can be consumed in client-rendered metadata/links.
- `WP_GRAPHQL_URL`, `WP_API_URL`, and `WC_STORE_API_URL` are server-only integration endpoints and should **not** be prefixed with `NEXT_PUBLIC_`.

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
WP_GRAPHQL_URL=https://cms.example.com/graphql
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
- WPGraphQL + WPGraphQL for ACF schema/field naming must be finalized with backend field group keys and GraphQL visibility settings.
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
- `WP_GRAPHQL_URL`: primary WordPress GraphQL endpoint used for pages/posts/flexible content payloads.
- `WP_API_URL`: optional WordPress origin used only to derive `/graphql` when `WP_GRAPHQL_URL` is not explicitly set.
- `WC_STORE_API_URL`: server-side WooCommerce Store API base used for products, cart, and checkout flows.
