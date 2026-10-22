import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8F5F0] text-[#2A2A2A]">
      {/* Header */}
      <header className="bg-[#F3EEE6] border-b border-[#EDE6DC] sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/saina_logo.png"
              alt="Saina Naturals"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-xl font-serif font-semibold text-[#2F3E2F]">
                Saina Naturals
              </h1>
              <p className="text-xs text-[#5C6B4E]">Athena Gardens, Notwane</p>
            </div>
          </div>

          <Link
            href="/cart"
            className="bg-[#2F3E2F] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#5C6B4E] transition"
          >
            View Cart
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-serif text-[#2F3E2F] mb-4">
          Saina Naturals
        </h2>
        <p className="text-xl text-[#5C6B4E] font-serif mb-6">
          Clean. Healing. Naturally Nourishing.
        </p>
        <p className="max-w-2xl mx-auto text-[#2A2A2A] mb-8">
          Keto-friendly • Diabetic-conscious • Hormone supportive • Sugar-free & Gluten-free options.
          From our best-selling infused hibiscus and menopause seed granola to pure teas, flours, natural oils and essential oil blends.
        </p>

        <Link
          href="/shop"
          className="inline-block bg-[#2F3E2F] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#5C6B4E] transition"
        >
          Browse Products
        </Link>
      </section>

      {/* Featured */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h3 className="text-2xl font-serif text-[#2F3E2F] mb-8 text-center">
          Featured Products
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-5 border border-[#EDE6DC] shadow-sm">
            <div className="h-40 bg-[#EDE6DC] rounded-xl mb-4 flex items-center justify-center">
              <Image
                src="https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/hibiscus_loose.png"
                alt="Infused Hibiscus"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
            <h4 className="font-serif text-lg text-[#2F3E2F]">Infused Hibiscus</h4>
            <p className="text-sm text-gray-600 mb-2">Best Seller</p>
            <p className="text-[#A65D3F] font-serif text-xl">from P 120</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EDE6DC] shadow-sm">
            <div className="h-40 bg-[#EDE6DC] rounded-xl mb-4 flex items-center justify-center">
              <Image
                src="https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/menopause_granola.png"
                alt="Menopause Granola"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
            <h4 className="font-serif text-lg text-[#2F3E2F]">Menopause Granola</h4>
            <p className="text-sm text-gray-600 mb-2">Hormone supportive</p>
            <p className="text-[#A65D3F] font-serif text-xl">from P 125</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EDE6DC] shadow-sm">
            <div className="h-40 bg-[#EDE6DC] rounded-xl mb-4 flex items-center justify-center">
              <Image
                src="https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/coconut_cookies.png"
                alt="Coconut Cookies"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
            <h4 className="font-serif text-lg text-[#2F3E2F]">Coconut Cookies</h4>
            <p className="text-sm text-gray-600 mb-2">Sugar & Gluten free</p>
            <p className="text-[#A65D3F] font-serif text-xl">from P 95</p>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#EDE6DC] shadow-sm">
            <div className="h-40 bg-[#EDE6DC] rounded-xl mb-4 flex items-center justify-center">
              <Image
                src="https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/honey_lemon_cinnamon.png"
                alt="Lemon Cinnamon Honey"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>
            <h4 className="font-serif text-lg text-[#2F3E2F]">Lemon Cinnamon Honey</h4>
            <p className="text-sm text-gray-600 mb-2">Immunity & warmth</p>
            <p className="text-[#A65D3F] font-serif text-xl">from P 115</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F3EEE6] border-t border-[#EDE6DC] py-8 text-center text-sm text-[#5C6B4E]">
        <p>Saina Naturals · Athena Gardens, Notwane, Gaborone</p>
        <p className="mt-1">Orange Money / MyZaka · Absa Bank Transfer</p>
      </footer>
    </main>
  );
}