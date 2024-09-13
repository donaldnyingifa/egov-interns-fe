"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <div className="mt-4">
      <ul className="border-b-2 flex">
        <Link
          href="/profile"
          className={cn(
            "px-4 py-2 inline-block border-b-4 border-transparent text-sm",
            {
              "border-blue-500": pathName === "/profile",
            },
          )}
        >
          Posts
        </Link>

        <Link
          href="/profile/projects"
          className={cn(
            "px-4 py-2 inline-block border-b-4 border-transparent text-sm",
            {
              "border-blue-500": pathName === "/profile/projects",
            },
          )}
        >
          Projects
        </Link>
      </ul>
      <div>{children}</div>
    </div>
  );
}
