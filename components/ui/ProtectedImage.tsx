"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface ProtectedImageProps extends ImageProps {
  wrapperClassName?: string;
}

/**
 * ProtectedImage:
 * 1. Prevents right-click context menu image downloads (`onContextMenu` preventDefault).
 * 2. Prevents drag-and-drop saving (`onDragStart` preventDefault + `draggable={false}`).
 * 3. Enforces browser CSS protection: user-select none, -webkit-user-drag none, and -webkit-touch-callout none (iOS callout menu).
 * 4. Preserves 100% Googlebot image asset crawlability and accessibility via standard SSR <img> tags with full alt propagation.
 */
export function ProtectedImage({
  className,
  draggable = false,
  onContextMenu,
  onDragStart,
  ...props
}: ProtectedImageProps) {
  return (
    <Image
      {...props}
      draggable={draggable}
      onContextMenu={(e) => {
        e.preventDefault();
        onContextMenu?.(e);
      }}
      onDragStart={(e) => {
        e.preventDefault();
        onDragStart?.(e);
      }}
      className={cn(
        "select-none pointer-events-auto [user-select:none] [-webkit-user-select:none] [-webkit-user-drag:none] [-webkit-touch-callout:none]",
        className
      )}
    />
  );
}

