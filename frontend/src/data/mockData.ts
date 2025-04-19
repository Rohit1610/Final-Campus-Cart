import { Product, User, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Calculus Textbook',
    description: 'Calculus: Early Transcendentals 8th Edition. Almost new, no markings.',
    price: 45.99,
    imageUrl: 'https://images.pexels.com/photos/159751/book-read-literature-pages-159751.jpeg',
    category: 'Books',
    sellerType: 'Student',
    quantity: 1,
    sellerId: '101',
    createdAt: '2023-09-15T14:22:00Z'
  },
  {
    id: '2',
    name: 'MacBook Pro 2021',
    description: 'Used MacBook Pro 2021, M1 chip, 16GB RAM, 512GB SSD, excellent condition.',
    price: 1299.99,
    imageUrl: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
    category: 'Electronics',
    sellerType: 'Student',
    quantity: 1,
    sellerId: '102',
    createdAt: '2023-09-18T09:15:00Z'
  },
  {
    id: '3',
    name: 'University Hoodie',
    description: 'Official university hoodie, size L, navy blue, worn only a few times.',
    price: 25.50,
    imageUrl: 'https://images.pexels.com/photos/5699163/pexels-photo-5699163.jpeg',
    category: 'Clothing',
    sellerType: 'Society',
    quantity: 5,
    sellerId: '103',
    createdAt: '2023-09-10T11:45:00Z'
  },
  {
    id: '4',
    name: 'Desk Lamp',
    description: 'Adjustable desk lamp with multiple brightness levels, perfect for studying.',
    price: 18.75,
    imageUrl: 'https://images.pexels.com/photos/965092/pexels-photo-965092.jpeg',
    category: 'Furniture',
    sellerType: 'Student',
    quantity: 2,
    sellerId: '104',
    createdAt: '2023-09-05T16:30:00Z'
  },
  {
    id: '5',
    name: 'Graph Theory Notes',
    description: 'Comprehensive notes for Graph Theory course, 80 pages, spiral bound.',
    price: 12.00,
    imageUrl: 'https://images.pexels.com/photos/733852/pexels-photo-733852.jpeg',
    category: 'Books',
    sellerType: 'Student',
    quantity: 1,
    sellerId: '105',
    createdAt: '2023-09-22T13:20:00Z'
  },
  {
    id: '6',
    name: 'Scientific Calculator',
    description: 'Texas Instruments TI-84 Plus, lightly used, all functions working perfectly.',
    price: 65.99,
    imageUrl: 'https://images.pexels.com/photos/9088224/pexels-photo-9088224.jpeg',
    category: 'Electronics',
    sellerType: 'Student',
    quantity: 1,
    sellerId: '106',
    createdAt: '2023-09-14T10:10:00Z'
  },
  {
    id: '7',
    name: 'Event Tickets',
    description: 'Two tickets for the Annual Spring Concert, front row seats.',
    price: 30.00,
    imageUrl: 'https://images.pexels.com/photos/2928232/pexels-photo-2928232.jpeg',
    category: 'Other',
    sellerType: 'Society',
    quantity: 2,
    sellerId: '107',
    createdAt: '2023-09-20T15:45:00Z'
  },
  {
    id: '8',
    name: 'Bean Bag Chair',
    description: 'Comfortable bean bag chair, grey color, perfect for dorm rooms.',
    price: 40.00,
    imageUrl: 'https://images.pexels.com/photos/4352247/pexels-photo-4352247.jpeg',
    category: 'Furniture',
    sellerType: 'Student',
    quantity: 1,
    sellerId: '108',
    createdAt: '2023-09-08T09:30:00Z'
  }
];

export const mockUsers: User[] = [
  {
    id: '101',
    name: 'John Doe',
    email: 'john.doe@university.edu',
    type: 'Student',
    createdAt: '2023-08-01T10:00:00Z'
  },
  {
    id: '102',
    name: 'Jane Smith',
    email: 'jane.smith@university.edu',
    type: 'Student',
    createdAt: '2023-08-02T11:30:00Z'
  },
  {
    id: '103',
    name: 'Computer Science Society',
    email: 'cs.society@university.edu',
    type: 'Society',
    createdAt: '2023-07-15T14:00:00Z'
  },
  {
    id: '999',
    name: 'Admin User',
    email: 'admin@university.edu',
    type: 'Admin',
    createdAt: '2023-01-01T00:00:00Z'
  }
];

export const mockOrders: Order[] = [
  {
    id: '1001',
    userId: '101',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[3], quantity: 1 }
    ],
    totalAmount: 64.74,
    status: 'Completed',
    createdAt: '2023-09-25T14:30:00Z'
  },
  {
    id: '1002',
    userId: '102',
    items: [
      { product: mockProducts[2], quantity: 1 }
    ],
    totalAmount: 25.50,
    status: 'Pending',
    createdAt: '2023-09-26T10:15:00Z'
  }
];