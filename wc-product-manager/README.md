# WooCommerce Product Manager (Mobile-First)

A lightweight, mobile-first admin web app for managing products in an existing
WooCommerce store. Built in plain PHP (no Composer/build step) so it can be
deployed to any shared PHP 8+ host by uploading files.

## Features

- **Login via SMS OTP** (Kavenegar) — no passwords, restricted to a configured
  list of admin / shop-manager phone numbers.
- **Product list**: mobile cards with image, price, stock, search, and filters
  (category, stock status, price range, on-sale only), infinite scroll.
- **Quick stock +/-** buttons directly on each product card.
- **Add / edit / delete products**: name, SKU, prices, stock, categories,
  images (by URL), description, status.
- **Batch mode**: multi-select products and apply bulk actions:
  - Increase or decrease price by a percentage (regular and/or sale price),
    with rounding modes: none, nearest whole number, round up, round down,
    round to a step (e.g. nearest 1000), or round to an ending decimal
    (e.g. `.99`).
  - Set or adjust stock quantity for many products at once.
  - Preview all changes before applying.
- **Roles**: `admin` (full access, including delete and bulk price changes)
  and `shop_manager` (edit products and stock, no delete / bulk pricing).

## Requirements

- PHP 8.0+ with `curl` and `pdo_sqlite` extensions enabled (both are included
  by default on virtually all shared hosts).
- An existing WordPress + WooCommerce store with the REST API enabled.
- A [Kavenegar](https://kavenegar.com) account with a Verify Lookup template
  configured for OTP codes.

## Directory layout

```
wc-product-manager/
  config/        # config.php (your credentials, NOT committed)
  includes/      # PHP classes & helpers (WooCommerce client, auth, etc.)
  data/          # SQLite database for OTP codes (created automatically)
  public/        # web root — point your domain/subdomain here
    api/         # backend JSON endpoints
    assets/      # CSS/JS
    *.php        # pages (login, products, product-edit, batch, ...)
```

`config/`, `includes/`, and `data/` are outside `public/` and additionally
protected with `.htaccess` (`Require all denied`) in case your web root is
ever pointed at the project root by mistake.

## Setup

1. **Get WooCommerce REST API credentials**
   In WordPress: *WooCommerce → Settings → Advanced → REST API → Add key*.
   Give it **Read/Write** permissions. Copy the Consumer key/secret.

2. **Set up Kavenegar OTP**
   - Create an account at kavenegar.com and get your API key.
   - Create a "Verify Lookup" template (e.g. named `verify`) with a single
     token, e.g.: `کد ورود شما: %token%`

3. **Configure the app**
   ```bash
   cp config/config.sample.php config/config.php
   ```
   Edit `config/config.php`:
   - `woocommerce.store_url`, `consumer_key`, `consumer_secret`
   - `kavenegar.api_key` and `kavenegar.template`
   - `users`: map each admin/shop-manager's mobile number (format
     `09xxxxxxxxx`) to `'admin'` or `'shop_manager'`

4. **Upload**
   Upload the entire `wc-product-manager` directory to your server, and point
   your domain/subdomain's document root at `wc-product-manager/public`.

   If you can't change the document root (e.g. you must use a subfolder of
   `public_html`), upload the whole project as a subfolder, but make sure
   `config/`, `includes/`, and `data/` are placed **outside** the publicly
   served folder — or rely on the included `.htaccess` files as a second
   line of defense (requires `AllowOverride All` / Apache).

5. **Permissions**
   Ensure the web server user can create/write `data/otp.sqlite`
   (the `data/` folder needs to be writable).

6. **Open the app**
   Visit your domain — you'll be redirected to `/login.php`. Enter an
   authorized mobile number to receive an OTP via SMS.

## Security notes

- WooCommerce API credentials and the Kavenegar API key are only ever used
  server-side; the browser never sees them.
- All write operations (`/api/*.php` POST/PUT/DELETE) require a valid session
  and a matching CSRF token (`X-CSRF-Token` header).
- OTP requests are rate-limited per phone number (default: 3 requests per
  10 minutes), and codes expire after 2 minutes.
- Only phone numbers listed in `config.php` under `users` can request an OTP
  or log in.
