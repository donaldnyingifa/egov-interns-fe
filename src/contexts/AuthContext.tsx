"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { API } from "@/api";
import { toast } from "@/components/ui/use-toast";

export type UserData = {
  id: "string";
  email: string;
  password: string;
  username: string;
  bio: string;
  firstName: string;
  lastName: string;
  dob: Date;
  schoolName: string;
  schoolDepartment: string;
};

export const authContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async () => {
    try {
      const response = await API.get("/user");
      setUser(response.data.user);
    } catch (error: any) {
      setUser(null);
      toast({ description: error.response.data.message });
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: any) => {
    try {
      const response = await API.patch("/users/" + user?.id, data);
      setUser(response.data.user);
      toast({ description: "Profile updated successfully" });
    } catch (error: any) {
      setUser(user);
      toast({ description: "Error could not update profile" });
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await API.post("/login", { username, password });
      setUser(response.data.user);

      const token = response.data.token;
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      toast({ description: "Login successful", duration: 3000 });
    } catch (error: any) {
      toast({ description: error.response.data.message });
    }
  };

  const signup = async (data: any) => {
    try {
      const response = await API.post("/signup", data);

      const token = response.data.token;
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const user = response.data.user;
      setUser(user);
    } catch (error: any) {
      toast({ description: error.response.data.message });
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      delete API.defaults.headers.common["Authorization"];
      setUser(null);
    } catch (error) {
      toast({ description: "logout failed" });
    }
  };

  return (
    <authContext.Provider
      value={{ user, loading, login, logout, signup, updateProfile, setUser }}
    >
      {children}
    </authContext.Provider>
  );
};
