"use client";

import { fetchProjects } from "../../../../../api/project";
import { AddProject } from "@/components/AddProject";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { EllipsisVertical, Github, Globe2, PencilRuler } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
  githubRepo: string;
}

const Page = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: Infinity,
  });

  const projects: Project[] = data?.data.data;

  if (isLoading) {
    return (
      <div className="space-y-6 mt-4">
        {Array.from({ length: 2 }).map((_, index) => {
          return (
            <div
              className="border-2 border-slate-100 shadow-sm py-6 px-4 rounded-lg"
              key={index}
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <div className="space-y-[2px]">
                  <Skeleton className="h-1 w-1 rounded-full" />
                  <Skeleton className="h-1 w-1 rounded-full" />
                  <Skeleton className="h-1 w-1 rounded-full" />
                </div>
              </div>

              <Skeleton className="h-4 w-[250px] mt-3" />
              <Skeleton className="h-4 w-24 mt-6" />
              <div className="flex items-center gap-2 mt-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 w-16" />
              </div>

              <div className="flex justify-between mt-12">
                <Skeleton className="h-10 w-28" />
                <Skeleton className="h-10 w-28" />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        <p className="font-bold">Projects</p>
        <AddProject />
      </div>
      <div className="space-y-6 mt-4">
        {projects.length === 0 && <p>No projects to show</p>}
        {projects &&
          projects.map((project) => (
            <div
              key={project.id}
              className="border-2 border-slate-100 shadow-sm py-6 px-4 mt-2 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{project.name}</h2>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-full"
                >
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm mt-2">{project.description}</p>
              <h3 className="font-semibold mt-4 flex items-center gap-1">
                <p>Build with</p> <PencilRuler className="w-4 h-4" />
              </h3>
              <>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.technologies
                    .split(",")
                    .map((item: string, id: number) => (
                      <Badge
                        key={id}
                        variant="secondary"
                        className="font-semibold"
                      >
                        {item}
                      </Badge>
                    ))}
                </div>
              </>
              <div className="flex justify-between mt-10">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center  gap-1 border-slate-700"
                  asChild
                >
                  <Link
                    href={project.githubRepo}
                    title={project.githubRepo}
                    prefetch
                  >
                    <Github className="w-4 h-4" />
                    <p className="text-xs font-bold">View code</p>
                  </Link>
                </Button>
                <Button
                  className="flex items-center  gap-1"
                  size="sm"
                  asChild
                  title={project.link}
                >
                  <Link href={project.link}>
                    <Globe2 className="w-4 h-4" />
                    <p className="text-xs">View project</p>
                  </Link>
                </Button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Page;
