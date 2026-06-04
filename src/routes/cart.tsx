import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatIDR } from "@/data/menu";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Keranjang — M.A. Dimsum Semarang" },
      { name: "description", content: "Tinjau pesanan dimsum Anda sebelum checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, totalPrice, totalItems } = useCart();

  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-bold">Keranjang Anda</h1>
      <p className="mt-2 text-muted-foreground">
        {totalItems > 0 ? `${totalItems} item dalam keranjang` : "Belum ada item — yuk pilih menu favoritmu."}
      </p>

      {items.length === 0 ? (
        <div className="mt-12 grid place-items-center text-center bg-card border border-border rounded-2xl py-16 px-6">
          <div className="h-16 w-16 grid place-items-center rounded-full bg-secondary">
            <ShoppingBag className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="mt-4 font-display text-2xl font-bold">Keranjang masih kosong</h2>
          <p className="mt-2 text-sm text-muted-foreground">Lihat menu kami dan tambahkan dimsum favoritmu.</p>
          <Link to="/menu" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold hover:bg-primary/90">
            Lihat Menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-3 gap-8">
          <ul className="lg:col-span-2 space-y-3">
            {items.map((it) => (
              <li key={it.key} className="flex gap-4 bg-card border border-border rounded-2xl p-3 sm:p-4">
                <img src={it.image} alt={it.name} className="h-24 w-24 sm:h-28 sm:w-28 rounded-xl object-cover" />
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold truncate">{it.name}</h3>
                      <p className="text-xs text-muted-foreground">Varian: {it.variantLabel}</p>
                      <p className="mt-1 text-sm font-bold text-primary">{formatIDR(it.unitPrice)}</p>
                    </div>
                    <button
                      onClick={() => remove(it.key)}
                      className="text-muted-foreground hover:text-destructive p-2 rounded-full hover:bg-destructive/10"
                      aria-label="Hapus"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(it.key, it.qty - 1)} className="h-8 w-8 grid place-items-center hover:bg-secondary rounded-l-full">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{it.qty}</span>
                      <button onClick={() => setQty(it.key, it.qty + 1)} className="h-8 w-8 grid place-items-center hover:bg-secondary rounded-r-full">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="font-display font-bold">{formatIDR(it.unitPrice * it.qty)}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-24">
            <h2 className="font-display text-xl font-bold">Ringkasan</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal ({totalItems} item)</span>
                <span>{formatIDR(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkir</span>
                <span>Dihitung saat konfirmasi</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-between items-baseline">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold text-primary">{formatIDR(totalPrice)}</span>
            </div>
            <Link
              to="/checkout"
              className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold hover:bg-primary/90"
            >
              Lanjut Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/menu" className="mt-2 w-full inline-flex items-center justify-center text-sm text-muted-foreground hover:text-primary py-2">
              + Tambah menu lain
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
}
