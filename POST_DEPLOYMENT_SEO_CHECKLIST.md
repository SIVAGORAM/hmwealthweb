# HM Wealth — Post-Deployment Technical SEO Verification Guide & Action Checklist

**Target Domain:** `https://hmwealth.in`  
**Platform:** Next.js 16 (App Router), Node.js / Vercel / Cloudflare Edge  
**Auditor:** Principal Technical SEO Auditor & Frontend Architect  
**Regulatory Identifier:** AMFI Registered Mutual Fund Distributor `ARN-341412`

---

## 1. Automated Live cURL Verification Suite

Run these commands in bash or PowerShell (using `curl.exe`) immediately following DNS cutover to verify server redirects, SSL enforcement, trailing slash normalization, and asset headers.

### 1.1 SSL & Hostname Redirection (HTTP -> HTTPS & Apex Domain)
Verify that all unsecured HTTP and sub-domain traffic permanently redirects to the canonical `https://hmwealth.in/` destination:

```bash
# Test 1: Plain HTTP redirects to HTTPS (Expect: HTTP/1.1 301 or 308)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" http://hmwealth.in/

# Test 2: www subdomain redirects to apex domain (Expect: 301/308 -> https://hmwealth.in/)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://www.hmwealth.in/
```

### 1.2 Strict Trailing Slash 308 Normalization
Verify that URL variants without trailing slashes are permanently redirected with status `308` to prevent duplicate indexation:

```bash
# Test 3: /about redirects to /about/ (Expect: 308 -> https://hmwealth.in/about/)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/about

# Test 4: /calculators redirects to /calculators/ (Expect: 308 -> https://hmwealth.in/calculators/)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/calculators

# Test 5: /products/mutual-funds redirects with trailing slash
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/products/mutual-funds
```

### 1.3 Legacy WordPress Migration Redirects (301 Permanent)
Verify that historical WordPress permalinks and media upload URLs seamlessly redirect to their new Next.js destinations:

```bash
# Test 6: Legacy /about-us/ redirects to /about/ (Expect: 301 -> https://hmwealth.in/about/)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/about-us/

# Test 7: Legacy /contact-us/ redirects to /contact/ (Expect: 301 -> https://hmwealth.in/contact/)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/contact-us/

# Test 8: Legacy /wp-content/uploads/ redirects to /images/
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/wp-content/uploads/2023/brand.png

# Test 9: Legacy RSS feed redirects to root (Expect: 301 -> https://hmwealth.in/)
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" https://hmwealth.in/feed/

# Test 10: Legacy query post /?p=123 redirects cleanly to root
curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" "https://hmwealth.in/?p=123"
```

### 1.4 Robots.txt & Sitemap.xml Directives
Verify that search engine crawlers receive a valid `HTTP 200` status with compliant crawler directives:

```bash
# Test 11: Inspect robots.txt headers and body
curl -sI https://hmwealth.in/robots.txt | grep -E "HTTP|content-type"
curl -s https://hmwealth.in/robots.txt

# Expected Output:
# User-Agent: *
# Allow: /
# Disallow: /api/
# Disallow: /wp-admin/
# Disallow: /wp-includes/
# Disallow: /wp-json/
# Disallow: /*.php$
# Disallow: /xmlrpc.php
# Disallow: /category/
# Disallow: /tag/
# Disallow: /feed/
# Disallow: /comments/feed/
# Disallow: /trackback/
# Disallow: /cdn-cgi/
# Host: https://hmwealth.in
# Sitemap: https://hmwealth.in/sitemap.xml

# Test 12: Verify sitemap XML syntax and content type
curl -sI https://hmwealth.in/sitemap.xml | grep -E "HTTP|content-type"
curl -s https://hmwealth.in/sitemap.xml | grep "<loc>" | wc -l
# Expected Count: 22 canonical URLs
```

### 1.5 Cache-Control & Asset Header Verification
Ensure static assets carry immutable 1-year cache headers for optimal Core Web Vitals:

```bash
# Test 13: Static brand image caching (Expect: public, max-age=31536000, immutable)
curl -sI https://hmwealth.in/images/brand/hm-wealth-logo.png | grep -i "cache-control"
```

---

## 2. Google Search Console (GSC) Workflow

Follow this procedure immediately following domain resolution:

