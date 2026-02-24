import Card from '../ui/Card';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';

const PopularItems = () => {
  const { menuItems, orders } = useApp();

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

  return (
    <Card className="p-4 animate-slide-in" style={{animationDelay: '300ms'}}>
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Popular Items</h3>
      <ul className="space-y-3">
        {popular.map(({ item, count }) => (
          item ? (
            <li key={item.id} className="flex justify-between items-center">
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
  );
};

export default PopularItems;
