import { API } from "@/api";

export const getUserByUsername = async (username: string) => {
  return await API.get(`/users/${username}`);
};
