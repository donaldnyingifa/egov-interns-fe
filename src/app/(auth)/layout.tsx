"use client";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";

const layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      return router.push("/login");
    }
  }, [user, loading]);

  if (!user) {
    return <Loader />;
  }

  return children;
};

export default layout;
