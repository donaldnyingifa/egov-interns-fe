"use client";
import { toast } from "@/components/ui/use-toast";
import { Copy } from "lucide-react";
import React from "react";

const Username = ({ username }: { username: string }) => {
  const handleCopyProfileLink = async () => {
    await navigator.clipboard.writeText(window.location.href + username);
    toast({
      description: <div className="bg-gren">Profile link copied</div>,
    });
  };

  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => handleCopyProfileLink()}
    >
      <p>@{username}</p>
      <Copy className="w-4 h-4" />
    </div>
  );
};

export default Username;
