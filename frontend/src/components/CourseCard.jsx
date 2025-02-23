import styled from "styled-components";
import styles from "../styles/CourseCard.module.css";
import Img from "./Img";
import Button from "./Button";
import { NavLink } from "react-router-dom";
import { HiMiniClock } from "react-icons/hi2";

const CardLayout = styled.div`
  width: 23%;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid rgba(30, 30, 30, 0.07);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;

  img {
    width: 100%;
    height: 50%;
    object-fit: cover;
  }

  &:hover {
    transform: translateY(-10px);
  }
  @media (max-width: 450px) {
    width: 70%;
  }
  @media (min-width: 451px) and (max-width: 728px) {
    width: 40%;

    h3 {
      font-size: 1rem;
      line-height: 1.2rem;
    }
  }
  @media (min-width: 729px) and (max-width: 1028px) {
    width: 30%;
    h3 {
      font-size: 1.1rem;
      line-height: 1.76rem;
    }
    img {
      width: 100%;
      height: 40%;
    }
  }
  @media (min-width: 1280px) {
    width: 20%;
    h3 {
      font-size: 1.1rem;
      line-height: 1.75rem;
    }
  }
`;

const CardContent = styled.div`
  padding: 15px;
  color: #333;
  height: 50%; /* Adjusted height for better content fit */
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 728px) {
    justify-content: unset;
    gap: 10px;
  }

  svg {
    display: inline;
  }

  h3 {
    font-weight: 600;
    color: rgb(9, 9, 11);
    word-wrap: break-word;
  }

  p {
    font-size: 0.875rem;
    color: #52525b;
    line-height: 1.5;
  }

  .level-info {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      font-size: 0.875rem;
      color: rgb(104, 120, 146);
    }

    .time-estimate {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
      color: rgb(93, 106, 124);

      img {
        margin-right: 4px;
      }
    }
  }

  .progress-bar {
    background-color: #edf2f7;
    border-radius: 8px;
    height: 8px;
    margin-top: 10px;

    .progress {
      background-color: #48bb78;
      height: 100%;
      border-radius: 8px;
    }
  }
`;

function CourseCard({ style, finished, course, paid }) {
  return (
    <CardLayout>
      <NavLink to={`/app/details/${course.slug}`}>
        <Img
          src={`${import.meta.env.VITE_BACKEND_URL}/img/course/${
            course.cover_photo
          }`}
          styled={{
            borderRadius: "16px 16px 0 0",
          }}
        />

        <CardContent>
          <h3>{course.name}</h3>
          {paid && (
            <h4 className="text-xl text-red-500 font-bold">
              {course.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </h4>
          )}
          {finished ? (
            <aside>
              <p>Learned 3 years ago</p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "45%" }}></div>
              </div>
            </aside>
          ) : (
            <div className="level-info">
              <span>Level {course.level}</span>
              <span className="time-estimate">
                <HiMiniClock />
                {course.duration}h
              </span>
            </div>
          )}
        </CardContent>
      </NavLink>
    </CardLayout>
  );
}

export default CourseCard;
