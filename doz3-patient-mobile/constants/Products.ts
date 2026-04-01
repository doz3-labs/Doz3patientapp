import type { Product } from "../types";

export const PRODUCT_CATEGORIES = [
  "All",
  "Medicines",
  "Wellness",
  "Ayurveda",
  "Personal Care",
  "Baby Care",
  "Devices",
  "FMCG",
] as const;

export const PRODUCTS: Product[] = [
  { id: "p1", name: "Crocin Advance 500mg", brand: "Crocin", price: 30, originalPrice: 38, category: "Medicines", inStock: true, description: "Paracetamol 500mg tablets for fever and pain relief" },
  { id: "p2", name: "Dolo 650mg", brand: "Micro Labs", price: 28, originalPrice: 35, category: "Medicines", inStock: true, description: "Paracetamol 650mg tablets" },
  { id: "p3", name: "Combiflam Tablet", brand: "Sanofi", price: 38, originalPrice: 45, category: "Medicines", inStock: true, description: "Ibuprofen + Paracetamol combination" },
  { id: "p4", name: "Revital H Capsules", brand: "Sun Pharma", price: 420, originalPrice: 495, category: "Wellness", inStock: true, description: "Daily multivitamin with minerals and ginseng" },
  { id: "p5", name: "Shelcal 500mg", brand: "Torrent", price: 165, originalPrice: 195, category: "Wellness", inStock: true, description: "Calcium + Vitamin D3 supplement" },
  { id: "p6", name: "Becosules Capsule", brand: "Pfizer", price: 35, originalPrice: 42, category: "Wellness", inStock: true, description: "Vitamin B complex with Vitamin C" },
  { id: "p7", name: "Zincovit Tablet", brand: "Apex", price: 115, originalPrice: 135, category: "Wellness", inStock: true, description: "Multivitamin with zinc and grape seed extract" },
  { id: "p8", name: "Himalaya Liv.52 DS", brand: "Himalaya", price: 185, originalPrice: 220, category: "Ayurveda", inStock: true, description: "Liver health supplement" },
  { id: "p9", name: "Chyawanprash 500g", brand: "Dabur", price: 265, originalPrice: 310, category: "Ayurveda", inStock: true, description: "Immunity boosting ayurvedic formulation" },
  { id: "p10", name: "Ashwagandha Capsules", brand: "Himalaya", price: 230, originalPrice: 275, category: "Ayurveda", inStock: true, description: "Stress relief and energy booster" },
  { id: "p11", name: "Dabur Honey 500g", brand: "Dabur", price: 225, originalPrice: 279, category: "FMCG", inStock: true, description: "100% pure natural honey" },
  { id: "p12", name: "Sensodyne Fresh Mint 150g", brand: "Sensodyne", price: 210, originalPrice: 250, category: "Personal Care", inStock: true, description: "Toothpaste for sensitive teeth" },
  { id: "p13", name: "Dettol Antiseptic 250ml", brand: "Dettol", price: 125, originalPrice: 148, category: "Personal Care", inStock: true, description: "Antiseptic liquid for first aid and hygiene" },
  { id: "p14", name: "Volini Spray 40g", brand: "Sun Pharma", price: 160, originalPrice: 190, category: "Medicines", inStock: true, description: "Pain relief spray for muscle and joint pain" },
  { id: "p15", name: "Omron Blood Pressure Monitor", brand: "Omron", price: 1850, originalPrice: 2200, category: "Devices", inStock: true, description: "Digital BP monitor for home use" },
  { id: "p16", name: "Accu-Chek Active Glucometer", brand: "Roche", price: 980, originalPrice: 1200, category: "Devices", inStock: true, description: "Blood glucose monitoring system" },
  { id: "p17", name: "Johnson's Baby Powder 200g", brand: "Johnson & Johnson", price: 145, originalPrice: 172, category: "Baby Care", inStock: true, description: "Gentle baby powder" },
  { id: "p18", name: "Cerelac Wheat 300g", brand: "Nestle", price: 220, originalPrice: 260, category: "Baby Care", inStock: true, description: "Baby cereal for 6+ months" },
  { id: "p19", name: "Benadryl Cough Syrup 100ml", brand: "Johnson & Johnson", price: 95, originalPrice: 112, category: "Medicines", inStock: true, description: "Cough suppressant syrup" },
  { id: "p20", name: "ENO Fruit Salt Lemon 5g x 6", brand: "GSK", price: 42, originalPrice: 50, category: "FMCG", inStock: true, description: "Antacid for quick relief from acidity" },
  { id: "p21", name: "Vicks VapoRub 25ml", brand: "P&G", price: 75, originalPrice: 89, category: "FMCG", inStock: true, description: "Topical cough suppressant" },
  { id: "p22", name: "Moov Cream 30g", brand: "Reckitt", price: 85, originalPrice: 100, category: "Medicines", inStock: true, description: "Pain relief cream for back and muscle pain" },
  { id: "p23", name: "Strepsils Orange 8s", brand: "Reckitt", price: 55, originalPrice: 65, category: "FMCG", inStock: true, description: "Sore throat lozenges" },
  { id: "p24", name: "ORS Electrolyte Sachets x10", brand: "WHO Formula", price: 48, originalPrice: 56, category: "Medicines", inStock: true, description: "Oral rehydration salts" },
];
