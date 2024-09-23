import { API } from "@/api";
import { registerUser } from "@/api/auth";
import { toast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSignup = () => {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending: isSigningUp } = useMutation({
    mutationFn: async (data: any) => {
      const response = await registerUser(data);
      const token = response.data.token;
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
    },
  });

  return {
    signup,
    isSigningUp,
  };
};

export default useSignup;
