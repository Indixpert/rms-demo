import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { formatCurrency } from '../utils/helpers';
import { format } from 'date-fns';

const Orders = () => {
  const { orders, menuItems, customers, updateOrderStatus, calculateOrderTotal, completePayment } = useApp();
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [discount, setDiscount] = useState(0);

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const openBillModal = (order) => {
    setSelectedOrder(order);
    setDiscount(order.discount || 0);
    setIsBillModalOpen(true);
  };

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(selectedOrder.id, newStatus);
    setSelectedOrder(prev => ({ ...prev, status: newStatus }));
  };

  const handlePayment = () => {
    completePayment(selectedOrder.id, discount);
    setIsBillModalOpen(false);
    setIsDetailModalOpen(false);
    setSelectedOrder(null);
  };

  const orderStatuses = ['Pending', 'Preparing', 'Served', 'Completed', 'Cancelled'];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Order Management</h1>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-secondary dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Order ID</th>
                <th scope="col" className="px-6 py-3">Table</th>
                <th scope="col" className="px-6 py-3">Customer</th>
                <th scope="col" className="px-6 py-3">Status</th>
                <th scope="col" className="px-6 py-3">Payment</th>
                <th scope="col" className="px-6 py-3">Total</th>
                <th scope="col" className="px-6 py-3">Time</th>
                <th scope="col" className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => {
                const customer = customers.find(c => c.id === order.customerId);
                const total = calculateOrderTotal(order).total;
                return (
                  <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-secondary">
                    <td className="px-6 py-4 font-medium">#{order.id}</td>
                    <td className="px-6 py-4">Table {order.tableId}</td>
                    <td className="px-6 py-4">{customer?.name || 'N/A'}</td>
                    <td className="px-6 py-4"><Badge status={order.status} /></td>
                    <td className="px-6 py-4"><Badge status={order.paymentStatus} /></td>
                    <td className="px-6 py-4">{formatCurrency(total)}</td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{format(new Date(order.timestamp), 'Pp')}</td>
                    <td className="px-6 py-4 space-x-2">
                      <Button variant="secondary" onClick={() => openDetailModal(order)}>Details</Button>
                      {order.paymentStatus === 'Unpaid' && <Button onClick={() => openBillModal(order)}>Bill</Button>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {selectedOrder && (
        <Modal isOpen={isDetailModalOpen} onClose={() => setIsDetailModalOpen(false)} title={`Order #${selectedOrder.id} Details`}>
          <div className="space-y-4">
            <p><strong>Table:</strong> {selectedOrder.tableId}</p>
            <p><strong>Customer:</strong> {customers.find(c => c.id === selectedOrder.customerId)?.name}</p>
            <div>
              <strong>Items:</strong>
              <ul className="list-disc list-inside">
                {selectedOrder.items.map(item => {
                  const menuItem = menuItems.find(mi => mi.id === item.itemId);
                  return <li key={item.itemId}>{menuItem.name} x {item.quantity} ({formatCurrency(menuItem.price * item.quantity)})</li>;
                })}
              </ul>
            </div>
            <div className="flex items-center gap-2">
              <strong>Status:</strong>
              <select value={selectedOrder.status} onChange={(e) => handleStatusChange(e.target.value)} className="bg-white dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 rounded-md py-1 px-2">
                {orderStatuses.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </Modal>
      )}

      {selectedOrder && (
        <Modal isOpen={isBillModalOpen} onClose={() => setIsBillModalOpen(false)} title={`Bill for Order #${selectedOrder.id}`}>
          <div className="space-y-4 text-sm">
            <h3 className="text-center font-bold text-lg">Receipt</h3>
            <div className="border-t border-b border-dashed py-2">
              {selectedOrder.items.map(item => {
                const menuItem = menuItems.find(mi => mi.id === item.itemId);
                return (
                  <div key={item.itemId} className="flex justify-between">
                    <span>{menuItem.name} x {item.quantity}</span>
                    <span>{formatCurrency(menuItem.price * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatCurrency(calculateOrderTotal(selectedOrder).subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Tax ({selectedOrder.tax}%)</span><span>{formatCurrency(calculateOrderTotal(selectedOrder).taxAmount)}</span></div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Discount (%)</span>
                <input type="number" value={discount} onChange={e => setDiscount(parseFloat(e.target.value) || 0)} className="w-16 text-right bg-transparent border rounded px-1" />
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2"><span >Total</span><span>{formatCurrency(calculateOrderTotal({...selectedOrder, discount}).total)}</span></div>
            </div>
            <Button onClick={handlePayment} className="w-full">Mark as Paid</Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Orders;
