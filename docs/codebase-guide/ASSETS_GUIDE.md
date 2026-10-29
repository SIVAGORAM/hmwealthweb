# HM Wealth — Assets & Photography Guide

## 1. Asset Storage & Delivery Strategy
The repository does **not** rely on a local `/public/images` directory. Instead, it employs a clean, hybrid vector + CDN approach:
1. **Vector Graphics & Icons:** All brand marks, charts, badges, and illustrations are authored as lightweight inline SVG components or imported from `lucide-react`.
2. **High-Resolution Photography:** Photos are streamed via Unsplash CDN with commercial licenses, dynamically optimized on the fly.
3. **Local Custom Loader:** `lib/imageLoader.ts` intercepts all Next.js `<Image />` requests and attaches `w`, `q`, `auto=format`, and `fit=crop` parameters directly to Unsplash URLs.

## 2. Photo Inventory (`lib/photos.ts`)
| Key | Context / Page | Unsplash ID & Alt Text | Photographer |
|---|---|---|---|
| `motherDaughter` | Hero Story 4, Goals (Emergency fund) | `photo-1589169011402-8b2cbd1ee593`<br>"Mother and daughter laughing together on a sofa" | Vivek Kumar |
| `family` | Hero Story 1, Goals (Child education) | `photo-1780980301761-f6e0fa6f0bdf`<br>"Young family of four sitting together at home" | joao victor guimaraes |
| `seniors` | Hero Story 3, Goals (Retirement) | `photo-1595142062395-98e89b1ad216`<br>"Senior couple standing together outdoors" | Pradnyal Gandhi |
| `professional` | WhyUs section, Goals (Save tax) | `photo-1683107695974-98a9fddb249a`<br>"Young woman working on a laptop at home" | Sweet Life |
| `home` | Hero Story 2, About page story, Goals (Dream home) | `photo-1730130596425-197566414dc4`<br>"Family performing a puja together in their decorated home" | The Ordinary Moments |
| `bigFamily` | Bento Life Insurance card, Goals (Long-term wealth) | `photo-1780329944309-08b392306b49`<br>"Family of five smiling together" | Rohit Dey |

## 3. Vector Logos & Icons
- **Logo (`components/ui/Logo.tsx`):**
  - Custom SVG monogram featuring "HM" over an upward financial growth curve stroke (`#19c38a`).
  - Next to the monogram is the brand wordmark "HM Wealth" and the statutory subtitle ("AMFI-registered Mutual Fund Distributor").
- **3D Coin (`components/home/Hero.tsx` -> `Coin3D`):**
  - Pure CSS 3D rotating cylinder composed of 10 layered HTML divs with radial gold gradients and an embossed Indian Rupee sign (`₹`).
- **SEBI Riskometer (`components/investments/Riskometer.tsx`):**
  - Pure SVG semicircular gauge with 6 mathematical arc segments and an animated spring needle.
- **Charts (`GrowthChart.tsx` & `Donut.tsx`):**
  - Fully dynamic SVG elements with gradient fills, dashed strokes, and interactive paths.

## 4. How to Swap or Add Local Photos
To replace any Unsplash photo with a client-supplied photo (e.g. founder portrait):
1. Create a `public/images/` directory in the repository root.
2. Place the file (e.g. `public/images/founder.jpg`).
3. In `lib/photos.ts`, set the src directly:
   ```ts
   export const photos = {
     founder: { src: "/images/founder.jpg", alt: "Hari Sarvotham A, Founder", credit: "HM Wealth" },
     ...
   }
   ```
4. `lib/imageLoader.ts` automatically detects non-Unsplash paths and serves them locally as standard static assets.

