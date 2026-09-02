"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "celebration.itinerary.v1";
const EVENT = "celebration:itinerary";

let cache: string[] = [];
let cacheRaw: string | null = null;

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === cacheRaw) return cache;
    cacheRaw = raw;
    cache = raw ? (JSON.parse(raw) as string[]) : [];
    if (!Array.isArray(cache)) cache = [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(keys: string[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(keys));
  } catch {
    /* storage unavailable — favourites simply don't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

const EMPTY: string[] = [];

/**
 * "My Celebration" — the guest's chosen activities, kept in localStorage.
 * No login, no server. Returns an empty list during SSR and the first
 * client render so the markup always matches.
 */
export function useItinerary() {
  const keys = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggle = useCallback((key: string) => {
    const current = read();
    write(current.includes(key) ? current.filter((k) => k !== key) : [...current, key]);
  }, []);

  const remove = useCallback((key: string) => {
    write(read().filter((k) => k !== key));
  }, []);

  const clear = useCallback(() => write([]), []);

  const has = useCallback((key: string) => keys.includes(key), [keys]);

  return { keys, toggle, remove, clear, has, count: keys.length };
}

/** True once the component has mounted — use to avoid hydration mismatches. */
export function useMounted() {
  const subscribeNoop = useCallback(() => () => {}, []);
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
  useEffect(() => {}, []);
  return mounted;
}
