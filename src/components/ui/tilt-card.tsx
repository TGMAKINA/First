"use client";

import { useRef } from "react";
import { motion, useSpring, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type TiltCardProps = HTMLMotionProps<"div"> & {
  maxTilt?: number;
  scaleOnHover?: number;
};

export function TiltCard({
  children,
  className,
  maxTilt = 10,
  scaleOnHover = 1.015,
  ...motionProps
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, { stiffness: 300, damping: 25 });
  const rotateY = useSpring(0, { stiffness: 300, damping: 25 });
  const scale = useSpring(1, { stiffness: 300, damping: 25 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * maxTilt * 2);
    rotateX.set((0.5 - py) * maxTilt * 2);
    scale.set(scaleOnHover);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, scale, transformPerspective: 800 }}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}
