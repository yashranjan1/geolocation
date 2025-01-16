
import connectDB from "@/lib/dbConnect";
import { UserModel } from "@/models/user.model";
import { CredentialsSignin, NextAuthConfig, User } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
}

class UserNotFoundError extends CredentialsSignin {
    code = "User not found"
}

class UserNotVerifiedError extends CredentialsSignin {
    code = "User not verified"
}
 
export const authConfig = {

    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                identifier: { label: "Username", type: "text", placeholder: "Username" },
                password: { label: "Password", type: "password", placeholder: "Password" },
            },
            async authorize(credentials: any): Promise<User> {

                await connectDB();

                try{
                    
                    const user = await UserModel.findOne({ 
                        $or: [
                            { email: credentials.identifier }, 
                            { username: credentials.identifier }
                        ]
                     });

                    if (!user) {
                        throw new UserNotFoundError();
                    }

                    if (!user.isVerified) {
                        throw new UserNotVerifiedError();
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (!isPasswordCorrect) {
                        throw new InvalidLoginError();
                    }

                    return user as User;

                } catch (error) {
                    if (error instanceof UserNotFoundError) {
                        throw new UserNotFoundError(error.code);
                    }
                    else if (error instanceof InvalidLoginError) {
                        throw new InvalidLoginError(error.code);
                    }
                    else if (error instanceof UserNotVerifiedError) {
                        throw new UserNotVerifiedError(error.code);
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
                token.avatar = user.avatar;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {

            if (session.user) {
                session.user.id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.avatar = token.avatar;
                session.user.role = token.role;
            }

        async redirect({ url, baseUrl }) {
            return baseUrl;
        },
        async session({ session, token, user }) {
            session.user = user;

            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
} satisfies NextAuthConfig