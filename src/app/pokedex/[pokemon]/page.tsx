import { getPokemonSlugs } from "@/db/getAllPokemon";
import { getPokemon } from "@/db/getPokemon";
import { capitalizePokemonName } from "@/lib/utils";
import styles from "./pokemonPage.module.scss";
import Image from "next/image";
import { UNOWN_IMAGE } from "@/lib/const";
import LineChart from "@/components/StatsChart/StatsChart";
import Link from "next/link";
import SizeComparison from "@/components/SizeComparison/SizeComparison";
import TypeEffectiveness from "@/components/TypeEffectiveness/TypeEffectiveness";

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
        <section className={styles.imageContainer}>
          <h1>{capitalizePokemonName(pokemon.name)}</h1>
          <figure
            className={`
              ${styles.image}
              ${styles[pokemon.types.map((type) => type.type.name).join("-")]}`
            }
          >
            <Image
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default ||
                UNOWN_IMAGE // Default image (Unown)
              }
              width={280}
              height={280}
              alt={pokemon.name}
            />
          </figure>
          <div className={styles.types}>
            {
              pokemon.types.map((type) => (
                <span  key={type.type.name}
                    className={`${styles.type} ${styles[type.type.name + "-pill"]}`}
                  >
                  <Link href={`/types/${type.type.name}`} >
                      {type.type.name.toUpperCase()}
                  </Link>
                </span>
              ))
            }
          </div>
          <p className={styles.description}>
            {pokemon.location_area_encounters}
          </p>
        </section>
        <LineChart
          hp={pokemon.stats[0].base_stat}
          attack={pokemon.stats[1].base_stat}
          defense={pokemon.stats[2].base_stat}
          specialAttack={pokemon.stats[3].base_stat}
          specialDefense={pokemon.stats[4].base_stat}
          speed={pokemon.stats[5].base_stat}
          label={`${capitalizePokemonName(pokemon.name)} stats`}
        />
        <SizeComparison {...pokemon} />
        <TypeEffectiveness types={pokemon.types.map((type) => type.type.name)} />
      </main>
    </>
  );
}