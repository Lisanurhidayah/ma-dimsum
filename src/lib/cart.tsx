import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  key: string; // productId + variantLabel
  productId: string;
  name: string;
  variantLabel: string;
  unitPrice: number;
  qty: number;
  image: string;
};

type CartCtx = {
  items: CartItem[];
  add: (i: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  totalItems: number;
  totalPrice: number;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "ma-dimsum-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (i, qty = 1) =>
      setItems((cur) => {
        const found = cur.find((c) => c.key === i.key);
        if (found) return cur.map((c) => (c.key === i.key ? { ...c, qty: c.qty + qty } : c));
        return [...cur, { ...i, qty }];
      }),
    setQty: (key, qty) =>
      setItems((cur) => cur.map((c) => (c.key === key ? { ...c, qty: Math.max(1, qty) } : c))),
    remove: (key) => setItems((cur) => cur.filter((c) => c.key !== key)),
    clear: () => setItems([]),
    totalItems: items.reduce((s, c) => s + c.qty, 0),
    totalPrice: items.reduce((s, c) => s + c.qty * c.unitPrice, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
