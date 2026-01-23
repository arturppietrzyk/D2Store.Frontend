import { useEffect, useState } from 'react';
import { GetOrdersForUser } from "../services/getOrdersForUser";
import { getUserIdFromToken } from "../../../utils/jwtDecoder";
import type { Order } from '../types/order';
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const currentUserId = getUserIdFromToken();
  const imageUrl = "http://localhost:5112/"; 
  
  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUserId) {
        setError("No user session found.");
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const data = await GetOrdersForUser(currentUserId);
        setOrders(data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Failed to load orders.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [currentUserId]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading your orders...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Orders</h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {!error && orders.length === 0 && (
        <p className="text-gray-500">You haven't placed any orders yet.</p>
      )}

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.orderId} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gray-50 p-4 border-b border-gray-200 flex flex-wrap justify-between items-center text-sm text-gray-600">
              <div className="flex space-x-10">
                <div>
                  <p className="uppercase text-xs font-bold text-gray-500">Order Placed</p>
                  <p>{new Date(order.orderDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="uppercase text-xs font-bold text-gray-500">Total</p>
                  <p className="font-medium text-gray-800">£{order.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <p className="uppercase text-xs font-bold text-gray-500">Status</p>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    order.status === 'PAID' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="uppercase text-xs font-bold text-gray-500">Order {order.orderId}</p>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {order.products.map((product) => (
                <div key={product.productId} className="flex flex-col md:flex-row md:items-start md:space-x-6">
                  <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-md border border-gray-100 p-2">
                    <img 
                      src={`${imageUrl}${product.location}`} 
                      alt={product.name} 
                      className="w-full h-full object-contain"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
                    />
                  </div>
                  <div className="flex-1 mt-4 md:mt-0">
                    <h4 className="text-blue-600 font-medium text-lg transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2 italic">
                      {product.description}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-gray-800">
                      Qty: {product.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;