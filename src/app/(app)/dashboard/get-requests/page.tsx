"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; 
import axios from "axios";
import { ServiceRequest } from "@/models/user.model";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function GetRequests() {

    const [requests, setRequests] = useState<ServiceRequest[]>([]);
    const [isLoading , setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("/api/get-requests-by-user");
                setRequests(response.data.requests);
            } catch (error) {
                console.log(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div className="flex-1 flex flex-col justify-center p-10 gap-10">
            <div className="flex justify-between items-center">
                <div className="flex-1">
                    {
                        !isLoading && requests.length > 0 &&
                        <h1 className="text-3xl font-bold">Requests</h1>
                    }
                </div>
                <Link href={'/dashboard/create-request'}>
                    <Button>New Request</Button>
                </Link>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center">
                {
                    !isLoading && requests.length === 0 && 
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">No Requests Yet</h1>
                        <p>You'll see your requests here once you submit one</p>
                    </div>
                }
                {
                    requests.length > 0 &&
                    requests.map((request) => (
                        <Link href={`/dashboard/request-details/${request._id}`} key={request._id as string}>
                            <Card className="max-w-fit flex flex-col gap-5 ">
                                <CardHeader>
                                    <Image 
                                        src={request.media[0]} 
                                        alt={"Request Photo"} 
                                        width={200} 
                                        height={200} 
                                        className="rounded-lg h-48 w-48 object-contain"
                                    />
                                </CardHeader>
                                <CardFooter>
                                    <CardTitle>{request.title}</CardTitle>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))
                }
                {
                    isLoading &&
                    <Loader2 className="h-10 w-10 animate-spin items-center" />
                }
            </div>
        </div>
    )
}