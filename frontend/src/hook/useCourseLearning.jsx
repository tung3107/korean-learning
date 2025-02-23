import { useQuery } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";

function useCourseLearning({ slug }) {
  const {
    isLoading,
    data: course,
    error,
  } = useQuery({
    queryKey: ["courseLearn", slug],
    queryFn: async () => {
      if (!slug) throw new Error("Slug is required!");
      const response = await axiosClient.get(`/course/learning/${slug}`);
      return response.data.data.doc[0];
    },
    staleTime: 1000 * 60 * 5,
  });
  return { isLoading, course, error };
}

export { useCourseLearning };
