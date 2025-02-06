import { UNOWN_IMAGE } from "@/lib/const";
import Image from "next/image";
import PokemonDescription from "../PokemonDescription/PokemonDescription";
import styles from "./PrimaryInfo.module.scss"
import { Pokemon } from "@/interfaces";
import { capitalizePokemonName, getPokemonTypeClassName } from "@/lib/utils";
import { pokemonType } from "@/types";
import { FC } from "react";

const PrimaryInfo = (pokemon:Pokemon) => {
  return (
    <section className={styles.container}>
      <h1>{capitalizePokemonName(pokemon.name)}</h1>
      <PrimaryImage
        name={pokemon.name}
        image={pokemon.sprites.other["official-artwork"].front_default || UNOWN_IMAGE}
        types={pokemon.types.map((type) => type.type.name as pokemonType)}
      />
      <div className={styles.types}>
        {
          pokemon.types.map((type) => (
            <span  key={type.type.name}
              className={`${styles.type} ${styles[type.type.name + "-pill"]}`}
            > 
              {type.type.name.toUpperCase()}
            </span>
          ))
        }
      </div>
      <PokemonDescription id={pokemon.id}/>
    </section>
  );
}

interface PrimaryImageProps {
  name:string;
  image:string;
  types:pokemonType[];
}

const PrimaryImage:FC<PrimaryImageProps> = ({
  name,
  image,
  types
}) => {
  return (
    <figure
      className={`
        ${styles.image}
        ${styles[getPokemonTypeClassName(types.map((type) => type as pokemonType))]}
      `}
    >
      <Image
        src={image}
        width={300}
        height={300}
        alt={name}
      />
    </figure>
  )
}

export default PrimaryInfo;