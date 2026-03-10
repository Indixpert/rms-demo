import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ArrowLeft, Edit } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const { menuItems } = useApp();

  const product = menuItems.find(item => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Product not found</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">The product you are looking for does not exist.</p>
        <Link to="/menu" className="mt-6">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Product Details</h1>
        <Link to="/menu">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Menu
          </Button>
        </Link>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
          <div className="md:col-span-1">
            <img 
              src={product.imageUrl || `https://via.placeholder.com/400x400.png?text=${encodeURIComponent(product.name)}`} 
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover aspect-square"
            />
          </div>
          <div className="md:col-span-2 space-y-4 flex flex-col">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{product.name}</h2>
              <p className="text-lg font-semibold text-orange-500">${product.price.toFixed(2)}</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400 flex-grow min-h-[6rem]">{product.description || "No description available."}</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-sm">
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">Category: </span>
                <span className="text-gray-600 dark:text-gray-400">{product.category}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-700 dark:text-gray-300">In Stock: </span>
                <span className={`font-bold ${product.inStock ? 'text-green-500' : 'text-red-500'}`}>
                  {product.inStock ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Product
                </Button>
                <Button variant="secondary">Add to Order</Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetails;
