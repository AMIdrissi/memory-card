import { useEffect, useState } from "react";
import "./ImageContainerStyle.css";
import Stat from "./statVisualiser";

function ImageConatiner({ object, isFlipped, setFlipall }) {
  const [usedFlag, setUsedFlag] = useState(false);
  const [isFlippedEach, setIsFlippedEach] = useState(false);
  
  return (
    <div
      className="pokeContainer"
      onClick={() => {
        object.flipped = !object.flipped;
        setIsFlippedEach(!isFlippedEach);
        usedFlag ? console.log("") : console.log(object.name);
        setUsedFlag(true);
      }}
      style={{
        transform: object.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {
        console.log("before " , object.flipped)
      }
      <div
        style={{
          display: object.flipped ? "none" : "block",
        }}
      >
        <p>{object.name}</p>
        <img className="pokemon" src={object.img} alt="" />
      </div>
      <div
        className="backSide"
        style={{
          display: (
            object.flipped
          )
            ? "block"
            : "none",
          transform: "rotateY(180deg)",
        }}
      >
        {(object.stats).map((st, index) => {
          if (index !== 3 && index !== 4) {
            return <Stat key={index} statName={st.statName} stat={st.stat} />
          }
        })}
      </div>
    </div>
  );
}

export default ImageConatiner;
