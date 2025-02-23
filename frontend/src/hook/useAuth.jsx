import { useQuery } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";

export function useAuth() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosClient.get("/users/me");
      return response.data.data.doc;
    },
    staleTime: 1000 * 60 * 5, // Cache dữ liệu trong 5 phút
    retry: 1, // Giảm số lần thử lại nếu request thất bại
  });

  return {
    isLoading,
    isAuthenticated: user ? true : false,
    isUser: user?.role === "user" ? true : false,
  };
}
