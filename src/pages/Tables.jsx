import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { Utensils, UserPlus, PlusCircle } from 'lucide-react';

const Tables = () => {
  const { tables, updateTableStatus, customers, menuItems, createOrder } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');

  const handleTableClick = (table) => {
    setSelectedTable(table);
    if (table.status === 'Available') {
      setIsModalOpen(true);
    }
    // For occupied tables, you might want a different modal to view/edit order
  };

  const handleCreateOrder = () => {
    if (!selectedTable || !selectedCustomer || orderItems.length === 0) {
      alert('Please select a customer and add items to the order.');
      return;
    }
    const orderData = {
      tableId: selectedTable.id,
      customerId: parseInt(selectedCustomer),
      items: orderItems,
    };
    createOrder(orderData);
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTable(null);
    setOrderItems([]);
    setSelectedCustomer('');
  };

  const addOrderItem = (itemId) => {
    setOrderItems(prev => {
      const existingItem = prev.find(i => i.itemId === itemId);
      if (existingItem) {
        return prev.map(i => i.itemId === itemId ? { ...i, quantity: i.quantity + 1 } : i);
      } else {
        return [...prev, { itemId, quantity: 1 }];
      }
    });
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'border-green-500';
      case 'Occupied': return 'border-red-500';
      case 'Reserved': return 'border-yellow-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Table Management</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {tables.map(table => (
          <Card 
            key={table.id} 
            className={`p-4 flex flex-col items-center justify-center aspect-square cursor-pointer transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 border-2 ${getTableStatusColor(table.status)}`}
            onClick={() => handleTableClick(table)}
          >
            <Utensils size={48} className={`mb-2 ${table.status === 'Occupied' ? 'text-red-500' : 'text-gray-400'}`} />
            <h3 className="text-xl font-bold">{table.name}</h3>
            <p className="text-sm text-gray-500">Capacity: {table.capacity}</p>
            <div className="mt-2">
              <Badge status={table.status} />
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={`Create Order for ${selectedTable?.name}`}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Assign Customer</label>
            <select 
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className="mt-1 block w-full bg-white dark:bg-dark-secondary border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
            >
              <option value="">Select a customer</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Add Items</h4>
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2">
              {menuItems.filter(i => i.available).map(item => (
                <div key={item.id} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <Button variant="secondary" size="sm" onClick={() => addOrderItem(item.id)}><PlusCircle size={16}/></Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-md font-medium text-gray-700 dark:text-gray-300 mb-2">Current Order</h4>
            {orderItems.length === 0 ? (
              <p className="text-sm text-gray-500">No items added yet.</p>
            ) : (
              <ul className="space-y-1 text-sm">
                {orderItems.map(oi => {
                  const menuItem = menuItems.find(mi => mi.id === oi.itemId);
                  return <li key={oi.itemId}>{menuItem.name} x {oi.quantity}</li>
                })}
              </ul>
            )}
          </div>

          <Button onClick={handleCreateOrder} className="w-full">Create Order</Button>
        </div>
      </Modal>
    </div>
  );
};

export default Tables;
