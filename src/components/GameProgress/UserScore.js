<<<<<<< Updated upstream:src/components/Badges/Badges.js
import "./Badges.css";
import growingPlant from '../../assets/common/blank.png';

export default function Badges() {
=======
import growingPlant from "../../assets/gamePrgress/game-progress-plant.png";
import "./UserScore.css";
import React from "react";
export default function UserScore(){
>>>>>>> Stashed changes:src/components/GameProgress/UserScore.js
    return (
        <>
            <div className="user-score-div-container">
                <div className="score-div">
                    <div className="score-text-div">
                        <h1>Score: 0</h1>
                    </div>
                    <div className="user-game-title-div">
                        <h1>"Nowicjusz roślinny"</h1>
                        <h5>Brakuje Ci 15 pkt do kolejnego poziomu</h5>
                    </div>
                </div>
                <div className="growing-plant-div">
                    <img src={growingPlant} alt={growingPlant}/>
                </div>
            </div>
        </>
    )
}
