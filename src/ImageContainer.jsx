import { useEffect, useState } from "react";
import "./ImageContainerStyle.css"
import Stat from "./statVisualiser";

function ImageConatiner({object }) {
    
    const [dataX , setDataX] = useState({});
    const [name , setName] = useState('');
    const [rotateFlag , setRotateFlag] = useState(false);
    const [HP , setHP] = useState({});
    const [attack , setAttack] = useState({});
    const [defense , setDefense] = useState({});
    const fetchAction = async(resource) => {
        const promise = await fetch(resource);
        const data = await promise.json();
        return data;
    }

    useEffect(()=>{
        const data = fetchAction(object.url);
        data.then(data => { setDataX(data.sprites.other['official-artwork'].front_default);
                            setName(data.name); 
                            setHP(data.stats["0"]);
                            setAttack(data.stats["1"]);
                            setDefense(data.stats["2"]); 
                            });
    },[]);

    

    return <div className="pokeContainer" onClick={() => {setRotateFlag(!rotateFlag)}} 
            style={{transform:rotateFlag ? "rotateY(180deg)" : "rotateY(0deg)" }}>
            <div style={{display:rotateFlag? "none" : "block"}}>
                <p>{ name }</p>
                <img className="pokemon" src={dataX} alt="" />
            </div>
            <div className="backSide" style={{display:rotateFlag? "block" : "none",transform:"rotateY(180deg)"}}>
                {
                    HP.stat!==undefined ? <Stat statName={(HP.stat.name)} stat={HP.base_stat}/> : <p>charging...</p>
                }
                {
                    attack.stat!==undefined ? <Stat statName={(attack.stat.name)} stat={attack.base_stat}/> : <p>charging...</p>
                }
                {
                    defense.stat!==undefined ? <Stat statName={(defense.stat.name)} stat={defense.base_stat}/> : <p>charging...</p>
                }
            </div>
    </div>
}

export default ImageConatiner;
