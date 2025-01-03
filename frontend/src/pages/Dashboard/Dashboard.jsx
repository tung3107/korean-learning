import styled from "styled-components";
import HomeCourse from "../../ui/HomeCourse";
import HomeGame from "../../ui/HomeGame";

import AppHeader from "../../ui/AppHeader";
import { Outlet } from "react-router";

const DashboardLayout = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  margin-left: 10%;
  margin-top: 4rem;
  @media (max-width: 768px) {
    margin-left: 0;
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
