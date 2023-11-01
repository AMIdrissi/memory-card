import { useEffect, useState } from "react";
import "./ImageContainerStyle.css";
import Stat from "./statVisualiser";

function ImageConatiner({ object, testCard , chosenName , started}) {
  const [usedFlag, setUsedFlag] = useState(false);
  const [isFlippedEach, setIsFlippedEach] = useState(false);

  return (
    <div
      className="pokeContainer"
      onClick={() => {
        //TODO : BETTER USE SWITCH HERE I THINK ;
        if (testCard) {
          // usedFlag ? console.log("") : console.log(object.name);
          setUsedFlag(true);
        } else if(started && !testCard) {
          object.flipped = false;
          console.log(object.flipped);
          object["name"]===chosenName ? console.log("correct") : console.log("NOT correct")
          setIsFlippedEach(!isFlippedEach); // ! SUPER IMPORTANT : this works like a trigger for the rerendering process
          usedFlag ? console.log("") : console.log(chosenName);
          setUsedFlag(true);
        }
        else if(!started && !testCard) {
          object.flipped = !object.flipped;
          setIsFlippedEach(!isFlippedEach);
        }
       
      }}
      style={{
        transform: object.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}
    >
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
          <div className="readyCard" style={{textAlign:"center"}}>
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
