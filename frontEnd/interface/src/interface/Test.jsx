import React from "react";


function Test ({visible, solutionComplete}) {
   
    let visibleSolution = visible;
    let solvedClt = solutionComplete;
    return(
        <div className="AccorModal overflow-auto" style={{display: `${visibleSolution}`}}>
            <div className="AccordModal-content">
                <span className="close-bttn"
                onClick={_ => visibleSolution = "none" }>X</span>
                {solvedClt}
            </div>
        </div>
    );
}

export default Test;