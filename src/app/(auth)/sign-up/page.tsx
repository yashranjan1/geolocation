"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import signUpSchema, { SignUpSchema } from "@/schemas/signUpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const SignUp = () => {


    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            contact: "",
        },
    });
    
    const onSubmit = async (data: SignUpSchema) => {

        setIsSubmitting(true);

        try {
            const res = await axios.post("/api/sign-up", data);

            if (res.status === 201) {
                toast.success("Sign up successful", {
                    description: "Your account has been created successfully",
                });
                router.push("/sign-in");
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error("An error occurred", {
                description: axiosError.response?.data.message as string,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return ( 
        
        <div className='flex-1 flex justify-center items-center'>
            <Card className="flex flex-col items-center justify-center w-full max-w-md px-10 py-5">
                <CardHeader>
                    <CardTitle className="font-bold text-4xl">
                        Sign Up
                    </CardTitle>
                </CardHeader>
                <CardContent className="w-full">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Username" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="email" 
                                control={form.control} 
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Email" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )} 
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="contact"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contact Number" {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}  
                            />
                            <Button className="w-full" type="submit" disabled={isSubmitting}>
                                {
                                    isSubmitting ? 
                                    <Loader2 className="animate-spin" />
                                    : "Sign Up"
                                }
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <span>Already have an account? <Link href="/sign-in">Login</Link></span>
                </CardFooter>
            </Card>
        </div>
    );
}
 
export default SignUp;