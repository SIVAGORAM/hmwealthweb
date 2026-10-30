// Custom next/image loader for HM Wealth.
// Implements width parameter to satisfy Next.js responsive image srcset requirements.
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 75));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  if (src.endsWith(".svg")) {
    return src;
  }
  const separator = src.includes("?") ? "&" : "?";
  return `${src}${separator}w=${width}&q=${quality ?? 75}`;
}
