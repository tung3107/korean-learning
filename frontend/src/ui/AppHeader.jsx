import { useEffect, useRef, useState } from "react";
import { HiBell, HiUser } from "react-icons/hi2";

import Button from "../components/Button";

import Search from "../components/Search";
import Header from "./Header";
import { useLogout } from "../hook/useLogout";
import SearchResult from "./SearchResult";
import { useQueryClient } from "@tanstack/react-query";
import { SearchProvider } from "../hook/SearchContext";
import Menu from "./Menu";
import styled from "styled-components";

const AppHeaderLayout = styled.div`
  z-index: 20;
  & svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--dgrey);
    transition: all 0.3s;
  }
  header {
    width: 92%;
    background-color: rgb(244, 244, 244);
  }
  svg:hover {
    color: var(--shade4);
  }
  @media (max-width: 728px) {
    header {
      width: 100%;
    }
    .username {
      display: none;
    }
  }
  @media (min-width: 1280px) {
    header {
      width: 94%;
    }
  }
`;

function AppHeader() {
  const [menuOpened, setMenuOpened] = useState(false);
  const [searchOpened, setSearchOpened] = useState(false);
  const menuRef = useRef(null);
  const { logout, isLoading } = useLogout();
  const queryClient = useQueryClient();

  const user = queryClient.getQueryData(["user"]);

  function handleOpen() {
    if (searchOpened) setSearchOpened(false);
    setMenuOpened((menuOpened) => !menuOpened);
  }
  function handleSearch() {
    if (menuOpened) setMenuOpened(false);
    setSearchOpened((searchOpened) => !searchOpened);
  }

  /// useRef to manipulate dom
  useEffect(() => {
    function handleClickOutside(event) {
      const menu = document.getElementsByClassName("menuButton")[0];
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !menu.contains(event.target)
      ) {
        setMenuOpened(false);
        setSearchOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <AppHeaderLayout>
      <Header styles="border-b-2 border-gray-200 justify-center sm:w-full w-[92%] items-center">
        {/* <SmallButton styled="flex flex-row bg-shade2 font-semibold	 rounded-xl items-center">
          Create post <HiPlusSmall color="white" />
        </SmallButton> */}
        {/* <IconButton onClick={toggleColorMode} variant="outline" size="sm">
          {colorMode === "light" ? <LuSun /> : <LuMoon />}
        </IconButton> */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5">
            <HiBell />
          </Button>
          <Button
            styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5 menuButton"
            onClick={handleOpen}
          >
            <HiUser />
          </Button>
          {menuOpened && <Menu menuRef={menuRef} logout={logout} />}
        </div>
        <div>
          <SearchProvider>
            <Search handleSearch={handleSearch} />
            {searchOpened && (
              <SearchResult menuRef={menuRef} handleSearch={handleSearch} />
            )}
          </SearchProvider>
        </div>
        <span className="username text-md font-medium text-gray-600">
          Welcome, {user.name}
        </span>
      </Header>
    </AppHeaderLayout>
  );
}

export default AppHeader;
