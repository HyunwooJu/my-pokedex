import { NextResponse } from "next/server";
import axios from "axios";

export const GET = async () => {
  const totalPokemon = 151;
  try {
    const allPokemonData = await Promise.all(
      Array.from({ length: totalPokemon }, (_, i) =>
        (async () => {
          const response = await axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i + 1}`
          );
          const speciesResponse = await axios.get(
            `https://pokeapi.co/api/v2/pokemon-species/${i + 1}`
          );
          const koreanName = speciesResponse.data.names.find(
            (name: any) => name.language.name === "ko"
          );
          return {
            ...response.data,
            korean_name: koreanName ? koreanName.name : response.data.name,
          };
        })()
      )
    );
    return NextResponse.json(allPokemonData);
  } catch (error) {
    console.error("Failed to fetch data:", error); // 에러 메시지 출력
    return NextResponse.json({ error: "Failed to fetch data" });
  }
};
