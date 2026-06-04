import { Phone, MapPin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="font-display text-xl font-bold">
            M.A. <span className="text-primary">Dimsum Semarang</span>
          </h3>
          <p className="mt-3 text-sm text-muted-foreground max-w-xs">
            Dimsum ayam homemade, fresh setiap hari. Dikukus dengan resep keluarga sejak hari pertama.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold mb-3">Kontak</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +62 889-8834-8141</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Semarang, Jawa Tengah</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-primary" /> @ma.dimsum.smg</li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="font-semibold mb-3">Jam Operasional</h4>
          <ul className="space-y-1 text-muted-foreground whitespace-pre-line">
            <li>Jumat       08.00 - 18.00</li>
            <li>{"Sabtu       08.00 - 18.00\nMinggu    08.00 - 18.00"}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} M.A. Dimsum Semarang. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
