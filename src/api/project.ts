import { API } from ".";

export const addProject = async (data: any) => {
  await API.post("/projects", data);
};

export const fetchProjects = async () => {
  return await API.get("/projects");
};

export const deleteProject = async (id: string) => {
  return await API.delete(`/projects/${id}`);
};
