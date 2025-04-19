import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Package, CheckCircle, Clock, XCircle } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Card, CardBody } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { mockOrders } from '../data/mockData';
import { Order } from '../types';

export const OrdersPage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Check if we're coming from a successful checkout
  useEffect(() => {
    if (location.state?.orderSuccess) {
      setShowSuccessMessage(true);
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        // Also clear the location state
        window.history.replaceState({}, document.title);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  // If not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=orders');
    }
  }, [isAuthenticated, navigate]);
  
  // Fetch orders
  useEffect(() => {
    if (!user) return;
    
    // Simulate API call with delay
    const timer = setTimeout(() => {
      // Filter orders for the current user
      const userOrders = mockOrders.filter(order => order.userId === user.id);
      setOrders(userOrders);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [user]);
  
  if (!isAuthenticated) {
    return null; // Will redirect to login
  }
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-success-500" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-warning-500" />;
      case 'Cancelled':
        return <XCircle className="h-5 w-5 text-error-500" />;
      default:
        return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Cancelled':
        return 'error';
      default:
        return 'primary';
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          My Orders
        </h1>
        
        {showSuccessMessage && (
          <div className="bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-300 p-4 rounded-md mb-6 flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium">Order Placed Successfully!</h3>
              <p>Your order has been received and is being processed.</p>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No orders yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You haven't placed any orders yet. Start shopping to create your first order!
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/')}
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardBody>
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                        Order #{order.id.slice(-4)}
                        <span className="ml-2">
                          <Badge
                            variant={getStatusColor(order.status) as any}
                            icon={getStatusIcon(order.status)}
                          >
                            {order.status}
                          </Badge>
                        </span>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Placed on {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 md:text-right">
                      <p className="text-gray-700 dark:text-gray-300">
                        Total: <span className="font-semibold text-primary-600 dark:text-primary-400">{formatPrice(order.totalAmount)}</span>
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Order Items
                    </h3>
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                      {order.items.map(({ product, quantity }) => (
                        <li key={product.id} className="py-3 flex">
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                                <h4>{product.name}</h4>
                                <p className="ml-4">{formatPrice(product.price)}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                {product.category}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500 dark:text-gray-400">Qty {quantity}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};