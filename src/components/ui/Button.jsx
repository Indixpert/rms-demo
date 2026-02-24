const Button = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-accent hover:bg-accent-hover text-white shadow-soft',
    secondary: 'bg-gray-200 dark:bg-dark-secondary hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200',
    danger: 'bg-red-500 hover:bg-red-600 text-white',
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
