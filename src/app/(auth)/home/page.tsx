"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const Page = () => {
  const { user } = useAuth();
  const [showFallbackImage, setShowFallbackImage] = useState(false);

  return (
    <div>
      <div className="p-4 border-b flex gap-4 items-center">
        <div>
          <Link
            href={`/${user.username}`}
            className="w-10 h-10 block rounded-full overflow-hidden border-slate-200 border-2"
          >
            {showFallbackImage ? (
              <div className="grid place-items-center w-full h-full">
                <span>
                  {`${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`}
                </span>
                <span className="sr-only">Profile Image</span>
              </div>
            ) : (
              <Image
                src={user.profileImage ?? "/"}
                alt="Profile Image"
                width={300}
                height={300}
                className="object-cover object-center w-full h-full"
                onError={() => setShowFallbackImage(true)}
                onLoad={() => setShowFallbackImage(false)}
              />
            )}
          </Link>
        </div>

        <Input className="border" placeholder="What is happening?!" />

        <Button>Post</Button>
      </div>

      <div>
        <div className="mt-8">
          <p className="text-center text-slate-800">No posts yet</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-20 h-20 text-slate-400/50 mx-auto mt-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Page;
