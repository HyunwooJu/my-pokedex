"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pokemon } from "@/app/types/pokemon";
import { useLoading } from "./LoadingContext";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch("/api/pokemons");
      const data = await response.json();
      console.log("Fetched Data:", data); // 데이터를 콘솔에 출력하여 확인
      setPokemonList(data);
      setLoading(false);
    };
    fetchData();
  }, [setLoading]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">포켓몬 도감</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <Link
            href={`/pokemon/${pokemon.id}`}
            key={pokemon.id}
            className="block border p-4 flex flex-col items-center cursor-pointer hover:shadow-lg rounded-2xl"
          >
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <h2 className="mt-2 text-lg font-bold">{pokemon.korean_name}</h2>
            <p className="text-gray-500">도감번호: {pokemon.id}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
