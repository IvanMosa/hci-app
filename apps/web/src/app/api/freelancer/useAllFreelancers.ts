import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

export interface FreelancerWithUser {
  id: string;
  bio: string | null;
  location: string | null;
  user: {
    id: string;
    name: string;
    surname: string;
    email: string;
    type: string;
  };
  skills: {
    skill: { name: string };
  }[];
}

const getAllFreelancers = async (): Promise<FreelancerWithUser[]> => {
  const response = await api.get<never, FreelancerWithUser[]>(
    "/freelancer-profile",
  );
  return response;
};

export const useAllFreelancers = () => {
  return useQuery({
    queryKey: ["freelancers-list"],
    queryFn: getAllFreelancers,
  });
};
