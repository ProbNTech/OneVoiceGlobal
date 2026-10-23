"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealVariant = "up" | "rise" | "left" | "right" | "scale" | "fade" | "lines" | "image";

type RevealProps = {
  children: ReactNode;
  /** The element to render. Defaults to a div. */
  as?: ElementType;
  variant?: RevealVariant;
  /** Milliseconds to wait once in view, for staggering siblings. */
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /**
   * How far inside the viewport the element must come before it plays.
   * Things pinned to the foot of the first screen pass "0px", or they would
   * wait for a scroll.
   */
  margin?: string;
};

/**
 * Plays an entrance once the element scrolls into view. The motion itself is
 * CSS (`[data-reveal]` in styles/site.css); this only adds `.is-in`. Content
 * is visible without JavaScript and under reduced motion, because the hidden
 * state only applies when the root layout's script has marked the page.
 */
export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  id,
  margin = "0px 0px -12% 0px",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: margin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [margin]);

  return (
    <Tag
      ref={ref}
      id={id}
      data-reveal={variant}
      className={className}
      style={delay ? ({ ...style, "--reveal-delay": `${delay}ms` } as CSSProperties) : style}
    >
      {children}
    </Tag>
  );
}
