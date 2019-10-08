import React, {useState, useRef} from "react";
import ChevronIcon from "./ChevronIcon";
import "./css/Accordion.css";

function Accordion (props) {

    const [setActive, setActiveState] = useState("");
    const [setHeight, setHeightState] = useState("0px");
    const [setRotate, setRotateState] = useState("accordion_icon");

    const content = useRef(null);

    function toggleAccordion () {
        setActiveState(setActive === "" ? "active" : "");
        setHeightState(
            setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
        );
        setRotateState(
            setActive === "active" ? "accordion_icon" : "accordion_icon rotate"
        );
    }

    return(
        <div className="accordion_section" onClick={props.onClick}>
            <button className={`${props.className}`} onClick={toggleAccordion}>
                <p className="accordion_title" >{props.title}
                    <ChevronIcon className={`${setRotate}`} width={20} fill={"#ff0021"}/>
                </p>
            </button>
            <div 
                ref={content}
                style={ {maxHeight: `${setHeight}`} }
                className="accordion_content">
                {/* <div className="accordion_text"
                    dangerouslySetInnerHTML={{ __html: props.content}}/> */}
                <div className={`accordion_text`}>
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Accordion;