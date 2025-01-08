"use client";

import React, { ReactNode, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";
import { Loader } from "@/components/Loader";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { HomeIcon, User } from "lucide-react";
import Link from "next/link";

const Layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      return router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return <Loader />;
  }

  return (
    <div className="flex max-w-lg mx-auto border min-h-screen relative">
      <div className="flex-grow"> {children}</div>

      <div className="w-full absolute bottom-4">
        <div className="rounded-lg p-1 border-2 border-slate-700 w-[80%] md:w-[60%] mx-auto flex gap-2">
          <Button
            className="flex items-center flex-grow gap-2"
            asChild
            size="sm"
            variant={pathname === "/home" ? "default" : "outline"}
          >
            <Link href="/home">
              <span>Home</span> <HomeIcon className="w-4 h-4" />
            </Link>
          </Button>

          <Button
            className="flex items-center flex-grow gap-2 border-[1.5px]"
            asChild
            size="sm"
            variant={pathname === `/${user.username}` ? "default" : "outline"}
          >
            <Link href={`/${user.username}`}>
              <span>Profile</span> <User className="w-4 h-4" />{" "}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
