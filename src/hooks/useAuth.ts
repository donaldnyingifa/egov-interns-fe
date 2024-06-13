"use client";
import { authContext } from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(authContext);
};
