"use client";
import React, { createContext, ReactNode } from "react";
import { API } from "../api";
import { toast } from "@/components/ui/use-toast";
import { getUserProfile, loginUser, registerUser } from "../api/auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return (await getUserProfile()).data.user;
      }
      return null;
    },
    staleTime: Infinity,
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (error && (error as any).response.status === 401) {
    toast({ description: (error as any).response.data.message });
    localStorage.removeItem("token");
    queryClient.invalidateQueries({ queryKey: ["profile"] });
  }

  if (error) {
    console.log(error);
  }

  const { mutate: login } = useMutation({
    mutationFn: async (data: any) => {
      const response = await loginUser(data.username, data.password);
      const token = response.data.token;
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const { mutate: signup } = useMutation({
    mutationFn: async (data: any) => {
      const response = await registerUser(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  const logout = async () => {
    try {
      localStorage.removeItem("token");
      delete API.defaults.headers.common["Authorization"];
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    } catch (error) {
      toast({
        description: "logout failed",
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  return (
    <authContext.Provider
      value={{ user, loading, error, login, logout, signup }}
    >
      {children}
    </authContext.Provider>
  );
};
