import Card from '../ui/Card';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

const StatCard = ({ icon, title, value, prefix = '', suffix = '' }) => {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;
    const controls = animate(0, value, {
      duration: 1.5,
      onUpdate(value) {
        node.textContent = Math.round(value).toLocaleString();
      }
    });
    return () => controls.stop();
  }, [value]);

  return (
    <Card className="p-4 flex items-center animate-slide-in">
      <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-lg mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {prefix}<span ref={nodeRef}>0</span>{suffix}
        </h3>
      </div>
    </Card>
  );
};

export default StatCard;
