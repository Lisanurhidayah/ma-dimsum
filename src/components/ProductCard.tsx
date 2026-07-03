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
    <article className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={src}
          alt={item.name}
          loading="lazy"
          width={800}
          height={800}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
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
