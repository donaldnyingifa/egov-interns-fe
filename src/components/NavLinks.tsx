"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const OpenMenuButton = ({ toggleMenu }: any) => (
  <Button
    size="icon"
    variant="outline"
    className="md:hidden z-50"
    onClick={toggleMenu}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 9h16.5m-16.5 6.75h16.5"
      />
    </svg>
  </Button>
);

const CloseMenuButton = ({ toggleMenu }: any) => (
  <Button
    size="icon"
    variant="outline"
    className="md:hidden z-50 relative"
    onClick={toggleMenu}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  </Button>
);

export const NavLinks = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const toggleMenu = () => setMenuIsOpen((prev) => !prev);

  return (
    <div>
      {menuIsOpen ? (
        <CloseMenuButton toggleMenu={toggleMenu} />
      ) : (
        <OpenMenuButton toggleMenu={toggleMenu} />
      )}

      <div
        className={cn(
          "fixed left-[100vh] top-0 p-6 bg-white w-full shadow-lg space-y-20 md:relative md:bg-none md:shadow-none md:flex md:gap-8 md:p-0 md:left-0 md:space-y-0",
          {
            "left-0": menuIsOpen,
          }
        )}
      >
        <div className="flex flex-col md:flex-row gap-4 md:items-center text-lg">
          <Link href="/" className="hover:underline" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            href="#about-us"
            className="hover:underline"
            onClick={toggleMenu}
          >
            About Us
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <Button asChild size="sm">
            <Link href="/signup">Sign Up</Link>
          </Button>

          <Button asChild variant="outline" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
