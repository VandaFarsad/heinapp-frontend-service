export { default as proxy } from "next-auth/middleware";

export const config = {
  matcher: ["/profile/:path*", "/calendar/:path*", "/workshop/:path*"],
};
