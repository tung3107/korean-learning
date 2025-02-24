import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axiosClient from "../services/axiosClient";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: async () => {
      const response = await axiosClient.post("/users/logout");
      return response;
    },
    onSuccess: () => {
      queryClient.removeQueries();
      toast.success("Logging out");
      document.cookie = "jwt=; path=/; max-age=0;";
      navigate("/", { replace: true });
    },
  });
  return { logout, isLoading };
}
