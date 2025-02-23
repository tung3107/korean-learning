import styled from "styled-components";
import AppHeader from "../../ui/AppHeader";
import Button from "../../components/Button";
import Img from "../../components/Img";
import { useNavigate } from "react-router";
import Input from "../../ui/Input";
import { DashboardLayout } from "../Dashboard/Dashboard";
import { HiArrowLeft } from "react-icons/hi2";
import { HomeCourseLayout } from "../../ui/HomeCourse";
import { useQueryClient } from "@tanstack/react-query";

const UserProfileLayout = DashboardLayout;
const ProfileLayout = styled(HomeCourseLayout)`
  width: 50%;
  @media (max-width: 728px) {
    width: 100%;
  }
  @media (min-width: 1280px) {
  }
  input {
  }
`;
function UserProfile() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["user"]);

  return (
    <UserProfileLayout>
      <AppHeader />
      <Button onClick={() => navigate(-1)} styled="flex flex-row items-center">
        <HiArrowLeft color="black" size={25} />
        <h1 className="text-black text-xl font-bold">
          Change personal details
        </h1>
      </Button>
      <ProfileLayout>
        <Img
          src={`https://i.pravatar.cc/120?u=${user._id}`}
          className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
        />
        <div className="mt-6 sm:mt-12">
          <div className="flex flex-col w-full mb-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <InputField
              field={"Your first name"}
              value={user.name.split(" ")[0]}
            />
            <InputField field={"Your last name"} value={user.name} />
          </div>
          <div className="flex flex-col w-full mb-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <InputField field={"Your email"} value={user.email} />
          </div>
          <div className="flex flex-col w-full mb-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <InputField field={"Your role"} value={user.role} />
          </div>
          <div className="flex flex-col w-full mb-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
            <InputField field={"Your password"} />
          </div>
        </div>
      </ProfileLayout>
    </UserProfileLayout>
  );
}

export default UserProfile;

function InputField({ field, value }) {
  return (
    <div className="w-full">
      <label className="block mb-2 text-sm font-medium text-indigo-900">
        {field}
      </label>
      <Input
        placeholder={field}
        value={value}
        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
      />
    </div>
  );
}
