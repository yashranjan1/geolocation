"use client";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import signInSchema, { SignInSchema } from "@/schemas/signInSchema";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";

const Page = () => {
	const router = useRouter();

	const form = useForm<SignInSchema>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const onSubmit = async (data: SignInSchema) => {
		setIsSubmitting(true);

		const res = await signIn("credentials", {
			redirect: false,
			identifier: data.identifier,
			password: data.password,
		});

		console.log(res);

		if (res?.error) {
			if (res.code === "Invalid identifier or password") {
				toast.error("Invalid login details", {
					description: "Please try again",
				});
			} else if (res.code === "User not found") {
				toast.error("User not found", {
					description: "Please try again",
				});
			} else if (res.code === "User not verified") {
				toast.error("User not verified", {
					description: "Please try again",
				});
			} else {
				toast.error("Sign in failed", {
					description: "Please try again",
				});
			}

			setIsSubmitting(false);
			return;
		}

		if (res?.url) {
			toast.success("Signed in successful", {
				description: "You've been signed in",
			});
			router.replace("/");
		}
	};

	return (
		<div className="flex-1 flex justify-center items-center">
			<Card className="w-96 p-0.5 sm:p-5 drop-shadow-lg">
				<CardHeader className="font-bold text-2xl text-center">
					<CardTitle className="r">Login</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-6 flex flex-col items-center"
						>
							<FormField
								name="identifier"
								control={form.control}
								render={({ field }) => (
									<FormItem className="w-full flex flex-col space-y-3">
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Username" className="" {...field} />
										</FormControl>
									</FormItem>
								)}
							/>
							<FormField
								name="password"
								control={form.control}
								render={({ field }) => (
									<FormItem className="w-full flex flex-col space-y-3">
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder="Password"
												type="password"
												className=""
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
							<Button className="w-full" type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Signing in...
									</>
								) : (
									"Sign In"
								)}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col items-center">
					<p className="text-sm sm:text-md">
						Don&apos;t have an account?{" "}
						<Link href="/sign-up" className="hover:underline">
							Sign up
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
};

export default Page;
