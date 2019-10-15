import React from "react";
import "./Content.css";
import Lambda from "../img/lambda.gif";

function Content ({ close }) {
    return (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="content">
            <img src={Lambda} alt="" width="100%"/>
          </div>
        </div>
    );
}

export default Content;