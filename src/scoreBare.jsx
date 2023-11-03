import "./scoreBareStyle.css"

function ScoreBare({limitCards , score}) {

    return (
        <div className="MainBar" >
            <div className="score">
                score: {score}
            </div>
            <div className="results">
                result:
            </div>
            <div className="gets">
                /{limitCards}
            </div>
        </div>
    )
}

export default ScoreBare;