import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, DollarSign, Tag, ShoppingBag } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import { Input, Textarea, Select } from '../components/ui/FormElements';
import { Button } from '../components/ui/Button';
import { useAuth } from '../contexts/AuthContext';
import { Category } from '../types';
import axiosInstance from '../api/axiosInstance';

export const SellPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '' as Category,
    quantity: '1',
    imageUrl: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=sell');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.category) newErrors.category = 'Category is required';

    if (!formData.quantity) {
      newErrors.quantity = 'Quantity is required';
    } else if (isNaN(parseInt(formData.quantity)) || parseInt(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
      sellerId: user?.id,
      sellerType: user?.type,
    };

    try {
      await axiosInstance.post('/api/products', productData);
      setIsLoading(false);
      navigate('/');
    } catch (err) {
      console.error('Failed to create product:', err);
      setIsLoading(false);
    }
  };

  const categoryOptions = [
    { value: '', label: 'Select a category' },
    { value: 'Books', label: 'Books' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Clothing', label: 'Clothing' },
    { value: 'Furniture', label: 'Furniture' },
    { value: 'Other', label: 'Other' },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">Sell an Item</h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <Input
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<ShoppingBag size={18} />}
                  error={errors.name}
                  required
                  fullWidth
                />

                <Textarea
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  required
                  fullWidth
                  rows={4}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Price ($)"
                    name="price"
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    icon={<DollarSign size={18} />}
                    error={errors.price}
                    required
                    fullWidth
                  />

                  <Input
                    label="Quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    step="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    error={errors.quantity}
                    required
                    fullWidth
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={(value) =>
                      setFormData(prev => ({ ...prev, category: value as Category }))
                    }
                    options={categoryOptions}
                    error={errors.category}
                    required
                    fullWidth
                  />

                  <Input
                    label="Seller Type"
                    value={user?.type || ''}
                    disabled
                    fullWidth
                  />
                </div>

                <Input
                  label="Image URL"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  icon={<Upload size={18} />}
                  error={errors.imageUrl}
                  helperText="Enter URL of product image (e.g., from Pexels)"
                  required
                  fullWidth
                />

                {formData.imageUrl && isValidUrl(formData.imageUrl) && (
                  <div className="mt-2 flex justify-center">
                    <img
                      src={formData.imageUrl}
                      alt="Product preview"
                      className="h-48 object-contain rounded-md"
                    />
                  </div>
                )}

                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    isLoading={isLoading}
                    icon={<Tag size={18} />}
                  >
                    List Item for Sale
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
