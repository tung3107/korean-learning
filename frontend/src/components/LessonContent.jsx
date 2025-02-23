import { useEffect } from "react";
import { HiMiniCheckCircle } from "react-icons/hi2";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";

const StyledNavLink = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.13);
  color: #666;
  padding: 10px 15px 10px 15px;
  text-indent: ${(props) => (props.isExcercise ? "30px" : "0")};

  svg {
    color: var(--shade1);
    font-size: 20px;
    text-indent: -30px;
  }
`;

const LessonContentLayout = styled.div`
  display: flex;
  flex-direction: column;

  .name {
    font-weight: 600;
  }

  .duration {
    font-size: 0.8rem;
  }
`;

function LessonContent({ lesson, userprogress }) {
  const { slug } = useParams();
  return (
    <>
      <StyledNavLink to={`/learning/${slug}?id=${lesson._id}`} replace>
        <LessonContentLayout>
          <span className="name">👉 {lesson.lesson_name}</span>
          <span className="duration">{lesson.duration} phút</span>
        </LessonContentLayout>

        {userprogress?.includes(lesson._id) && <HiMiniCheckCircle />}
      </StyledNavLink>

      {lesson.excercises?.map((el) => {
        return (
          <StyledNavLink
            isExcercise
            key={el._id}
            to={`/learning/${slug}/excercise?id=${el._id}`}
            replace
          >
            <LessonContentLayout>
              <span className="name">Bài tập: {el.excercise_name}</span>
            </LessonContentLayout>
            {userprogress?.includes(`excercise ${el._id}`) && (
              <HiMiniCheckCircle />
            )}
          </StyledNavLink>
        );
      })}
    </>
  );
}

export default LessonContent;
