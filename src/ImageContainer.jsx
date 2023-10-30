import { useEffect, useState } from "react";
import "./ImageContainerStyle.css";
import Stat from "./statVisualiser";

function ImageConatiner({ object, isFlipped, setFlipall }) {
  const [usedFlag, setUsedFlag] = useState(false);
//   const [isFlipped , setIsFlipped] = useState(isFlipped);
  const [isFlippedEach, setIsFlippedEach] = useState(true);

  return (
    <div
      className="pokeContainer"
      onClick={() => {
        // setRotateFlag(true);
        usedFlag ? console.log("") : console.log(object.name);
        
        setUsedFlag(true);
      }}
      style={{
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      <div
        style={{
          display: isFlipped ? "none" : "block",
        }}
      >
        <p>{object.name}</p>
        <img className="pokemon" src={object.img} alt="" />
      </div>
      <div
        className="backSide"
        style={{
          display: (
            isFlipped
              ? isFlipped
              : isFlippedEach && setIsFlippedEach(!isFlippedEach)
          )
            ? "block"
            : "none",
          transform: "rotateY(180deg)",
        }}
      >
        {(object.stats).map((st, index) => {
          if (index !== 3 && index !== 4) {
            console.log(st);
            return <Stat key={index} statName={st.statName} stat={st.stat} />
          }
        })}
      </div>
    </div>
  );
}

export default ImageConatiner;
