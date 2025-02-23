import {
  HiAcademicCap,
  HiBookOpen,
  HiChartBar,
  HiClipboardDocument,
  HiHome,
  HiRocketLaunch,
} from "react-icons/hi2";
import { SideBarLayout } from "../SideBar";
import Logo from "../../ui/Logo";
import Button from "../Button";
import styled from "styled-components";

const AdminSideBarLayout = styled(SideBarLayout)`
  width: 16%;
  padding: 15px;
  font-size: 16px;
  font-weight: 400;
  background-color: white;

  a:hover {
    background-color: rgb(49, 158, 53);
    box-shadow: 2px 2px;
    span,
    svg {
      color: white;
    }
  }

  a {
    gap: 10px;
  }

  .logo {
    flex-direction: row;
    gap: 10px;
    span {
      font-size: 1.5rem;
      color: #151d48;
    }
  }
`;

function AdminSideBar() {
  return (
    <AdminSideBarLayout>
      <Logo width={40} admin={true} />
      <Button
        styled="flex flex-row items-center hover:bg-tint5 focus:bg-tint5 visited:bg-L_Grey"
        path="analysis"
      >
        <HiChartBar size={30} />
        <span className="text-black">Analysis</span>
      </Button>
      <Button
        styled="flex flex-row items-center hover:bg-tint5 focus:bg-tint5"
        path="mycourse"
      >
        <HiAcademicCap />
        <span className="text-black">Course</span>
      </Button>
      <Button
        styled="flex flex-row items-center hover:bg-tint5 focus:bg-tint5"
        path="flashcard"
      >
        <HiBookOpen />
        <span className="text-black">Execercise</span>
      </Button>
      <Button
        styled="flex flex-row items-center hover:bg-tint5 focus:bg-tint5"
        path="flashcard"
      >
        <HiRocketLaunch />
        <span className="text-black">Lesson</span>
      </Button>
    </AdminSideBarLayout>
  );
}

export default AdminSideBar;
