"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = ({ className }: { className: string }) => {

	const { data: session } = useSession();

	const user: User = session?.user;


	return (
		<nav className={`p-4 md:p-6 shadow-md bg-gray-900 ${className}`}>
			<div className="flex flex-row justify-between items-center">
				<Link href="/" className="text-xl font-bold text-white">
					AutoResQ
				</Link>
				{
					session ? (
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Avatar>
									<AvatarImage />
									<AvatarFallback>
										{
											user.username?.charAt(0).toUpperCase()
										}
									</AvatarFallback>
								</Avatar>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end" className=" mt-2">
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuSeparator />
								<DropdownMenuItem onClick={() => signOut()}>Sign Out</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
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
						</div>
					)}
			</div>
		</nav>
	);
};

export default Navbar;
