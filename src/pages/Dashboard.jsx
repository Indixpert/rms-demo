import { DollarSign, ShoppingCart, Grid, Users } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import RevenueChart from '../components/dashboard/RevenueChart';
import PopularItems from '../components/dashboard/PopularItems';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { useApp } from '../context/AppContext';
import { format, isToday } from 'date-fns';
import { formatCurrency } from '../utils/helpers';

const Dashboard = () => {
  const { orders, tables, menuItems } = useApp();

  const todayOrders = orders.filter(o => isToday(new Date(o.timestamp)));
  const totalRevenue = orders
    .filter(o => o.paymentStatus === 'Paid')
    .reduce((sum, order) => sum + useApp().calculateOrderTotal(order).total, 0);
  
  const activeTables = tables.filter(t => t.status === 'Occupied').length;

  const chartData = [
    { name: 'Mon', revenue: 4000, orders: 24 },
    { name: 'Tue', revenue: 3000, orders: 13 },
    { name: 'Wed', revenue: 2000, orders: 98 },
    { name: 'Thu', revenue: 2780, orders: 39 },
    { name: 'Fri', revenue: 1890, orders: 48 },
    { name: 'Sat', revenue: 2390, orders: 38 },
    { name: 'Sun', revenue: 3490, orders: 43 },
  ];

  const recentActivity = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<DollarSign className="text-green-500" />} title="Total Revenue" value={totalRevenue} prefix="$" />
        <StatCard icon={<ShoppingCart className="text-blue-500" />} title="Orders Today" value={todayOrders.length} />
        <StatCard icon={<Grid className="text-red-500" />} title="Active Tables" value={activeTables} />
        <StatCard icon={<Users className="text-purple-500" />} title="Total Customers" value={useApp().customers.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={chartData} />
        </div>
        <div>
          <PopularItems />
        </div>
      </div>

      <div className="animate-slide-in" style={{animationDelay: '400ms'}}>
        <Card>
          <h3 className="p-4 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-dark-secondary dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Order ID</th>
                  <th scope="col" className="px-6 py-3">Table</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Total</th>
                  <th scope="col" className="px-6 py-3">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentActivity.map(order => {
                  const total = useApp().calculateOrderTotal(order).total;
                  return (
                    <tr key={order.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-dark-secondary">
                      <td className="px-6 py-4 font-medium">#{order.id}</td>
                      <td className="px-6 py-4">Table {order.tableId}</td>
                      <td className="px-6 py-4"><Badge status={order.status} /></td>
                      <td className="px-6 py-4">{formatCurrency(total)}</td>
                      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{format(new Date(order.timestamp), 'p')}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
