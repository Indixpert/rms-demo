import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Card from '../ui/Card';

const RevenueChart = ({ data }) => {
  return (
    <Card className="p-4 h-96 animate-slide-in" style={{animationDelay: '200ms'}}>
      <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">Revenue Overview</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
          <XAxis dataKey="name" tick={{ fill: 'rgb(156 163 175)' }} />
          <YAxis tick={{ fill: 'rgb(156 163 175)' }} tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            cursor={{fill: 'rgba(251, 146, 60, 0.1)'}}
            contentStyle={{ 
              backgroundColor: 'rgba(30, 30, 30, 0.8)', 
              borderColor: 'rgba(251, 146, 60, 0.5)',
              borderRadius: '0.5rem'
            }} 
          />
          <Legend />
          <Bar dataKey="revenue" name="Revenue" fill="#f97316" radius={[4, 4, 0, 0]} />
          <Bar dataKey="orders" name="Orders" fill="#fb923c" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default RevenueChart;
