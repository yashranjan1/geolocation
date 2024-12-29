import connectDB from "@/lib/dbConnect";
import { auth } from "@/app/api/auth/auth";
import { ServiceRequestModel } from "@/models/user.model";
import mongoose from "mongoose";

export async function GET(req: Request) {
    const session = await auth();

    const user = session?.user;

    if (!user) {
        return Response.json({
            success: false,
            message: "You are not logged in"
        }, {
            status: 401
        })
    }

    try {
        await connectDB();

        const requests = await ServiceRequestModel.find({ 
            userId: user.id as mongoose.Types.ObjectId
        });

        if (!requests) {
            return Response.json({
                success: false,
                message: "No requests found"
            }, {
                status: 404
            })
        }

        return Response.json({
            success: true,
            requests
        }, {
            status: 200
        })
    }
    catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Something went wrong"
        }, {
            status: 500
        })
    }
}