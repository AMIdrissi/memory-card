import { useState } from "react";
import GetImages from "./fetchImages";

function CardContainer({obj}) {
    const [turnedFlag , setTurnedFlag] = useState(true);
    return(
        <div style={{opacity:turnedFlag ? 1 : 0.85}} className="card" onClick={()=>{setTurnedFlag(!turnedFlag)}} >
            {/* <p style={{opacity:turnedFlag ? 1 : 0 , fontSize:""}}>{obj.name}</p> */}
            <GetImages url={obj.url} visible={turnedFlag ? 1 : 0}/>
            
        </div>
    )
}

export default CardContainer;