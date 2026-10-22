"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type OrderItem = {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  date: string;
  name: string;
  phone: string;
  delivery: string;
  address: string;
  reference: string;
  items: OrderItem[];
  total: number;
  status: "Pending" | "Paid" | "Processing" | "Out for Delivery" | "Delivered" | "Cancelled";
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("saina-orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    localStorage.setItem("saina-orders", JSON.stringify(updated));
  };

  const updateStatus = (orderId: string, status: Order["status"]) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status } : o
    );
    saveOrders(updated);
    if (selectedOrder?.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status });
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "saina2026") {
      setIsLoggedIn(true);
    } else {
      alert("Wrong password");
    }
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter((o) => o.status === filter);

  const totalSales = orders
    .filter((o) => ["Paid", "Processing", "Out for Delivery", "Delivered"].includes(o.status))
    .reduce((sum, o) => sum + o.total, 0);

  const pendingCount = orders.filter((o) => o.status === "Pending").length;
  const paidCount = orders.filter((o) => o.status === "Paid").length;
  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow max-w-sm w-full">
          <h1 className="text-2xl font-serif text-[#2F3E2F] mb-6 text-center">Saina Admin</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full border rounded-lg px-3 py-2 mb-4"
          />
          <button type="submit" className="w-full bg-[#2F3E2F] text-white py-2.5 rounded-lg">
            Login
          </button>
          <p className="text-xs text-gray-500 mt-4 text-center">Password: saina2026</p>
        </form>
      </main>
    );
  }

  // RECEIPT VIEW
  if (selectedOrder) {
    return (
      <main className="min-h-screen bg-[#F8F5F0] py-10">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-serif text-[#2F3E2F]">Saina Naturals</h1>
            <p className="text-sm text-gray-500">Athena Gardens, Notwane, Gaborone</p>
            <p className="text-sm text-gray-500">Tel: 267 74 501 880</p>
          </div>

          <div className="border-t border-b py-4 mb-4 text-sm">
            <p><strong>Receipt #:</strong> {selectedOrder.id.slice(-6)}</p>
            <p><strong>Date:</strong> {selectedOrder.date}</p>
            <p><strong>Customer:</strong> {selectedOrder.name}</p>
            <p><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Payment Ref:</strong> {selectedOrder.reference}</p>
          </div>

          <div className="mb-4">
            {selectedOrder.items.map((item, i) => (
              <div key={i} className="flex justify-between text-sm py-1">
                <span>{item.name} ({item.size}) × {item.quantity}</span>
                <span>P {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>P {selectedOrder.total}</span>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Thank you for supporting local!</p>
            <p>Orange Money / MyZaka • Absa Bank</p>
          </div>

          <div className="mt-8 flex gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 bg-[#2F3E2F] text-white py-2.5 rounded-lg"
            >
              Print Receipt
            </button>
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex-1 border py-2.5 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <header className="bg-[#F3EEE6] border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-serif text-xl text-[#2F3E2F]">Saina Naturals – Orders</h1>
          <div className="flex gap-4 items-center">
            <Link href="/shop" className="text-sm text-[#5C6B4E]">Shop</Link>
            <button onClick={() => setIsLoggedIn(false)} className="text-sm text-red-600">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-semibold text-[#2F3E2F]">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-semibold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Paid</p>
            <p className="text-2xl font-semibold text-green-600">{paidCount}</p>
          </div>
          <div className="bg-white rounded-xl p-4 border">
            <p className="text-sm text-gray-500">Confirmed Sales</p>
            <p className="text-2xl font-semibold text-[#2F3E2F]">P {totalSales}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", "Pending", "Paid", "Processing", "Out for Delivery", "Delivered", "Cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-sm ${
                filter === s ? "bg-[#2F3E2F] text-white" : "bg-white border"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
              No orders found.
            </div>
          ) : (
            filteredOrders
              .slice()
              .reverse()
              .map((order) => (
                <div key={order.id} className="bg-white rounded-xl border p-5">
                  <div className="flex flex-wrap justify-between gap-3 mb-3">
                    <div>
                      <p className="font-medium text-[#2F3E2F]">{order.name}</p>
                      <p className="text-sm text-gray-600">{order.phone}</p>
                      <p className="text-xs text-gray-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">P {order.total}</p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "Paid"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Delivered"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-3">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.name} ({item.size}) × {item.quantity}
                      </div>
                    ))}
                    <p className="mt-1"><strong>Ref:</strong> {order.reference}</p>
                    <p>
                      <strong>Delivery:</strong>{" "}
                      {order.delivery === "collection" ? "Collection" : `Delivery – ${order.address}`}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs bg-[#2F3E2F] text-white px-3 py-1.5 rounded"
                    >
                      View Receipt
                    </button>
                    {order.status === "Pending" && (
                      <button
                        onClick={() => updateStatus(order.id, "Paid")}
                        className="text-xs bg-green-600 text-white px-3 py-1.5 rounded"
                      >
                        Confirm Payment
                      </button>
                    )}
                    {order.status === "Paid" && (
                      <button
                        onClick={() => updateStatus(order.id, "Processing")}
                        className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded"
                      >
                        Mark Processing
                      </button>
                    )}
                    {order.status === "Processing" && (
                      <button
                        onClick={() => updateStatus(order.id, "Out for Delivery")}
                        className="text-xs bg-indigo-600 text-white px-3 py-1.5 rounded"
                      >
                        Out for Delivery
                      </button>
                    )}
                    {(order.status === "Out for Delivery" || order.status === "Processing") && (
                      <button
                        onClick={() => updateStatus(order.id, "Delivered")}
                        className="text-xs bg-teal-600 text-white px-3 py-1.5 rounded"
                      >
                        Mark Delivered
                      </button>
                    )}
                    {order.status !== "Cancelled" && order.status !== "Delivered" && (
                      <button
                        onClick={() => updateStatus(order.id, "Cancelled")}
                        className="text-xs border border-red-300 text-red-600 px-3 py-1.5 rounded"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </main>
  );
}