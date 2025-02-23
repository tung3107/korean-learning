import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replace, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import axiosClient from "../services/axiosClient";

export default function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axiosClient.post("/users/login", {
        email: email,
        password: password,
      });
      return response.data.data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login successfully", {
        duration: 1000,
      });
      if (user.role === "user") {
        navigate("/app/home", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }
    },
    onError: (err) => {
      toast.error("Provided email or password are incorrect");
    },
  });
  return { login, isLoading };
}
