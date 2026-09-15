"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ------------------------------ reduced motion ----------------------------- */

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

/* ---------------------------------- Reveal --------------------------------- */

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "mask" | "fade";
};

/** Scroll-triggered reveal. `mask` = line-mask rise, `up` = fade+rise. */
export function Reveal({ children, className = "", delay = 0, variant = "up" }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const style = { "--rd": `${delay}ms` } as CSSProperties;

  if (variant === "mask") {
    return (
      <div ref={ref} className={`mask ${inView ? "is-in" : ""} ${className}`} style={style}>
        <span className="mask-inner">{children}</span>
      </div>
    );
  }
  if (variant === "fade") {
    return (
      <div
        ref={ref}
        className={`${inView ? "is-in" : ""} ${className}`}
        style={{ ...style, opacity: inView ? 1 : 0, transition: `opacity .9s ease ${delay}ms` }}
      >
        {children}
      </div>
    );
  }
  return (
    <div ref={ref} className={`reveal ${inView ? "is-in" : ""} ${className}`} style={style}>
      {children}
    </div>
  );
}

/* --------------------------------- Scramble -------------------------------- */

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01";

type ScrambleProps = {
  text: string;
  className?: string;
  delay?: number;
};

/** Decode-style text scramble. Falls back to plain text under reduced motion. */
export function Scramble({ text, className = "", delay = 0 }: ScrambleProps) {
  const { ref, inView } = useInView<HTMLSpanElement>("0px");
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!inView || reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const queue = text.split("").map((ch, i) => ({
      ch,
      start: i * 2 + Math.floor(Math.random() * 5),
      end: i * 2 + 12 + Math.floor(Math.random() * 10),
    }));
    const maxEnd = Math.max(...queue.map((q) => q.end));

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        frame += 1;
        const next = queue
          .map((q) => {
            if (q.ch === " ") return " ";
            if (frame >= q.end) return q.ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join("");
        setOut(next);
        if (frame > maxEnd && interval) clearInterval(interval);
      }, 28);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [inView, reduced, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {out}
    </span>
  );
}
