"use client";

import { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
	DropdownMenuSubContent
  } from "@/components/ui/dropdown-menu"
import React from "react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

const Navbar = ({ className }: { className: string }) => {
	
	const { theme, setTheme } = useTheme()

	const { data: session } = useSession();

	const user: User = session?.user;


	return (
		<nav className={`p-4 px-10 shadow-md bg-gray-900 ${className} flex items-center`}>
			<div className="flex-1">
				<Link href={"/"} className="text-xl sm:text-3xl font-bold text-white">AutoResQ</Link>
			</div>
			<div>
				{
					session ? 
					
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar>
								<AvatarImage src={user?.image as string} alt={user?.username} />
								<AvatarFallback>{user?.username?.[0].toUpperCase()}</AvatarFallback>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent 
							className="w-48 font-[family-name:var(--font-geist-sans)]"
							align="end"
							> 
							<DropdownMenuSub>
								<DropdownMenuSubTrigger>Dark Mode</DropdownMenuSubTrigger>
								<DropdownMenuPortal>
									<DropdownMenuSubContent className="font-[family-name:var(--font-geist-sans)]">
										<DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
											<DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
											<DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
										</DropdownMenuRadioGroup>
									</DropdownMenuSubContent>
								</DropdownMenuPortal>
							</DropdownMenuSub>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => signOut()}>
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					: <Link href={'/sign-in'} className="font-semibold sm:text-xl">Sign In</Link>
				}
			</div>
		</nav>
	);
};

export default Navbar;
