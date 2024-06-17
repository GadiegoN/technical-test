'use client'

import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { ListProduct } from "@/components/list-product";
import MultiRangeSlider from "@/components/multi-range/multi-range-slider";
import { Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProductProps {
  id: number;
  title: string;
  body: string;
  price: number;
  category: string;
  quantity: number;
}

export default function Home() {
  const [listProduct, setListProduct] = useState<ProductProps[]>([]);
  const [cartStore, setCartStore] = useState<ProductProps[]>(getCartStorage())

  const [title, setTitle] = useState('')
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [checkboxes, setCheckboxes] = useState([
    { label: 'Botas', checked: false },
    { label: 'Chinelos', checked: false },
    { label: 'Chuteiras', checked: false },
    { label: 'Sandalias', checked: false },
    { label: 'Tenis', checked: false },
  ]);

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
    async function getProducts() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');

        if (!response.ok) {
          throw new Error('Erro ao carregar os produtos');
        }

        const data = await response.json();
        const firstTenProducts = data.slice(0, 10).map((item: any) => ({
          id: item.id,
          title: item.title,
          body: item.body,
          price: parseFloat((Math.random() * 500).toFixed(2)),
          category: getRandomCategory(),
        }));

        setListProduct(firstTenProducts);
      } catch (error) {
        console.error('Erro:', error);
      }
    }

    getProducts();
  }, []);

  const getRandomCategory = (): string => {
    const categories = ['Botas', 'Chinelos', 'Chuteiras', 'Sandalias', 'Tenis'];
    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex];
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...checkboxes];

    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  };

  const handleGetMinMax = (priceMin: number, priceMax: number) => {
    setPriceMin(priceMin)
    setPriceMax(priceMax)
  }

  const handleAddToCart = async (id: number) => {
    const productToAdd = listProduct.find(product => product.id === id);

    if (productToAdd) {
      const existingProduct = cartStore.find(item => item.id === id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        productToAdd.quantity = 1;
        cartStore.push(productToAdd);
      }

      setCartStore([...cartStore]);
      localStorage.setItem('flow-store', JSON.stringify(cartStore));
    }
  };

  const filteredProductsByCategory = listProduct.filter(product =>
    checkboxes.some(checkbox => checkbox.checked && checkbox.label === product.category) &&
    product.price >= priceMin &&
    product.price <= priceMax &&
    product.title.toLowerCase().includes(title.toLowerCase())
  );

  const filteredProducts = listProduct.filter(product =>
    product.price >= priceMin &&
    product.price <= priceMax &&
    product.title.toLowerCase().includes(title.toLowerCase())
  );

  return (
    <main className="flex flex-col w-screen">
      <Header />
      <section className="flex h-80 justify-center">
        <div className="flex w-full justify-center items-center bg-primary">
          <h1 className="text-white text-5xl font-semibold select-none">
            Estilo e conforto <br /> Para os seus pés
          </h1>
        </div>
        <Image
          src="/model.png"
          width={720}
          height={320}
          alt="Imagem com o fundo laranjado e com um Tenis preto com o solado branco"
          className="object-cover hidden md:block md:w-1/2"
        />
      </section>

      <section className="flex flex-col justify-between p-5 w-full max-w-7xl mx-auto">
        <div className="flex w-full justify-between items-center mt-4">
          <h2 className="font-semibold text-xl">
            Itens encontrados
          </h2>
          <div className="w-96">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Pesquisar"
              icon={<Search />}
            />
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row">
          <div className="flex md:flex-col gap-4">
            <div className="bg-gray-200 w-72 p-4 rounded-lg">
              <h4>Categorias</h4>
              <Input
                placeholder="Pesquisar"
                icon={<Search />}
              />
              <nav className="flex flex-col gap-2 mt-4">
                {checkboxes.map((checkbox, index) => (
                  <Checkbox
                    key={index}
                    label={checkbox.label}
                    checked={checkbox.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                ))}
              </nav>
            </div>
            <div className="bg-gray-200 w-72 p-4 rounded-lg">
              <h4>Preço</h4>
              <MultiRangeSlider
                min={0}
                max={500}
                onChange={({ min, max }: { min: number; max: number }) =>
                  handleGetMinMax(min, max)
                }
              />
              <div className="flex gap-4">
                <p className="w-full bg-gray-300 rounded-t-lg py-2 pl-4 text-sm">Minimo</p>
                <p className="w-full bg-gray-300 rounded-t-lg py-2 pl-4 text-sm">Maximo</p>
              </div>
              <div className="flex gap-4">
                <p className="w-full bg-gray-300 rounded-b-lg py-2 pl-4 text-sm">R$ {priceMin}</p>
                <p className="w-full bg-gray-300 rounded-b-lg py-2 pl-4 text-sm">R$ {priceMax}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:ml-4 m-4 mx-auto">
            {
              (filteredProductsByCategory.length > 0
                ? filteredProductsByCategory
                : filteredProducts
              ).map((product) => (
                <ListProduct
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  body={product.body}
                  category={product.category}
                  onClick={() => handleAddToCart(product.id)}
                  id={product.id.toString()}
                />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
