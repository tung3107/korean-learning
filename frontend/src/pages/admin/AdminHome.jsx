import { Outlet } from "react-router";
import SideBar from "../../components/SideBar";
import styled from "styled-components";
import AppHeader from "../../ui/AppHeader";
import AdminSideBar from "../../components/admin/AdminSideBar";

const SideBarLayOut = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
`;

function AdminHome() {
  return (
    <SideBarLayOut>
      <AdminSideBar />
      <Outlet />
      {/* <Dashboard /> */}
    </SideBarLayOut>
  );
}

export default AdminHome;
