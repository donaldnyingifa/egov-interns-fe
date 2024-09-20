import { API } from ".";

// export const addProject = async (data: any) => {
//   await API.post("/projects", data);
// };
//
// export const fetchProjects = async () => {
//   return await API.get("/projects");
// };
//
// export const deleteProject = async (id: string) => {
//   return await API.delete(`/projects/${id}`);
// };
export const addProject = async (data: any, userId: string) => {
  await API.post(`/users/${userId}/projects`, data);
};

export const fetchProjects = async (userId: string) => {
  return await API.get(`/users/${userId}/projects`);
};

export const deleteProject = async (projectId: string, userId: string) => {
  return await API.delete(`users/${userId}/projects/${projectId}`);
};
