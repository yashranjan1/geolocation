"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from 'react-hook-form';
import { signUpSchemaClient, signUpSchemaMechanic, SignUpSchemaClient, SignUpSchemaMechanic } from "@/schemas/signUpSchema";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ApiResponse } from "@/types/ApiResponse";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SignUp = () => {


    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    const formClient = useForm<SignUpSchemaClient>({
        resolver: zodResolver(signUpSchemaClient),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            contact: "",
        },
    });

    const formMechanic = useForm<SignUpSchemaMechanic>({
        resolver: zodResolver(signUpSchemaMechanic),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            contact: "",
            latitude: 0,
            longitude: 0,
        },
    });
    
    const onSubmitClient = async (data: SignUpSchemaClient) => {

        setIsSubmitting(true);

        try {
            const res = await axios.post("/api/sign-up/client", data);

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
    const onSubmitMechanic = async (data: SignUpSchemaMechanic) => {

        setIsSubmitting(true);

        try {
            const res = await axios.post("/api/sign-up/mechanic", data);

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
                    <Tabs defaultValue="client" className="">
                        <TabsList>
                            <TabsTrigger value="client" disabled={isSubmitting}>Are you a client?</TabsTrigger>
                            <TabsTrigger value="mechanic" disabled={isSubmitting}>Are you a mechanic?</TabsTrigger>
                        </TabsList>
                        <TabsContent value="client">
                            <Form {...formClient}>
                                <form onSubmit={formClient.handleSubmit(onSubmitClient)} className="flex flex-col gap-3">
                                    <div className="flex gap-3 flex-col md:flex-row">
                                        <FormField
                                            control={formClient.control}
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
                                            name="password"
                                            control={formClient.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField 
                                        name="email" 
                                        control={formClient.control} 
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
                                        name="contact"
                                        control={formClient.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Contact Number" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}  
                                    />
                                    <Button className="w-full m-1" type="submit" disabled={isSubmitting}>
                                        {
                                            isSubmitting ? 
                                            <Loader2 className="animate-spin" />
                                            : "Sign Up"
                                        }
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                        <TabsContent value="mechanic">
                            <Form {...formMechanic}>
                                <form onSubmit={formMechanic.handleSubmit(onSubmitMechanic)} className="flex flex-col gap-3">
                                    <div className="flex gap-3 flex-col md:flex-row">
                                        <FormField
                                            control={formMechanic.control}
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
                                            name="password"
                                            control={formMechanic.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl>
                                                        <Input type="password" placeholder="Password" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <FormField 
                                        name="email" 
                                        control={formMechanic.control} 
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
                                        name="contact"
                                        control={formMechanic.control}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Contact Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Contact Number" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}  
                                    />
                                    <div className="flex flex-row gap-3">
                                        <FormField
                                            name="latitude"
                                            control={formMechanic.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Latitude</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="latitude" type="number" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}  
                                        />
                                        <FormField
                                            name="longitude"
                                            control={formMechanic.control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Longitude</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="longitude" type="number" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}  
                                        />
                                    </div>
                                    
                                    <Button className="w-full m-1" type="submit" disabled={isSubmitting}>
                                        {
                                            isSubmitting ? 
                                            <Loader2 className="animate-spin" />
                                            : "Sign Up"
                                        }
                                    </Button>
                                </form>
                            </Form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter>
                    <span>Already have an account? <Link href="/sign-in">Login</Link></span>
                </CardFooter>
            </Card>
        </div>
    );
}
 
export default SignUp;