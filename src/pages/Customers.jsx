import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { PlusCircle } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Customers = () => {
  const { customers, addCustomer } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addCustomer(formData);
    setIsModalOpen(false);
    setFormData({ name: '', phone: '' });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Customer Management</h1>
        <Button onClick={() => setIsModalOpen(true)}><PlusCircle size={20} /> Add Customer</Button>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-secondary dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Name</th>
                <th scope="col" className="px-6 py-3">Phone</th>
                <th scope="col" className="px-6 py-3">Total Visits</th>
                <th scope="col" className="px-6 py-3">Total Spent</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-secondary">
                  <td className="px-6 py-4 font-medium">{customer.name}</td>
                  <td className="px-6 py-4">{customer.phone}</td>
                  <td className="px-6 py-4">{customer.visitHistory.length}</td>
                  <td className="px-6 py-4">{formatCurrency(customer.totalSpent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Customer">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Customer Name" className="w-full p-2 border rounded bg-transparent" required />
          <input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded bg-transparent" required />
          <Button type="submit" className="w-full">Add Customer</Button>
        </form>
      </Modal>
    </div>
  );
};

export default Customers;
