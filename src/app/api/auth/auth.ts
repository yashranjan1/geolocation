import NextAuth from "next-auth"
import { authConfig } from "./config"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: authConfig.providers,
    session: authConfig.session,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.username = user.username;
                token.avatar = user.avatar;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.username = token.username;
                session.user.avatar = token.avatar;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error", 
    },
})