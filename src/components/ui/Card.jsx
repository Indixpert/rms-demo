const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-light-card dark:bg-dark-card rounded-xl shadow-soft backdrop-blur-sm border border-white/10 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
