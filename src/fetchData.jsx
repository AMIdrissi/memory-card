import { useEffect, useState } from "react";
import ImageConatiner from "./ImageContainer";
import "./fetchDataStyle.css"

function FetchAllData() {
    
    let map = new Map();
    const [dataX , setDataX] = useState([]);
    const [pickN , setPickN] = useState(Math.floor(Math.random()*60));
    const [correctFlag , setCorrectFlag] = useState('');
    const [name , setName] = useState('');
    const [answer , setAnswer] = useState('');
    const random = Math.floor(Math.random()*60);
    
    const fetchAction = async(resource) => {
        const promise = await fetch(resource);
        const data = await promise.json();
        return data;
    }

    useEffect(()=>{
        const data = fetchAction('https://pokeapi.co/api/v2/pokemon/?offset=' + random + '&limit=60');
        data.then(data => {setDataX(data.results);setAnswer(data.results);});
    },[])

    return <div className="cardsContainer">
        
        {
            (dataX[pickN] ? ((<ImageConatiner key={pickN} object={dataX[pickN]}/>)) : <p>waiting....</p>)
        }  
        
        <div className="bare">
            <input type="text" style={{backgroundColor:correctFlag!=="" ? (correctFlag==="true")?"#26bf33":"#aa1206" : "gray" , margin:"6px" , borderRadius:"10px"}} onChange={(e) => {setName(e.target.value)}}/>
            <button type="button" onClick={()=>{
                                                name.toLocaleLowerCase()===(dataX[pickN].name).toLocaleLowerCase() 
                                                ? setCorrectFlag("true"):setCorrectFlag("false")
                                                }
                                            } style={{padding:"5px 20px"}}>go</button>
        </div>
    </div>


}

export default FetchAllData;