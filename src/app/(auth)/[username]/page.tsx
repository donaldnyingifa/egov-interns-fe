"use client";

import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "@/api/user";
import UserProfile from "@/components/UserProfile";

export default function Page({ params }: { params: { username: string } }) {
  const { user } = useAuth();

  const shouldFetchUser = params.username !== user?.username;

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile", params.username],
    queryFn: async () => {
      if (shouldFetchUser) {
        const response = await getUserByUsername(params.username);
        return response.data.user;
      }

      return user;
    },
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    if ((error as any).response.status === 404) {
      return <div>User does not exist</div>;
    }
    return <div>Error fetching user data</div>;
  }

  let profileData = shouldFetchUser ? data : user;

  return <UserProfile profileData={profileData} />;
}
