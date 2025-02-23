import { useMutation } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function useCourseRegister() {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useMutation({
    mutationFn: async function (courseID) {
      const response = await axiosClient.post(`/register/${courseID}`);
      return response.data.data;
    },
    onSuccess: function (result) {
      navigate(`/learning/${result}`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { register, isPending };
}

export { useCourseRegister };
