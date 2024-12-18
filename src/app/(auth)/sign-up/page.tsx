"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import signUpSchema, { SignUpSchema } from "@/schemas/signUpSchema";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

const SignUp = () => {

    const form = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            avatar: "",
            contact: "",
        },
    });
    
    const onSubmit = async (data: SignUpSchema) => {
        try {
            const res = await axios.post("/api/sign-up", data);

            if (res.status === 200) {
                console.log("Sign up successful");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
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
                                <>
                                    <Label>Username</Label>
                                    <Input placeholder="Username" {...field} />
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <>
                                    <Label>Email</Label>
                                    <Input placeholder="Email" {...field} />
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <>
                                    <Label>Password</Label>
                                    <Input placeholder="Password" {...field} />
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => ( 
                                <>
                                    <Label>Avatar</Label>
                                    <Input placeholder="Avatar" {...field} />
                                </>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="contact"
                            render={({ field }) => (
                                <>
                                    <Label>Contact Number</Label>
                                    <Input placeholder="Contact Number" {...field} />
                                </>
                            )}
                        />
                        <Button className="w-full" type="submit">
                            Sign Up
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <p>Already have an account? <Link href="/login">Login</Link></p>
            </CardFooter>
        </Card>
    );
}
 
export default SignUp;