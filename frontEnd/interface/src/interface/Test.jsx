import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.css';

function Test ({visible, solutionComplete}) {
   
    let visibleSolution = visible;
    let solvedClt = solutionComplete;
    return(
        <div className="AccorModal overflow-auto" style={{display: `${visibleSolution}`}}>
            <div className="AccordModal-content">
                <span className="btn btn-secondary close-bttn"
                onClick={_ => visibleSolution = "none" }>X</span>
                {solvedClt}
            </div>
        </div>
    );
}

export default Test;