import styled from "styled-components";
import styles from "../styles/CourseCard.module.css";
import Img from "./Img";
import Button from "./Button";
import { NavLink } from "react-router-dom";

const CardLayout = styled.div`
  width: 23%;
  border-radius: 16px;
  background: #00000008;
  transition: transform 0.5s ease-in-out;

  &:hover {
    transform: translateY(-10px);
  }
`;

function CourseCard({ style, finished }) {
  return (
    <CardLayout>
      <NavLink to="/app/details/so-cap1">
        <Img
          src="../src/assets/Card_Level1.jpg"
          styled={{
            borderRadius: "16px 16px 0 0",
          }}
        />

        <div className={`${styles.cardDescrip} text-black`}>
          <h3>Korean Basic Level 1</h3>
          {finished ? (
            <aside>
              <p>Learned 3 years ago</p>
              <div className="w-full bg-gray rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </aside>
          ) : (
            <div>
              <span>Level 1</span>
              <span>
                <Img
                  src="../src/assets/Clock.svg"
                  styled={{
                    width: "16px",
                    display: "inline",
                    marginRight: "4px",
                  }}
                />
                12h
              </span>
            </div>
          )}
        </div>
      </NavLink>
    </CardLayout>
  );
}

export default CourseCard;
