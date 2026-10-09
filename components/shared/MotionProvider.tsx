"use client";

import { LazyMotion } from "framer-motion";

const loadFeatures = () =>
  import("@/lib/motionFeatures").then((module) => module.default);

/**
 * Lets components use framer-motion's lightweight `m` elements: the animation
 * features are fetched in a separate chunk after hydration instead of shipping
 * in the JS every page needs before it can render. Components still using
 * `motion` keep working; they just bundle the full engine themselves.
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}
