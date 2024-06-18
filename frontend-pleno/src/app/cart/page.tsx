'use client';
import { Button } from '@/components/button';
import { Modal } from '@/components/modal';
import { Loader, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ProductProps {
    id: number;
    title: string;
    body: string;
    price: number;
    category: string;
    quantity: number;
}

export default function Cart() {
    const [cartStore, setCartStore] = useState<ProductProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const cartStorage = localStorage.getItem('flow-store');
            if (cartStorage) {
                setCartStore(JSON.parse(cartStorage));
            }
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoading && typeof window !== 'undefined') {
            localStorage.setItem('flow-store', JSON.stringify(cartStore));
        }
    }, [cartStore, isLoading]);

    const handleRemoveItem = (id: number) => {
        setCartStore(cartStore.filter(item => item.id !== id));
    };

    const handleIncreaseQuantity = (id: number) => {
        setCartStore(cartStore.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
    };

    const handleDecreaseQuantity = (id: number) => {
        setCartStore(cartStore.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
    };

    const calculateSubtotal = () => {
        return cartStore.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    if (isLoading) {
        return (
            <div className="h-screen fixed bg-gray-200 w-full flex items-center justify-center gap-2">
                <Loader size={32} className="animate-spin text-primary" />
                <p className="font-semibold text-xl">Carregando...</p>
            </div>
        )
    }

    return (
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row h-screen lg:justify-between gap-4 p-4">
            {cartStore.length > 0 ? (
                <div className="space-y-2 w-full lg:w-7/12">
                    {cartStore.map((item) => (
                        <div key={item.id} className="border p-4 rounded shadow flex gap-10">
                            <div className="min-w-32 size-32 bg-primary rounded-lg">
                                <Image
                                    src="/model.png"
                                    width={330}
                                    height={330}
                                    alt="Imagem com o fundo laranjado e com um Tenis preto com o solado branco"
                                    className="cursor-pointer min-w-32 size-32 rounded-lg"
                                />
                            </div>
                            <div className="w-full">
                                <p className="text-xl font-medium line-clamp-2">{item.title}</p>
                                <div className="flex justify-between mt-4">
                                    <p className="text-xl font-semibold flex-1">R${item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                                    <div className='flex gap-2'>
                                        <div className="bg-red-200 rounded-lg size-7 flex justify-center items-center cursor-pointer hover:scale-105" onClick={() => handleRemoveItem(item.id)}>
                                            <Trash size={18} className="text-red-500" />
                                        </div>
                                        <div className="flex gap-2 p-2 bg-gray-300 items-center justify-between h-7 w-20 rounded-lg">
                                            <p className="cursor-pointer select-none" onClick={() => handleDecreaseQuantity(item.id)}>-</p>
                                            <p>{item.quantity}</p>
                                            <p className="cursor-pointer select-none" onClick={() => handleIncreaseQuantity(item.id)}>+</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="lg:h-full flex justify-center">
                    <p className="text-lg my-10 lg:ml-10 lg:mt-40">Seu carrinho está vazio</p>
                </div>
            )}

            <div className="w-full lg:w-4/12 h-80 border p-4 rounded shadow flex flex-col justify-around">
                <div className="flex w-full justify-between">
                    <p className="text-gray-500">Sub Total:</p>
                    <p className="font-semibold">R${calculateSubtotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="text-gray-500">Frete:</p>
                    <p className="text-green-500 font-medium">Grátis</p>
                </div>
                <div className="flex w-full justify-between">
                    <p className="text-gray-500">Valor Total:</p>
                    <p className="font-semibold text-xl line-clamp-1">R$ {calculateSubtotal().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                {cartStore.length > 0 ? (
                    <Button title="Finalizar pedido" onClick={() => setOpenModal(true)} />
                ) : (
                    <Link href="/"><Button onClick={() => { }} title="Voltar as compras" /></Link>
                )}
            </div>

            <Modal showModal={openModal} closeModal={() => setOpenModal(false)} />
        </div>
    );
}