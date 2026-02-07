"use client";

import { createContext, useContext, useCallback, useSyncExternalStore } from "react";

export type LanguageCode =
  | "ja"
  | "en"
  | "zh"
  | "ko"
  | "fr"
  | "de"
  | "es"
  | "it"
  | "th"
  | "vi"
  | "id"
  | "pt"
  | "tl"
  | "ms"
  | "zh-TW";

const STORAGE_KEY = "app-language";
const VALID_LANGUAGES: LanguageCode[] = [
  "ja", "en", "zh", "ko", "fr", "de", "es", "it", "th", "vi", "id", "pt", "tl", "ms", "zh-TW",
];

type LanguageContextValue = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
};

const defaultValue: LanguageContextValue = {
  language: "ja",
  setLanguage: () => {},
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

function getStoredLanguage(): LanguageCode {
  if (typeof window === "undefined") return "ja";
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && VALID_LANGUAGES.includes(stored as LanguageCode)) return stored as LanguageCode;
  return "ja";
}

let currentLanguage: LanguageCode = "ja";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  if (typeof window !== "undefined" && listeners.size === 0) {
    currentLanguage = getStoredLanguage();
  }
  listeners.add(listener);
  if (typeof window !== "undefined") {
    listener();
  }
  return () => listeners.delete(listener);
}

function getSnapshot(): LanguageCode {
  return currentLanguage;
}

function getServerSnapshot(): LanguageCode {
  return "ja";
}

function setLanguageStore(lang: LanguageCode) {
  if (currentLanguage === lang) return;
  currentLanguage = lang;
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lang);
  }
  listeners.forEach((listener) => listener());
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const language = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const setLanguage = useCallback((lang: LanguageCode) => setLanguageStore(lang), []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  return ctx ?? defaultValue;
}
