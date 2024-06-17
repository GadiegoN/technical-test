'use client'
import { Button } from "@/components/button";
import Logo from "@/components/logo";
import { Clover } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductProps {
    id: number;
    title: string;
    body: string;
    price: number;
    category: string;
    quantity: number
}

export default function Product({ params }: { params: { category: string, id: string } }) {
    const [product, setProduct] = useState<ProductProps | null>(null);
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
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
                if (!response.ok) {
                    throw new Error('Produto não encontrado');
                }
                const data = await response.json();
                setProduct({
                    id: data.id,
                    title: data.title,
                    body: data.body,
                    price: parseFloat((Math.random() * 500).toFixed(2)),
                    category: params.category,
                    quantity: product?.quantity || 0,
                });
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id, params.category, product?.quantity]);

    const handleAddToCart = async (id: number) => {
        const productToAdd = product

        if (productToAdd) {
            const existingProduct = cartStore.find(item => item.id === id)

            if (existingProduct) {
                existingProduct.quantity += 1
                setCartStore([...cartStore])
                localStorage.setItem('flow-store', JSON.stringify(cartStore))
            } else {
                setCartStore([...cartStore, { ...productToAdd, quantity: 1 }])
                localStorage.setItem('flow-store', JSON.stringify(cartStore))
            }
        }
    }

    if (!product) {
        return <p>Carregando...</p>;
    }

    return (
        <section className="flex flex-col w-full h-full lg:flex-row gap-4 mt-10">
            <div className="flex flex-col lg:flex-row w-11/10 lg:w-full mx-auto lg:mx-0 gap-2">
                <div className="flex lg:flex-col gap-4 justify-between w-[120px]">
                    {Array.from({ length: 4 }, (_, index) => (
                        <Image
                            key={index}
                            src="/model.png"
                            width={330}
                            height={330}
                            alt="Imagem com o fundo laranjado e com um Tenis preto com o solado branco"
                            className="cursor-pointer w-full rounded-lg"
                        />
                    ))}
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <Image
                        src="/model.png"
                        width={330}
                        height={330}
                        alt="Imagem com o fundo laranjado e com um Tenis preto com o solado branco"
                        className="w-full h-full object-contain md:object-cover rounded-lg"
                    />
                </div>
            </div>
            <div className="flex flex-col justify-between gap-4 mt-20 lg:mt-0">
                <p className="text-gray-400 text-sm">{product.category}</p>
                <h3 className="text-gray-500 text-sm">{product.title}</h3>
                <h2 className="font-semibold text-xl">{product.body}</h2>
                <div className="bg-gray-200 flex flex-col justify-center items-center p-4">
                    <Clover className="text-primary" />
                    <p className="line-through text-gray-400 text-sm">De R$ 8.0000,00</p>
                    <p className="font-semibold text-xl">Preço: R${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                    <p className="text-gray-400 text-sm">no pix <span className="text-primary">10%</span> de desconto</p>
                </div>
                <Button title="Adicionar no carrinho" onClick={() => handleAddToCart(product.id)} />
            </div>
        </section>
    )
}