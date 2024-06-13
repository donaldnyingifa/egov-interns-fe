"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const FormSchema = z.object({
  firstName: z.string().min(1, { message: "Your first name is required" }),
  lastName: z.string().min(1, { message: "Your last name is required" }),
  email: z.string().email({ message: "A valid email is required" }),
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(8, {
    message: "Password is required and must be at least 8 characters.",
  }),
  dob: z.date({
    required_error: "Your date of birth is required.",
  }),
  schoolName: z.string().min(1, {
    message: "Your school name is required",
  }),
  schoolDepartment: z.string().min(1, {
    message: "Your department name is required",
  }),
});

const Page = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [showPassword, setshowPassword] = useState(false);
  const { signup } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      schoolName: "",
      schoolDepartment: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await signup(data);
  }

  return (
    <div className="p-4 mx-auto sm:w-[400px]">
      <h1 className="font-bold text-3xl">Get started</h1>
      <p className="mt-2">Create a new account</p>
      <p className="text-sm">
        Have an account?{" "}
        <Link href="/login" className="underline">
          {" "}
          Sign In Now
        </Link>
      </p>

      <div className="mt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">First Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username*</FormLabel>
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
                  <FormLabel>Password*</FormLabel>
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

            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of birth*</FormLabel>
                  <Popover
                    open={isCalendarOpen}
                    onOpenChange={setIsCalendarOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e);
                          setIsCalendarOpen(false);
                        }}
                        initialFocus
                        required
                        captionLayout="dropdown"
                        fromYear={1900}
                        toYear={2024}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolDepartment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Department*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Page;
