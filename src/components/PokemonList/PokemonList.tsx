"use client"

import { PokemonSimple } from "@/types";
import { useState } from "react";
import styles from  "./PokemonList.module.css";
import { PokemonCard } from "../PokemonCard/PokemonCard";

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