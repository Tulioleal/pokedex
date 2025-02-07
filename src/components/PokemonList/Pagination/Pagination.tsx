"use client"

import { FC, useState } from "react";

const POKEMON_LIMIT = 50;

interface PaginationProps {
  pokemonListLength: number;
}

const Pagination:FC<PaginationProps> = ({pokemonListLength}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pages = Math.ceil(pokemonListLength / POKEMON_LIMIT);

  const handlePageChange = (nextPage:number) => {

    if (nextPage > pages || nextPage < 1) {
      return;
    }

    setCurrentPage(nextPage);
  }

  return (
    <>
      <button
        disabled={currentPage - 1 < 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >Prev</button>
      {currentPage} of {pages}
      <button
        disabled={currentPage + 1 > pages}
        onClick={() => handlePageChange(currentPage + 1)}
      >Next</button>
    </>
  );
}

export default Pagination;