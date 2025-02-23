import styled from "styled-components";
import Logo from "../ui/Logo";
import Button from "./Button";
import Img from "./Img";
import { HiAcademicCap, HiClipboardDocument, HiHome } from "react-icons/hi2";

const SideBarLayout = styled.div`
  position: fixed;
  left: 0;
  width: 10%;
  align-content: center;
  gap: 20px;
  height: 100vh;
  padding: 20px 3px 0 3px;
  border-right: 1px solid rgba(30, 30, 30, 0.07);
  background-color: #f4f4f4;
  z-index: 10;
  font-size: 12px;
  font-weight: 600;

  a:hover span,
  svg {
    color: #4caf4f;
  }
  a {
    transition: all 0.3s;
  }

  a > svg {
    width: 25px;
    height: 25px;
    color: var(--dgrey);
    transition: all 0.3s;
  }
  svg:hover {
    color: var(--shade4);
  }

  img {
    width: 35px;
  }

  @media (min-width: 729px) {
    display: flex;
    flex-direction: column;

    .logo {
      display: flex;
      flex-direction: column;
    }
  }
  @media (min-width: 1280px) {
    width: 7%;
  }
  @media (max-width: 728px) {
    bottom: 0;
    justify-content: center;
    width: 100%;
    padding: 0 3px 0 3px;
    height: auto;
    border-top: 1px solid rgba(30, 30, 30, 0.07);
    background-color: #f4f4f4;
    flex-direction: row;
    display: flex;

    .logo {
      display: none;
    }

    img {
      width: 20px;
      font-size: 12px;
    }
  }
`;

function SideBar() {
  return (
    <SideBarLayout>
      <Logo width={40} />
      <Button
        styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5 visited:bg-L_Grey"
        path="home"
      >
        <HiHome />
        <span className="text-black">Home</span>
      </Button>
      <Button
        styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5"
        path="mycourse"
      >
        <HiAcademicCap />
        <span className="text-black">My Course</span>
      </Button>
      <Button
        styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5"
        path="flashcard"
      >
        <HiClipboardDocument />
        <span className="text-black">Flashcard</span>
      </Button>
    </SideBarLayout>
  );
}

export default SideBar;

export { SideBarLayout };
