import { getPokemonSlugs } from "@/db/getAllPokemon";
import { getPokemonData, getPokemonSpecies } from "@/db/getPokemon";
import { capitalizePokemonName } from "@/lib/utils";
import styles from "./pokemonPage.module.scss";
import LineChart from "@/components/StatsChart/StatsChart";
import SizeComparison from "@/components/SizeComparison/SizeComparison";
import TypeEffectiveness from "@/components/TypeEffectiveness/TypeEffectiveness";
import EvolutionChain from "@/components/EvolutionChain/EvolutionChain";
import { pokemonType } from "@/types";
import PrimaryInfo from "@/components/PrimaryInfo/PrimaryInfo";
import PokedexWrapper from "@/components/PokedexWrapper/PokedexWrapper";

export async function generateStaticParams() {
  const slugs = await getPokemonSlugs();

  return slugs.map((slug) => ({ params: { pokemon: slug } }));
}

type Props = {
  params: Promise<{ pokemon: string }>
}

export async function generateMetadata(
  { params }: Props
) {
  const pokemonName = capitalizePokemonName((await params).pokemon)

  return {
    title: `${pokemonName} - Pokedex`,
    description: `Learn more about ${pokemonName}`
  }
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ pokemon: string }>
}) {
  const pokemonName = (await params).pokemon
  const pokemonData = await getPokemonData(pokemonName);
  const pokemonSpecies = await getPokemonSpecies(pokemonData.id.toString());

  const pokemon = {
    ...pokemonData,
    ...pokemonSpecies
  }
  
  return (
    <PokedexWrapper openDefault>
      <main className={styles.container}>
        <PrimaryInfo {...pokemon} />
        <SizeComparison {...pokemon} />
        <EvolutionChain url={pokemon.evolution_chain?.url} type={pokemon.types[0].type.name as pokemonType}/>
        <TypeEffectiveness types={pokemon.types.map((type) => type.type.name as pokemonType)} />
        <LineChart
          hp={pokemon.stats[0].base_stat}
          attack={pokemon.stats[1].base_stat}
          defense={pokemon.stats[2].base_stat}
          specialAttack={pokemon.stats[3].base_stat}
          specialDefense={pokemon.stats[4].base_stat}
          speed={pokemon.stats[5].base_stat}
          label={`${capitalizePokemonName(pokemon.name)} stats`}
          type={pokemon.types[0].type.name as pokemonType}
        />
      </main>
    </PokedexWrapper>
  );
}