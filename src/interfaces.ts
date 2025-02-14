import { ability, chain, cry, gameIndex, generalLink, statInfo, type } from './types';

interface HeldItem {
  item: generalLink;
  version_details: {
    rarity: number;
    version: generalLink;
  }[];
}

export interface Move {
  move: generalLink;
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: generalLink;
    version_group: generalLink;
  }>;
}

export interface Sprite {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: {
    dream_world: {
      front_default: string | null;
      front_female: string | null;
    };
    home: {
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
    'official-artwork': {
      front_default: string;
      front_shiny: string;
    };
    showdown: {
      back_default: string | null;
      back_female: string | null;
      back_shiny: string | null;
      back_shiny_female: string | null;
      front_default: string | null;
      front_female: string | null;
      front_shiny: string | null;
      front_shiny_female: string | null;
    };
  };
  versions: {
    'generation-i': {
      'red-blue': {
        back_default: string;
        back_gray: string;
        back_transparent: string;
        front_default: string;
        front_gray: string;
        front_transparent: string;
      };
      yellow: {
        back_default: string;
        back_gray: string;
        back_transparent: string;
        front_default: string;
        front_gray: string;
        front_transparent: string;
      };
    };
    'generation-ii': {
      crystal: {
        back_default: string;
        back_shiny: string;
        back_shiny_transparent: string;
        back_transparent: string;
        front_default: string;
        front_shiny: string;
        front_shiny_transparent: string;
        front_transparent: string;
      };
      gold: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
        front_transparent: string;
      };
      silver: {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
        front_transparent: string;
      };
    };
    'generation-iii': {
      emerald: {
        front_default: string;
        front_shiny: string;
      };
      'firered-leafgreen': {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
      };
      'ruby-sapphire': {
        back_default: string;
        back_shiny: string;
        front_default: string;
        front_shiny: string;
      };
    };
    'generation-iv': {
      'diamond-pearl': {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      'heartgold-soulsilver': {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      platinum: {
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    'generation-v': {
      'black-white': {
        animated: {
          back_default: string;
          back_female: string | null;
          back_shiny: string;
          back_shiny_female: string | null;
          front_default: string;
          front_female: string | null;
          front_shiny: string;
          front_shiny_female: string | null;
        };
        back_default: string;
        back_female: string | null;
        back_shiny: string;
        back_shiny_female: string | null;
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    'generation-vi': {
      'omegaruby-alphasapphire': {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
      'x-y': {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    'generation-vii': {
      icons: {
        front_default: string;
        front_female: string | null;
      };
      'ultra-sun-ultra-moon': {
        front_default: string;
        front_female: string | null;
        front_shiny: string;
        front_shiny_female: string | null;
      };
    };
    'generation-viii': {
      icons: {
        front_default: string;
        front_female: string | null;
      };
    };
  };
}

interface Pokemon {
  abilities: ability[];
  base_experience: number;
  cries: cry;
  forms: generalLink[];
  game_indices: gameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: unknown[];
  past_types: unknown[];
  species: generalLink;
  sprites: Sprite;
  stats: statInfo[];
  types: type[];
  weight: number;
}

interface Species {
  base_happiness: number;
  capture_rate: number;
  color: generalLink;
  egg_groups: generalLink[];
  evolution_chain: generalLink;
  evolves_from_species: null | Species;
  form_descriptions: string[];
  forms_switchable: boolean;
  gender_rate: number;
  generation: generalLink;
  growth_rate: generalLink;
  habitat: generalLink;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  order: number;
  pal_park_area: generalLink;
  pokedex_numbers: number[];
  shape: generalLink;
  varieties: {
    is_default: boolean;
    pokemon: generalLink;
  }[];
}

interface PokemonListResponse {
  count: number;
  next: null;
  previous: null;
  results: generalLink[];
}

interface EvolutionChain {
  chain: chain;
  id: number;
}

export type { Pokemon, Species, PokemonListResponse, EvolutionChain };
