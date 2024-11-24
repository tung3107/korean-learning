import styled from "styled-components";
import CardList from "./CardList";
import HomeGame from "./HomeGame";

const HomeCourseLayout = styled.div`
  padding: 40px 10px 74px 56px;
`;

function HomeCourse() {
  return (
    <HomeCourseLayout>
      <div className="my-3">
        <h2 className="font-bold text-2xl text-black">Free Courses 🔥</h2>
      </div>
      <CardList />
      <HomeGame />
    </HomeCourseLayout>
  );
}

export default HomeCourse;
