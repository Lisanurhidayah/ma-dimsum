import { createFileRoute } from "@tanstack/react-router";
import { MENU } from "@/data/menu";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — M.A. Dimsum Semarang" },
      { name: "description", content: "Daftar menu dimsum ayam M.A. Dimsum Semarang: original, mentai, salted egg, dan goreng." },
      { property: "og:title", content: "Menu — M.A. Dimsum Semarang" },
      { property: "og:description", content: "Pilih dimsum ayam favorit Anda." },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Menu Lengkap</span>
        <h1 className="mt-3 font-display text-5xl md:text-6xl font-bold">Daftar Dimsum</h1>
        <p className="mt-4 text-muted-foreground">
          Pilih varian dan jumlah sesuai selera. Tambahkan ke keranjang, lalu lanjutkan ke checkout untuk konfirmasi via WhatsApp.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {MENU.map((item) => <ProductCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
