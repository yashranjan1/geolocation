"use client";

import { User } from "next-auth";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
	DropdownMenu,
	DropdownMenuContent,
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
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

const Navbar = ({ className }: { className: string }) => {
	
	const { theme, setTheme } = useTheme()

    const [isOpen, setIsOpen] = useState(false);

	const { data: session } = useSession();
	const user: User = session?.user;


	return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
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
                                    <AvatarImage src={user?.avatar as string}/>
                                    <AvatarFallback>{user?.username?.[0].toUpperCase()}</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent 
                                className="w-48 font-[family-name:var(--font-geist-sans)]"
                                align="end"
                                > 
                                <DropdownMenuItem onClick={() => setIsOpen(true)}>
                                    Account Settings
                                </DropdownMenuItem>
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
        </>

	);
};

export default Navbar;
