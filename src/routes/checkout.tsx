import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatIDR } from "@/data/menu";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — M.A. Dimsum Semarang" },
      { name: "description", content: "Selesaikan pesanan dimsum dan konfirmasi via WhatsApp." },
    ],
  }),
  component: CheckoutPage,
});

// Nomor WhatsApp tujuan pesanan (ganti sesuai owner)
const WA_NUMBER = "6281234567890";

function CheckoutPage() {
  const { items, totalPrice, totalItems, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });
  const [sent, setSent] = useState(false);

  if (items.length === 0 && !sent) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl font-bold">Keranjang kosong</h1>
        <p className="mt-2 text-muted-foreground">Tambahkan menu sebelum checkout.</p>
        <Link to="/menu" className="mt-6 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold">
          Lihat Menu
        </Link>
      </section>
    );
  }

  if (sent) {
    return (
      <section className="mx-auto max-w-xl px-4 py-20 text-center">
        <div className="mx-auto h-16 w-16 grid place-items-center rounded-full bg-primary/10 text-primary">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold">Pesanan diteruskan ke WhatsApp!</h1>
        <p className="mt-3 text-muted-foreground">
          Terima kasih, <span className="font-semibold text-foreground">{form.name || "Sahabat Dimsum"}</span>. Pesanan Anda sedang diproses.
          Mohon selesaikan konfirmasi di WhatsApp untuk total tagihan & instruksi pembayaran.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/menu" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full font-semibold">
            Pesan lagi
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 border border-border px-6 py-3 rounded-full font-semibold hover:bg-secondary">
            Ke Beranda
          </Link>
        </div>
      </section>
    );
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*Pesanan Baru — M.A. Dimsum Semarang*`,
      ``,
      `Nama: ${form.name}`,
      `WhatsApp: ${form.phone}`,
      form.address ? `Alamat: ${form.address}` : null,
      form.note ? `Catatan: ${form.note}` : null,
      ``,
      `*Detail Pesanan:*`,
      ...items.map((it, i) => `${i + 1}. ${it.name} (${it.variantLabel}) x${it.qty} — ${formatIDR(it.unitPrice * it.qty)}`),
      ``,
      `*Total: ${formatIDR(totalPrice)}*`,
      ``,
      `Mohon konfirmasi ketersediaan & instruksi pembayaran. Terima kasih 🙏`,
    ].filter(Boolean).join("\n");

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
    window.open(url, "_blank");
    setSent(true);
    clear();
    setTimeout(() => navigate({ to: "/" }), 8000);
  };

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="font-display text-4xl md:text-5xl font-bold">Checkout</h1>
      <p className="mt-2 text-muted-foreground">Lengkapi data berikut. Pesanan akan diteruskan ke WhatsApp untuk konfirmasi.</p>

      <form onSubmit={onSubmit} className="mt-8 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4 bg-card border border-border rounded-2xl p-6">
          <h2 className="font-display text-xl font-bold">Data Pelanggan</h2>
          <Field label="Nama Lengkap" required>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="cth. Budi Santoso"
              className="input"
            />
          </Field>
          <Field label="Nomor WhatsApp" required>
            <input
              required
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="cth. 0812-3456-7890"
              className="input"
            />
          </Field>
          <Field label="Alamat Pengiriman (opsional)">
            <textarea
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              rows={3}
              placeholder="Alamat lengkap untuk pengiriman"
              className="input resize-none"
            />
          </Field>
          <Field label="Catatan (opsional)">
            <input
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="cth. tanpa saus, pedas, dll."
              className="input"
            />
          </Field>
        </div>

        <aside className="bg-card border border-border rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold">Ringkasan Pesanan</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {items.map((it) => (
              <li key={it.key} className="flex gap-3">
                <img src={it.image} alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{it.name}</div>
                  <div className="text-xs text-muted-foreground">{it.variantLabel} × {it.qty}</div>
                </div>
                <div className="font-semibold">{formatIDR(it.unitPrice * it.qty)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-border text-sm space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Item</span><span>{totalItems}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2">
              <span className="font-semibold">Total</span>
              <span className="font-display text-2xl font-bold text-primary">{formatIDR(totalPrice)}</span>
            </div>
          </div>
          <button type="submit" className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity">
            <MessageCircle className="h-5 w-5" /> Konfirmasi via WhatsApp
          </button>
          <p className="mt-3 text-[11px] text-muted-foreground text-center">
            Anda akan diarahkan ke WhatsApp untuk konfirmasi pesanan & pembayaran.
          </p>
        </aside>
      </form>

      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          font-size: 0.95rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--color-primary) 18%, transparent);
        }
      `}</style>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}
