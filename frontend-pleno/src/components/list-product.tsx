import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

interface ProductProps {
    id: string
    category: string
    title: string
    body: string
    price: number
    onClick: () => void
}

export function ListProduct({ body, category, id, onClick, price, title }: ProductProps) {
    return (
        <div className="w-full max-w-80 flex flex-col gap-2 rounded-lg">
            <Image
                src="/model.png"
                width={330}
                height={330}
                alt="Imagem com o fundo laranjado e com um Tenis preto com o solado branco"
                className="object-cover rounded-lg h-96 w-80 hover:scale-110"
            />

            <Link href={`/product/${category}/${id}`}>
                <p className="text-sm line-clamp-1 text-gray-500">{title}</p>

                <h4 className="text-xl line-clamp-2 font-medium">{body}</h4>
            </Link>

            <span className="text-sm text-gray-400 line-through">De R$ 8.0000,00</span>

            <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">R$ {price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</h3><span className="text-primary font-normal text-sm">10% OFF</span>
            </div>

            <Button title="Adicionar ao carrinho" variant="outline" onClick={onClick} />
        </div>
    )
}