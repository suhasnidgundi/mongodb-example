'use client'

import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

export default function KindeClient({ children }) {
    return <KindeProvider>{children}</KindeProvider>;
}