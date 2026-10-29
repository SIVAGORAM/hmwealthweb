// Custom next/image loader.
// Unsplash photos are resized by Unsplash's own CDN (via w / q params), so the browser
// loads them directly instead of going through the Next.js image optimizer.
// Local images (e.g. /images/founder.jpg) are returned as they are.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
