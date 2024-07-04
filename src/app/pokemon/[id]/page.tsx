import PokemonDetailClient from "@/app/components/PokemonDetailClient";
import { Pokemon } from "@/app/types/pokemon";

async function fetchPokemon(id: string): Promise<Pokemon | null> {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) {
    return null;
  }
  const pokemonData = await res.json();

  const speciesRes = await fetch(pokemonData.species.url);
  const speciesData = await speciesRes.json();
  const koreanName = speciesData.names.find(
    (name: any) => name.language.name === "ko"
  ).name;

  const pokemon: Pokemon = {
    id: pokemonData.id,
    name: pokemonData.name,
    korean_name: koreanName,
    sprites: pokemonData.sprites,
    height: pokemonData.height,
    weight: pokemonData.weight,
    types: pokemonData.types.map((type: any) => ({
      type: {
        name: type.type.name,
        korean_name: type.type.name,
      },
    })),
    abilities: pokemonData.abilities.map((ability: any) => ({
      ability: {
        name: ability.ability.name,
        korean_name: ability.ability.name,
      },
    })),
    moves: pokemonData.moves.map((move: any) => ({
      move: {
        name: move.move.name,
        korean_name: move.move.name,
      },
    })),
  };

  return pokemon;
}

export default async function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const pokemon = await fetchPokemon(params.id);

  if (!pokemon) {
    return <div>포켓몬을 찾을 수 없습니다.</div>;
  }

  return <PokemonDetailClient id={params.id} />;
}
