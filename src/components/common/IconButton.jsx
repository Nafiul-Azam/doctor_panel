const IconButton = ({
  icon: Icon,
  label,
  onClick,
  type = "button",
  variant = "primary",
}) => {
  return (
    <button type={type} className={`icon-btn ${variant}`} onClick={onClick}>
      {Icon ? <Icon size={16} /> : null}
      <span>{label}</span>
    </button>
  );
};

export default IconButton;
