import { getPokemonSlugs } from "@/db/getAllPokemon";
import { getPokemon } from "@/db/getPokemon";
import { capitalizePokemonName } from "@/lib/utils";
import styles from "./pokemonPage.module.scss";
import Image from "next/image";
import { UNOWN_IMAGE } from "@/lib/const";

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
      <ul>
        {
          JSON.stringify(pokemon)
        }
      </ul>
    </>
  );
}