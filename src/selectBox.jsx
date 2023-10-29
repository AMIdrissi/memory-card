import { useEffect, useState } from "react";

function SelectAnswer({pokemonsNameList , size}) {

    const [lists , setLists] = useState([]);

    
    
    useEffect(() => {
        console.log(pokemonsNameList)
        let listTemp = [];
        for (let i = 0; i < 3; i++) {
            listTemp.push(pokemonsNameList[Math.floor(Math.random()*(size-1))]);
        }
        setLists(listTemp);
    },[pokemonsNameList.length])

    
    return (
        <div>
            
            {
                lists.map((element) => {
                    return <button type="button">{element}</button>
                })
            }
        </div>
    )

}

export default SelectAnswer;