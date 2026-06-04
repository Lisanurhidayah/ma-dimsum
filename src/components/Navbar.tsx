import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/cart", label: "Keranjang" },
] as const;

export function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center h-9 w-9 rounded-full bg-primary text-primary-foreground font-display font-bold">
            M
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            M.A. <span className="text-primary">Dimsum</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors data-[status=active]:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            className="relative grid place-items-center h-10 w-10 rounded-full bg-secondary hover:bg-accent transition-colors"
            aria-label="Keranjang"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 grid place-items-center text-[11px] font-bold rounded-full bg-primary text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden grid place-items-center h-10 w-10 rounded-full bg-secondary"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-3 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-sm font-medium text-muted-foreground hover:text-primary data-[status=active]:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
