import connectDB from "@/lib/dbConnect";
import { auth } from "@/app/api/auth/auth";
import { ServiceRequestModel } from "@/models/user.model";

interface Params {
    params: Promise<{
        requestId: string;
    }>;
}


export async function GET(request: Request, { params }: Params) {

    try{
        await connectDB();

        const { requestId } = await params;

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

        const serviceReq = await ServiceRequestModel.findOne({ 
            _id: requestId,
            userId: userId,
        });

        if (!serviceReq) {
            return Response.json({
                success: false,
                message: "Service request not found",
            }, {
                status: 404,
            });
        }
        
        return Response.json({
            success: true,
            message: "Service request found",
            request: serviceReq,
        }, {
            status: 200,
        });
    } catch (error) {
        return Response.json({
            success: false,
            message: "Error fetching service request",
        }, {
            status: 500,
        });
    }
}