'use client'

import { Checkbox } from "@/components/checkbox";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState('')
  const [checkboxes, setCheckboxes] = useState([
    { label: 'Botas', checked: false },
    { label: 'Chinelos', checked: false },
    { label: 'Chuteiras', checked: false },
    { label: 'Sandálias', checked: false },
    { label: 'Tênis', checked: false },
  ]);

  const handleCheckboxChange = (index: number) => {
    const updatedCheckboxes = [...checkboxes];

    updatedCheckboxes[index].checked = !updatedCheckboxes[index].checked;
    setCheckboxes(updatedCheckboxes);
  };

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

          </div>
        </div>
      </section>
    </main>
  );
}
