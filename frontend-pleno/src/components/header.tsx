'use client'
import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";
import Logo from "./logo";
import { useEffect, useState } from "react";

interface ProductProps {
    id: number;
    title: string;
    body: string;
    price: number;
    category: string;
    quantity: number
}

export function Header() {
    const [totalItems, setTotalItems] = useState(0);
    const [cartStore, setCartStore] = useState<ProductProps[]>(getCartStorage())
    function getCartStorage() {
        if (typeof window !== 'undefined') {
            const cartStorage = localStorage.getItem("flow-store")

            if (cartStorage) {
                return JSON.parse(cartStorage)
            }

            return []
        }
    }

    useEffect(() => {
        const getTotalItemsInCart = () => {
            return cartStore.reduce((total, item) => total + item.quantity, 0);
        };

        setTotalItems(getTotalItemsInCart());
    }, [cartStore])

    return (
        <header className="w-full shadow-lg">
            <div className="flex justify-between p-5 max-w-7xl mx-auto">
                <Link href="/">
                    <Logo theme="light" />
                </Link>

                <div className="flex gap-8">
                    <Link href="/cart" className="flex items-center gap-3 hover:underline hover:underline-offset-4">
                        <ShoppingBag className="text-primary" />
                        Carrinho
                        {totalItems > 0 && (<span className="bg-primary text-white rounded-full px-2 pt-1">{totalItems}</span>)}
                    </Link>
                    <Link href="/#" className="flex items-center gap-3 hover:underline hover:underline-offset-4"><User className="text-primary" />Entrar</Link>
                </div>
            </div>
        </header>
    )
}