import type { CSSProperties } from "react";

/**
 * Inline custom properties for the `.hero-rise` entrance animation in
 * globals.css. Above-the-fold hero content uses this CSS animation instead of
 * framer-motion so it animates straight from the server HTML, rather than
 * sitting at opacity 0 until the JS bundle has hydrated (which delays LCP).
 */
export function heroRise(
  delay: number,
  { x = 0, y = 16, scale = 1 }: { x?: number; y?: number; scale?: number } = {},
): CSSProperties {
  return {
    "--hero-delay": `${delay}s`,
    "--hero-x": `${x}px`,
    "--hero-y": `${y}px`,
    "--hero-scale": scale,
  } as CSSProperties;
}
