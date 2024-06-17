import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import Logo from "./logo";



export function Header() {
    return (
        <header className="w-full shadow-lg">
            <div className="flex justify-between p-5 max-w-7xl mx-auto">
                <Link href="/">
                    <Logo theme="light" />
                </Link>

                <div className="flex gap-8">
                    <Link href="/cart" className="flex items-center gap-3 hover:underline hover:underline-offset-4"><ShoppingBag className="text-primary" />Carrinho</Link>
                    <Link href="/#" className="flex items-center gap-3 hover:underline hover:underline-offset-4"><User className="text-primary" />Entrar</Link>
                </div>
            </div>
        </header>
    )
}