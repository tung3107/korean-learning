import styled from "styled-components";
import AppHeader from "../../ui/AppHeader";
import FinishedCourse from "../../ui/FinishedCourse";
const MyCourseLayout = styled.div`
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
function MyCourse() {
  return (
    <MyCourseLayout>
      <AppHeader />
      <FinishedCourse />
    </MyCourseLayout>
  );
}

export default MyCourse;
