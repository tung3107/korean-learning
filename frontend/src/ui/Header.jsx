function Header({ children, styles }) {
  return (
    <header className="py-2 px-4 bg-white flex items-center justify-between md:py-4 md:px-16 sticky top-0 w-full z-10">
      {children}
    </header>
  );
}

export default Header;
