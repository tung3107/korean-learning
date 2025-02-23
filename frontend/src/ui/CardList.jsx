import styled from "styled-components";
import CourseCard from "../components/CourseCard";
import Spinner from "../components/Spinner";
import { useCouse } from "../hook/useCourse";
import { useEffect, useState } from "react";
import axiosClient from "../services/axiosClient";

const ListLayout = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 1028px) {
    justify-content: center;
  }
`;

function CardList({ finished = false, paid = false }) {
  const { isLoading, courses, error } = useCouse({ paid });
  const [courseData, setCourseData] = useState();

  useEffect(() => {
    async function fetchCourse() {
      if (isLoading) return;
      try {
        if (!finished) {
          setCourseData(courses?.data.docs);
        } else {
          const response = await axiosClient.get("/register/");
          setCourseData(response.data.data.registered_course);
        }
      } catch (error) {
        console.error("Error fetching course: ", error);
      }
    }
    fetchCourse();
  }, [isLoading, finished, courses?.data.docs]);

  if (isLoading) return <Spinner />;
  if (error) return <p>Something went wrong: {error.message}</p>;
  return (
    <div>
      <ListLayout>
        {courseData?.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            finished={finished}
            paid={paid}
          />
        ))}
      </ListLayout>
    </div>
  );
}

export default CardList;
