import styled from "styled-components";
import Logo from "../ui/Logo";
import Button from "./Button";
import Img from "./Img";

const SideBarLayout = styled.div`
  position: fixed;
  left: 0;
  width: 10%;
  align-content: center;
  gap: 20px;
  height: 100vh;
  padding: 20px 3px 0 3px;
  border-right: 2px solid #f3f4f6;
  background-color: ${({ theme }) => theme.tint3};

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 1023px) {
    display: none;
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
        <Img
          src="../src/assets/Home.svg"
          styled={{
            width: "35px",
          }}
        />
        <span className="text-black">Home</span>
      </Button>
      <Button
        styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5"
        path="mycourse"
      >
        <Img
          src="../src/assets/Global Learning.png"
          styled={{
            width: "35px",
          }}
        />
        <span className="text-black">My Course</span>
      </Button>
      <Button
        styled="flex flex-col items-center hover:bg-tint5 focus:bg-tint5"
        path="flashcard"
      >
        <Img
          src="../src/assets/flash-cards.png"
          styled={{
            width: "35px",
          }}
        />
        <span className="text-black">Flashcard</span>
      </Button>
    </SideBarLayout>
  );
}

export default SideBar;
