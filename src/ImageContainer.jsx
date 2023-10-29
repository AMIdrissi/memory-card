import { useEffect, useState } from "react";
import "./ImageContainerStyle.css"

function ImageConatiner({object}) {
    
    const [dataX , setDataX] = useState({});
    const [name , setName] = useState('');
    const [rotateFlag , setRotateFlag] = useState(false);
    const fetchAction = async(resource) => {
        const promise = await fetch(resource);
        const data = await promise.json();
        return data;
    }

    useEffect(()=>{
        const data = fetchAction(object.url);
        data.then(data => { setDataX(data.sprites.other['official-artwork'].front_default);
                            setName(data.name); });
    },[]);

    

    return <div className="pokeContainer" onClick={() => {setRotateFlag(!rotateFlag)}} 
            style={{transform:rotateFlag ? "rotateY(180deg)" : "rotateY(0deg)" }}>
            <p style={{opacity:rotateFlag ? "0" : "1" }}>{ name }</p>
            <img className="pokemon" src={dataX} alt="" style={{opacity:rotateFlag ? "0" : "1" }} />
    </div>
}

export default ImageConatiner;
