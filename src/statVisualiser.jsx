import "./statVisualiserStyle.css"

function Stat({statName , stat}) {
    return (<div style={{display:"flex",margin:"15px 10px",flexDirection:"column"}}>
                    <p style={{margin:"0",fontSize:"18px"}}>{statName}:</p>
                    <div className="outerPB">
                        <div className="innerPB" style={{width:`${stat}%`}}></div>
                    </div>
                </div>)
}

export default Stat;