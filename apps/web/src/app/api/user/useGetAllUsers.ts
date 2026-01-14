import { api } from "../index";
import { useQuery } from "@tanstack/react-query";

interface User {
  id: string;
  name: string;
  surname: string;
}
const getUsers = async (): Promise<User[]> => {
  const response = await api.get<never, User[]>(`/user`);
  return response;
};

export const useGetAllUsers = () =>
  useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
    enabled: true,
  });
