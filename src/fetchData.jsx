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
        })
    },[])

    // for (let i = 0; i < obj.length; i++) {
    //     console.log(obj[i].name)
    // }

    return <div>
        
        {
            (() => {
                let listItems = [];
                for (let i = 0; i < obj.length; i++) {
                  listItems.push(<div><p>{obj[i].name}</p><p>{obj[i].url}</p></div>);
                }
                return listItems;
            })()
        }
    </div>
}

export default GetInfo;