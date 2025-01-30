import { UNOWN_IMAGE } from "@/lib/const";
import Image from "next/image";
import PokemonDescription from "../PokemonDescription/PokemonDescription";
import styles from "./PrimaryInfo.module.scss"
import { Pokemon } from "@/interfaces";
import { capitalizePokemonName } from "@/lib/utils";

const PrimaryInfo = (pokemon:Pokemon) => {
  return (
    <section className={styles.container}>
      <h1>{capitalizePokemonName(pokemon.name)}</h1>
      <figure
        className={`
          ${styles.image}
          ${styles[pokemon.types.map((type) => type.type.name).join("-")]}`
        }
      >
        <Image
          src={
            pokemon.sprites.other?.["official-artwork"].front_default ||
            pokemon.sprites.front_default ||
            UNOWN_IMAGE // Default image (Unown)
          }
          width={320}
          height={320}
          alt={pokemon.name}
        />
      </figure>
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

export default PrimaryInfo;