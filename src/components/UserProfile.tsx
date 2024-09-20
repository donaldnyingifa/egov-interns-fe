import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ArrowBigLeftDashIcon,
  CameraIcon,
  Loader2Icon,
  Newspaper,
  PencilRuler,
  School,
  VerifiedIcon,
} from "lucide-react";
import React, { ChangeEvent, useRef, useState } from "react";
import { EditProfile } from "./EditProfile";
import { ProfileImage } from "./ProfileImage";
import UserPosts from "./UserPosts";
import UserProjects from "./UserProjects";
import { API } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const UserProfile = ({ profileData }: { profileData: any }) => {
  const { user, setUser, logout } = useAuth();
  const router = useRouter();
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
      console.log(error);

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
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => router.push("/home")}
          >
            <ArrowBigLeftDashIcon />
          </Button>

          {profileData.id === user.id ? (
            <h1 className="text-bold text-lg font-bold">
              {profileData.firstName}
            </h1>
          ) : (
            <h1 className="text-bold text-lg font-bold">Profile</h1>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="relative">
            <input
              className="hidden"
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <ProfileImage profileData={profileData} />

            {profileData.id === user.id && (
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
            )}
          </div>

          {profileData.id === user.id && (
            <div className="flex gap-2">
              <EditProfile />
              <Button onClick={() => logout()} size="sm" variant="outline">
                Logout
              </Button>
            </div>
          )}
        </div>

        <div className="mt-6">
          <p className="font-bold">{`${profileData.firstName} ${profileData.lastName}`}</p>

          <div className="text-slate-500 text-sm flex items-center">
            <span title="Verified">
              <VerifiedIcon className="fill-blue-500 text-white w-5 h-5" />
            </span>

            <span>@{profileData.username}</span>
          </div>

          <p className="mt-2 text-sm">
            {profileData.bio ?? "Feel free to follow me, I don't bite 😁"}
          </p>

          <div className="flex mt-2 gap-1.5">
            <School className="w-5 h-5" />

            <p className="text-sm">
              {`${profileData.schoolName}, ${profileData.schoolDepartment}`}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="w-full flex justify-between  gap-2">
          <TabsTrigger value="posts" className="flex-1 flex items-center gap-2">
            <Newspaper className="w-4 h-4" /> <span>Posts</span>
          </TabsTrigger>
          <TabsTrigger
            value="projects"
            className="flex-1 flex items-center gap-2"
          >
            <PencilRuler className="w-4 h-4" /> <span>Projects</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <UserPosts />
        </TabsContent>
        <TabsContent value="projects">
          <UserProjects userId={profileData.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserProfile;
