import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  
  const isOutOfStock = product.quantity <= 0;

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="h-full flex flex-col hover:transform hover:-translate-y-1 transition-all duration-300">
        <div className="relative overflow-hidden rounded-t-lg aspect-square">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 right-2 space-y-2">
            <Badge 
              variant={product.sellerType === 'Student' ? 'primary' : 'secondary'} 
              size="sm"
            >
              {product.sellerType}
            </Badge>
            {isOutOfStock && (
              <Badge variant="error" size="sm">
                Out of Stock
              </Badge>
            )}
          </div>
        </div>
        <CardBody className="flex-grow">
          <Badge variant="outline" className="mb-2">
            {product.category}
          </Badge>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-primary-600 dark:text-primary-400 font-bold">
            {formatPrice(product.price)}
          </p>
        </CardBody>
        <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
          <div className="w-full flex justify-between items-center">
            <Button
              variant={isOutOfStock ? 'outline' : 'primary'}
              size="sm"
              fullWidth
              disabled={isOutOfStock}
              icon={<ShoppingCart size={16} />}
              onClick={handleAddToCart}
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};