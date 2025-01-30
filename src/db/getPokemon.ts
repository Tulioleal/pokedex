import { Pokemon } from "@/interfaces";
import { PokemonSpecies } from "pokenode-ts";

async function getPokemon(pokemonName: string) {
  const pokemonPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

  if (!pokemonPromise.ok) {
    const unownPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/unown`)
    const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/unown`)

    return {
      ...await unownPromise.json(),
      ...await pokemonSpecies.json()
    } as Pokemon & PokemonSpecies;
  }

  const pokemon = await pokemonPromise.json() as Pokemon;
  const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}`)


  return {
    ...pokemon,
    ...await pokemonSpecies.json()
  } as Pokemon & PokemonSpecies;
}

export {
  getPokemon
}