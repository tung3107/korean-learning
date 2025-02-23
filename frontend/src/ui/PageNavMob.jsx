import { NavLink } from "react-router-dom";

function PageNavMob() {
  return (
    <div className="inline-flex relative lg:hidden group">
      <button className="menu-button lg:hidden w-8 h-8">
        <span className="bg-black block h-1 w-8 mx-auto mb-1"></span>
        <span className="bg-black block h-1 w-8 mx-auto my-1"></span>
        <span className="bg-black block h-1 w-8 mx-auto mt-1"></span>
      </button>

      <div className="absolute mt-3 top-full botton-0 right-0 bg-white border-black border rounded-md font-medium hidden group-focus-within:block">
        <nav
          className="flex-column h-50 w-48 text-xl text-black"
          style={{ lineHeight: "50px" }}
        >
          <div className="pl-5 hover:bg-tint5">
            <NavLink className="hover:text-shade1" to="/">
              Home
            </NavLink>
          </div>
          <div className="pl-5 hover:bg-tint5">
            <NavLink className="hover:text-shade1" to="/home">
              Lessons
            </NavLink>
          </div>
          <div className="pl-5 hover:bg-tint5">
            <NavLink className="hover:text-shade1" to="/home">
              Quizzez
            </NavLink>
          </div>
          <div className="pl-5 hover:bg-tint5">
            <NavLink className="hover:text-shade1" to="/home">
              Notebooks
            </NavLink>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default PageNavMob;
