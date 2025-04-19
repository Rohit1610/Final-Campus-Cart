import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Category, SellerType } from '../../types';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

interface ProductFiltersProps {
  onFilterChange: (filters: {
    categories: Category[];
    sellerTypes: SellerType[];
    priceRange: [number, number];
  }) => void;
  initialFilters?: {
    categories: Category[];
    sellerTypes: SellerType[];
    priceRange: [number, number];
  };
}

const CATEGORIES: Category[] = ['Books', 'Electronics', 'Clothing', 'Furniture', 'Other'];
const SELLER_TYPES: SellerType[] = ['Student', 'Society'];

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  initialFilters = {
    categories: [],
    sellerTypes: [],
    priceRange: [0, 2000],
  },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialFilters.categories);
  const [sellerTypes, setSellerTypes] = useState<SellerType[]>(initialFilters.sellerTypes);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange);

  const handleCategoryToggle = (category: Category) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSellerTypeToggle = (type: SellerType) => {
    setSellerTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
  };

  const handleApplyFilters = () => {
    onFilterChange({
      categories,
      sellerTypes,
      priceRange,
    });
    setIsOpen(false);
  };

  const handleClearFilters = () => {
    setCategories([]);
    setSellerTypes([]);
    setPriceRange([0, 2000]);
    onFilterChange({
      categories: [],
      sellerTypes: [],
      priceRange: [0, 2000],
    });
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        
        <Button
          variant="outline"
          size="sm"
          icon={isOpen ? <X size={16} /> : <Filter size={16} />}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? 'Close' : 'Filter'}
        </Button>
      </div>

      {(categories.length > 0 || sellerTypes.length > 0) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category) => (
            <Badge
              key={category}
              variant="primary"
              className="cursor-pointer"
              onClick={() => handleCategoryToggle(category)}
            >
              {category} <X size={12} className="ml-1" />
            </Badge>
          ))}
          {sellerTypes.map((type) => (
            <Badge
              key={type}
              variant="secondary"
              className="cursor-pointer"
              onClick={() => handleSellerTypeToggle(type)}
            >
              {type} <X size={12} className="ml-1" />
            </Badge>
          ))}
          {(categories.length > 0 || sellerTypes.length > 0) && (
            <Badge
              variant="outline"
              className="cursor-pointer"
              onClick={handleClearFilters}
            >
              Clear All <X size={12} className="ml-1" />
            </Badge>
          )}
        </div>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mt-2 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Categories */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</h3>
              <div className="space-y-2">
                {CATEGORIES.map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`category-${category}`}
                      checked={categories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor={`category-${category}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Seller Types */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Seller Type</h3>
              <div className="space-y-2">
                {SELLER_TYPES.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`seller-${type}`}
                      checked={sellerTypes.includes(type)}
                      onChange={() => handleSellerTypeToggle(type)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 rounded border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label
                      htmlFor={`seller-${type}`}
                      className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="min-price" className="block text-sm text-gray-600 dark:text-gray-400">
                    Min Price
                  </label>
                  <input
                    type="range"
                    id="min-price"
                    min={0}
                    max={2000}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(Number(e.target.value), priceRange[1])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="max-price" className="block text-sm text-gray-600 dark:text-gray-400">
                    Max Price
                  </label>
                  <input
                    type="range"
                    id="max-price"
                    min={0}
                    max={2000}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(priceRange[0], Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
            >
              Clear
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};