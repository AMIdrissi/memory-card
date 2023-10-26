import { useEffect, useState } from "react";

function GetImages({url,visible}) {

    const [imgSrc , setImgSrc] = useState('');
    const fetchStuff = async(url) => {
        const imgURL = await fetch(url);
        const imgData = await imgURL.json();
        setImgSrc(imgData.sprites.front_default);
    }
        
    useEffect(()=>{
        fetchStuff(url)
    },[])

    return (<img src={imgSrc} alt="" style={{height:"200px" , opacity:visible}}/>)
    
    
}

export default GetImages;