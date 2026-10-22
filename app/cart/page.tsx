"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../components/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#F8F5F0]">
        <header className="bg-[#F3EEE6] border-b border-[#EDE6DC] py-4">
          <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
            <Link href="/" className="font-serif text-xl text-[#2F3E2F]">
              Saina Naturals
            </Link>
            <Link href="/shop" className="text-sm text-[#2F3E2F]">
              Continue Shopping
            </Link>
          </div>
        </header>

        <div className="max-w-md mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-serif text-[#2F3E2F] mb-4">
            Your cart is empty
          </h1>
          <Link
            href="/shop"
            className="inline-block bg-[#2F3E2F] text-white px-6 py-3 rounded-lg"
          >
            Go to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <header className="bg-[#F3EEE6] border-b border-[#EDE6DC] py-4 sticky top-0">
        <div className="max-w-4xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="font-serif text-xl text-[#2F3E2F]">
            Saina Naturals
          </Link>
          <Link href="/shop" className="text-sm text-[#2F3E2F]">
            Continue Shopping
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif text-[#2F3E2F]">
            Cart ({totalItems})
          </h1>
          <button onClick={clearCart} className="text-sm text-red-600">
            Clear
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="bg-white rounded-xl p-4 border border-[#EDE6DC] flex gap-4"
            >
              <div className="w-16 h-16 bg-[#EDE6DC] rounded-lg flex items-center justify-center">
                <Image
                  src={`https://raw.githubusercontent.com/athenagardens/Saina-Naturals/main/assets/${item.image}`}
                  alt={item.name}
                  width={60}
                  height={60}
                  className="object-contain"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-[#2F3E2F]">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.size}</p>
                <p className="text-[#A65D3F] mt-1">
                  P {item.price} × {item.quantity} = P {item.price * item.quantity}
                </p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                    className="w-7 h-7 border rounded-full"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                    className="w-7 h-7 border rounded-full"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="ml-auto text-sm text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-6 border border-[#EDE6DC]">
          <div className="flex justify-between text-lg mb-4">
            <span>Subtotal</span>
            <span className="font-semibold">P {totalPrice}</span>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-[#2F3E2F] text-white py-3 rounded-lg font-medium"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </main>
  );
}