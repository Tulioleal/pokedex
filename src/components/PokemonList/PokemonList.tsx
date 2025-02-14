'use client';

import { generalLink } from '@/types';
import styles from './PokemonList.module.css';
import { PokemonCard } from '../PokemonCard/PokemonCard';
import Pagination from './Pagination/Pagination';
import { useState } from 'react';

export const PokemonList = ({ pokemonList }: { pokemonList: generalLink[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const changePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <article>
      <Pagination pokemonListLength={pokemonList.length} changePage={changePage} />
      <div className={styles.pokemonList}>
        {pokemonList.slice(currentPage * 50 - 50, currentPage * 50).map((pokemon) => (
          <PokemonCard pokemon={pokemon} key={pokemon.name} />
        ))}
      </div>
    </article>
  );
};
