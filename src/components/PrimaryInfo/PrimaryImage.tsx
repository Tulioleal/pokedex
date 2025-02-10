import { getPokemonTypeClassName } from "@/lib/utils"
import Image from "next/image"
import styles from "./PrimaryInfo.module.scss"
import { FC} from "react";
import { pokemonType } from "@/types";
import CryButton from "./CryButton";

interface PrimaryImageProps {
  name:string;
  image:string;
  types:pokemonType[];
  cryUrl:string;
}

const PrimaryImage:FC<PrimaryImageProps> = ({
  name,
  image,
  types,
  cryUrl
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
      <CryButton cryUrl={cryUrl}/>
    </figure>
  )
}

export default PrimaryImage;