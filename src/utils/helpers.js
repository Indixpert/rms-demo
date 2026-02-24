export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case 'available': return 'bg-green-100 text-green-800';
    case 'occupied': return 'bg-red-100 text-red-800';
    case 'reserved': return 'bg-yellow-100 text-yellow-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'preparing': return 'bg-blue-100 text-blue-800';
    case 'served': return 'bg-purple-100 text-purple-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'paid': return 'bg-green-100 text-green-800';
    case 'unpaid': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
