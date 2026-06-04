import original from "@/assets/dimsum-original.jpg";
import mentai from "@/assets/dimsum-mentai.jpg";
import saltedEgg from "@/assets/dimsum-salted-egg.jpg";
import goreng from "@/assets/dimsum-goreng.jpg";

export type Variant = { label: string; qty: number; price: number };

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  image: string;
  variants: Variant[];
};

export const MENU: MenuItem[] = [
  {
    id: "ayam-original",
    name: "Dimsum Ayam Original",
    description: "Siomay ayam klasik dengan kulit kuning lembut, racikan rempah autentik.",
    image: original,
    variants: [
      { label: "1 pcs", qty: 1, price: 5000 },
      { label: "4 pcs", qty: 4, price: 18000 },
      { label: "6 pcs", qty: 6, price: 25000 },
    ],
  },
  {
    id: "ayam-mentai",
    name: "Dimsum Ayam Mentai",
    description: "Siomay ayam disiram saus mentai creamy gurih, dibakar hingga harum.",
    image: mentai,
    variants: [
      { label: "4 pcs", qty: 4, price: 24000 },
      { label: "6 pcs", qty: 6, price: 32000 },
    ],
  },
  {
    id: "ayam-salted-egg",
    name: "Dimsum Ayam Salted Egg",
    description: "Topping saus telur asin kental, perpaduan gurih manis yang khas.",
    image: saltedEgg,
    variants: [
      { label: "1 pcs", qty: 1, price: 7000 },
      { label: "4 pcs", qty: 4, price: 26000 },
      { label: "6 pcs", qty: 6, price: 38000 },
    ],
  },
  {
    id: "ayam-goreng",
    name: "Dimsum Ayam Goreng",
    description: "Digoreng renyah keemasan, disajikan dengan saus sambal spesial.",
    image: goreng,
    variants: [
      { label: "1 pcs", qty: 1, price: 6000 },
      { label: "4 pcs", qty: 4, price: 20000 },
      { label: "6 pcs", qty: 6, price: 28000 },
    ],
  },
];

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(n);
