import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "menu-image-overrides";
const EVENT = "menu-image-overrides-changed";

type Overrides = Record<string, string>;

function read(): Overrides {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function write(o: Overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
  window.dispatchEvent(new Event(EVENT));
}

export function useMenuImage(id: string, fallback: string) {
  const [src, setSrc] = useState<string>(fallback);

  useEffect(() => {
    const sync = () => setSrc(read()[id] || fallback);
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [id, fallback]);

  const setImage = useCallback((dataUrl: string) => {
    const o = read();
    o[id] = dataUrl;
    write(o);
  }, [id]);

  const resetImage = useCallback(() => {
    const o = read();
    delete o[id];
    write(o);
  }, [id]);

  const hasOverride = src !== fallback;

  return { src, setImage, resetImage, hasOverride };
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}