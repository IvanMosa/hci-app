import { api } from "../index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Job } from "./useClientJobs";

export const useJobs = () => {
  return useInfiniteQuery({
    queryKey: ["explore-jobs"],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await api.get<never, Job[]>("/job", {
        params: {
          skip: pageParam,
          take: 12,
        },
      });
      console.log(response);
      return response;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage || lastPage.length < 12) return undefined;
      return allPages.reduce((acc, page) => acc + page.length, 0);
    },
  });
};
