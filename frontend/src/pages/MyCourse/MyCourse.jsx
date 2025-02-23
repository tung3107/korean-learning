import styled from "styled-components";
import AppHeader from "../../ui/AppHeader";
import FinishedCourse from "../../ui/FinishedCourse";
import { DashboardLayout } from "../Dashboard/Dashboard";
const MyCourseLayout = DashboardLayout;
function MyCourse() {
  return (
    <MyCourseLayout>
      <AppHeader />
      <FinishedCourse />
    </MyCourseLayout>
  );
}

export default MyCourse;
