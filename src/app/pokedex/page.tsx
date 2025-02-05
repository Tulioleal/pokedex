import { PokemonList } from '@/components/PokemonList/PokemonList';
import { getAllPokemon } from '@/db/getAllPokemon';
import PokedexWrapper from '@/components/PokedexWrapper/PokedexWrapper';

export default async function Pokedex() {
  const pokemonListResponse = await getAllPokemon();

  return (
    <main>
      <PokedexWrapper>
        <PokemonList pokemonList={pokemonListResponse.results} />
      </PokedexWrapper>
    </main>
  );
}