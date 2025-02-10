"use client"

import Image from "next/image";
import Play from "../../../public/play.svg"
import Pause from "../../../public/pause.svg"
import styles from "./PrimaryInfo.module.scss"
import { useState } from "react";

const CryButton = ({
  cryUrl
}:{
  cryUrl:string
}) => {
  const [playingState, setPlayingState] = useState<"PLAYING" | "PAUSE">("PAUSE");

  const playCry = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    setPlayingState("PLAYING")
    audio.play()
  }

  const pauseCry = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    setPlayingState("PAUSE")
    audio.pause()
  }

  const BUTTONS = {
    "PLAYING": {
      onClick: pauseCry,
      "ICON": Pause
    },
    "PAUSE": {
      onClick: playCry,
      "ICON": Play
    }
  }
  
  return (
    <div className={styles["cry-button"]}>
      <button
        onClick={BUTTONS[playingState].onClick}
      >
        <Image
          src={ BUTTONS[playingState].ICON }
          width={100}
          height={100}
          alt={playingState === "PLAYING" ? "Pause" : "Play"}
        />
      </button>
      <audio id="audio"
        src={cryUrl as string}
        onEnded={() => setPlayingState("PAUSE")}
      />
    </div>
  )
}

export default CryButton;