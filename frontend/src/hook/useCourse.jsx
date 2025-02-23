import { useQuery } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";

async function fetchCourses(paid) {
  const response = await axiosClient.get(
    paid ? "/course/paid-course" : "/course"
  );
  return response.data;
}

export function useCouse({ paid }) {
  const {
    isLoading,
    data: courses,
    error,
  } = useQuery({
    queryKey: ["courses", paid],
    queryFn: () => fetchCourses(paid),
    staleTime: 10 * 60 * 1000,
  });
  return { isLoading, courses, error };
}
