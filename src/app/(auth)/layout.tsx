"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      return router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return <Loader />;
  }

  return children;
};

export default Layout;
