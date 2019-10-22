import React from "react";
import "./Content.css";
import LambdaEn from "../img/lambda-en.gif";
import LambdaPt from "../img/lambda-pt.gif";
import GrammarEn from "../img/grammar_en.gif";
import GrammarPt from "../img/grammar_pt.gif";
import ArrowEn from "../img/arrow_en.gif";
import ArrowPt from "../img/arrow_pt.gif";

function Content ({ close, numImg }) {
    let imgFont = LambdaEn;

    let lang = navigator.languages;
    if (lang.includes("pt")) imgFont = LambdaPt;

    if (numImg === 1) imgFont = (lang.includes("pt")) ? GrammarPt : GrammarEn;
    
    if (numImg === 2) imgFont = (lang.includes("pt")) ? ArrowPt : ArrowEn;

    return (
        <div className="modal2">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="content">
            <img src={imgFont} alt="" width="100%"/>
          </div>
        </div>
    );
}

export default Content;