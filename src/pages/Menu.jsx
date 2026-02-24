import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Menu = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Starters', available: true });

  const categories = [...new Set(menuItems.map(item => item.category))];

  const openModalForNew = () => {
    setEditingItem(null);
    setFormData({ name: '', price: '', category: 'Starters', available: true });
    setIsModalOpen(true);
  };

  const openModalForEdit = (item) => {
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const itemData = { ...formData, price: parseFloat(formData.price) };
    if (editingItem) {
      updateMenuItem(itemData);
    } else {
      addMenuItem(itemData);
    }
    closeModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Menu Management</h1>
        <Button onClick={openModalForNew}><PlusCircle size={20} /> Add New Item</Button>
      </div>

      {categories.map(category => (
        <div key={category}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.filter(item => item.category === category).map(item => (
              <Card key={item.id} className="flex flex-col">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-t-xl"/>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                  <p className="text-accent font-semibold mt-1">{formatCurrency(item.price)}</p>
                  <div className="mt-4 flex-1 flex items-end gap-2">
                    <Button variant="secondary" className="w-full" onClick={() => openModalForEdit(item)}><Edit size={16} /> Edit</Button>
                    <Button variant="danger" onClick={() => confirm('Are you sure?') && deleteMenuItem(item.id)}><Trash2 size={16} /></Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Item Name" className="w-full p-2 border rounded bg-transparent" required />
          <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" className="w-full p-2 border rounded bg-transparent" required step="0.01"/>
          <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded bg-transparent dark:bg-dark-secondary">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
            <option value="New Category">Add New...</option>
          </select>
          <label className="flex items-center gap-2"><input type="checkbox" name="available" checked={formData.available} onChange={handleChange} /> Available</label>
          <Button type="submit" className="w-full">{editingItem ? 'Update Item' : 'Add Item'}</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Menu;
