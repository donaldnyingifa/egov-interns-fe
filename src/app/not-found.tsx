import Link from "next/link";
import React from "react";

const PageNotFound = () => {
  return (
    <div className="mx-auto w-fit mt-20">
      <h1 className="text-2xl">404 page not found</h1>

      <div className="flex justify-center gap-2">
        <Link href="/home" className="text-center underline text-blue-500 mt-4">
          Go home
        </Link>

        <Link href="/home" className="text-center underline text-blue-500 mt-4">
          Go back
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
