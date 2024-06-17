import { Header } from "@/components/header";
import { ReactNode } from "react";

export default function ProductLayout({ children }: { children: ReactNode }) {
    return (
        <section className="flex flex-col w-screen h-screen">
            <Header />

            <div className="flex w-full max-w-7xl mx-auto">
                {children}
            </div>
        </section>
    )
}