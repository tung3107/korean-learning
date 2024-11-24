import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Img from "../components/Img";
import Search from "../components/Search";
import Header from "./Header";
import Input from "./Input";

function AppHeader() {
  const [menuOpened, setMenuOpened] = useState(false);
  const menuRef = useRef(null);
  function handleMenu() {
    setMenuOpened((menuOpened) => !menuOpened);
  }

  /// useRef to manipulate dom
  useEffect(() => {
    const menuButton = document.getElementsByClassName("menu")[0];
    const menuImage = document.getElementsByClassName("menu")[1];

    const handleClickOutSide = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpened(false);
      } else if (event.target === menuButton || event.target === menuImage) {
        handleMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);
  return (
    <Header styles="border-b-2 border-gray-200 justify-center w-[90%] items-center">
      <Search>
        <Img
          src="../../src/assets/Search.svg"
          styled={{
            width: "20px",
          }}
        />
        <Input
          type="text"
          id="search"
          placeholder="Search courses, exercises,..."
          className="w-full h-full focus:outline-none"
        />
      </Search>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Button styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5">
          <Img
            src="../../src/assets/notifications.svg"
            styled={{
              width: "35px",
            }}
          />
        </Button>
        <Button styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5 menu">
          <Img
            src="../../src/assets/User.svg"
            className="menu"
            styled={{
              width: "35px",
            }}
          />
        </Button>
        {menuOpened && (
          <div
            ref={menuRef}
            className="absolute right-4 top-[3rem] mt-2 w-48 bg-white shadow-[4px_-4px_20px_2px_rgb(0,0,0,0.25)] rounded-xl"
            style={{
              animation: "fadeInUp 0.25s ease-out",
            }}
          >
            <ul className="flex flex-col">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </Header>
  );
}

export default AppHeader;
