"use client"

import Image from "next/image";
import styles from "./SizeComparison.module.scss";
import { FC, useState } from "react";
import { UNOWN_IMAGE } from "@/lib/const";
import TrainerRed from "../../../public/trainer_red.png";
import { Pokemon } from "@/interfaces";

const SizeComparison:FC<Pokemon> = (pokemon) => {
  const [imageWidth, setImageWidth] = useState({
    width: 0,
    height: 0,
    aspectRatio: 0,
  });

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
    <div className={styles.sizeComparison}>
      <Image
        src={pokemon.sprites.other?.showdown.front_default || UNOWN_IMAGE}
        width={0}
        height={0}
        alt={pokemon.name}
        style={{
          width: 'auto',
          maxWidth: '380px',
          height: `${pokemon.height > 38 ? 380 : pokemon.height * 10}px`,
          filter: 'brightness(0.85)',
          maxHeight: `${(pokemon.height > 38 ? 380 : pokemon.height * 10) / imageWidth.aspectRatio}px`,
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
          height: `${pokemon.height > 38 ? (38 / pokemon.height) * 160 : 160}px`,
          maxHeight: `${(pokemon.height > 38 ? (38 / pokemon.height) * 160 : 160) / imageWidth.aspectRatio}px`,
        }}
      />
    </div>
  </section>
  );
}

export default SizeComparison;