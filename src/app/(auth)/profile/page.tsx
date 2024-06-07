"use client";

import { EditProfile } from "@/components/EditProfile";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Page() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <div className="max-w-lg mx-auto border min-h-screen">
      <div className="p-4 sm:p-8">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Button>

        <div className="flex justify-between items-center mt-4">
          {user.profileImage ? (
            <Image
              src="/profile-picture.jpg"
              width={80}
              height={80}
              alt="profile picture"
              className="rounded-full"
              priority
            />
          ) : (
            <div className="w-[80px] h-[80px] flex justify-center items-center bg-slate-100 rounded-full flex-col">
              <svg
                className="w-12 h-12 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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

          <div className="flex gap-2">
            <EditProfile />
            <Button onClick={() => logout()} size="sm" variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>

          <div className="text-slate-500 text-sm flex items-center gap-1">
            <span title="Verified">
              <svg
                className="w-4 h-4 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2c-.791 0-1.55.314-2.11.874l-.893.893a.985.985 0 0 1-.696.288H7.04A2.984 2.984 0 0 0 4.055 7.04v1.262a.986.986 0 0 1-.288.696l-.893.893a2.984 2.984 0 0 0 0 4.22l.893.893a.985.985 0 0 1 .288.696v1.262a2.984 2.984 0 0 0 2.984 2.984h1.262c.261 0 .512.104.696.288l.893.893a2.984 2.984 0 0 0 4.22 0l.893-.893a.985.985 0 0 1 .696-.288h1.262a2.984 2.984 0 0 0 2.984-2.984V15.7c0-.261.104-.512.288-.696l.893-.893a2.984 2.984 0 0 0 0-4.22l-.893-.893a.985.985 0 0 1-.288-.696V7.04a2.984 2.984 0 0 0-2.984-2.984h-1.262a.985.985 0 0 1-.696-.288l-.893-.893A2.984 2.984 0 0 0 12 2Zm3.683 7.73a1 1 0 1 0-1.414-1.413l-4.253 4.253-1.277-1.277a1 1 0 0 0-1.415 1.414l1.985 1.984a1 1 0 0 0 1.414 0l4.96-4.96Z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span>@{user.username}</span>
          </div>

          <p className="mt-2 text-sm">
            {user.status ?? "Feel free to follow me, I don't bite 😁"}
          </p>

          <div className="flex mt-2 gap-2">
            <svg
              className="w-5 h-5 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"
              />
            </svg>

            <p className="text-sm">
              {`${user.schoolName}, ${user.schoolDepartment}`}
            </p>
          </div>
        </div>
      </div>

      <div>
        <ul className="border-b-2">
          <Link
            href=""
            className={cn({
              "px-4 py-2 inline-block border-b-4 border-blue-500 ": true,
            })}
          >
            Posts
          </Link>
        </ul>

        <div className="mb-4">
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
    </div>
  );
}
