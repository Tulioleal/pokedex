'use client';

import Image from 'next/image';
import styles from './SizeComparison.module.scss';
import { FC, useState } from 'react';
import { UNOWN_IMAGE } from '@/lib/const';
import TrainerRed from '../../../public/trainer_red.png';
import { Pokemon } from '@/interfaces';
import useViewSize from '@/hooks/useViewSize';

const RED_HEIGHT = 16;
const MAX_HEIGHT = 38;

const SizeComparison: FC<Pokemon> = (pokemon) => {
  const [imageWidth, setImageWidth] = useState({
    width: 0,
    height: 0,
    aspectRatio: 0,
  });
  const { width } = useViewSize();

  const getImageHeight = (pokemonHeight: number, isRed?: boolean): string => {
    let maxHeight = MAX_HEIGHT;

    if (width < 768) {
      maxHeight = MAX_HEIGHT * 0.75;
    }

    if (width < 480) {
      maxHeight = MAX_HEIGHT * 0.5;
    }

    if (isRed) {
      return `${pokemonHeight > maxHeight ? (maxHeight / pokemonHeight) * (RED_HEIGHT * 10) : RED_HEIGHT * 10}px`;
    }

    return `${pokemonHeight > maxHeight ? maxHeight * 10 : pokemonHeight * 10}px`;
  };

  const getImageMaxHigh = (pokemonHeight: number, aspectRatio: number, isRed?: boolean): string => {
    let maxHeight = MAX_HEIGHT;

    if (width < 768) {
      maxHeight = MAX_HEIGHT * 0.75;
    } else if (width < 480) {
      maxHeight = MAX_HEIGHT * 0.5;
    }

    if (isRed) {
      return `${(pokemonHeight > maxHeight ? (maxHeight / pokemonHeight) * (RED_HEIGHT * 10) : RED_HEIGHT * 10) / aspectRatio}px`;
    }

    return `${(pokemonHeight > maxHeight ? maxHeight * 10 : pokemonHeight * 10) / aspectRatio}px`;
  };

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { naturalWidth, naturalHeight } = event.currentTarget;
    setImageWidth({
      width: naturalWidth,
      height: naturalHeight,
      aspectRatio: naturalWidth / naturalHeight,
    });
  };

  return (
    <section className={styles.sizeComparisonContainer}>
      <h2>Size comparison</h2>
      <div
        className={`
        ${styles.sizeComparison}
        ${styles[pokemon.types[0].type.name]}
      `}
      >
        <Image
          src={
            pokemon.sprites.other?.showdown.front_default ||
            pokemon.sprites.other?.dream_world.front_default ||
            pokemon.sprites.other?.home.front_default ||
            pokemon.sprites.front_default ||
            UNOWN_IMAGE
          }
          width={0}
          height={0}
          alt={pokemon.name}
          style={{
            width: 'auto',
            maxWidth: '380px',
            filter: 'brightness(0.85)',
            height: getImageHeight(pokemon.height),
            maxHeight: getImageMaxHigh(pokemon.height, imageWidth.aspectRatio),
            objectFit: 'contain',
            objectPosition: 'center',
          }}
          onLoad={handleImageLoad}
        />
        <Image
          src={TrainerRed}
          width={0}
          height={0} // make it dynamic when pokemon is bigger than 380
          alt="Trainer Red"
          style={{
            width: 'auto',
            height: getImageHeight(pokemon.height, true),
            maxHeight: getImageMaxHigh(pokemon.height, imageWidth.aspectRatio, true),
          }}
        />
      </div>
    </section>
  );
};

export default SizeComparison;
