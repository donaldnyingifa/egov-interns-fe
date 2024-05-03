import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

export const open_sans = Open_Sans({
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
      <body className={open_sans.className}>{children}</body>
    </html>
  );
}
