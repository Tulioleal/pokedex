import Image from 'next/image';
import Link from 'next/link';
import { getPokemonTypeClassName } from '@/lib/utils';
import { pokemonType } from '@/types';
import { PokemonImageProps } from '../interface';
import { FC } from 'react';
import styles from './Image.module.scss';
import { UNOWN_IMAGE } from '@/lib/const';

const PokemonImage: FC<PokemonImageProps> = ({ pokemonData, pokemonSize }) => (
  <Link href={`/${pokemonData.name}`}>
    <section className={styles.top}>
      <figure
        className={`
        ${styles.image}
        ${styles[`image-${getPokemonTypeClassName(pokemonData.types.map((type) => type.type.name as pokemonType))}`]}
      `}
      >
        <Image
          src={
            pokemonData?.sprites.other?.['official-artwork'].front_default ||
            pokemonData?.sprites.front_default ||
            pokemonData?.sprites.other?.dream_world.front_default ||
            UNOWN_IMAGE
          }
          width={pokemonSize}
          height={pokemonSize}
          alt={pokemonData.name}
        />
      </figure>
    </section>
  </Link>
);

export default PokemonImage;
