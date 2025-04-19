export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  sellerType: SellerType;
  quantity: number;
  sellerId: string;
  createdAt: string;
};

export type Category = 
  | 'Books'
  | 'Electronics'
  | 'Clothing'
  | 'Furniture'
  | 'Other';

export type SellerType = 'Student' | 'Society';

export type CartItem = {
  product: Product;
  quantity: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  type: 'Student' | 'Society' | 'Admin';
  createdAt: string;
};

export type Order = {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
};