import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const open_sans = Open_Sans({
  weight: ["400", "700"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "E-governance Interns",
  description: "A project to show case eGovernance interns' projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(open_sans.className, "relative overflow-x-hidden")}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
