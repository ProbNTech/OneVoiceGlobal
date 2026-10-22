"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { animate, type AnimationPlaybackControls } from "motion/react";

/**
 * A marquee track (a CSS keyframe animation) that glides to a stop under the
 * pointer and eases back up to speed when it leaves, rather than stopping
 * dead. It tweens the running animation's playback rate.
 */
export function GlideTrack({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const tween = useRef<AnimationPlaybackControls | null>(null);

  const glideTo = (target: number) => {
    const running = ref.current?.getAnimations()[0];
    if (!running) return;
    tween.current?.stop();
    tween.current = animate(running.playbackRate, target, {
      duration: target === 0 ? 0.7 : 0.9,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (rate) => {
        running.playbackRate = rate;
      },
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onPointerEnter={() => glideTo(0)}
      onPointerLeave={() => glideTo(1)}
    >
      {children}
    </div>
  );
}
