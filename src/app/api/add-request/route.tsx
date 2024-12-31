import connectDB from "@/lib/dbConnect";
import { auth } from "@/app/api/auth/auth";
import { ServiceRequestModel } from "@/models/user.model";


export async function POST(request: Request) {

    try {
        await connectDB();

        const session = await auth();

        if (!session) {
            return Response.json({
                sucess: false,
                message: "Unauthorized",
            },
            {
                status: 401,
            });
        }
        
        const userId = session.user.id;

        const { title, media, description } = await request.json();

        const serviceReq = await ServiceRequestModel.create({
            title,
            media,
            description,
            userId,
            status: "pending",
        });

        return Response.json({
            success: true,
            message: "Service request created",
            data: serviceReq,
        }, {
            status: 200,
        });
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error creating service request",
        }, {
            status: 500,
        });
    }
}