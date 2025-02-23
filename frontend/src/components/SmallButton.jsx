function Button({ children, styled, onClick, path, ...rest }) {
  return (
    <button
      className={`text-lightwhite text-center py-2.5 px-3.5 rounded-md ${styled}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
