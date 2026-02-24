import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';

const Analytics = () => {
  const { orders, menuItems } = useApp();

  // Dummy data for charts
  const revenueData = [
    { name: 'Jan', revenue: 4000 }, { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 }, { name: 'Apr', revenue: 4500 },
    { name: 'May', revenue: 6000 }, { name: 'Jun', revenue: 5500 },
  ];

  const itemCounts = orders.flatMap(o => o.items).reduce((acc, item) => {
    acc[item.itemId] = (acc[item.itemId] || 0) + item.quantity;
    return acc;
  }, {});

  const topSellingData = Object.entries(itemCounts)
    .map(([itemId, count]) => ({
      name: menuItems.find(mi => mi.id === parseInt(itemId))?.name || 'Unknown',
      sold: count,
    }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 h-96">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="name" tick={{ fill: 'rgb(156 163 175)' }} />
              <YAxis tick={{ fill: 'rgb(156 163 175)' }} tickFormatter={(value) => `$${value/1000}k`} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 30, 0.8)', borderColor: '#f97316' }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 h-96">
          <h3 className="font-semibold mb-4">Top Selling Items</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSellingData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis type="number" tick={{ fill: 'rgb(156 163 175)' }} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'rgb(156 163 175)' }} />
              <Tooltip contentStyle={{ backgroundColor: 'rgba(30, 30, 30, 0.8)', borderColor: '#fb923c' }} />
              <Legend />
              <Bar dataKey="sold" fill="#fb923c" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
