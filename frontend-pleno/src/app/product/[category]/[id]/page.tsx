'use client'
import { useEffect, useState } from "react";

interface ProductProps {
    id: number;
    title: string;
    body: string;
    price: number;
    category: string;
}

export default function Product({ params }: { params: { category: string, id: string } }) {
    const [product, setProduct] = useState<ProductProps | null>(null);

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
                });
            } catch (error) {
                console.error('Erro:', error);
            }
        };

        if (params.id) {
            fetchProduct();
        }
    }, [params.id, params.category]);

    if (!product) {
        return <p>Carregando...</p>;
    }

    return (
        <div>
            <h1>Detalhes do Produto</h1>
            <h2>{product.title}</h2>
            <p>{product.body}</p>
            <p>Preço: R${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            <p>Categoria: {product.category}</p>
        </div>
    )
}