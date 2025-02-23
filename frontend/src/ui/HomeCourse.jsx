import styled from "styled-components";
import CardList from "./CardList";
import HomeGame from "./HomeGame";

const HomeCourseLayout = styled.div`
  margin: 24px 24px 0px;
  padding: 24px;
  border-radius: 8px;
  min-height: 100vh;
  background-color: rgb(244, 244, 244);

  @media (max-width: 728px) {
    padding: 40px 12px 74px 12px;
  }
`;

function HomeCourse() {
  return (
    <>
      <HomeCourseLayout>
        <div className="my-3">
          <h2 className="font-bold text-2xl text-black">Free Courses 🔥</h2>
        </div>
        <CardList paid={false} />

        <div className="my-3">
          <h2 className="font-bold text-2xl text-black">Paid Courses 🔥</h2>
        </div>
        <CardList paid={true} />
        <HomeGame />
      </HomeCourseLayout>
    </>
  );
}

export default HomeCourse;
export { HomeCourseLayout };
