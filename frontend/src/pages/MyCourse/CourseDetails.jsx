import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "../../services/axiosClient";
import Img from "../../components/Img";
import Spinner from "../../components/Spinner";
import styled from "styled-components";
import styles from "../../styles/CourseDetails.module.css";
import AppHeader from "../../ui/AppHeader";
import Lesson from "../../components/Lesson";
import { useCourseRegister } from "../../hook/useCourseRegister";
import { DashboardLayout } from "../Dashboard/Dashboard";

const DetailsLayout = DashboardLayout;
function CourseInfor() {
  const { slug } = useParams();
  const { register, isPending } = useCourseRegister();
  const [isRegistered, setIsRegistered] = useState(false);
  //// course data
  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [`course/${slug}`],
    queryFn: async () => {
      const response = await axiosClient.get(`/course/${slug}`);
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });

  /// get registered course to naviagate immiadatedly
  useEffect(() => {
    async function fetchRegistration() {
      try {
        if (!isLoading) {
          const response = await axiosClient.get(
            `/register/${course.data.doc[0]?._id}`
          );
          setIsRegistered(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchRegistration();
  }, [isLoading, course?.data?.doc]);

  if (isLoading) return <Spinner />;
  if (isError)
    return <p className={styles.errorMessage}>Error: {error.message}</p>;

  const {
    _id,
    name,
    description,
    cover_photo,
    duration,
    level,
    lessons,
    price,
  } = course.data.doc[0];

  return isRegistered ? (
    <Navigate to={`/learning/${slug}`} replace />
  ) : isPending ? (
    <Spinner />
  ) : (
    <div className={styles.courseContainer}>
      {/* Header */}
      <div className={styles.courseHeader}>
        <h1 className={styles.courseTitle}>{name}</h1>
        <p className={styles.courseDescription}>{description}</p>
      </div>

      {/* Content */}
      <div className={styles.courseContent}>
        {/* Video Section */}
        <div className={styles.courseVideo}>
          <img
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/img/course/${cover_photo}`}
            alt="Course Cover"
            className={styles.videoThumbnail}
          />
          <button className={styles.watchButton}>
            Xem giới thiệu khóa học
          </button>
        </div>

        {/* Registration Section */}
        <div className={styles.courseRegister}>
          <p className={styles.price}>Miễn phí</p>
          <button
            className={styles.registerButton}
            onClick={() => register(_id)}
          >
            Đăng ký học
          </button>
          <div className={styles.courseDetails}>
            <p>
              <strong>Trình độ:</strong> {level}
            </p>
            <p>
              <strong>Tổng số bài học:</strong> {lessons.length} bài học
            </p>
            <p>
              <strong>Thời lượng:</strong> {duration} giờ
            </p>
            {price && (
              <p>
                <strong>
                  Giá:
                  <h4 className="text-xl inline text-red-500 font-bold">
                    {price.toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </h4>
                </strong>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Learning Benefits */}
      <div className={styles.courseBenefits}>
        <h2>Bạn sẽ học được gì?</h2>
        <ul className={styles.benefitsList}>
          <li>
            ✔️ Được học kiến thức miễn phí với nội dung chất lượng hơn mất phí
          </li>
          <li>
            ✔️ Hiểu được cách tư duy nâng cao của các lập trình viên có kinh
            nghiệm
          </li>
          <li>
            ✔️ Có nền tảng Javascript vững chắc để làm việc với mọi thư viện
          </li>
          <li>✔️ Nâng cao cơ hội thành công khi phỏng vấn xin việc</li>
        </ul>
      </div>

      {/* Course Content */}
      <div className={styles.courseLessons}>
        <h2>Nội dung khóa học</h2>
        <p>
          <strong>Số bài học:</strong> {lessons.length} bài học &nbsp;|&nbsp;
          <strong>Thời lượng:</strong> {duration} giờ
        </p>
      </div>
      <div className={styles.courseLessons}>
        <ul>
          {lessons.map((lesson) => (
            <Lesson key={lesson._id} lesson={lesson} />
          ))}
        </ul>
      </div>
    </div>
  );
}
function CourseDetails() {
  return (
    <DetailsLayout>
      <AppHeader />
      <CourseInfor />
    </DetailsLayout>
  );
}

export default CourseDetails;
