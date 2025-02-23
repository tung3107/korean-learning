import { createContext, useContext, useEffect, useState } from "react";
import { useCourseLearning } from "./useCourseLearning";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import axiosClient from "../services/axiosClient";
import { toast } from "react-hot-toast";

const CourseLearnContext = createContext();

function CourseLearnProvider({ children }) {
  const { slug } = useParams();
  const { isLoading, course, error } = useCourseLearning({ slug });
  const [userprogress, setUserProgress] = useState([]);

  async function toggleFinish(current_id, isExcercise, navigate, slugs) {
    try {
      const index = course.lessonArr.findIndex((lesson) => {
        if (lesson.startsWith("excercise")) {
          const excercise_id = lesson.split(" ")[1];
          return excercise_id === current_id;
        }
        return current_id === lesson;
      });

      if (index <= course?.lessonArr.length - 1) {
        const percentage = course.lessonArr.length;
        const response = (
          await axiosClient.patch(
            `/userprogress/${course?._id}`,
            isExcercise
              ? {
                  finsisedLessons: `excercise ${current_id}`,
                  percentage: percentage,
                }
              : { finsisedLessons: current_id, percentage: percentage }
          )
        ).data.data.doc;
        setUserProgress(response.finsisedLessons);
        const lesson_id = course.lessonArr[index + 1];

        await toast.success("Bạn đã hoàn thành bài học !", {
          duration: 2000,
        });

        navigate(
          `/learning/${slugs}/${
            lesson_id.startsWith("excercise")
              ? `excercise?id=${lesson_id.split(" ")[1]}`
              : `?id=${lesson_id}`
          }`,
          {
            replace: true,
          }
        );
        console.log(slugs, current_id, lesson_id, index);
      }
    } catch (error) {
      console.error(error);
    }
  }
  function togglePrevious(current_id, navigate, slugs) {
    const index = course.lessonArr.findIndex((lesson) => {
      if (lesson.startsWith("excercise")) {
        const excercise_id = lesson.split(" ")[1];
        return excercise_id === current_id;
      }
      return current_id === lesson;
    });
    if (index > 0) {
      const lesson_id = course?.lessonArr[index - 1];
      navigate(
        `/learning/${slugs}/${
          lesson_id.startsWith("excercise")
            ? `excercise?id=${lesson_id.split(" ")[1]}`
            : `?id=${lesson_id}`
        }`,
        {
          replace: true,
        }
      );
    }
  }

  return (
    <CourseLearnContext.Provider
      value={{
        isLoading,
        course,
        error,
        slug,
        toggleFinish,
        togglePrevious,
        userprogress,
        setUserProgress,
      }}
    >
      {children}
    </CourseLearnContext.Provider>
  );
}

export function useCourseLearn() {
  const context = useContext(CourseLearnContext);
  return context;
}

export { CourseLearnProvider };
