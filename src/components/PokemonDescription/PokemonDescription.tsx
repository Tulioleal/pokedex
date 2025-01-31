"use client"

import getPokemonDescription from "@/db/getPokemonDescription";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";
import { FlavorText } from "pokenode-ts";

const PokemonDescription = ({
  id
}: {
  id:number
}) => {
  const [data, setData] = useState<FlavorText|null>(null);

  useEffect(() => {
    getPokemonDescription(id)
      .then((res) => {
        setData(res)
      })
  }, []);

  if (!data) return <></>

  return (
    <p>
      <TypeAnimation
        style={{ whiteSpace: 'pre-line', height: '60px', display: 'inline-block' }}
        sequence={[data.flavor_text]}
        cursor={false}
        speed={75}
      />
    </p>
  );
}

export default PokemonDescription;