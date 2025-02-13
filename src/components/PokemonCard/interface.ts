import { Pokemon } from "@/interfaces";
import { PokemonSpecies } from "pokenode-ts";

export interface PokemonImageProps {
  pokemonData: Pokemon;
  pokemonSize: 110 | 150 | 200;
}

export interface PokemonCarouseProps {
  pokemonSpecies: PokemonSpecies;
  pokemonData: Pokemon;
}

export type pokemonSize = 110 | 150 | 200;