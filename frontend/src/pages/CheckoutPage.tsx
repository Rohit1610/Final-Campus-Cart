import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Input, Select } from '../components/ui/FormElements';
import { Button } from '../components/ui/Button';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../api/axiosInstance';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
    
  //   // Simulate API call for order processing
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     // After successful order
  //     clearCart();
  //     navigate('/orders', { state: { orderSuccess: true } });
  //   }, 1500);
  // };
  // // Adjust this path as needed

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const orderData = {
    userId: user?.id,
    shippingInfo,
    paymentInfo,
    cartItems,
    total: totalPrice + totalPrice * 0.1,
  };

  try {
    const response = await axiosInstance.post('/api/orders', orderData);

    if (response.status === 200) {
      console.log('Order placed successfully:', response.data);

      clearCart();
      navigate('/orders', { state: { orderSuccess: true } });
    } else {
      throw new Error('Failed to place order');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('Something went wrong. Please try again later.');

    // Optional fallback
    setTimeout(() => {
      clearCart();
      navigate('/orders', { state: { orderSuccess: true } });
    }, 1500);
  } finally {
    setIsLoading(false);
  }
};

  
  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }
  
  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Truck className="h-5 w-5 text-primary-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Shipping Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={handleShippingInfoChange}
                    required
                    fullWidth
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    required
                    fullWidth
                  />
                  <Input
                    label="Address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={handleShippingInfoChange}
                    required
                    fullWidth
                    className="md:col-span-2"
                  />
                  <Input
                    label="City"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleShippingInfoChange}
                    required
                    fullWidth
                  />
                  <Input
                    label="State/Province"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleShippingInfoChange}
                    required
                    fullWidth
                  />
                  <Input
                    label="ZIP/Postal Code"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleShippingInfoChange}
                    required
                    fullWidth
                  />
                  <Select
                    label="Country"
                    name="country"
                    value={shippingInfo.country}
                    onChange={(value) => setShippingInfo(prev => ({ ...prev, country: value }))}
                    options={[
                      { value: 'US', label: 'United States' },
                      { value: 'CA', label: 'Canada' },
                      { value: 'UK', label: 'United Kingdom' },
                      { value: 'AU', label: 'Australia' },
                    ]}
                    required
                    fullWidth
                  />
                </div>
              </div>
              
              {/* Payment Information */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <CreditCard className="h-5 w-5 text-primary-500 mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Payment Information
                  </h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    placeholder="•••• •••• •••• ••••"
                    required
                    fullWidth
                    className="md:col-span-2"
                  />
                  <Input
                    label="Name on Card"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                    required
                    fullWidth
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      required
                      fullWidth
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="•••"
                      required
                      fullWidth
                    />
                  </div>
                </div>
                
                <div className="flex items-center mt-4 text-sm text-gray-600 dark:text-gray-400">
                  <ShieldCheck className="h-4 w-4 text-success-500 mr-2" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
              
              <div className="md:hidden">
                <OrderSummary cartItems={cartItems} totalPrice={totalPrice} />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isLoading}
              >
                Place Order
              </Button>
            </form>
          </div>
          
          {/* Order Summary */}
          <div className="hidden md:block">
            <OrderSummary cartItems={cartItems} totalPrice={totalPrice} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface OrderSummaryProps {
  cartItems: Array<{
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
  totalPrice: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, totalPrice }) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-20">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Order Summary</h2>
      
      <ul className="divide-y divide-gray-200 dark:divide-gray-700 mb-4">
        {cartItems.map(({ product, quantity }) => (
          <li key={product.id} className="py-3 flex justify-between">
            <div>
              <span className="text-gray-900 dark:text-white">{product.name}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-2">x{quantity}</span>
            </div>
            <span className="text-gray-900 dark:text-white font-medium">
              {formatPrice(product.price * quantity)}
            </span>
          </li>
        ))}
      </ul>
      
      <div className="space-y-3 mb-2">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white font-medium">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Shipping</span>
          <span className="text-gray-900 dark:text-white font-medium">Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Tax</span>
          <span className="text-gray-900 dark:text-white font-medium">{formatPrice(totalPrice * 0.1)}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
          <span className="text-gray-900 dark:text-white font-semibold">Total</span>
          <span className="text-xl text-primary-600 dark:text-primary-400 font-bold">
            {formatPrice(totalPrice + totalPrice * 0.1)}
          </span>
        </div>
      </div>
    </div>
  );
};