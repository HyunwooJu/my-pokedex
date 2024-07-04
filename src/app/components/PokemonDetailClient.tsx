"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { Pokemon } from "@/app/types/pokemon";
import { useLoading } from "@/app/components/LoadingContext";

const PokemonDetailClient = ({ id }: { id: string }) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const response = await fetch(`/api/pokemons/${id}`);
      const data = await response.json();
      setPokemon(data);
      setLoading(false);
    };

    fetchPokemon();
  }, [id, setLoading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!pokemon) {
    return <div>포켓몬을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="text-blue-500 mb-4 inline-block">
        뒤로 가기
      </Link>
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col items-center">
            <Image
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              width={96}
              height={96}
            />
            <h1 className="text-2xl font-bold mt-2">{pokemon.korean_name}</h1>
            <p className="text-gray-500">
              No. {pokemon.id.toString().padStart(4, "0")}
            </p>
            <p className="mt-2">
              이름: {pokemon.korean_name} <br />
              키: {pokemon.height / 10}m <br />
              무게: {pokemon.weight / 10}kg
            </p>
            <div className="mt-2 flex items-center">
              <h2 className="text-xl font-bold mr-2">타입:</h2>
              <div className="flex">
                {pokemon.types.map((type) => (
                  <span
                    key={type.type.name}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                  >
                    {type.type.korean_name}
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <h2 className="text-xl font-bold mr-2">특성:</h2>
              <div className="flex">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2"
                  >
                    {ability.ability.korean_name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-bold">기술:</h2>
            <p className="flex flex-wrap">
              {pokemon.moves.map((move) => (
                <span
                  key={move.move.name}
                  className="bg-blue-200 rounded-full px-3 py-1 text-sm font-semibold text-blue-700 mr-2 mb-2"
                >
                  {move.move.korean_name}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailClient;
