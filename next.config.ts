import type { NextConfig } from "next";

// Disable anonymous Next.js telemetry across local and cloud CI builds
process.env.NEXT_TELEMETRY_DISABLED = "1";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  // Lets phones on the same Wi-Fi load the dev server (dev only, no effect on production).
  allowedDevOrigins: ["192.168.0.106"],
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
  },
  async redirects() {
    return [
      // =========================================================================
      // 1. Static 301 Permanent Redirects for Legacy WordPress Pages
      // =========================================================================
      {
        source: "/about-us/:path*",
        destination: "/about/",
        permanent: true,
      },
      {
        source: "/about-hm-wealth/:path*",
        destination: "/about/",
        permanent: true,
      },
      {
        source: "/contact-us/:path*",
        destination: "/contact/",
        permanent: true,
      },
      {
        source: "/contact-hm-wealth/:path*",
        destination: "/contact/",
        permanent: true,
      },
      {
        source: "/our-services/:path*",
        destination: "/services/",
        permanent: true,
      },
      {
        source: "/services-2/:path*",
        destination: "/services/",
        permanent: true,
      },
      {
        source: "/our-products/:path*",
        destination: "/products/",
        permanent: true,
      },
      {
        source: "/products-2/:path*",
        destination: "/products/",
        permanent: true,
      },
      {
        source: "/mutual-funds/:path*",
        destination: "/products/mutual-funds/",
        permanent: true,
      },
      {
        source: "/mutual-fund/:path*",
        destination: "/products/mutual-funds/",
        permanent: true,
      },
      {
        source: "/sip/:path*",
        destination: "/products/mutual-funds/",
        permanent: true,
      },
      {
        source: "/life-insurance/:path*",
        destination: "/products/life-insurance/",
        permanent: true,
      },
      {
        source: "/health-insurance/:path*",
        destination: "/products/health-insurance/",
        permanent: true,
      },
      {
        source: "/general-insurance/:path*",
        destination: "/products/general-insurance/",
        permanent: true,
      },
      {
        source: "/calculator/:path*",
        destination: "/calculators/",
        permanent: true,
      },
      {
        source: "/calculators-suite/:path*",
        destination: "/calculators/",
        permanent: true,
      },
      {
        source: "/sip-calculator/:path*",
        destination: "/calculators/",
        permanent: true,
      },
      {
        source: "/wealth-calculators/:path*",
        destination: "/calculators/",
        permanent: true,
      },
      {
        source: "/terms-and-conditions/:path*",
        destination: "/terms-conditions/",
        permanent: true,
      },
      {
        source: "/terms-of-service/:path*",
        destination: "/terms-conditions/",
        permanent: true,
      },
      {
        source: "/privacy/:path*",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/privacy-policy-2/:path*",
        destination: "/privacy-policy/",
        permanent: true,
      },
      {
        source: "/grievance-redressal/:path*",
        destination: "/investor-grievance/",
        permanent: true,
      },
      {
        source: "/investor-charter/:path*",
        destination: "/investor-grievance/",
        permanent: true,
      },
      {
        source: "/disclosures/:path*",
        destination: "/risk-factors/",
        permanent: true,
      },
      {
        source: "/statutory-disclosures/:path*",
        destination: "/risk-factors/",
        permanent: true,
      },
      {
        source: "/risk-disclosure/:path*",
        destination: "/risk-factors/",
        permanent: true,
      },
      {
        source: "/useful-links/:path*",
        destination: "/important-links/",
        permanent: true,
      },
      {
        source: "/links/:path*",
        destination: "/important-links/",
        permanent: true,
      },
      {
        source: "/index.php/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/index.php",
        destination: "/",
        permanent: true,
      },

      // =========================================================================
      // 2. Wildcard Regex Redirects for Legacy WordPress Uploads
      // =========================================================================
      {
        source: "/wp-content/uploads/:path*",
        destination: "/images/:path*",
        permanent: true,
      },
      {
        source: "/wp-content/:path*",
        destination: "/images/:path*",
        permanent: true,
      },

      // =========================================================================
      // 3. Wildcard Redirects for Feeds and Syndication
      // =========================================================================
      {
        source: "/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/feed",
        destination: "/",
        permanent: true,
      },
      {
        source: "/rss/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/rss",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/comments/feed",
        destination: "/",
        permanent: true,
      },

      // =========================================================================
      // 4. Wildcard Redirects for Legacy Taxonomies and Archives
      // =========================================================================
      {
        source: "/category/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/tag/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/author/:path*",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
