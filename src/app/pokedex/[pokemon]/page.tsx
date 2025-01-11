import { getPokemonSlugs } from "@/db/getAllPokemon";
import { getPokemon } from "@/db/getPokemon";
import { capitalizePokemonName } from "@/lib/utils";
import styles from "./pokemonPage.module.scss";
import Image from "next/image";
import { UNOWN_IMAGE } from "@/lib/const";
import LineChart from "@/components/StatsChart/StatsChart";
import Link from "next/link";
import TrainerRed from "../../../../public/trainer_red.png";

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
        <section className={styles.sizeComparisonCOntainer}>
          <h2>Size comparison</h2>
          <div className={styles.sizeComparison}>
            <figure>
              <Image
                src={pokemon.sprites.other.showdown.front_default || UNOWN_IMAGE}
                width={pokemon.height > 38 ? 380 : pokemon.height * 10}
                height={pokemon.height > 38 ? 380 : pokemon.height * 10}
                alt={pokemon.name}
              />
            </figure>
            <figure>
              <Image
                src={TrainerRed}
                width={94}
                height={160}
                alt="Trainer Red"
              />
            </figure>
          </div>
          <div className={styles.sizes}>
            <div className={styles.sizeComparisonItem}>
              <p>Height</p>
              <p>{pokemon.height}</p>
            </div>
            <div className={styles.sizeComparisonItem}>
              <p>Weight</p>
              <p>{pokemon.weight}</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}