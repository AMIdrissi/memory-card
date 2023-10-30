import { useEffect, useState } from "react";
import "./ImageContainerStyle.css"
import Stat from "./statVisualiser";

function ImageConatiner({object }) {
    
    const [dataX , setDataX] = useState({});
    const [name , setName] = useState('');
    const [rotateFlag , setRotateFlag] = useState(false);
    const [stats , setStats] = useState([]);
    
    const fetchAction = async(resource) => {
        const promise = await fetch(resource);
        const data = await promise.json();
        return data;
    }

    useEffect(()=>{
        const data = fetchAction(object.url);
        data.then(data => { setDataX(data.sprites.other['official-artwork'].front_default);
                            setName(data.name); 
                            setStats(data.stats);
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
                    stats.map((st , index) => {
                        if (index!==3 && index!==4) {
                            return st.stat!==undefined ? <Stat key={index} statName={(st.stat.name)} stat={st.base_stat}/> : <p>charging...</p>
                        }
                    })
                }
                
            </div>
    </div>
}

export default ImageConatiner;
