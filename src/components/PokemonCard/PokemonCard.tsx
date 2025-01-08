import { getPokemon } from "@/db/getPokemon";
import { Pokemon, PokemonSimple } from "@/types";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner/Spinner";
import Link from "next/link";
import Image from "next/image";
import styles from "./PokemonCard.module.scss";
import { capitalizePokemonName } from "@/lib/utils";
import TypeBadge from "../TypeBadge/TypeBadge";

export const PokemonCard = (
  { pokemon } :
  { pokemon: PokemonSimple }
) => {
  const [pokemonData, setPokemonData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPokemon() {
      const res = await getPokemon(pokemon.name);

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
          <header className={styles.header}>
            <h4 className={styles.name}>
              {capitalizePokemonName(pokemonData.name)}
            </h4>
          </header>
          <figure className={styles.image}>
            <Image
              src={
                pokemonData?.sprites.other["official-artwork"].front_default ||
                pokemonData?.sprites.front_default ||
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/201.png" // Default image (Unown)
              }
              width={150}
              height={150}
              alt={pokemonData.name}
            />
          </figure>
        </section>
      </Link>
      <section className={styles.bottom}>
        <div className={styles.types}>
          {pokemonData.types.map((type, i) =>
            <TypeBadge {...type} key={i}/>
          )}
        </div>
        <div className={styles.abilities}>
          {pokemonData.abilities.map((stat) => (
            <p key={stat.ability.name} className={styles.ability}>
              {capitalizePokemonName(stat.ability.name)}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}