import { useRef, useState } from "react";
import { Plus, Check, Camera, RotateCcw } from "lucide-react";
import { formatIDR, type MenuItem } from "@/data/menu";
import { useCart } from "@/lib/cart";
import { useMenuImage, fileToDataUrl } from "@/lib/menuImages";

export function ProductCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  const [variantIdx, setVariantIdx] = useState(0);
  const [added, setAdded] = useState(false);
  const v = item.variants[variantIdx];
  const { src, setImage, resetImage, hasOverride } = useMenuImage(item.id, item.image);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      alert("Ukuran gambar maksimal 3MB");
      return;
    }
    const dataUrl = await fileToDataUrl(file);
    setImage(dataUrl);
    e.target.value = "";
  };

  const handleAdd = () => {
    add({
      key: `${item.id}-${v.label}`,
      productId: item.id,
      name: item.name,
      variantLabel: v.label,
      unitPrice: v.price,
      image: src,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card border border-gold/30 shadow-[0_4px_20px_-5px_rgba(92,32,24,0.15)] hover:shadow-[0_10px_30px_-8px_rgba(92,32,24,0.25)] hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3 bg-gold text-gold-foreground text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm shadow-sm">
          Best Seller
        </div>
        <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
          {hasOverride && (
            <button
              type="button"
              onClick={resetImage}
              title="Kembalikan gambar asli"
              className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-background/90 text-foreground hover:bg-background shadow-sm"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            title="Ganti gambar"
            className="inline-flex items-center gap-1 h-8 px-3 rounded-full bg-background/90 text-foreground hover:bg-background text-xs font-semibold shadow-sm"
          >
            <Camera className="h-4 w-4" /> Ganti
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-display text-[22px] leading-tight text-primary">{item.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{item.description}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.variants.map((vr, i) => (
            <button
              key={vr.label}
              onClick={() => setVariantIdx(i)}
              className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                i === variantIdx
                  ? "bg-muted-foreground text-primary-foreground border-muted-foreground shadow-sm"
                  : "bg-transparent text-muted-foreground border-muted-foreground/60 hover:bg-muted-foreground hover:text-primary-foreground"
              }`}
            >
              {vr.label}
            </button>
          ))}
        </div>

        <div className="mt-6 pt-5 flex items-end justify-between border-t border-gold/25">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Harga</div>
            <div className="font-sans text-xl font-bold text-primary mt-0.5">{formatIDR(v.price)}</div>
          </div>
          <button
            onClick={handleAdd}
            aria-label={added ? "Ditambahkan" : "Tambah ke keranjang"}
            className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-accent text-accent-foreground hover:bg-muted-foreground shadow-[0_4px_12px_rgba(212,132,42,0.4)] hover:-translate-y-1 transition-all duration-300"
          >
            {added ? <Check className="h-5 w-5" strokeWidth={2.5} /> : <Plus className="h-5 w-5" strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </article>
  );
}
