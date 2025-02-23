import styled from "styled-components";
import CardList from "./CardList";
import { HomeCourseLayout } from "./HomeCourse";
const FinishedCourseLayout = HomeCourseLayout;
function FinishedCourse() {
  return (
    <FinishedCourseLayout>
      <div className="mt-3 mb-20">
        <h2 className="font-bold text-2xl text-black">Finished Courses 🔥</h2>
        <p className="my-3">You have not finished any courses</p>
      </div>
      <CardList finished={true} />
    </FinishedCourseLayout>
  );
}

export default FinishedCourse;
