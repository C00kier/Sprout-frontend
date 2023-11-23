import badge1 from "../../assets/gamePrgress/badge1.png";
import React from "react";
import "./Badge.css"
export default function Badge(){
    return(
        <>
         <div className="single-badge-div-container">
                <img src={badge1} alt={badge1}/>
         </div>
        </>
    )
}