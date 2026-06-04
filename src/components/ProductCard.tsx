import { useState } from "react";
import { Plus, Check } from "lucide-react";
import { formatIDR, type MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";

export function ProductCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const v = item.variants[variantIdx];

  const handleAdd = () => {
    add({
      key: `${item.id}-${v.label}`,
      productId: item.id,
      name: item.name,
      variantLabel: v.label,
      unitPrice: v.price,
      image: item.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
          Best Seller
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold text-foreground">{item.name}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2">{item.description}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.variants.map((vr, i) => (
            <button
              key={vr.label}
              onClick={() => setVariantIdx(i)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
                i === variantIdx
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-secondary-foreground border-border hover:border-primary"
              }`}
            >
              {vr.label}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground">Harga</div>
            <div className="font-display text-2xl font-bold text-primary">{formatIDR(v.price)}</div>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-1.5 bg-foreground text-background hover:bg-primary transition-colors px-4 py-2.5 rounded-full text-sm font-semibold"
          >
            {added ? <><Check className="h-4 w-4" /> Ditambahkan</> : <><Plus className="h-4 w-4" /> Tambah</>}
          </button>
        </div>
      </div>
    </article>
  );
}
