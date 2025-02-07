import { generalLink } from "@/types";
import styles from  "./PokemonList.module.css";
import { PokemonCard } from "../PokemonCard/PokemonCard";
import Pagination from "./Pagination/Pagination";

export const PokemonList = (
  { pokemonList } :
  { pokemonList: generalLink[] }
) => {

  return (
    <article>
      <Pagination pokemonListLength={pokemonList.length} />
      <div className={styles.pokemonList}>
        {
          pokemonList
          .slice((1 * 50) - 50, 1 * 50)
          .map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.name}/>
          ))
        } 
      </div>
    </article>
  );
}