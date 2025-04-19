import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ProductGrid } from '../components/product/ProductGrid';
import { ProductFilters } from '../components/product/ProductFilters';
import { Product, Category, SellerType } from '../types';
import axiosInstance from '../api/axiosInstance'; // Make sure this is correctly set up

export const HomePage: React.FC = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    categories: [] as Category[],
    sellerTypes: [] as SellerType[],
    priceRange: [0, 2000] as [number, number],
  });

  // Fetch products from API when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosInstance.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Parse URL search params for initial filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam && ['Books', 'Electronics', 'Clothing', 'Furniture', 'Other'].includes(categoryParam)) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam as Category],
      }));
    }

    const sellerParam = params.get('seller');
    if (sellerParam && ['Student', 'Society'].includes(sellerParam)) {
      setFilters(prev => ({
        ...prev,
        sellerTypes: [sellerParam as SellerType],
      }));
    }
  }, [location.search]);

  // Apply filters and search term to products
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      const filtered = products.filter(product => {
        // Search term
        const matchesSearch =
          searchTerm.trim() === '' ||
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase());

        // Category
        const matchesCategory =
          filters.categories.length === 0 ||
          filters.categories.includes(product.category);

        // Seller Type
        const matchesSellerType =
          filters.sellerTypes.length === 0 ||
          filters.sellerTypes.includes(product.sellerType);

        // Price Range
        const matchesPrice =
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1];

        return matchesSearch && matchesCategory && matchesSellerType && matchesPrice;
      });

      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, filters, products]);

  const handleFilterChange = (newFilters: {
    categories: Category[];
    sellerTypes: SellerType[];
    priceRange: [number, number];
  }) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-primary-600 rounded-lg p-6 sm:p-10 mb-10 relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500 mix-blend-multiply"></div>
          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">Campus Cart</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              The ultimate marketplace for university students and societies. Buy and sell textbooks, electronics, clothing, and more!
            </p>
          </div>
        </section>

        <ProductFilters
          onFilterChange={handleFilterChange}
          initialFilters={filters}
        />

        <ProductGrid products={filteredProducts} loading={loading} />
      </div>
    </Layout>
  );
};
