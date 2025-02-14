import { Pokemon } from "@/interfaces";
import { pokemonType } from "@/types";
import { PokemonSpecies } from "pokenode-ts";

export interface PokemonImageProps {
  pokemonData: Pokemon;
  pokemonSize: 110 | 150 | 200;
}

export interface PokemonCarouseProps {
  pokemonSpecies: PokemonSpecies;
  pokemonData: Pokemon;
  onChangePokemon: (data: PokemonCardData) => void;
}

export interface PokemonCardData {
  name: string,
  types: pokemonType[]
}

export type pokemonSize = 110 | 150 | 200;