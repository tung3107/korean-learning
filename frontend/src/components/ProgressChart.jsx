import { useState } from "react";
import styled from "styled-components";

const ProgressChartLayout = styled.div`
  text {
    fill: white; /* Text color */
    font-size: 70px;
    font-family: Arial, sans-serif;
    text-anchor: middle;
    dominant-baseline: middle;
  }
  circle.fg {
    stroke: #4caf50;
    transition: stroke-dasharray 0.3s ease;
    transform: rotate(-90deg);
    transform-origin: 125px 125px;
  }
`;
function ProgressChart({ course, userprogress }) {
  const totalLesson = course?.lessonArr?.length;
  const doneLesson = userprogress.length;
  const radius = 115;
  const cir = 2 * Math.PI * radius;
  const progress = (doneLesson / totalLesson) * cir;
  const strokeDasharray = `${progress} ${cir}`;
  return (
    <>
      <ProgressChartLayout className="progress-bar">
        <svg width="40" height="40" viewBox="0 0 250 250">
          <circle
            className="bg"
            cx="125"
            cy="125"
            r="115"
            fill="none"
            stroke="#ddd"
            strokeWidth="20"
          ></circle>

          <circle
            className="fg"
            cx="125"
            cy="125"
            r="115"
            fill="none"
            stroke="#48bb78"
            strokeWidth="20"
            strokeDasharray={strokeDasharray}
            strokeDashoffset="20"
          ></circle>
          <text x="125" y="130" className="percentage-text">
            {(doneLesson / totalLesson) * 100}%
          </text>
        </svg>
      </ProgressChartLayout>
      <span>
        {doneLesson}/{totalLesson} bài học
      </span>
    </>
  );
}

export default ProgressChart;
