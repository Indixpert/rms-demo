import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/helpers';
import { ArrowLeft, DollarSign, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const { menuItems } = useApp();

  const item = menuItems.find(m => m.id === id);

  if (!item) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Product not found</h2>
        <Link to="/menu" className="text-accent hover:underline mt-4 inline-block">
          Back to Menu
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${item.name} added to order.`);
  };

  return (
    <div className="space-y-6">
      <div className="animate-slide-in">
        <Link to="/menu" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={20} />
          Back to Menu
        </Link>
      </div>
      
      <Card className="animate-slide-in" style={{animationDelay: '100ms'}}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="animate-fade-in" style={{animationDelay: '200ms'}}>
            <img src={item.image} alt={item.name} className="w-full h-auto max-h-[450px] object-cover rounded-lg shadow-lg" />
          </div>
          <div className="flex flex-col space-y-6 animate-fade-in" style={{animationDelay: '300ms'}}>
            <div className="flex justify-between items-start">
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">{item.name}</h1>
              <span className="text-sm font-medium bg-gray-100 dark:bg-dark-secondary text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full capitalize">{item.category}</span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 flex-grow text-base">{item.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-green-500">
                <DollarSign size={24} />
                <span className="text-3xl font-bold">{formatCurrency(item.price)}</span>
              </div>
              <Button onClick={handleAddToCart} className="w-auto">
                <ShoppingCart size={20} />
                Add to Order
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
