import { getPokemon } from "@/db/getPokemon";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import Link from "next/link";
import Image from "next/image";
import styles from "./PokemonCard.module.scss";
import { capitalizePokemonName } from "@/lib/utils";
import TypeBadge from "../TypeBadge/TypeBadge";
import { generalLink, pokemonType } from "@/types";
import { PokemonSpecies } from "pokenode-ts";
import { Pokemon } from "@/interfaces";

export const PokemonCard = (
  { pokemon } :
  { pokemon: generalLink }
) => {
  const [pokemonData, setPokemonData] = useState<Pokemon & PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [pokemonSize, setPokemonSize] = useState<110 | 150 | 200>(150);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await getPokemon(pokemon.name);
      const size = res.height > 15 ?
        200 : res.height >= 8 ?
        150 : 110;

      setPokemonSize(size);
      setPokemonData(res);
    }
    fetchPokemon().then(() => setLoading(false));
  }, [pokemon.name]);

  if (loading || !pokemonData)
    return (
      <div className={styles.pokemonCard}>
        <Spinner/>
      </div>
    );

  return (
    <div className={`
      ${styles.pokemonCard}
      ${styles[`type-${pokemonData.types.map((type) => type.type.name).join("--")}`]}
    `}>
      <Link href={`/pokedex/${pokemon.name}`} key={pokemon.name}>
        <section className={styles.top}>
          <figure className={styles.image}>
            <Image
              src={
                pokemonData?.sprites.other?.["official-artwork"].front_default ||
                pokemonData?.sprites.front_default ||
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png" // Default image (Unown)
              }
              width={pokemonSize}
              height={pokemonSize}
              alt={pokemonData.name}
            />
          </figure>
        </section>
      </Link>
      <section className={styles.bottom}>
        <div className={styles.types}>
          {pokemonData.types.map((type, i) =>
            <TypeBadge name={type.type.name as pokemonType} key={i}/>
          )}
        </div>
        <div className={styles.abilities}>
          {capitalizePokemonName(pokemonData.name)}
        </div>
      </section>
    </div>
  );
}