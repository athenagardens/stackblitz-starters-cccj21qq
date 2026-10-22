"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../components/CartContext";

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("collection");
  const [address, setAddress] = useState("");
  const [reference, setReference] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const shipping = delivery === "delivery" && totalPrice >= 200 ? 30 : 0;
  const grandTotal = totalPrice + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !reference) {
      alert("Please fill in your name, phone number and payment reference.");
      return;
    }

    // Save order
    const order = {
      id: Date.now().toString(),
      date: new Date().toLocaleString(),
      name,
      phone,
      delivery,
      address,
      reference,
      items: cart,
      total: grandTotal,
      status: "Pending",
    };

    const existingOrders = JSON.parse(localStorage.getItem("saina-orders") || "[]");
    existingOrders.push(order);
    localStorage.setItem("saina-orders", JSON.stringify(existingOrders));

    // Reduce stock
    const stockData = JSON.parse(localStorage.getItem("saina-stock") || "[]");
    cart.forEach((item) => {
      const product = stockData.find((p: any) => p.id === item.id);
      if (product) {
        product.stock = Math.max(0, product.stock - item.quantity);
      }
    });
    localStorage.setItem("saina-stock", JSON.stringify(stockData));

    clearCart();
    setSubmitted(true);
  };

  if (cart.length === 0 && !submitted) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif mb-4">Your cart is empty</h1>
          <Link href="/shop" className="bg-[#2F3E2F] text-white px-6 py-3 rounded-lg">Go to Shop</Link>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <div className="max-w-md bg-white p-8 rounded-2xl text-center shadow">
          <h1 className="text-2xl font-serif text-[#2F3E2F] mb-4">Order Received!</h1>
          <p className="mb-4">Thank you {name}. We have received your order and payment reference.</p>
          <p className="text-sm text-gray-600 mb-6">We will confirm your payment shortly and arrange collection or delivery.</p>
          <Link href="/" className="bg-[#2F3E2F] text-white px-6 py-3 rounded-lg">Back to Home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-serif text-[#2F3E2F] mb-8">Checkout</h1>

        <div className="bg-white rounded-xl p-6 border mb-6">
          <h2 className="font-medium mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm mb-2">
              <span>{item.name} ({item.size}) × {item.quantity}</span>
              <span>P {item.price * item.quantity}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex justify-between font-medium">
            <span>Subtotal</span>
            <span>P {totalPrice}</span>
          </div>
          {shipping > 0 && (
            <div className="flex justify-between text-sm mt-1">
              <span>Delivery</span>
              <span>P {shipping}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-semibold mt-2 text-[#2F3E2F]">
            <span>Total</span>
            <span>P {grandTotal}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 border space-y-4">
          <div>
            <label className="block text-sm mb-1">Full Name *</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm mb-1">WhatsApp / Phone Number *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+267 7X XXX XXX" className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <div>
            <label className="block text-sm mb-1">How would you like to receive your order?</label>
            <select value={delivery} onChange={(e) => setDelivery(e.target.value)} className="w-full border rounded-lg px-3 py-2">
              <option value="collection">Collection at Athena Gardens (Free)</option>
              <option value="delivery">Delivery within Gaborone (P30 – min order P200)</option>
            </select>
          </div>

          {delivery === "delivery" && (
            <div>
              <label className="block text-sm mb-1">Delivery Address</label>
              <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={3} />
            </div>
          )}

          <div className="bg-[#F8F5F0] rounded-lg p-4 text-sm">
            <h3 className="font-medium mb-2">Payment Instructions</h3>
            <p className="mb-2">Please pay the total of <strong>P {grandTotal}</strong> using one of these methods:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Orange Money / MyZaka:</strong> 267 74 501 880</li>
              <li>
                <strong>Absa Bank</strong><br />
                Account Name: Saina Naturals<br />
                Account Number: 12345<br />
                Branch Code: 14445
              </li>
            </ul>
            <p className="mt-3 text-xs text-gray-600">Use your name as the payment reference.</p>
          </div>

          <div>
            <label className="block text-sm mb-1">Payment Transaction Reference *</label>
            <input type="text" value={reference} onChange={(e) => setReference(e.target.value)} placeholder="Enter the reference from your payment" className="w-full border rounded-lg px-3 py-2" required />
          </div>

          <button type="submit" className="w-full bg-[#2F3E2F] text-white py-3 rounded-lg font-medium">
            Submit Order
          </button>
        </form>
      </div>
    </main>
  );
}