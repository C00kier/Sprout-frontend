import "./UserBadges.css";
import BadgeCategory from "./BadgeCategory";
import React from "react";
export default function UserBadges(){
    return (
        <>
            <div className="user-badges-div-container">
                <div className="badges-text-div">
                    <h1>Odznaki:</h1>
                </div>
                <BadgeCategory/>
            </div>
        </>
    )
}