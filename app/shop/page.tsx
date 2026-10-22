"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";

const PRODUCTS = [
  // TEAS – all 25 sachets at P80
  { id: "tea_ginger", name: "Ginger Tea", category: "Teas", desc: "Warming digestive tea. Supports digestion and circulation.", image: "ginger.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_peppermint", name: "Peppermint Tea", category: "Teas", desc: "Cooling and clarifying. Soothes the stomach.", image: "peppermint.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_moringa", name: "Moringa Tea", category: "Teas", desc: "Nutrient-dense superfood leaves.", image: "moringa.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_hibiscus", name: "Hibiscus Tea", category: "Teas", desc: "Tart floral tea for metabolic balance.", image: "hibiscus.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_avocado", name: "Avocado Leaf Tea", category: "Teas", desc: "Gentle, earthy and nourishing.", image: "avocado.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_lemongrass", name: "Lemongrass Tea", category: "Teas", desc: "Uplifting citrus notes.", image: "lemongrass.png", sizes: [{ label: "Box of 25 sachets", price: 80 }] },
  { id: "tea_variety", name: "Healing Tea Variety Pack", category: "Teas", desc: "6 different healing teas.", image: "variety.png", sizes: [{ label: "6 teas (5 each)", price: 280 }, { label: "6 teas (10 each)", price: 480 }] },
  { id: "hibiscus_loose", name: "Infused Hibiscus Flowers", category: "Teas", desc: "Best-seller. Infused with cloves & cinnamon.", image: "hibiscus_loose.png", sizes: [{ label: "250g", price: 120 }] },

  // COFFEE
  { id: "coffee_kilimanjaro", name: "Kilimanjaro Arabica", category: "Coffee", desc: "Pure Arabica beans. Clean energy.", image: "coffee.png", sizes: [{ label: "500g whole beans", price: 140 }] },

  // SNACKS
  { id: "cookies_almond", name: "Almond Seed Cookies", category: "Snacks", desc: "No sugar. No flour. Keto friendly.", image: "cookies.png", sizes: [{ label: "Pack of 8", price: 80 }, { label: "Pack of 16", price: 150 }] },
  { id: "cookies_coconut", name: "Coconut Cookies", category: "Snacks", desc: "Sugar-free & gluten-free.", image: "coconut_cookies.png", sizes: [{ label: "Pack of 8", price: 80 }, { label: "Pack of 16", price: 160 }] },
  { id: "granola_menopause", name: "Menopause Seed Granola", category: "Snacks", desc: "Hormone-supportive seed blend.", image: "menopause_granola.png", sizes: [{ label: "300g", price: 150 }, { label: "600g", price: 250 }] },
  { id: "seed_crackers", name: "Seed Crackers", category: "Snacks", desc: "Crispy flax, pumpkin & sesame.", image: "seed_crackers.png", sizes: [{ label: "Pack of 12", price: 80 }, { label: "Pack of 24", price: 160 }] },
  { id: "coconut_clusters", name: "Coconut Seed Clusters", category: "Snacks", desc: "Crunchy coconut and seed clusters.", image: "coconut_clusters.png", sizes: [{ label: "200g", price: 60 }, { label: "400g", price: 100 }] },
  { id: "butter_almond", name: "Almond Butter", category: "Snacks", desc: "100% pure almonds.", image: "almond_butter.png", sizes: [{ label: "250g", price: 60 }, { label: "350g", price: 100 }, { label: "500g", price: 195 }] },
  { id: "butter_cashew", name: "Cashew Butter", category: "Snacks", desc: "Smooth pure cashew butter.", image: "cashew_butter.png", sizes: [{ label: "250g", price: 100 }, { label: "350g", price: 150 }] },
  { id: "butter_mixed", name: "Mixed Nut Butter", category: "Snacks", desc: "Almonds, cashews, walnuts & seeds.", image: "mixed_butter.png", sizes: [{ label: "250g", price: 100 }, { label: "350g", price: 150 }] },

  // POWDERS
  { id: "flour_almond", name: "Almond Flour", category: "Powders", desc: "Finely milled. Perfect for keto baking.", image: "almond_flour.png", sizes: [{ label: "250g", price: 100 }, { label: "500g", price: 200 }] },
  { id: "flour_coconut", name: "Coconut Flour", category: "Powders", desc: "High-fibre, low-carb.", image: "coconut_flour.png", sizes: [{ label: "250g", price: 80 }, { label: "500g", price: 150 }] },
  { id: "powder_baobab", name: "Baobab Powder", category: "Powders", desc: "Vitamin C rich African superfruit.", image: "baobab.png", sizes: [{ label: "100g", price: 80 }, { label: "250g", price: 150 }] },

  // INFUSED HONEYS ONLY (sweeteners & pure honey removed)
  { id: "honey_ginger", name: "Ginger Infused Honey", category: "Honeys", desc: "Raw honey infused with ginger.", image: "honey_ginger.png", sizes: [{ label: "250g", price: 120 }] },
  { id: "honey_turmeric", name: "Turmeric Infused Honey", category: "Honeys", desc: "Raw honey infused with turmeric.", image: "honey_turmeric.png", sizes: [{ label: "250g", price: 120 }] },
  { id: "honey_lemon_cinnamon", name: "Lemon & Cinnamon Infused Honey", category: "Honeys", desc: "Supports immunity.", image: "honey_lemon_cinnamon.png", sizes: [{ label: "250g", price: 120 }] },

  // OILS
  { id: "oil_coconut", name: "Virgin Coconut Oil", category: "Oils", desc: "Cold-pressed virgin coconut oil.", image: "coconut_oil.png", sizes: [{ label: "250ml", price: 150 }] },
  { id: "oil_olive", name: "Extra Virgin Olive Oil", category: "Oils", desc: "Premium cold-pressed olive oil.", image: "olive_oil.png", sizes: [{ label: "250ml", price: 200 }] },
  { id: "oil_avocado", name: "Avocado Oil", category: "Oils", desc: "Pure cold-pressed avocado oil.", image: "avocado_oil.png", sizes: [{ label: "250ml", price: 200 }] },

  // ESSENTIAL OILS
  { id: "eo_headache", name: "Headache Relief Blend", category: "Essential Oils", desc: "Eases tension and headaches.", image: "eo_headache.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_joint", name: "Joint Pain Relief Blend", category: "Essential Oils", desc: "Supports joint comfort.", image: "eo_joint.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_stress", name: "Stress & Insomnia Blend", category: "Essential Oils", desc: "Calming for stress and sleep.", image: "eo_stress.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_menopause", name: "Menopause Support Blend", category: "Essential Oils", desc: "Balancing for menopause.", image: "eo_menopause.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_prostate", name: "Prostate Health Blend", category: "Essential Oils", desc: "Supportive for prostate wellness.", image: "eo_prostate.png", sizes: [{ label: "10ml", price: 120 }] },
  { id: "eo_flu", name: "Flu Relief Blend", category: "Essential Oils", desc: "Immune support for cold and flu.", image: "eo_flu.png", sizes: [{ label: "10ml", price: 120 }] },

  // BATHING
  { id: "bath_lavender", name: "Lavender Bathing Tea", category: "Bathing", desc: "Calming floral soak.", image: "lavender.png", sizes: [{ label: "80g", price: 85 }, { label: "150g", price: 150 }] },
  { id: "bath_chamomile", name: "Chamomile Bathing Tea", category: "Bathing", desc: "Soft soothing flowers.", image: "chamomile.png", sizes: [{ label: "80g", price: 80 }, { label: "150g", price: 140 }] },
];

