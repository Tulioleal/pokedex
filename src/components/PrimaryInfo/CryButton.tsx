"use client"

import Image from "next/image";
import Play from "../../../public/play.svg"
import PlayBlack from "../../../public/play_black.svg"
import Pause from "../../../public/pause_black.svg"
import PauseBlack from "../../../public/pause.svg"
import styles from "./PrimaryInfo.module.scss"
import { useState } from "react";

const CryButton = ({
  cryUrl
}:{
  cryUrl:string
}) => {
  const [playingState, setPlayingState] = useState<"PLAYING" | "PAUSE">("PAUSE");
  const [isHover, setIsHover] = useState(false);

  const playCry = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    setPlayingState("PLAYING")
    setIsHover(false)
    audio.play()
  }

  const pauseCry = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    setPlayingState("PAUSE")
    setIsHover(true)
    audio.pause()
  }

  const BUTTONS = {
    "PLAYING": {
      onClick: pauseCry,
      "ICON": Pause,
      "ICON-HOVER": PauseBlack
    },
    "PAUSE": {
      onClick: playCry,
      "ICON": Play,
      "ICON-HOVER": PlayBlack
    }
  }
  
  return (
    <div className={styles["cry-button"]}>
          <button
            onClick={BUTTONS[playingState].onClick}
            onMouseOver={() => setIsHover(true)}
            onMouseOut={() => setIsHover(false)}
          >
            <Image
              src={ BUTTONS[playingState][`ICON${ isHover ? "-HOVER" : "" }`] }
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