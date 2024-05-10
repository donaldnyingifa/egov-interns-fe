"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "username is required.",
  }),
  password: z.string().min(1, {
    message: "password is requires",
  }),
});

const Page = () => {
  const [showPassword, setshowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="p-4 mx-auto sm:w-[400px]">
      <h1 className="font-bold text-3xl">Log In</h1>
      <p className="mt-2">Login to you account</p>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="underline">
          {" "}
          Sign Up Now
        </Link>
      </p>

      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between">
                      <p>Password</p>
                      <Link href="/login" className="underline">
                        Forgot Password?
                      </Link>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        className="absolute top-1 right-2 p-1"
                        type="button"
                        onClick={(e) => {
                          setshowPassword((prev) => !prev);
                        }}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5" />
                        ) : (
                          <Eye className="w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
