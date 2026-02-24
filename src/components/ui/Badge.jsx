import { getStatusColor } from '../../utils/helpers';

const Badge = ({ status }) => {
  return (
    <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
      {status}
    </span>
  );
};

export default Badge;
