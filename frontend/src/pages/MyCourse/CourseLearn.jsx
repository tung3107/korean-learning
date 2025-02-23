// prettier-ignore
import styled from "styled-components";
import MarkDown from "markdown-to-jsx";
import { useCourseLearn } from "../../hook/CourseLearnContext";
import Spinner from "../../components/Spinner";
import {
  replace,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import axiosClient from "../../services/axiosClient";
import SmallButton from "../../components/SmallButton";
import {
  HiArrowDownLeft,
  HiArrowLeft,
  HiArrowRight,
  HiCheckCircle,
} from "react-icons/hi2";

const CourseLearnLayout = styled(MarkDown)`
  font-size: 1rem;
  margin: 3rem 30% 3rem 5%;
  color: black;
  line-height: 1.8;
  display: flex;
  flex-direction: column;
  h1 {
    margin: 48px 0 8px;
    font-size: 2rem;
    line-height: 1.4;
    font-weight: 600;
  }
  img {
    width: 70%;
    border-radius: 10px;
    justify-content: center;
  }
  blockquote {
    border-left: 4px #48bb78 solid;
    padding-left: 20px;

    p {
      color: #6d6d6d;
      margin: 5px 0 5px 0;
      font-weight: 500;
    }
  }
  p {
    margin: 16px 0 16px 0;
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

  button {
    font-size: 1.2rem;
    font-weight: 700;
    padding: 5px 10px 5px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
  .control_bar {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 10px;
  }
  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: black;
  }
  .lesson_name {
    display: flex;
    align-items: center;

    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    gap: 10px;
    svg {
      color: black;
    }
  }
`;
function CourseLearn({ isExcercise = false }) {
  const [params, setParams] = useSearchParams();
  const [content, setContent] = useState("");
  const [name, setName] = useState("");
  const {
    isLoading,
    course,
    slug,
    toggleFinish,
    togglePrevious,
    userprogress,
    setUserProgress,
  } = useCourseLearn();
  const navigate = useNavigate();
  const hasFetched = useRef(false);
  let currentLessonId = params?.get("id");

  const { _id, lessons, lessonArr } = course;

  useEffect(() => {
    async function fetchPreviousLesson() {
      try {
        if (!isLoading && !hasFetched.current) {
          const response = (await axiosClient.get(`/userprogress/${_id}`)).data
            ?.data?.doc[0];
          const finsisedLessons = response.finsisedLessons;
          if (finsisedLessons) {
            console.log(finsisedLessons);
            setUserProgress(finsisedLessons);
            const lastLesson = finsisedLessons[finsisedLessons.length - 1];
            const index = lessonArr.indexOf(lastLesson);
            const lesson_id =
              index + 1 === lessonArr.length
                ? lessonArr[index] // Nếu cuối danh sách, giữ nguyên
                : lessonArr[index + 1]; // Bài tiếp theo

            navigate(
              `/learning/${slug}/${
                lesson_id.startsWith("excercise")
                  ? `excercise?id=${lesson_id.split(" ")[1]}`
                  : `?id=${lesson_id}`
              }`,
              {
                replace: true,
              }
            );

            hasFetched.current = true;
          } else {
            const newId = lessons[0]._id;
            navigate(`?id=${newId}`, { replace: true });
          }
          // Lấy `id` hiện tại từ `params`
        }
      } catch (error) {
        console.error("Error fetching previous lesson:", error);
      }
    }

    fetchPreviousLesson();
  }, [
    userprogress,
    navigate,
    setUserProgress,
    _id,
    lessonArr,
    lessons,
    isLoading,
    slug,
  ]);

  useEffect(() => {
    async function fetchCourseContent() {
      try {
        let tilte_name;
        const currentLessonId = params?.get("id");

        // Kiểm tra nếu `id` hiện tại đã được tải nội dung
        if (currentLessonId) {
          let response;
          if (!isExcercise) {
            response = await axiosClient.get(`/lessons/${currentLessonId}`);
            tilte_name = response.data.data.doc.lesson_name;
          } else {
            response = await axiosClient.get(`/exercises/${currentLessonId}`);
            tilte_name = response.data.data.doc.exercises_name;
          }
          document.title = tilte_name;
          setName(tilte_name);
          setContent(response.data.data.doc.content);
        }
      } catch (error) {
        console.error("Error fetching course content:", error);
      }
    }

    fetchCourseContent();
  }, [params, isExcercise]);

  return (
    <>
      <CourseLearnLayout>{content}</CourseLearnLayout>
      <FooterLayout>
        <div className="control_bar">
          <SmallButton
            styled="bg-L_Grey text-white"
            onClick={() => {
              togglePrevious(currentLessonId, navigate, slug);
            }}
          >
            <HiArrowLeft size={20} />
            Previous Lesson
          </SmallButton>
          <SmallButton
            styled="bg-shade1 text-white"
            onClick={() => {
              toggleFinish(currentLessonId, isExcercise, navigate, slug);
            }}
          >
            Finish <HiCheckCircle />
          </SmallButton>
          <SmallButton styled="lesson_name text-grey">
            <p>{name}</p>
            <HiArrowRight size={20} />
          </SmallButton>
        </div>
      </FooterLayout>
    </>
  );
}

export default CourseLearn;
