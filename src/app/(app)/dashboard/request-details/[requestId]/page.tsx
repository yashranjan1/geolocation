"use client";

import { ServiceRequest } from "@/models/user.model";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";


export default function RequestDetails() {

    const router = useRouter();

    const [request, setRequest] = useState<ServiceRequest>();

    const params = useParams<{ requestId: string }>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/get-request/${params.requestId}`);
                setRequest(response.data.request);

                
            } catch (error) {
                router.push('/_not-found');
            }
        }
        fetchData();
    }, [params.requestId]);

    return (
        <div className="flex-1 flex flex-col p-10 gap-20">
            <h1 className="text-3xl font-bold">Request Details</h1>
            <div className="flex items-center flex-1 h-full">
                <Image 
                    src={request?.media[0] ?? "/file.svg"} 
                    alt={request?.title ?? ""} 
                    width={200} 
                    height={200} 
                    className="rounded-lg h-[50%] w-[50%] object-"
                />
                <div className="flex flex-col gap-5 h-full">
                    <h1 className="text-2xl font-bold">{request?.title}</h1>
                    <p className="text-sm">{request?.description}</p>
                </div>
            </div>
        </div>
    )
}