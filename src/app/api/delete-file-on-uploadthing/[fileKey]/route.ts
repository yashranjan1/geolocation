import { utapi } from "@/server/uploadthing";
interface Params {
    params: Promise<{
        fileKey: string;
    }>;
}

export async function DELETE(Request: Request, { params }: Params) {


    try{

        const { fileKey } = await params;

        const res = await utapi.deleteFiles(fileKey);

        if (res.deletedCount != 1) {
            return new Response("File not found", { status: 404 });
        }

        return new Response("File deleted", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Something went wrong", { status: 500 });
    }
}