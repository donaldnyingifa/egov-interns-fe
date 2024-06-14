"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast({ description: "Login session expired" });
      return router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return <Loader />;
  }

  return children;
};

export default Layout;
