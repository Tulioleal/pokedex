import { Pokemon } from '@/interfaces';
import { PokemonSpecies } from 'pokenode-ts';

async function getPokemonData(pokemonName: string) {
  const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

  if (!pokemonResponse.ok) {
    const pokemonSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/unown`);

    return (await pokemonSpecies.json()) as Pokemon;
  }

  const pokemon = (await pokemonResponse.json()) as Pokemon;

  return pokemon as Pokemon;
}

async function getPokemonSpecies(id: string) {
  const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

  if (!speciesResponse.ok) {
    console.log('Error fetching species data');

    return null;
  }

  return (await speciesResponse.json()) as PokemonSpecies;
}

export { getPokemonData, getPokemonSpecies };
