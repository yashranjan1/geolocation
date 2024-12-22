"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  const avatarFallback = user.fullname
    ? user.fullname
        .split(" ")
        .map((word) => word[0])
        .join("")
    : "US";

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          AutoResQ
        </a>
        {session ? (
          <>
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{avatarFallback.toUpperCase()}</AvatarFallback>
            </Avatar>

            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-100 text-black"
              variant="outline"
            >
              Logout
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Link href="/sign-in">
              <Button
                className="w-full md:w-auto bg-slate-100 text-black"
                variant={"outline"}
              >
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button
                className="w-full md:w-auto bg-black text-slate-100"
                variant={"outline"}
              >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
