import styled from "styled-components";
import HomeCourse from "../../ui/HomeCourse";
import HomeGame from "../../ui/HomeGame";

import AppHeader from "../../ui/AppHeader";
import { Outlet } from "react-router";

const DashboardLayout = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
  margin-top: 4rem;
  background-color: #eaeaea;
  @media (max-width: 728px) {
    margin-left: 0;
  }
  @media (min-width: 1280px) {
    margin-left: 7%;
  }
`;

function Dashboard() {
  return (
    <DashboardLayout>
      <AppHeader />
      <HomeCourse />
    </DashboardLayout>
  );
}

export default Dashboard;
export { DashboardLayout };
