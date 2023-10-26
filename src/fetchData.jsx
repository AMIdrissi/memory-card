import { useEffect, useState } from "react";

import "./fetchDataStyle.css"
import CardContainer from "./cardContainer";

function GetInfo(){

    const [obj , setObj] = useState({});
    
    const dataFetch = async(recource)=>{
        const fetchOperation = await fetch(recource);
        const data = await fetchOperation.json();
        return data;
    }

    useEffect(() => {
        dataFetch('https://pokeapi.co/api/v2/pokemon-form/').then(data => {
            setObj(data.results);
        })
    },[])

    // for (let i = 0; i < obj.length; i++) {
    //     console.log(obj[i].name)
    // }

    return <div className="card-container">
        
        {
            (() => {
                let listItems = [];
                for (let i = 0; i < obj.length; i++) {
                    listItems.push(<CardContainer key={i} obj={obj[i]}/>);
                }
                return listItems;
            })()
        }
    </div>
}

export default GetInfo;