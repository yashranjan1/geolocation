"use client";

import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { Check, Loader, Upload, } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner"
import { ControllerRenderProps } from "react-hook-form";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
    const $ut = useUploadThing(...args);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        const result = await $ut.startUpload(selectedFiles);

        console.log("uploaded files", result);
    };

    return {
        inputProps: {
        onChange,
        multiple: ($ut.routeConfig?.image?.maxFileCount ?? 1) > 1,
        accept: "image/*",
        },
        isUploading: $ut.isUploading,
    };
};

interface Props {
    field: ControllerRenderProps<{
        title: string;
        description: string;
        media: string[];
        status: "pending" | "accepted" | "completed" | "cancelled";
        userId: string;
    }, "media">
    setFileUrls: Dispatch<SetStateAction<string[]>>
    fileUrls: string[]
    isUploading: boolean
    setIsUploading: Dispatch<SetStateAction<boolean>>
}

export default function BetterUploadButton( { field, setFileUrls, fileUrls, isUploading, setIsUploading }: Props) {

    const router = useRouter();

    const { inputProps } = useUploadThingInputProps("imageUploader", {
        onUploadBegin: () => {
            setIsUploading(true);
            toast.loading("Uploading...", {
                duration: 10000,
                id: "upload-toast",
            });
        },
        onClientUploadComplete: async (res) => {

            const { appUrl } = await res[0];

            setFileUrls(
                fileUrls.concat(appUrl)
            );

            toast.dismiss("upload-toast");
            setIsUploading(false);
            toast.success("Uploaded!", {
                icon: <Check />
            });
            router.refresh();
            field.onChange(fileUrls.concat(appUrl));
        },
    });

    return (
        <div>
            <input 
                id="upload-button" 
                {...inputProps} 
                className="sr-only" type="file" 
                disabled={isUploading || !(fileUrls.length < 5)} />
        </div>
    );
}