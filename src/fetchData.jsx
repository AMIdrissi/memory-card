import { useEffect, useState } from "react";
import ImageConatiner from "./ImageContainer";
import "./fetchDataStyle.css"

function FetchAllData() {
    
    const [dataX , setDataX] = useState([]);
    const [pickN , setPickN] = useState(Math.floor(Math.random()*60));  
    const random = Math.floor(Math.random()*60);

    
    const fetchAction = async(resource) => {
        const promise = await fetch(resource);
        const data = await promise.json();
        return data;
    }

    useEffect(()=>{
        const data = fetchAction('https://pokeapi.co/api/v2/pokemon/?offset=' + random + '&limit=60');
        data.then(data => setDataX(data.results));
    },[])

    

    return <div className="cardsContainer">
        
        {
            (dataX[pickN] ? ((<ImageConatiner key={pickN} object={dataX[pickN]}/>)) : <p>waiting....</p>)
        }  
        
        <button type="button" onClick={() => {setPickN(Math.floor(Math.random()*60))}}>refresh</button>
    </div>


}

export default FetchAllData;