### Step 1: Domain-Level Verification (Recommended)
1. Navigate to [Google Search Console](https://search.google.com/search-console).
2. Choose **Domain** property type and enter `hmwealth.in` (this covers `https://`, `http://`, `www`, and non-www variants).
3. Copy the provided TXT verification record:
   ```text
   google-site-verification=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
4. Add the record to your DNS host (Cloudflare, GoDaddy, Hostinger, etc.):
   - **Type:** `TXT`
   - **Name:** `@` (or `hmwealth.in`)
   - **Content:** *[Your Token]*
   - **TTL:** Auto or 300 seconds
5. Click **Verify** in GSC.

### Step 2: Submit the Dynamic XML Sitemap
1. Under **Indexing** in the left sidebar, click **Sitemaps**.
2. Enter the sitemap path: `sitemap.xml`.
3. Click **Submit**.
4. Confirm status changes to **Success** and check that **22 discovered pages** are registered.

### Step 3: Priority URL Inspection & Forced Indexation
Prioritize crawling for top-tier business routes using the **URL Inspection Tool** (magnifying glass at top):
1. Test live URL: `https://hmwealth.in/` -> Click **Request Indexing**.
2. Test live URL: `https://hmwealth.in/calculators/` -> Click **Request Indexing**.
3. Test live URL: `https://hmwealth.in/products/mutual-funds/` -> Click **Request Indexing**.
4. Test live URL: `https://hmwealth.in/services/wealth-management/` -> Click **Request Indexing**.
5. Test live URL: `https://hmwealth.in/about/` -> Click **Request Indexing**.

---

## 3. Schema.org & Google Rich Results Validation

Validate all JSON-LD schemas against Google's search algorithms:

### 3.1 Google Rich Results Test
1. Visit the [Google Rich Results Test](https://search.google.com/test/rich-results).
2. Enter the following test URLs:
   - **Homepage (`https://hmwealth.in/`):** Verify `Organization`, `WebSite`, `FinancialService`, and `FAQPage`.
   - **Calculators (`https://hmwealth.in/calculators/`):** Verify `SoftwareApplication` and `BreadcrumbList`.
   - **Mutual Funds (`https://hmwealth.in/products/mutual-funds/`):** Verify `BreadcrumbList` hierarchy.
3. Verify that **0 errors** and **0 critical warnings** are reported.

### 3.2 Schema.org Foundation Validator
1. Visit [Schema Markup Validator](https://validator.schema.org/).
2. Fetch the live URL or paste source code.
3. Confirm entities:
   - `@type: "FinancialService"` includes valid `geo` coordinates (`17.4156`, `78.3478`), `address` (Gachibowli, Hyderabad, Telangana `500032`), and opening hours.
   - `@type: "BreadcrumbList"` correctly maps hierarchy from `Home` -> `Products`/`Services` -> Child Page.

---

## 4. Core Web Vitals Audit & Performance Targets

Test live pages using [PageSpeed Insights](https://pagespeed.web.dev/) and Chrome DevTools (Lighthouse):

| Metric | Target (Desktop) | Target (Mobile) | Purpose & Optimization Applied |
| :--- | :--- | :--- | :--- |
| **LCP** (Largest Contentful Paint) | **< 1.2s** | **< 2.5s** | Hero image configured with `priority`, responsive `sizes`, preloaded. |
| **CLS** (Cumulative Layout Shift) | **0.00** | **< 0.05** | Image wrappers reserve explicit aspect-ratio pixel bounds (`aspect-[980/191]`). |
| **INP** (Interaction to Next Paint) | **< 80ms** | **< 200ms** | Interactive calculator state uses lightweight math functions without heavy UI blocks. |
| **FCP** (First Contentful Paint) | **< 0.8s** | **< 1.8s** | Plus Jakarta Sans font hosted variable with `display: swap`. |
| **TTFB** (Time to First Byte) | **< 200ms** | **< 600ms** | Fully pre-rendered static HTML (SSG) delivered directly from CDN edge. |
| **Overall Performance Score** | **95–100** | **90–100** | Immutable 1-year caching on images and fonts; third-party GA4 script gated via `afterInteractive`. |

---

## 5. Post-Deployment Verification Checklist

```markdown
- [ ] 1. DNS Cutover completed and propagation verified (`dig +short A hmwealth.in`).
- [ ] 2. HTTPS SSL certificate issued and active (Let's Encrypt / Cloudflare Edge).
- [ ] 3. cURL Test: Plain HTTP permanently redirects to HTTPS (Status 301/308).
- [ ] 4. cURL Test: Trailing slash redirects functioning (`/about` -> `/about/`).
- [ ] 5. cURL Test: Legacy WordPress URLs (`/wp-content/uploads/`, `/about-us/`) redirect with 301.
- [ ] 6. cURL Test: `robots.txt` returns HTTP 200 and points to `sitemap.xml`.
- [ ] 7. cURL Test: `sitemap.xml` contains all 22 live pages with absolute HTTPS trailing slashes.
- [ ] 8. GSC: Domain property verified via DNS TXT record.
- [ ] 9. GSC: `sitemap.xml` submitted and verified with 0 errors.
- [ ] 10. GSC: Priority routes submitted for manual indexing.
- [ ] 11. Schema: Google Rich Results test confirms 0 errors on Homepage, Calculators, and Offerings.
- [ ] 12. Local SEO: Google Business Profile address confirmed to match schema (Gachibowli, Hyderabad).
- [ ] 13. Privacy: Cookie consent banner loads on clean session; GA4 remains blocked until user grants consent.
- [ ] 14. Performance: PageSpeed Insights score > 90 on both Mobile and Desktop.
- [ ] 15. Accessibility: Keyboard navigation (`Tab`, `Escape`) verified on Cookie modal, menus, and forms.
```

---

*Document generated and verified against live build output on October 30, 2026.*

