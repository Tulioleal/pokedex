import { Pokemon } from "../types";

async function getPokemon(pokemonName: string) {
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

  if (!pokemon.ok) {
    const unown = await fetch(`https://pokeapi.co/api/v2/pokemon/unown`)
    return await unown.json() as Pokemon;
  }

  return await pokemon.json() as Pokemon;
}

export {
  getPokemon
}