import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { FC, useEffect, useState } from "react";
import { PokemonCarouseProps, pokemonSize } from "../interface";
import { getPokemonVarieties } from "@/db/getPokemonVarieties";
import { Pokemon } from "@/interfaces";
import PokemonImage from "./PokemonImage";
import styles from "./Image.module.scss";

interface PokemonWithSize extends Pokemon {
  pokemonSize?: pokemonSize;
}

const PokemonCarousel:FC<PokemonCarouseProps> = ({
  pokemonData,
  pokemonSpecies
}) => {
  const [varietiesData, setVarietiesData] = useState<PokemonWithSize[]>([]);

  useEffect(() => {
    const fetchVarieties = async () => {
      let varieties:PokemonWithSize[] = await getPokemonVarieties(pokemonSpecies.varieties);

      varieties = varieties.map((pokemon) => {
        return {
          ...pokemon,
          pokemonSize: pokemon.height > 15 ?
            200 : pokemonData.height >= 8 ?
            150 : 110
        }
      });

      console.log(varieties)

      setVarietiesData(varieties);
    }

    fetchVarieties();

  }, [pokemonSpecies.varieties, pokemonData.height]);

  return (
    <Carousel className={styles.carousel}
      showArrows={true}
      showStatus={false}
      showIndicators={false}
      showThumbs={false}
      infiniteLoop
      swipeable
    >
      {
        varietiesData.map((pokemon) => (
          <PokemonImage
            key={pokemon.id}
            pokemonData={pokemon}
            pokemonSize={pokemon.pokemonSize || 110}
          />
        ))
      }
    </Carousel>
  );
}

export default PokemonCarousel;