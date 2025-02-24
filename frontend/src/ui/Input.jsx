function Input({
  type,
  id,
  autoComplete,
  value,
  onChange,
  disable,
  placeholder,
  className,
  onFocus,
  onBlur,
  onInput,
  onClick,
  name,
}) {
  return (
    <input
      type={type}
      name={name}
      className={className}
      placeholder={placeholder}
      id={id}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
      disabled={disable}
      onFocus={onFocus}
      onBlur={onBlur}
      onInput={onInput}
      onClick={onClick}
    />
  );
}

export default Input;
