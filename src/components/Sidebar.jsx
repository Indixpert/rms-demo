import { NavLink } from 'react-router-dom';
import { Home, Grid, ShoppingCart, UtensilsCrossed, Users, BarChart2, Settings, ChefHat } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Grid, label: 'Tables', path: '/tables' },
  { icon: ShoppingCart, label: 'Orders', path: '/orders' },
  { icon: UtensilsCrossed, label: 'Menu', path: '/menu' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: BarChart2, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  return (
    <aside className="w-64 bg-light-card dark:bg-dark-card flex flex-col shadow-soft-lg">
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-700">
        <ChefHat className="h-8 w-8 text-accent" />
        <h1 className="ml-2 text-2xl font-bold text-gray-800 dark:text-white">RMS</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ` +
              (isActive
                ? 'bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-md'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-secondary')
            }
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
