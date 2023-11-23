import "./UserGameProgress.css";
import UserScore from "./UserScore";
import UserBadges from "./UserBadges";
import React from "react";
export default function UserGameProgress() {
    return (
        <>
            <div className="user-game-progress-div-container">
                <UserScore/>
                <UserBadges/>
            </div>
        </>
    )
}