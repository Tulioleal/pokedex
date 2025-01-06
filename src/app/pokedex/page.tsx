
import { PokemonList } from '@/components/PokemonList/PokemonList';
import { getAllPokemon } from '@/db/getAllPokemon';
import styles from './pokedex.module.css';

export default async function Pokedex() {
  const pokemonListResponse = await getAllPokemon();

  return (
    <main className={styles.container}>
      <PokemonList pokemonList={pokemonListResponse.results} />
    </main>
  );
}