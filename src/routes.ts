const publicRoutes = [
    "/"
]
const protectedRoutes = [
    "/dashboard",
    "/live"
]
const authRoutes = [
    "/sign-in",
]
const authPrefix = "/api/auth"
const DEFAULT_LOGIN_REDIRECT = "/dashboard"
export { publicRoutes, protectedRoutes, authRoutes, authPrefix, DEFAULT_LOGIN_REDIRECT }