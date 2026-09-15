"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { useI18n } from "@/i18n";
import {
  CloseIcon,
  GitHubIcon,
  LinkedInIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from "./ui";

export function Nav() {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    setTheme((document.documentElement.dataset.theme as "dark" | "light") || "dark");
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? h.scrollTop / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("spsc-theme", next);
    } catch {
      /* private mode */
    }
  };

  const langBtn = (l: "en" | "ja", label: string) => (
    <button
      onClick={() => setLocale(l)}
      aria-pressed={locale === l}
      className={`mono px-2 py-1 text-[10px] tracking-[0.12em] transition-colors duration-300 ${
        locale === l ? "bg-accent text-accent-ink" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 glass border-b border-line">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-5 md:px-10">
          <Link href="/#top" className="mono text-sm tracking-tight flex items-center gap-1" onClick={() => setOpen(false)}>
            <span className="text-accent">spsc</span>
            <span className="text-muted">://</span>
            <span className="font-semibold">portfolio</span>
            <span className="cursor-blink text-accent">▍</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label="Primary">
            {t.nav.map((l) => (
              <Link key={l.id} href={`/#${l.id}`} className="mono u-link text-xs uppercase tracking-[0.2em] text-muted hover:text-ink transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            {/* language switch */}
            <div className="flex border border-line" role="group" aria-label="Language / 言語">
              {langBtn("en", "EN")}
              {langBtn("ja", "日本語")}
            </div>
            <button
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="grid h-9 w-9 place-items-center border border-line text-muted transition-all duration-300 hover:border-accent hover:text-accent hover:rotate-12"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="hidden sm:grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="grid h-9 w-9 place-items-center border border-line text-muted transition-colors hover:border-accent hover:text-accent lg:hidden"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        {/* scroll progress */}
        <div
          className="absolute bottom-[-1px] left-0 h-[2px] bg-accent transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
          aria-hidden="true"
        />
      </header>

      {/* mobile overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 glass bg-bg/90" />
        <nav className="relative flex h-full flex-col justify-center px-8 pt-16" aria-label="Mobile">
          {t.nav.map((l, i) => (
            <Link
              key={l.id}
              href={`/#${l.id}`}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-line py-4 transition-all duration-500"
              style={{
                transitionDelay: `${i * 45}ms`,
                transform: open ? "none" : "translateY(14px)",
                opacity: open ? 1 : 0,
              }}
            >
              <span className="mono text-xs text-accent">0{i + 1}</span>
              <span className="display text-3xl group-hover:text-accent transition-colors">
                {l.label}
              </span>
            </Link>
          ))}
          <div className="mt-8 flex items-center gap-5 text-muted">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-accent transition-colors">
              <GitHubIcon />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-accent transition-colors">
              <LinkedInIcon />
            </a>
            <span className="mono text-xs break-all">{profile.email}</span>
          </div>
        </nav>
      </div>
    </>
  );
}
