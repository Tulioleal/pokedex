import Image from 'next/image';
import { FC, useCallback, useEffect, useState } from 'react';
import ToLeftArrow from '../../../../public/to_left_arrow.svg';
import ToRightArrow from '../../../../public/to_right_arrow.svg';
import styles from './Pagination.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const POKEMON_LIMIT = 50;

interface PaginationProps {
  pokemonListLength: number;
  changePage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ pokemonListLength, changePage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pages = Math.ceil(pokemonListLength / POKEMON_LIMIT);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    if (page > pages || page < 1) {
      return;
    }

    setCurrentPage(page);
    changePage(page);
  }, [pages, searchParams]);

  const handlePageChange = useCallback(
    (nextPage: number) => {
      if (nextPage > pages || nextPage < 1) {
        return;
      }

      setCurrentPage(nextPage);
      changePage(nextPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', nextPage.toString());

      router.push(pathname + '?' + params.toString());
    },
    [searchParams, pages, pathname, router],
  );

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage - 1 < 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className={styles.button}
      >
        <Image src={ToLeftArrow} alt="To left arrow" width={15} height={15} />
      </button>
      {Array.from({ length: pages }, (_, i) => i + 1).map((page) => {
        if (page == 1 || page == pages || (page >= currentPage - 1 && page <= currentPage + 1)) {
          return (
            <button
              key={page}
              onClick={() => page != currentPage && handlePageChange(page)}
              className={`
                  ${styles.button}
                  ${page == currentPage && styles.currentPage}
                `}
            >
              {' '}
              {page}
            </button>
          );
        }

        if (page == currentPage - 2 || page == currentPage + 2) {
          return (
            <span
              key={page}
              className={`
                ${styles.button}
                ${styles.unClickable}
              `}
            >
              ···
            </span>
          );
        }
      })}
      <button
        disabled={currentPage + 1 > pages}
        onClick={() => handlePageChange(currentPage + 1)}
        className={styles.button}
      >
        <Image src={ToRightArrow} alt="To right arrow" width={15} height={15} />
      </button>
    </div>
  );
};

export default Pagination;
