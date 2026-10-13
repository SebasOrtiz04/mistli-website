import { ReactNode } from "react";
import { Providers } from "./provider.js";

export interface IAuthLayout {
    children: ReactNode
}

export default function AuthLayout({children}: IAuthLayout) {
    return (
        <div>
            <Providers>
            <main >
                {children}
            </main>
            </Providers>
        </div>
  )
}
