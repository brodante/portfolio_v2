"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { en } from "./en";
import { ja } from "./ja";
import type { Content, Locale } from "./types";

type I18nValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Content;
};

const I18nCtx = createContext<I18nValue | null>(null);

/**
 * Locale provider. First visit: auto-detects Japanese browsers
 * (navigator.language). Choice is persisted in localStorage.
 * SSR always renders English first, then swaps client-side without a flash
 * of broken layout (text-only swap).
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("spsc-locale");
    } catch {
      /* private mode */
    }
    const detected: Locale =
      saved === "ja" || saved === "en"
        ? saved
        : typeof navigator !== "undefined" &&
            navigator.language?.toLowerCase().startsWith("ja")
          ? "ja"
          : "en";
    setLocaleState(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "ja" ? "ja" : "en";
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("spsc-locale", l);
    } catch {
      /* private mode */
    }
  };

  return (
    <I18nCtx.Provider value={{ locale, setLocale, t: locale === "ja" ? ja : en }}>
      {children}
    </I18nCtx.Provider>
  );
}

export function useI18n(): I18nValue {
  const v = useContext(I18nCtx);
  if (!v) throw new Error("useI18n must be used inside <I18nProvider>");
  return v;
}

/** Renders **bold** markers as highlighted spans. */
export function Hl({ text, hlClass = "text-ink" }: { text: string; hlClass?: string }) {
  const parts = text.split("**");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <span key={i} className={hlClass}>
            {p}
          </span>
        ) : (
          <span key={i}>{p}</span>
        ),
      )}
    </>
  );
}
