import { pokemonType } from "@/types";

export function capitalizePokemonName(name: string): string {
  if (!name) return name;
  const words = name.split('-');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
}

export const filterDuplicatedTypes = (list1: pokemonType[], list2: pokemonType[])
  : { type: pokemonType, multiplier: number }[] => {
  const types = list1.filter((type) => !list2.includes(type));
  let duplicates = JSON.parse(JSON.stringify(types)) as pokemonType[];
  duplicates = duplicates.filter((item, index) => duplicates.indexOf(item) !== index);

  const res = types.map((type) => ({ type, multiplier: duplicates.includes(type) ? 4 : 2 }));
  return res.filter((type) => {
    if (!duplicates.includes(type.type)) {
      return true;
    }

    duplicates = duplicates
      .filter((item) => item !== type.type)
    return false;
  }).sort((a, b) => b.multiplier - a.multiplier);
}

export const getPokemonTypeClassName = (types: pokemonType[]) => {
  return types.join("-")
}