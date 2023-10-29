import { useEffect, useState } from "react";

import "./fetchDataStyle.css"
import CardContainer from "./cardContainer";
import SelectAnswer from "./selectBox";

function GetInfo({url , limit}){

    const [obj , setObj] = useState({});
    
    const dataFetch = async(recource)=>{
        const fetchOperation = await fetch(recource+""+limit);
        const data = await fetchOperation.json();
        return data;
    }

    useEffect(() => {
        dataFetch(url).then(data => {
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
                let listNames = [];
                for (let i = 0; i < obj.length; i++) {
                    listNames.push(obj[i].name);
                    listItems.push(<CardContainer key={i} obj={obj[i]}/>); 
                }
                
                listItems.push(<SelectAnswer pokemonsNameList={listNames} size={limit}/>)
                const randomSelec = Math.floor(Math.random()*(limit-1));
                return [listItems , listItems[listItems.length-1]]; 
            })()
        }
    </div>
}

export default GetInfo;