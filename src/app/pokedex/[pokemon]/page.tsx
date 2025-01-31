import { getPokemonSlugs } from "@/db/getAllPokemon";
import { getPokemon } from "@/db/getPokemon";
import { capitalizePokemonName } from "@/lib/utils";
import styles from "./pokemonPage.module.scss";
import LineChart from "@/components/StatsChart/StatsChart";
import SizeComparison from "@/components/SizeComparison/SizeComparison";
import TypeEffectiveness from "@/components/TypeEffectiveness/TypeEffectiveness";
import EvolutionChain from "@/components/EvolutionChain/EvolutionChain";
import { pokemonType } from "@/types";
import PrimaryInfo from "@/components/PrimaryInfo/PrimaryInfo";

export async function generateStaticParams() {
  const slugs = await getPokemonSlugs();

  return slugs.map((slug) => ({ params: { pokemon: slug } }));
}

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ pokemon: string }>
}) {
  const pokemonName = (await params).pokemon
  const pokemon = await getPokemon(pokemonName);
  
  return (
    <>
      <main className={styles.container}>
        <PrimaryInfo {...pokemon} />
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
        <SizeComparison {...pokemon} />
        <TypeEffectiveness types={pokemon.types.map((type) => type.type.name as pokemonType)} />
        <EvolutionChain url={pokemon.evolution_chain.url} type={pokemon.types[0].type.name as pokemonType}/>
      </main>
    </>
  );
}