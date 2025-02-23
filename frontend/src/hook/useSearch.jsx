import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosClient from "../services/axiosClient";

export default function useSearch() {
  const queryClient = useQueryClient();
  const { mutate: search, isPending: isSearchLoading } = useMutation({
    mutationKey: ["search"],
    mutationFn: async function (searchQuery) {
      const response = await axiosClient.get(`/search?q=${searchQuery}`);
      return { data: response.data.data, searchQuery };
    },
    onSuccess: function ({ data, searchQuery }) {
      queryClient.setQueryData(["searchQuery"], searchQuery);
      queryClient.setQueryData(["searchResult"], data);
    },
  });
  return { search, isSearchLoading };
}
