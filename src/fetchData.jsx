import { useEffect, useState } from "react";
import ImageConatiner from "./ImageContainer";
import "./fetchDataStyle.css";
import Loader from "./loader";

function FetchAllData() {
  const [startFlag, setStartFlag] = useState(false);
  const [answerObj, setAnswerObj] = useState([]);
  const [questionCard , setQuestionCard] = useState({});
  const [chosenName , setChosenName] = useState('');
  const [nextF , setNextF] = useState(false);
  let limit = 12; 
  const random = Math.floor(Math.random() * limit);

  const fetchAction = async (resource) => {
    const promise = await fetch(resource);
    const data = await promise.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAction(
        "https://pokeapi.co/api/v2/pokemon/?offset=" + random + "&limit=" + limit +""
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
	  // const chosen = Object.assign({}, getPokees[random]);
	  // setQuestionCard(chosen);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (questionCard) {
      setChosenName(questionCard["name"])
    }
  },[questionCard])

  return (
    answerObj.length===0 ? <Loader/> : <div>
	  {
      <div>
        {!startFlag ? questionCard.flipped=true : questionCard.flipped=false}
        <div style={{display:"flex" , justifyContent:"center"}}>
          {/* {questionCard ? console.log(questionCard.name):console.log("NO")}; */}
          <ImageConatiner object={questionCard} testCard={true}/>
        </div>
    </div>
	  }
      <div style={{display:"flex", justifyContent:"center"}}>
        <button onClick={() => {setNextF(false);setQuestionCard(Object.assign({}, answerObj[Math.floor(Math.random() * limit)]));setStartFlag(!startFlag);setChosenName(questionCard["name"])}}>{startFlag?"exit": "start" }</button>
        <button onClick={() => {setNextF(true);setQuestionCard(Object.assign({}, answerObj[Math.floor(Math.random() * limit)]));}}>next</button>
        
      </div>
      <div className="cardsContainer">
        {answerObj.map((pokeObj, index) => {
          nextF ? console.log("") : ((startFlag) ? (pokeObj.flipped = true) : (pokeObj.flipped = false));
          return (
            <ImageConatiner key={index} object={pokeObj} testCard={false} chosenName={chosenName} started={startFlag}/>
          );
        })}
      </div>
    </div>
    
  );
}

export default FetchAllData;
