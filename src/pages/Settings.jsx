import { useEffect } from 'react';
import Card from '../components/ui/Card';
import useLocalStorage from '../hooks/useLocalStorage';

const Settings = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <p className="text-gray-600 dark:text-gray-400">Toggle between dark and light mode for the application.</p>
        <div className="mt-4">
          <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input 
                type="checkbox" 
                id="theme-toggle" 
                className="sr-only peer" 
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <div className="w-14 h-8 bg-gray-200 rounded-full peer-checked:bg-orange-500 dark:bg-gray-700"></div>
              <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform peer-checked:translate-x-full"></div>
            </div>
            <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
              Dark Mode
            </div>
          </label>
        </div>
      </Card>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Restaurant Details</h2>
        <p className="text-gray-600 dark:text-gray-400">Forms to update restaurant name, address, tax rates, etc., would go here.</p>
      </Card>
    </div>
  );
};

export default Settings;
