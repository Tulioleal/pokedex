import { PokemonListResponse } from "../interfaces";

const LIMIT = 1025;

async function getAllPokemon() {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=0`)

  return await data.json() as PokemonListResponse;
}

async function getPokemonSlugs() {
  const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')

  const response = await data.json() as PokemonListResponse;

  return response.results.map((pokemon) => pokemon.name);
}

export {
  getAllPokemon,
  getPokemonSlugs
}