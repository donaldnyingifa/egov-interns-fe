import { API } from ".";

export const loginUser = async (username: string, password: string) => {
  return await API.post("/login", { username, password });
};

export const registerUser = async (data: any) => {
  return await API.post("/login", data);
};

export const updateUserProfile = async (userId: string, data: any) => {
  return await API.patch("/users/" + userId, data);
};

export const getUserProfile = async () => {
  return await API.get("/user");
};
