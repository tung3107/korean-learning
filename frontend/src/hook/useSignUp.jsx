import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosClient from "../services/axiosClient";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export function useSignUp() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: async (credentials) => {
      const response = await axiosClient.post("/users/signup", credentials);
      return response.data.data.user;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      toast.success("Sign up successfully");
      if (user.role === "user") {
        navigate("/app/home", { replace: true });
      } else {
        navigate("/admin", { replace: true });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return { signup, isLoading };
}
