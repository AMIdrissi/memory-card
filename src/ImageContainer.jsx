import { useEffect, useState } from "react";
import "./ImageContainerStyle.css";
import Stat from "./statVisualiser";

function ImageConatiner({
  index,
  object,
  testCard,
  chosenName,
  started,
  setTester,
  setCountScore,
  setPickList,
  pickList,
}) {
  const [usedFlag, setUsedFlag] = useState(false);
  const [isFlippedEach, setIsFlippedEach] = useState(false);
  const [correctAns, setCorrectAns] = useState(false);

  useEffect(() => {
    setCorrectAns(false);
  }, [started]);

  return (
    <div
      className="pokeContainer"
      onClick={() => {
        //TODO : BETTER USE SWITCH HERE I THINK ;
        if (testCard) {
          // usedFlag ? console.log("") : console.log(object.name);
          setUsedFlag(true);
        } else if (started && !testCard) {
          object.flipped = false;
          if (object["name"] === chosenName) {
            setTester(true);
            setCorrectAns(true);
            setCountScore((oldscore) => oldscore + 1);
          } else {
            setTester(false);
            setCorrectAns(false);
          }
          pickList.splice(index, 1);
          console.log(pickList);
          setIsFlippedEach(!isFlippedEach);
          usedFlag ? console.log("") : console.log("chosenName");
          setUsedFlag(true);
        } else if (!started && !testCard) {
          object.flipped = !object.flipped;
          setIsFlippedEach(!isFlippedEach);
        }
      }}
      style={{
        transform: object.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        boxShadow:
          correctAns && started
            ? "0px 0px 0px 18px rgba(49, 162, 47, 0.801)"
            : "0px 0px 0px 18px rgba(255,255,255)",
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
          <div className="readyCard" style={{ textAlign: "center" }}>
            <h2 style={{ margin: "20px 0px" }}>Ready?</h2>
            <img
              style={{ width: "160px", padding: "20px" }}
              src="https://seeklogo.com/images/P/pokeball-logo-DC23868CA1-seeklogo.com.png"
              alt=""
            />
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
