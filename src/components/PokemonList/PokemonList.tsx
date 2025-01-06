"use client"

import { Pokemon, PokemonSimple } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from  "./PokemonList.module.css";
import { getPokemon } from "@/db/getPokemon";
import Image from "next/image";
import { getPokemonNo } from "@/lib/getPokemonNo";
import { Spinner } from "../Spinner/Spinner";
import { capitalizePokemonName } from "@/lib/utils";

const POKEMON_LIMIT = 50;

export const PokemonList = (
  { pokemonList } :
  { pokemonList: PokemonSimple[] }
) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pages = Math.ceil(pokemonList.length / POKEMON_LIMIT);

  const handlePageChange = (nextPage:number) => {

    if (nextPage > pages || nextPage < 1) {
      return;
    }

    setCurrentPage(nextPage);
  }

  return (
    <section>
      <button
        disabled={currentPage - 1 < 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >Prev</button>
      {currentPage} of {pages}
      <button
        disabled={currentPage + 1 > pages}
        onClick={() => handlePageChange(currentPage + 1)}
      >Next</button>
      <section className={styles.pokemonList}>
        {
          pokemonList.slice((currentPage * POKEMON_LIMIT) - POKEMON_LIMIT, currentPage * POKEMON_LIMIT).map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name}/>
          ))
        } 
      </section>
    </section>
  );
}

const PokemonCard = (
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
    <Link href={`/pokedex/${pokemon.name}`} key={pokemon.name}>
      <div className={styles.pokemonCard}>
        <h3 className={styles.number}>
          No.{getPokemonNo(pokemonData.id)}
        </h3>
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
        <h4 className={styles.name}>{capitalizePokemonName(pokemonData.name)}</h4>
      </div>
    </Link>
  );
}