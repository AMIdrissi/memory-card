import { useEffect, useState } from "react";

function GetInfo(){

    const [obj , setObj] = useState({});
    const [imgSrc , setImgSrc] = useState('');
    const dataFetch = async(recource)=>{
        const fetchOperation = await fetch(recource);
        const data = await fetchOperation.json();
        return data;
    }

    useEffect(() => {
        setImgSrc('');
        dataFetch('https://pokeapi.co/api/v2/pokemon-form/').then(data => {
            setObj(data.results);
            (data.results).forEach(result => {
                dataFetch(result.url).then(datax=> {console.log(datax.sprites.front_default);setImgSrc((d)=>d+","+datax.sprites.front_default);});
            })
            
        })
    },[])

    return <div>
        <h1>{obj}</h1>
    </div>
}

export default GetInfo;