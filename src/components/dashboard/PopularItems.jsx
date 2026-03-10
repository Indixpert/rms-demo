import { useState } from 'react';
import Card from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import Modal from '../ui/Modal';

const PopularItems = () => {
  const { menuItems, orders } = useApp();
  const [selectedItem, setSelectedItem] = useState(null);

  const itemCounts = orders.flatMap(o => o.items).reduce((acc, item) => {
    acc[item.itemId] = (acc[item.itemId] || 0) + item.quantity;
    return acc;
  }, {});

  const popular = Object.entries(itemCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([itemId, count]) => ({
      item: menuItems.find(mi => mi.id === parseInt(itemId)),
      count,
    }));

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <Card className="p-4 animate-slide-in" style={{animationDelay: '300ms'}}>
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Popular Items</h3>
        <ul className="space-y-1">
          {popular.map(({ item, count }) => (
            item ? (
              <li 
                key={item.id} 
                className="flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-secondary -mx-4 px-4 py-2 rounded-lg transition-colors"
                onClick={() => handleItemClick(item)}
              >
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-200">{item.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(item.price)}</p>
                </div>
                <p className="font-semibold text-gray-700 dark:text-gray-300">{count} sold</p>
              </li>
            ) : null
          ))}
        </ul>
      </Card>

      <Modal isOpen={!!selectedItem} onClose={handleCloseModal} title={selectedItem?.name}>
        {selectedItem && (
          <div className="space-y-4">
            <img 
              src={selectedItem.imageUrl || `https://i.pravatar.cc/400?u=${selectedItem.id}`}
              alt={selectedItem.name} 
              className="w-full h-48 object-cover rounded-lg bg-gray-200" 
            />
            <div>
              <p className="text-sm font-medium text-indigo-500 dark:text-indigo-400 mb-1">{selectedItem.category || 'Uncategorized'}</p>
              <p className="text-gray-600 dark:text-gray-300">{selectedItem.description || 'No description available.'}</p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xl font-bold text-gray-800 dark:text-white">{formatCurrency(selectedItem.price)}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PopularItems;
