'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

interface OrderItem {
  foodItemId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  total: number;
  status: OrderStatus;
  timestamp: string; // Stored as ISO string
  OrderItems: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await fetch('/api/orders');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setOrders(orders.filter((order) => order.id !== id));
    } catch (err: any) {
      alert(`Error deleting order: ${err.message}`);
    }
  };

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer Name</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b last:border-b-0">
                  <td className="py-3 px-4">{order.id.substring(0, 8)}...</td>
                  <td className="py-3 px-4">{order.customerName}</td>
                  <td className="py-3 px-4">${order.total.toFixed(2)}</td>
                  <td className="py-3 px-4">{order.status}</td>
                  <td className="py-3 px-4">{new Date(order.timestamp).toLocaleDateString()}</td>
                  <td className="py-3 px-4">
                    <Link href={`/admin/orders/${order.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      View/Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(order.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
