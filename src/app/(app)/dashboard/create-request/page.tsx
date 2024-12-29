"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { MakeRequestSchema } from "@/schemas/makeReqSchema";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import BetterUploadButton from "@/components/BetterUploadButton";
import axios from "axios";
import { toast } from "sonner";

export default function MakeRequest() {

    const router = useRouter();

    const { data: session } = useSession()
    const user = session?.user;

    const [fileUrls, setFileUrls] = useState<Array<string>>([]);

    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof MakeRequestSchema>>({
        resolver: zodResolver(MakeRequestSchema),
        defaultValues: {
            title: "",
            description: "",
            media: [],
            status: "pending",
            userId: user?.id,
        },
    });

    const onSubmit = async (data: z.infer<typeof MakeRequestSchema>) => {
        setIsSubmitting(true);

        console.log(data)

        try {
            const res = await axios.post("/api/add-request", data);
            toast.success("Request submitted", { 
                description: "Request submitted successfully",
             });
            router.push("/");
        } catch (error) {
            toast.error("An error occured", {
                description: "Something went wrong",
             });
        }
    }

    const onDelete = async (fileKey: string) => {
        try {
            await axios.delete(`/api/delete-file-on-uploadthing/${fileKey}`);

            toast.success("File deleted", { 
                description: "File deleted successfully",
             });

            setFileUrls(fileUrls.filter(url => url.split("/").pop() !== fileKey));

        } catch (error) {
            
            toast.error("An error occured", {
                description: "File could not be deleted",
             });
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
                                <FormLabel className="font-bold flex gap-3 text-xl cursor-pointer" htmlFor="upload-button">
                                    Upload Images
                                        {
                                            isUploading && 
                                            <Loader className="animate-spin" />
                                        }
                                        {
                                            !isUploading && 
                                            <Upload className="ml-2" />
                                        }
                                </FormLabel>
                                <FormControl>
                                    <BetterUploadButton 
                                        field={field}
                                        isUploading={isUploading} 
                                        setIsUploading={setIsUploading} 
                                        setFileUrls={setFileUrls} 
                                        fileUrls={fileUrls} 
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    

                    {
                        !(fileUrls.length < 5) &&
                        <div className="text-sm text-red-500"> 
                            You can only upload upto 5 images
                        </div>
                    }

                    {
                        fileUrls.length > 0 &&
                        <div className="grid grid-cols-3 gap-2">
                            {fileUrls.map((url, index) => (
                                <div className="w-full flex justify-end">
                                    <div className="absolute">
                                        <Button 
                                            type="button"
                                            variant={"link"} 
                                            className="text-black"
                                            onClick={() => onDelete(url.split("/").pop() as string)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <Image
                                        src={url}
                                        alt={`Image-${index + 1}`}
                                        width={256}
                                        height={256}
                                        className="h-full w-full rounded-md object-cover col-span-1"
                                    />
                                </div>
                            ))}
                        </div>
                    }
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