import { useEffect, useState } from "react";
import ImageConatiner from "./ImageContainer";
import "./fetchDataStyle.css"

function FetchAllData() {
    
    const [dataX , setDataX] = useState({});
    const fetchAction = async(resource) => {
        const promise = await fetch(resource);
        const data = await promise.json();
        return data;
    }

    useEffect(()=>{
        const data = fetchAction('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=60');
        data.then(data => setDataX(data.results));
    },[])
    
    return <div className="cardsContainer">
        {
            Array.prototype.map.call(dataX, (element,index) => {
                return <ImageConatiner key={index} object={element}/>
            })
        }
    </div>


}

export default FetchAllData;