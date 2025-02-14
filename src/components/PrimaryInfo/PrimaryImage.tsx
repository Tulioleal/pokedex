'use client';

import { getPokemonTypeClassName } from '@/lib/utils';
import Image from 'next/image';
import styles from './PrimaryInfo.module.scss';
import { FC } from 'react';
import { pokemonType } from '@/types';
import CryButton from './CryButton';
import useViewSize from '@/hooks/useViewSize';

interface PrimaryImageProps {
  name: string;
  image: string;
  types: pokemonType[];
  cry: string;
}

const PrimaryImage: FC<PrimaryImageProps> = ({ name, image, types, cry }) => {
  const { width } = useViewSize();

  return (
    <figure
      className={`
        ${styles.image}
        ${styles[getPokemonTypeClassName(types.map((type) => type as pokemonType))]}
      `}
    >
      <Image
        src={image}
        width={width < 400 ? 220 : 300}
        height={width < 400 ? 220 : 300}
        alt={name}
      />
      <CryButton cryUrl={cry} />
    </figure>
  );
};

export default PrimaryImage;
