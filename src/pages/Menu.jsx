import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../utils/helpers';
import { useState } from 'react';
import Button from '../components/ui/Button';

const Menu = () => {
  const { menuItems } = useApp();
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredMenuItems = filter === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center animate-slide-in">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Menu</h1>
      </div>

      <div className="flex items-center gap-2 flex-wrap animate-slide-in" style={{animationDelay: '100ms'}}>
        {categories.map(category => (
          <Button
            key={category}
            variant={filter === category ? 'primary' : 'secondary'}
            onClick={() => setFilter(category)}
            className="capitalize"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMenuItems.map((item, index) => (
          <Link to={`/menu/${item.id}`} key={item.id} className="animate-slide-in" style={{animationDelay: `${200 + index * 50}ms`}}>
            <Card className="overflow-hidden h-full flex flex-col group hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="relative">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full capitalize">{item.category}</div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">{item.name}</h3>
                <div className="mt-auto pt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-accent">{formatCurrency(item.price)}</span>
                  <Button variant="secondary" className="!py-1 !px-3 text-xs">Details</Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Menu;
