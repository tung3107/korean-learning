import { useMutation, useQueryClient } from "@tanstack/react-query";
import { replace, useNavigate } from "react-router";
import Cookies from "js-cookie";
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
      return { user: response.data.data.user, token: response.data.token };
    },
    onSuccess: ({ user, token }) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Login successfully", {
        duration: 1000,
      });

      document.cookie = `jwt=${token}; path=/; max-age=3600; secure`;

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
