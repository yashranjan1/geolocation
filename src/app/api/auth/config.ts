
import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { CredentialsSignin, NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";


class UserNotFoundError extends CredentialsSignin {
    code = "USER_NOT_FOUND";
}

class InvalidCredentialsError extends CredentialsSignin {
    code = "INVALID_CREDENTIALS";
}

 
export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error", 
    },
    providers: [
        // enable later
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // }),

        Credentials({
            name: "Credentials",
            credentials: {
                identifier: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials: any): Promise<User> {

                await connectDB();

                try{
                    
                    const username = credentials.username;

                    const user = await UserModel.findOne({ 
                        $or: [
                            { email: credentials.identifier }, 
                            { username: credentials.identifier }
                        ]
                     });

                    if (!user) {
                        throw new UserNotFoundError();
                    }
                    
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new InvalidCredentialsError();
                    }

                    return user as User;

                } catch (error) {
                    if (error instanceof UserNotFoundError) {
                        throw new UserNotFoundError(error.code);
                    }
                    else {
                        throw new Error("Error authenticating user");
                    }
                }
                
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
}