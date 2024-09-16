"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Loader2Icon, PlusCircle } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { API } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProject } from "../api/project";

const FormSchema = z.object({
  name: z.string().min(1, { message: "Project name is required" }),
  description: z
    .string()
    .min(1, { message: "Project description is required" }),
  technologies: z.string().min(1, {
    message: "Project technologies are required",
  }),
  link: z
    .string()
    .min(1, { message: "Project link is required" })
    .url({ message: "Project link should be a valid link" }),
  githubRepo: z
    .string()
    .min(1, {
      message: "Project github repo link is required",
    })
    .url({ message: "Project github repo link should be a valid link" }),
});

export const AddProject = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      description: "",
      technologies: "",
      link: "",
      githubRepo: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      mutation.mutate(data);
    } finally {
      setIsOpen(false);
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="text-xs flex items-center gap-1">
          <PlusCircle className="w-4 h-4" />
          <span>Add Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto h-full sm:h-[90%] display flex flex-col gap-4">
        <div className="space-y-2">
          <DialogTitle>Add a project</DialogTitle>
          <DialogDescription className="mt-2">
            Add a project to your project list.
          </DialogDescription>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Project Name*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Project Description*
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Technologies Used*
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    List of technologies and language used seperated by comma
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">Project Link*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Github Repo Link*
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-8" disabled={loading}>
              {loading ? "Adding Project.." : "Add Project"}
              {loading && <Loader2Icon className="w-4 h-4 animate-spin" />}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
