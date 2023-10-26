import { useEffect, useState } from "react";

function GetInfo(){

    const [data , setData] = useState({});
    const fetchDataMap = async(recource)=> {
        const promise = await fetch(recource);
        const data = await promise.json().catch(err => {console.log("could not fetch ")});
        const objects = new Map();
        (data.results).map((object)=>{
            objects.set(object.name,object.url)
        })
        return objects;
    }
    const fetchData = async(recource)=> {
        const promise = await fetch(recource);
        const data = await promise.json().catch(err => {console.log("could not fetch ")});
        return data;
    }

    const fetchFormPics = async()=>{
        let links = [];
        const urls = (await fetchDataMap('https://pokeapi.co/api/v2/pokemon')).forEach((key,value)=> {
            if (key.length!==0) {
                (fetchData(key)
                .then(data => fetchData(data.forms[0].url)
                                .then(data1=>links.push(data1.sprites.front_default))));
            }
        });
        return links;
    }

    const [linkos , setLinkos] = useState([]);
    useEffect(()=> { 
        fetchFormPics().then(data => setLinkos(data)); 
    },[linkos.length]) 
    console.log(linkos);
    return ( <div>
        {
            linkos.length === 0 ? (
                <p>this is a fetch whatever{linkos.length} , Loading...</p>
            ) : (
                <div>
                    
                        {linkos.map((link , index) => {
                        <img key={index} src={link} alt="" />
                    })} 
                </div>
            )
        }
    </div> );
}

export default GetInfo;