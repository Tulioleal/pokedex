import { PokemonSpeciesVariety } from "pokenode-ts";
import { getResource } from "./getResource";
import { Pokemon } from "@/interfaces";

export async function getPokemonVarieties(varieties: PokemonSpeciesVariety[]) {
  const res = await Promise.all(
    varieties.map(async (variety) => {
      const pokemon = await getResource(variety.pokemon.url);
      return pokemon;
    })
  );

  return res as Pokemon[];
}