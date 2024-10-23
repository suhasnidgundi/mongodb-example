import { createKindeAuthConfig } from "@kinde-oss/kinde-auth-nextjs";

export const { auth } = createKindeAuthConfig({
    redirect_uri: "/dashboard",
    unauthorized_uri: "/",
    post_login_redirect_uri: "/dashboard",
});