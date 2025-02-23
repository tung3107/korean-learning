import { NavLink } from "react-router-dom";

function Menu({ menuRef, logout }) {
  return (
    <div
      ref={menuRef}
      className="absolute left-4 top-[3rem] mt-2 w-48 bg-white shadow-[4px_-4px_20px_2px_rgb(0,0,0,0.25)] rounded-xl"
      style={{
        animation: "fadeInUp 0.25s ease-out",
      }}
    >
      <ul className="flex flex-col items-start">
        <li className="w-full">
          <NavLink
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer block"
            to="/app/profile"
          >
            Profile
          </NavLink>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
          <button className="w-full block">Setting</button>
        </li>
        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer w-full">
          <button className="block" onClick={() => logout()}>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
