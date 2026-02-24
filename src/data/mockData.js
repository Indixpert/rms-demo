export const initialTables = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Table ${i + 1}`,
  status: 'Available',
  capacity: Math.floor(Math.random() * 4) + 2, // 2 to 5
  orderId: null,
  customerId: null,
}));

export const initialMenuItems = [
  // Starters
  { id: 1, name: 'Bruschetta', price: 8.99, category: 'Starters', available: true, image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Garlic Bread', price: 6.50, category: 'Starters', available: true, image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Spring Rolls', price: 7.25, category: 'Starters', available: false, image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Calamari', price: 11.50, category: 'Starters', available: true, image: 'https://via.placeholder.com/150' },

  // Main Course
  { id: 5, name: 'Spaghetti Carbonara', price: 15.99, category: 'Main Course', available: true, image: 'https://via.placeholder.com/150' },
  { id: 6, name: 'Margherita Pizza', price: 14.00, category: 'Main Course', available: true, image: 'https://via.placeholder.com/150' },
  { id: 7, name: 'Grilled Salmon', price: 22.50, category: 'Main Course', available: true, image: 'https://via.placeholder.com/150' },
  { id: 8, name: 'Ribeye Steak', price: 28.99, category: 'Main Course', available: true, image: 'https://via.placeholder.com/150' },
  { id: 9, name: 'Chicken Alfredo', price: 17.50, category: 'Main Course', available: false, image: 'https://via.placeholder.com/150' },
  { id: 10, name: 'Veggie Burger', price: 13.75, category: 'Main Course', available: true, image: 'https://via.placeholder.com/150' },

  // Drinks
  { id: 11, name: 'Coca-Cola', price: 2.50, category: 'Drinks', available: true, image: 'https://via.placeholder.com/150' },
  { id: 12, name: 'Orange Juice', price: 3.00, category: 'Drinks', available: true, image: 'https://via.placeholder.com/150' },
  { id: 13, name: 'House Red Wine', price: 7.00, category: 'Drinks', available: true, image: 'https://via.placeholder.com/150' },
  { id: 14, name: 'Craft Beer', price: 6.50, category: 'Drinks', available: true, image: 'https://via.placeholder.com/150' },

  // Desserts
  { id: 15, name: 'Tiramisu', price: 9.00, category: 'Desserts', available: true, image: 'https://via.placeholder.com/150' },
  { id: 16, name: 'Cheesecake', price: 8.50, category: 'Desserts', available: true, image: 'https://via.placeholder.com/150' },
  { id: 17, name: 'Chocolate Lava Cake', price: 9.50, category: 'Desserts', available: true, image: 'https://via.placeholder.com/150' },
  { id: 18, name: 'Ice Cream Scoop', price: 4.00, category: 'Desserts', available: true, image: 'https://via.placeholder.com/150' },
  { id: 19, name: 'Apple Pie', price: 7.75, category: 'Desserts', available: false, image: 'https://via.placeholder.com/150' },
  { id: 20, name: 'Fruit Salad', price: 6.00, category: 'Desserts', available: true, image: 'https://via.placeholder.com/150' },
];

export const initialCustomers = [
  { id: 1, name: 'John Doe', phone: '555-1234', visitHistory: [new Date('2023-10-26T19:00:00Z')], totalSpent: 150.75 },
  { id: 2, name: 'Jane Smith', phone: '555-5678', visitHistory: [new Date('2023-10-25T20:30:00Z'), new Date('2023-09-15T18:00:00Z')], totalSpent: 280.50 },
  { id: 3, name: 'Alice Johnson', phone: '555-8765', visitHistory: [new Date('2023-10-27T12:00:00Z')], totalSpent: 75.20 },
  { id: 4, name: 'Bob Brown', phone: '555-4321', visitHistory: [], totalSpent: 0 },
  { id: 5, name: 'Charlie Davis', phone: '555-1122', visitHistory: [new Date('2023-10-20T19:45:00Z')], totalSpent: 95.00 },
  { id: 6, name: 'Diana Miller', phone: '555-3344', visitHistory: [new Date('2023-10-22T21:00:00Z')], totalSpent: 120.00 },
  { id: 7, name: 'Eve Wilson', phone: '555-5566', visitHistory: [new Date('2023-09-30T13:00:00Z')], totalSpent: 45.80 },
  { id: 8, name: 'Frank Moore', phone: '555-7788', visitHistory: [], totalSpent: 0 },
];

export const initialOrders = [
  { id: 1, tableId: 2, customerId: 1, items: [{ itemId: 5, quantity: 1 }, { itemId: 7, quantity: 1 }, { itemId: 13, quantity: 2 }], status: 'Completed', timestamp: new Date('2023-10-26T19:10:00Z'), paymentStatus: 'Paid', discount: 10, tax: 8.5 },
  { id: 2, tableId: 5, customerId: 2, items: [{ itemId: 6, quantity: 2 }, { itemId: 11, quantity: 3 }], status: 'Completed', timestamp: new Date('2023-10-25T20:35:00Z'), paymentStatus: 'Paid', discount: 0, tax: 8.5 },
  { id: 3, tableId: 1, customerId: 3, items: [{ itemId: 1, quantity: 1 }, { itemId: 10, quantity: 1 }], status: 'Served', timestamp: new Date().setHours(new Date().getHours() - 1), paymentStatus: 'Unpaid', discount: 0, tax: 8.5 },
  { id: 4, tableId: 3, customerId: 5, items: [{ itemId: 8, quantity: 1 }, { itemId: 16, quantity: 1 }], status: 'Preparing', timestamp: new Date().setMinutes(new Date().getMinutes() - 15), paymentStatus: 'Unpaid', discount: 0, tax: 8.5 },
  { id: 5, tableId: 7, customerId: 6, items: [{ itemId: 2, quantity: 1 }, { itemId: 15, quantity: 2 }], status: 'Pending', timestamp: new Date().setMinutes(new Date().getMinutes() - 5), paymentStatus: 'Unpaid', discount: 0, tax: 8.5 },
];
