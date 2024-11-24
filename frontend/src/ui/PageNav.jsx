import { NavLink } from "react-router-dom";
import Button from "../components/Button";

function PageNav() {
  return (
    <div className="right-menu lg:flex lg:justify-between lg:items-center hidden lg:font-medium lg:gap-x-7">
      <nav className="lg:flex lg:gap-x-12">
        <div>
          <NavLink className="hover:text-shade1" to="/">
            Home
          </NavLink>
        </div>

        <div>
          <NavLink className="hover:text-shade1" to="/home">
            Lesson
          </NavLink>
        </div>
        <div>
          <NavLink className="hover:text-shade1" to="/home">
            Quizzez
          </NavLink>
        </div>
        <div>
          <NavLink className="hover:text-shade1" to="/home">
            Notebooks
          </NavLink>
        </div>
      </nav>
      <div className="flex lg:gap-x-4">
        <Button styled="bg-L_Grey" path="login">
          Login
        </Button>
        <Button styled="bg-shade1">Register</Button>
      </div>
    </div>
  );
}

export default PageNav;
