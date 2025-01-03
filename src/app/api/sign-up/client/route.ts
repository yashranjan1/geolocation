import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    
    await connectDB();


    try {
        
        const { email, username, password, contact } = await req.json();
        
        const existingVerifiedUser = await UserModel.findOne({ 
            username,
            isVerified: true
        });

        if (existingVerifiedUser) {
            return Response.json(
                { 
                    success: false, 
                    message: "User already exists" 
                },{
                    status: 400,
                }
            );
        }

        const existingUserByEmail = await UserModel.findOne({ 
            email
        });

        if (existingUserByEmail) {
            if (existingUserByEmail.isVerified) {
                return Response.json(
                    { 
                        success: false, 
                        message: "User already exists" 
                    },{
                        status: 400,
                    }
                );
            }
            else {
                const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

                const hashedPassword = await bcrypt.hash(password, 10);

                const expiryDate = new Date();
                expiryDate.setHours(expiryDate.getHours() + 1);

                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = expiryDate;

                await existingUserByEmail.save();

                return Response.json(
                    { 
                        success: true, 
                        message: "User created successfully" 
                    },{
                        status: 201,
                    }
                );
            }    
        }
        else {
            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            const hashedPassword = await bcrypt.hash(password, 10);

            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const user = new UserModel({
                email,
                username,
                password: hashedPassword,
                contact,
                role: "client",
                verifyCode: verifyCode,
                verifyCodeExpiry: expiryDate,
            });

            user.save();

            return Response.json(
                { 
                    success: true, 
                    message: "User created successfully" 
                },{
                    status: 201,
                }
            );
        }
    } catch (error) {
        console.log(error);
        return Response.json(
            { 
                success: false, 
                message: "Error creating user" 
            },{
                status: 500,
            }
        );
    }
}