const CATEGORIES = ["All", "Teas & Coffee", "Snacks & Honeys", "Powders", "Oils", "Essential Oils", "Bathing"];

export default function ShopPage() {
  const { addToCart, totalItems } = useCart();
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: string }>({});
  const [stock, setStock] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const saved = localStorage.getItem("saina-stock");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const map: { [key: string]: number } = {};
        parsed.forEach((item: any) => {
          map[item.id] = item.stock;
        });
        setStock(map);
      } catch (e) {}
    }
  }, []);

  const filtered =
    activeCategory === "All"
      ? PRODUCTS
      : activeCategory === "Teas & Coffee"
      ? PRODUCTS.filter((p) => p.category === "Teas" || p.category === "Coffee")
      : activeCategory === "Snacks & Honeys"
      ? PRODUCTS.filter((p) => p.category === "Snacks" || p.category === "Honeys")
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    const currentStock = stock[product.id];
    if (currentStock !== undefined && currentStock <= 0) {
      alert("This product is currently out of stock");
      return;
    }

    const sizeLabel = selectedSizes[product.id] || product.sizes[0].label;
    const size = product.sizes.find((s) => s.label === sizeLabel) || product.sizes[0];

    addToCart({
      id: product.id,
      name: product.name,
      size: size.label,
      price: size.price,
      quantity: 1,
      image: product.image,
    });
    alert(`${product.name} added to cart`);
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <header className="bg-[#F3EEE6] border-b border-[#EDE6DC] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl text-[#2F3E2F]">Saina Naturals</Link>
          <div className="flex gap-3 items-center">
            <Link href="/admin" className="text-sm text-[#5C6B4E]">Admin</Link>
            <Link href="/cart" className="bg-[#2F3E2F] text-white px-4 py-2 rounded-lg text-sm">
              Cart ({totalItems})
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-serif text-[#2F3E2F] mb-6">Shop All Products</h1>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === cat ? "bg-[#2F3E2F] text-white" : "bg-white border border-[#EDE6DC] text-[#2F3E2F]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => {
            const currentStock = stock[product.id];
            const isOutOfStock = currentStock !== undefined && currentStock <= 0;

            return (
              <div key={product.id} className="bg-white rounded-2xl border border-[#EDE6DC] overflow-hidden">
                <div className="h-48 bg-[#EDE6DC] flex items-center justify-center p-4 relative">
                  <Image
                    src={`https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/${product.image}`}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-contain"
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-sm px-3 py-1 rounded-full">Out of Stock</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-lg text-[#2F3E2F]">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.desc}</p>

                  {currentStock !== undefined && currentStock > 0 && currentStock < 10 && (
                    <p className="text-xs text-orange-600 mb-2">Only {currentStock} left</p>
                  )}

                  <select
                    className="w-full border rounded-lg px-3 py-2 text-sm mb-3"
                    value={selectedSizes[product.id] || product.sizes[0].label}
                    onChange={(e) => setSelectedSizes({ ...selectedSizes, [product.id]: e.target.value })}
                    disabled={isOutOfStock}
                  >
                    {product.sizes.map((s) => (
                      <option key={s.label} value={s.label}>
                        {s.label} — P {s.price}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleAdd(product)}
                    disabled={isOutOfStock}
                    className={`w-full py-2.5 rounded-lg text-sm font-medium ${
                      isOutOfStock ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-[#2F3E2F] text-white hover:bg-[#5C6B4E]"
                    }`}
                  >
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}