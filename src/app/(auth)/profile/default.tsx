"use client";

import { EditProfile } from "@/components/EditProfile";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import {
  ArrowBigLeftDashIcon,
  CameraIcon,
  Loader2Icon,
  VerifiedIcon,
} from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { API } from "../../../api";
import { ProfileImage } from "@/components/ProfileImage";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const { user, setUser, logout } = useAuth();
  const [isUploading, setisUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setisUploading(true);

      const response = await API.post("/uploadimage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUser((prev: any) => ({
        ...prev,
        profileImage: response.data.imageUrl,
      }));
    } catch (error: any) {
      toast({ description: error.response.data.error });
    } finally {
      fileInputRef.current!.value = "";
      setisUploading(false);
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const fileSize = file?.size! / 1048576;

      if (fileSize > 2) {
        return toast({ description: "Maxiumum picture size allowed is 2MB" });
      }

      await uploadImage(file);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div>
        {/* <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => router.push("/home")}
        >
          <ArrowBigLeftDashIcon />
        </Button> */}

        <h1 className="text-bold text-lg font-bold">Profile</h1>

        <div className="flex justify-between items-center mt-4">
          <div className="relative">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <ProfileImage />
            <Button
              size="icon"
              variant="outline"
              className="flex gap-x-2 items-center rounded-full absolute bottom-1 -right-3 h-8 w-8"
              onClick={handleImageUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <Loader2Icon className="w-4 h-4 animate-spin" />
              ) : (
                <CameraIcon className="w-4 h-4" />
              )}
            </Button>
          </div>

          <div className="flex gap-2">
            <EditProfile />
            {/* <Button size="sm" variant="outline">
              <Link href="/profile/edit">Edit profile</Link>
            </Button> */}
            <Button onClick={() => logout()} size="sm" variant="outline">
              Logout
            </Button>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-bold">{`${user.firstName} ${user.lastName}`}</p>

          <div className="text-slate-500 text-sm flex items-center">
            <span title="Verified">
              <VerifiedIcon className="fill-blue-500 text-white w-5 h-5" />
            </span>

            <span>@{user.username}</span>
          </div>

          <p className="mt-2 text-sm">
            {user.bio ?? "Feel free to follow me, I don't bite 😁"}
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
    </div>
  );
}
