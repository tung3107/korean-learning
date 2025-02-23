import { Link, NavLink } from "react-router-dom";

function Button({ children, styled, onClick, path, ...rest }) {
  return (
    <NavLink
      className={`text-lightwhite text-center py-2.5 px-3.5 rounded-md ${styled}`}
      onClick={onClick}
      to={path}
    >
      {children}
    </NavLink>
  );
}

export default Button;
