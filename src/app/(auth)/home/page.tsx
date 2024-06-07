"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";

const page = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-lg mx-auto border min-h-screen">
      <div className="p-4 border-b flex gap-4 items-center">
        <Link href="/profile">
          {user.profileImage ? (
            <Image
              src={user.profileImage}
              width={45}
              height={45}
              alt="profile picture"
              className="rounded-full"
              priority
            />
          ) : (
            <div className="w-[45px] h-[45px] rounded-full  bg-slate-100 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </Link>

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

export default page;
