"use client";

import { motion, type Variants } from "framer-motion";
import { useReducedMotionClient } from "./useClientHooks";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: "div" | "section" | "span" | "li" | "p" | "h2" | "h3";
};

/**
 * Scroll-triggered reveal — fades + slides up when entering viewport.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  once = true,
  as = "div" }: RevealProps) {
  const reduce = useReducedMotionClient();
  const MotionTag = motion[as] as typeof motion.div;

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1] } } };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px 0px -80px 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container — children must be <RevealItem> elements.
 */
export function RevealStagger({
  children,
  className,
  stagger = 0.12,
  delay = 0 }: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotionClient();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px 0px -60px 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: reduce ? 0 : stagger,
            delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 24 }: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotionClient();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } } }}
    >
      {children}
    </motion.div>
  );
}
