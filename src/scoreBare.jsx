import "./scoreBareStyle.css"

function ScoreBare({limitCards , score}) {

    return (
        <div className="MainBar" >
            <div className="score">
                score: {score*3}
            </div>
            <div className="results">
                result:
            </div>
            <div className="gets">
            {score}/{limitCards}
            </div>
        </div>
    )
}

export default ScoreBare;