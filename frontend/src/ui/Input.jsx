function Input({
  type,
  id,
  autoComplete,
  value,
  onChange,
  disable,
  placeholder,
  className,
}) {
  return (
    <input
      type={type}
      className={className}
      placeholder={placeholder}
      id={id}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      disabled={disable}
    />
  );
}

export default Input;
