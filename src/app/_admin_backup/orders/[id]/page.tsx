'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
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
  customerAddress: string;
  customerPhone: string;
  total: number;
  status: OrderStatus;
  timestamp: string; // Stored as ISO string
  OrderItems: OrderItem[];
}

export default function EditOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Order = await response.json();
        setOrder(data);
        setSelectedStatus(data.status);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as OrderStatus;
    setSelectedStatus(newStatus);

    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Optionally update local state with the returned updated order
      const updatedOrder = await response.json();
      setOrder(updatedOrder);
    } catch (err: any) {
      setError(err.message);
      // Revert status if update fails
      if (order) setSelectedStatus(order.status);
      alert(`Error updating order status: ${err.message}`);
    }
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Details (ID: {order.id.substring(0, 8)}...)</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Customer Information</h2>
        <p><strong>Name:</strong> {order.customerName}</p>
        <p><strong>Address:</strong> {order.customerAddress}</p>
        <p><strong>Phone:</strong> {order.customerPhone}</p>
        <p><strong>Order Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Ordered Items</h2>
        {order.OrderItems.length === 0 ? (
          <p>No items in this order.</p>
        ) : (
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Item Name</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.OrderItems.map((item, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">{item.quantity}</td>
                  <td className="py-2 px-4 border-b">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p className="text-xl font-bold mt-4">Total: ${order.total.toFixed(2)}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-bold mb-4">Order Status</h2>
        <div className="flex items-center">
          <label htmlFor="status" className="block text-gray-700 text-sm font-bold mr-2">
            Update Status:
          </label>
          <select
            id="status"
            name="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {Object.values(OrderStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Link href="/admin/orders" className="inline-block bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Back to Orders
      </Link>
    </div>
  );
}
