type pokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

type generalLink = {
  name: string;
  url: string;
}

interface ability {
  ability: generalLink;
  is_hidden: boolean;
  slot: number;
}

interface cry {
  latest: string;
  legacy: string;
}

type stat = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
}

type type = {
  slot: number;
  type: generalLink;
}

type statInfo = {
  base_stat: number;
  effort: number;
  stat: generalLink;
}


interface gameIndex {
  game_index: number;
  version: generalLink;
}

type versionDetail = {
  rarity: number;
  version: generalLink;
}
type chain = {
  evolves_to: chain[];
  is_baby: boolean;
  species: generalLink;
}

export type {
  ability,
  cry,
  generalLink,
  pokemonType,
  stat,
  statInfo,
  type,
  gameIndex,
  versionDetail,
  chain
}