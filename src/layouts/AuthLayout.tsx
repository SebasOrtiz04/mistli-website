import { ReactNode } from "react";

export interface IAuthLayout {
    children: ReactNode
}

export default function AuthLayout({children}: IAuthLayout) {
    return (
        <div className="flex h-screen w-screen bg-amber-50">
            <aside className="w-1/3 bg-sky-100">
                <main className='min-h-[calc(100vh-144px)]'>
                    {children}
                </main>
            </aside>
            <section className="w-2/3 shadow-lg bg-sky-950">

            </section>
        </div>
  )
}
