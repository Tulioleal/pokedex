import { PokemonSpecies } from "pokenode-ts"

export default async function getPokemonDescription(pokemonId: number) {

  const dataPromise = await fetch("https://pokeapi.co/api/v2/pokemon-species/" + pokemonId)

  if (!dataPromise.ok) {
    return null
  }

  const species = await dataPromise.json() as PokemonSpecies

  const flavorText = species.flavor_text_entries.filter((entry) => entry.language.name == "en")

  return flavorText[flavorText.length - 1]
}