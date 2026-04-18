"use client";

import { useEffect, useRef, useState, Children, cloneElement, isValidElement } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
  once?: boolean;
  duration?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  as = "div",
  once = true,
  duration = 700,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) setVisible(false);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn("will-change-transform", className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
};

export function Stagger({
  children,
  className,
  delay = 0,
  step = 80,
  y = 14,
  as = "div",
}: StaggerProps) {
  const items = Children.toArray(children);
  const Tag = as as "div";
  return (
    <Tag className={className}>
      {items.map((child, i) => {
        if (!isValidElement(child)) return child;
        return (
          <Reveal key={i} delay={delay + i * step} y={y}>
            {child}
          </Reveal>
        );
      })}
    </Tag>
  );
}
