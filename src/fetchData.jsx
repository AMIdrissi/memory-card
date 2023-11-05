import { useEffect, useState } from "react";
import ImageConatiner from "./ImageContainer";
import "./fetchDataStyle.css";
import Loader from "./loader";
import ScoreBare from "./scoreBare";

function FetchAllData() {
  const [startFlag, setStartFlag] = useState(false);
  const [answerObj, setAnswerObj] = useState([]);
  const [pickList, setPickList] = useState([]);
  const [questionCard, setQuestionCard] = useState({});
  const [chosenName, setChosenName] = useState("");
  const [isCorrect, setIscorrect] = useState(false);
  const [nextF, setNextF] = useState(true);
  const [score, setScore] = useState(0);
  let limit = 18;
  const random = Math.floor(Math.random() * limit);

  const fetchAction = async (resource) => {
    const promise = await fetch(resource);
    const data = await promise.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAction(
        "https://pokeapi.co/api/v2/pokemon/?offset=" +
          random +
          "&limit=" +
          limit +
          ""
      );
      // TODO: ALWAYS LEAVE SETTING TILL THE END
      const All = data.results.map(async (result) => {
        // setDataX(data.sprites.other["official-artwork"].front_default);
        // setName(data.name);
        // setStats(data.stats);
        return fetchAction(result.url);
      });
      const pokees = await Promise.all(All);
      const getPokees = pokees.map((poke) => {
        return {
          name: poke.name,
          img: poke.sprites.other["official-artwork"].front_default,
          flipped: false,
          stats: poke.stats.map((st, index) => {
            if (index !== 3 && index !== 4) {
              return { statName: st.stat.name, stat: st.base_stat };
            }
          }),
        };
      });
      setAnswerObj(getPokees);
      setPickList(structuredClone(getPokees));
      // const chosen = Object.assign({}, getPokees[random]);
      // setQuestionCard(chosen);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questionCard) {
      setChosenName(questionCard["name"]);
    }
  }, [questionCard]);

  useEffect(() => {
    let rand = Math.floor(Math.random() * (pickList.length - 1));
    
    setTimeout(() => {
      if (pickList.length!==0) {
        setQuestionCard(Object.assign({}, pickList[rand]));
        console.log(pickList);
      }
    }, 1000);
    setIscorrect(false);
  }, [isCorrect]);

  useEffect(() => {
    setNextF(!nextF);
  }, [startFlag]);

  return (
    <div>
      {answerObj.length === 0 ? (
        <Loader />
      ) : (
        <div key={"container"}>
          <div>
            <ScoreBare limitCards={limit} score={score} />
          </div>
          {
            <div>
              {!startFlag
                ? (questionCard.flipped = true)
                : (questionCard.flipped = false)}
              <div style={{ display: "flex", justifyContent: "center" }}>
                {/* {questionCard ? console.log(questionCard.name):console.log("NO")}; */}
                <ImageConatiner object={questionCard} testCard={true} />
              </div>
            </div>
          }
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => {
                setQuestionCard(
                  Object.assign(
                    {},
                    answerObj[Math.floor(Math.random() * limit)]
                  )
                );
                setStartFlag(!startFlag);
                setPickList(structuredClone(answerObj));
                setScore(0);
                setChosenName(questionCard["name"]);
              }}
            >
              {startFlag ? "exit" : "start"}
            </button>
          </div>
          {console.log(nextF)}
          <div className="cardsContainer">
            {answerObj.map((pokeObj, index) => {
              nextF
                ? console.log("")
                : startFlag
                ? (pokeObj.flipped = true)
                : (pokeObj.flipped = false);
              return (
                <ImageConatiner
                  key={index}
                  index={index}
                  object={pokeObj}
                  testCard={false}
                  chosenName={chosenName}
                  started={startFlag}
                  setTester={setIscorrect}
                  setCountScore={setScore}
                  pickList={pickList}
                  setPickList={setPickList}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchAllData;
