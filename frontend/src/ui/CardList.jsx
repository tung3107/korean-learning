import styled from "styled-components";
import CourseCard from "../components/CourseCard";

const ListLayout = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

function CardList({ finished = false }) {
  return (
    <div>
      <ListLayout>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard finished={finished} />
      </ListLayout>
    </div>
  );
}

export default CardList;
