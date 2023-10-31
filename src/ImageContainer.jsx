import { useEffect, useState } from "react";
import "./ImageContainerStyle.css";
import Stat from "./statVisualiser";

function ImageConatiner({ object, testCard }) {
  const [usedFlag, setUsedFlag] = useState(false);
  const [isFlippedEach, setIsFlippedEach] = useState(false);

  if (testCard === "stuff") {
    object.flipped = false;
  }

  return (
    <div
      className="pokeContainer"
      onClick={() => {
        if (testCard) {
          usedFlag ? console.log("") : console.log(object.name);
          setUsedFlag(true);
        } else {
          object.flipped = !object.flipped;
          setIsFlippedEach(!isFlippedEach);
          usedFlag ? console.log("") : console.log(object.name);
          setUsedFlag(true);
        }
      }}
      style={{
        transform: object.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
      {console.log("before ", object.flipped)}
      <div
        style={{
          display: object.flipped ? "none" : "block",
        }}
      >
        <h4>{object.name} </h4>
        <img className="pokemon" src={object.img} alt="" />
      </div>
      <div
        className="backSide"
        style={{
          display: object.flipped ? "block" : "none",
          transform: "rotateY(180deg)",
        }}
      >
        {testCard ? (
          <div style={{textAlign:"center"}}>
            <h2 style={{margin:"20px 0px"}}>Ready?</h2>
            <img style={{width:"160px",padding:"20px"}} src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png" alt="" />
          </div>
        ) : (
          object.stats.map((st, index) => {
            if (index !== 3 && index !== 4) {
              return <Stat key={index} statName={st.statName} stat={st.stat} />;
            }
          })
        )}
      </div>
    </div>
  );
}

export default ImageConatiner;
