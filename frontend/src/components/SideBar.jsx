import styled from "styled-components";
import Logo from "../ui/Logo";
import Button from "./Button";
import Img from "./Img";

const SideBarLayout = styled.div`
  position: absolute;
  left: 0;
  width: 10%;
  height: 100vh;
  align-content: center;
  gap: 20px;
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
        styled="flex flex-col items-center hover:bg-L_Grey visited:bg-L_Grey link:bg-L_Grey"
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
        styled="flex flex-col items-center hover:bg-L_Grey focus:bg-L_Grey"
        path="mycourse"
      >
        <Img
          src="../src/assets/Global Learning.svg"
          styled={{
            width: "35px",
          }}
        />
        <span className="text-black">My Course</span>
      </Button>
      <Button
        styled="flex flex-col items-center hover:bg-L_Grey active:bg-L_Grey"
        path="user-setting"
      >
        <Img
          src="../src/assets/User.svg"
          styled={{
            width: "35px",
          }}
        />
        <span className="text-black">User Setting</span>
      </Button>
    </SideBarLayout>
  );
}

export default SideBar;
