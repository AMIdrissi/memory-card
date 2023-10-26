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
        dataFetch('https://pokeapi.co/api/v2/pokemon-form/').then(data => {
            setObj(data.results[0]);
            dataFetch(data.results[0].url).then(datax=> {console.log(datax.sprites.front_default);setImgSrc(datax.sprites.front_default);});
        })
    },[])

    return <div>
        <h2>name : {obj.name}</h2>
        <img src={imgSrc} alt="" style={{height:"200px"}} />
    </div>
}

export default GetInfo;