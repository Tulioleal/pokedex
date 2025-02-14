import { pokemonType } from '@/types';

export const TypeWeakness: {
  [type: string]: {
    double: pokemonType[];
    half: pokemonType[];
    zero: pokemonType[];
  };
} = {
  normal: {
    double: ['fighting'],
    half: [],
    zero: ['ghost'],
  },
  fire: {
    double: ['water', 'rock', 'fire'],
    half: ['grass', 'ice', 'bug', 'fire', 'steel', 'fairy'],
    zero: [],
  },
  water: {
    double: ['electric', 'grass'],
    half: ['fire', 'water', 'ice', 'steel'],
    zero: [],
  },
  electric: {
    double: ['ground'],
    half: ['electric', 'flying', 'steel'],
    zero: [],
  },
  grass: {
    double: ['fire', 'ice', 'poison', 'flying', 'bug'],
    half: ['water', 'electric', 'grass', 'ground'],
    zero: [],
  },
  ice: {
    double: ['fire', 'fighting', 'rock', 'steel'],
    half: ['ice'],
    zero: [],
  },
  fighting: {
    double: ['flying', 'psychic', 'fairy'],
    half: ['bug', 'rock', 'dark'],
    zero: [],
  },
  poison: {
    double: ['ground', 'psychic'],
    half: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
    zero: [],
  },
  ground: {
    double: ['water', 'grass', 'ice'],
    half: ['poison', 'rock'],
    zero: ['electric'],
  },
  flying: {
    double: ['electric', 'ice', 'rock'],
    half: ['grass', 'fighting', 'bug'],
    zero: ['ground'],
  },
  psychic: {
    double: ['bug', 'ghost', 'dark'],
    half: ['fighting', 'psychic'],
    zero: [],
  },
  bug: {
    double: ['fire', 'flying', 'rock'],
    half: ['grass', 'fighting', 'ground'],
    zero: [],
  },
  rock: {
    double: ['water', 'grass', 'fighting', 'ground', 'steel'],
    half: ['normal', 'fire', 'poison', 'flying'],
    zero: [],
  },
  ghost: {
    double: ['ghost', 'dark'],
    half: ['poison', 'bug'],
    zero: ['normal', 'fighting'],
  },
  dragon: {
    double: ['ice', 'dragon', 'fairy'],
    half: ['fire', 'water', 'electric', 'grass'],
    zero: [],
  },
  dark: {
    double: ['fighting', 'bug', 'fairy'],
    half: ['ghost', 'dark'],
    zero: ['psychic'],
  },
  steel: {
    double: ['fire', 'fighting', 'ground'],
    half: [
      'normal',
      'grass',
      'ice',
      'flying',
      'psychic',
      'bug',
      'rock',
      'dragon',
      'steel',
      'fairy',
    ],
    zero: ['poison'],
  },
  fairy: {
    double: ['poison', 'steel'],
    half: ['fighting', 'bug', 'dark'],
    zero: ['dragon'],
  },
};
