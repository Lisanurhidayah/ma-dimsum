import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Flame, Truck, Sparkles } from "lucide-react";
import hero from "@/assets/hero-dimsum.jpg";
import { MENU } from "@/data/menu";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "M.A. Dimsum Semarang — Dimsum Ayam Homemade Fresh" },
      { name: "description", content: "Dimsum ayam original, mentai, salted egg, dan goreng homemade khas Semarang. Pesan sekarang via WhatsApp." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-background to-secondary" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Fresh Setiap Hari
            </span>
            <h1 className="mt-4 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance">
              M.A. Dimsum
              <span className="block text-primary">Semarang</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              Cita rasa autentik dimsum ayam buatan tangan. Dikukus dengan resep keluarga, dari dapur kami langsung ke meja Anda.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="group inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Lihat Menu
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3.5 rounded-full font-semibold hover:bg-foreground/85 transition-colors"
              >
                Pesan via WhatsApp
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              {[
                { icon: Flame, label: "Homemade", sub: "Resep keluarga" },
                { icon: Truck, label: "Pengiriman", sub: "Cepat & rapi" },
                { icon: Sparkles, label: "Halal", sub: "100% ayam" },
              ].map((f) => (
                <div key={f.label} className="text-center">
                  <div className="mx-auto h-10 w-10 grid place-items-center rounded-full bg-accent text-accent-foreground">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="mt-2 text-sm font-semibold">{f.label}</div>
                  <div className="text-xs text-muted-foreground">{f.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10 blur-2xl" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-background">
              <img
                src={hero}
                alt="Dimsum ayam khas M.A. Dimsum Semarang"
                width={1600}
                height={1024}
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-2xl shadow-xl p-4 hidden sm:block">
              <div className="text-xs text-muted-foreground">Mulai dari</div>
              <div className="font-display text-2xl font-bold text-primary">Rp 5.000</div>
              <div className="text-[10px] text-muted-foreground">/pcs</div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Menu Favorit</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-bold">Pilih dimsum kesukaan Anda</h2>
          </div>
          <Link to="/menu" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all">
            Lihat semua menu <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MENU.map((item) => <ProductCard key={item.id} item={item} />)}
        </div>
      </section>
    </>
  );
}
