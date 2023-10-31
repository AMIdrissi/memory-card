import { useEffect, useState } from "react";
import ImageConatiner from "./ImageContainer";
import "./fetchDataStyle.css";

function FetchAllData() {
  const [startFlag, setStartFlag] = useState(false);
  const [answerObj, setAnswerObj] = useState([]);
  const [testSubject , setTestSubject] = useState({});
  const random = Math.floor(Math.random() * 60);

  const fetchAction = async (resource) => {
    const promise = await fetch(resource);
    const data = await promise.json();
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAction(
        "https://pokeapi.co/api/v2/pokemon/?offset=" + random + "&limit=60"
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
	  const chosen = Object.assign({}, getPokees[3]);
	  setTestSubject(chosen);
    };

    fetchData();
  }, []);

  return (
    <div>
	  {
      <div>
        {!startFlag ? testSubject.flipped=true : testSubject.flipped=false}
        <div style={{display:"flex" , justifyContent:"center"}}>
        <ImageConatiner object={testSubject} testCard={true}/>
        </div>
    </div>
	  }
      <div style={{display:"flex", justifyContent:"center"}}>
        <button onClick={() => setStartFlag(!startFlag)}>{startFlag?"exit": "start" }</button>
      </div>
      <div className="cardsContainer">
        {answerObj.map((pokeObj, index) => {
          startFlag ? (pokeObj.flipped = true) : (pokeObj.flipped = false);
          return (
            <ImageConatiner key={index} object={pokeObj} testCard={false}/>
          );
        })}
      </div>
    </div>
  );
}

export default FetchAllData;
