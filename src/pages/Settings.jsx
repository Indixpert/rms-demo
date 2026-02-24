import Card from '../components/ui/Card';

const Settings = () => {
  // A simple placeholder for settings page
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Settings</h1>
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Theme</h2>
        <p className="text-gray-600 dark:text-gray-400">Theme toggle (dark/light mode) can be implemented here using Tailwind's dark mode class strategy and localStorage.</p>
        <div className="mt-4">
          {/* Example Toggle Switch */}
          <label htmlFor="theme-toggle" className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" id="theme-toggle" className="sr-only" onChange={() => {
                document.documentElement.classList.toggle('dark');
                localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
              }}/>
              <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
            </div>
            <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
              Dark Mode
            </div>
          </label>
          <style>{`.dot { transform: translateX(0); } input:checked ~ .dot { transform: translateX(100%); }`}</style>
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
