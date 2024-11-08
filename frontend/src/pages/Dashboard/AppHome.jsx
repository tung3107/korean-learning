import { Outlet } from "react-router";
import SideBar from "../../components/SideBar";
import styled from "styled-components";

const SideBarLayOut = styled.div`
  display: flex;
  flex-direction: row;
`;

function AppHome() {
  return (
    <SideBarLayOut>
      <SideBar />
      <Outlet />
      {/* <Dashboard /> */}
    </SideBarLayOut>
  );
}

export default AppHome;
