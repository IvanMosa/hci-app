import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

export interface Skill {
  id: string;
  name: string;
}

export const useAllSkills = () => {
  return useQuery({
    queryKey: ["all-skills"],
    queryFn: async () => {
      const response = await api.get<never, Skill[]>("/skill");
      return response;
    },
  });
};
