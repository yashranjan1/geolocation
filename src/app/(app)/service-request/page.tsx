"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MakeRequestSchema } from "@/schemas/makeReqSchema";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function MakeRequest() {

    const router = useRouter();

    const { data: session } = useSession()
    const user = session?.user;

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof MakeRequestSchema>>({
        resolver: zodResolver(MakeRequestSchema),
        defaultValues: {
            title: "",
            description: "",
            media: "",
            status: "pending",
            userId: user?.id,
        },
    });

    const onSubmit = async (data: z.infer<typeof MakeRequestSchema>) => {
        setIsSubmitting(true);
        try {
            const res = await axios.post("/api/add-request", data);
            if (res.status === 201) {
                router.push("/service-request");
            }
            toast.success("Request submitted successfully", {
                description: "Your request has been submitted successfully",
            });
        } catch (error) {
            console.log(error);
            toast.error("An error occurred", {
                description: "Something went wrong, please try again",
            });
            setIsSubmitting(false);
        }
    }

    return (
        <div className="flex-1 flex flex-col p-10 gap-10">
            <h1 className="text-3xl font-bold">Make a Service Request</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="gap-5 flex flex-col max-w-[50rem]">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col space-y-3">
                                <FormLabel className="font-bold text-xl">Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="What is the issue?" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (  
                            <FormItem className="w-full flex flex-col space-y-3">
                                <FormLabel className="font-bold text-xl">Describe your issue</FormLabel>
                                <FormControl>
                                    <Textarea rows={5} placeholder="Details about what happened..." {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="media"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col space-y-3">
                                <FormLabel className="font-bold text-xl">Photos</FormLabel>
                                <FormControl>
                                    <Input placeholder="Media" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    
                    <Button className="max-w-fit" type="submit" disabled={isSubmitting}>
                        {
                            isSubmitting ? 
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            : "Submit Request"
                        }
                    </Button>
                </form>
            </Form>
        </div>
    )
}