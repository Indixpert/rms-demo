import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { initialTables, initialMenuItems, initialCustomers, initialOrders } from '../data/mockData';
import toast from 'react-hot-toast';

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [tables, setTables] = useLocalStorage('rms_tables', initialTables);
  const [menuItems, setMenuItems] = useLocalStorage('rms_menuItems', initialMenuItems);
  const [customers, setCustomers] = useLocalStorage('rms_customers', initialCustomers);
  const [orders, setOrders] = useLocalStorage('rms_orders', initialOrders);

  // Table Management
  const updateTableStatus = (tableId, status, orderId = null, customerId = null) => {
    setTables(prevTables =>
      prevTables.map(table =>
        table.id === tableId ? { ...table, status, orderId, customerId } : table
      )
    );
  };

  // Menu Management
  const addMenuItem = (item) => {
    setMenuItems(prev => [...prev, { ...item, id: Date.now() }]);
    toast.success('Menu item added!');
  };

  const updateMenuItem = (updatedItem) => {
    setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    toast.success('Menu item updated!');
  };

  const deleteMenuItem = (itemId) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    toast.error('Menu item deleted!');
  };

  // Order Management
  const createOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: Date.now(),
      timestamp: new Date(),
      status: 'Pending',
      paymentStatus: 'Unpaid',
      tax: 8.5, // Default tax
      discount: 0,
    };
    setOrders(prev => [newOrder, ...prev]);
    updateTableStatus(orderData.tableId, 'Occupied', newOrder.id, orderData.customerId);
    toast.success(`Order created for Table ${orderData.tableId}`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          if (status === 'Completed' || status === 'Cancelled') {
            const table = tables.find(t => t.orderId === orderId);
            if (table) {
              updateTableStatus(table.id, 'Available', null, null);
            }
          }
          return { ...order, status };
        }
        return order;
      })
    );
    toast.info(`Order #${orderId} status updated to ${status}`);
  };

  const completePayment = (orderId, discount) => {
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
          const updatedOrder = { ...order, paymentStatus: 'Paid', status: 'Completed', discount };
          const table = tables.find(t => t.orderId === orderId);
          if (table) {
            updateTableStatus(table.id, 'Available', null, null);
          }
          // Update customer total spent
          if (updatedOrder.customerId) {
            const orderTotal = calculateOrderTotal(updatedOrder).total;
            setCustomers(prevCustomers => prevCustomers.map(c => 
              c.id === updatedOrder.customerId ? { ...c, totalSpent: c.totalSpent + orderTotal } : c
            ));
          }
          toast.success(`Payment for Order #${orderId} completed.`);
          return updatedOrder;
        }
        return order;
      })
    );
  };

  const calculateOrderTotal = (order) => {
    if (!order) return { subtotal: 0, taxAmount: 0, discountAmount: 0, total: 0 };
    const subtotal = order.items.reduce((acc, currentItem) => {
      const menuItem = menuItems.find(mi => mi.id === currentItem.itemId);
      return acc + (menuItem ? menuItem.price * currentItem.quantity : 0);
    }, 0);

    const taxAmount = subtotal * (order.tax / 100);
    const discountAmount = subtotal * (order.discount / 100);
    const total = subtotal + taxAmount - discountAmount;

    return { subtotal, taxAmount, discountAmount, total };
  };

  // Customer Management
  const addCustomer = (customer) => {
    setCustomers(prev => [...prev, { ...customer, id: Date.now(), visitHistory: [], totalSpent: 0 }]);
    toast.success('Customer added!');
  };

  const value = {
    tables,
    menuItems,
    customers,
    orders,
    updateTableStatus,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    createOrder,
    updateOrderStatus,
    completePayment,
    calculateOrderTotal,
    addCustomer,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
