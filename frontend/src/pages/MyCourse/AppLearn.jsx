import { Outlet, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import Header from "../../ui/Header";
import Logo from "../../ui/Logo";
import { useCourseLearn } from "../../hook/CourseLearnContext";
import SideBar from "../../components/SideBar";
import Spinner from "../../components/Spinner";
import { HiArrowLeftCircle, HiBackward, HiXMark } from "react-icons/hi2";
import Lesson from "../../components/Lesson";
import LessonContent from "../../components/LessonContent";
import ProgressChart from "../../components/ProgressChart";
import { useEffect } from "react";

const AppLearnLayout = styled.div`
  height: 100%;
  margin-top: 3rem;
  header {
    background-color: var(--color-dark-header);
    height: 3rem;
    font-size: 1.2rem;
    align-items: center;
  }
  span {
    font-size: 1rem;
  }
  svg {
    cursor: pointer;
  }
  svg:hover {
    color: var(--warning);
  }
`;
const CourseLessonListLayout = styled.div`
  width: 25%;
  height: calc(100% - 6rem);
  background-color: white;
  border-left: 1px solid rgb(231, 231, 231);
  position: fixed;
  right: 0;
  top: 3rem;
  color: black;
  .title_content {
    padding: 10px 15px 10px 15px;
  }

  h1 {
    font-weight: 600;
    font-size: 1.2rem;
  }
  ul {
    overflow: scroll;
    overflow-x: hidden;
    padding: 0px 0px 10px 15px;
  }
  @media (max-width: 728px) {
    width: 100%;
  }
  @media (min-width: 729px) and (max-width: 1028px) {
    width: 50%;
  }
`;
const FooterLayout = styled.footer`
  width: 100%;
  height: 3rem;
  background-color: rgb(226, 226, 226);
  border-left: 1px solid rgb(231, 231, 231);
  position: fixed;
  bottom: 0;
`;
function AppLearn() {
  const { isLoading, course, userprogress } = useCourseLearn();
  const navigate = useNavigate();
  if (isLoading) {
    return <Spinner />;
  }
  const { name, lessons } = course;
  return (
    <AppLearnLayout>
      <Header>
        <div className="flex flex-row items-center gap-3 text-white font-bold">
          <HiArrowLeftCircle size={30} onClick={() => navigate(-1)} />
          <Logo width={30} text={false} />
          <p>Course: {name}</p>
        </div>
        <div className="flex flex-row items-center gap-2 text-white">
          <ProgressChart course={course} userprogress={userprogress} />
        </div>
      </Header>
      <CourseLessonListLayout>
        <div className="title_content flex flex-row items-center gap-2 space-between justify-between">
          <h1>Course content</h1>
          <HiXMark size={20} />
        </div>
        <ul>
          {lessons.map((lesson) => {
            return (
              <LessonContent
                key={lesson._id}
                lesson={lesson}
                userprogress={userprogress}
              />
            );
          })}
        </ul>
      </CourseLessonListLayout>
      <FooterLayout></FooterLayout>
      <Outlet />
    </AppLearnLayout>
  );
}

export default AppLearn;
