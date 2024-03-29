import "./Cockpit.css";
import { useEffect, useState } from "react";

//assets
import exclamationMark from "../../assets/cockpit/exclamation_mark.png";
import fertilizerIcon from "../../assets/cockpit/fertilizer.png";
import repottedIcon from "../../assets/cockpit/repotted.png";
import waterIcon from "../../assets/cockpit/waterdrop.png";
import blankImage from "../../assets/common/blank.png";
import CockpitPerformActionWindow from "./CockpitPerformActionWindow";

export default function CockpitActionElement(props) {
    const { userPlant, requiredActions } = props;
    const [isActionMenuVisible, setIsActionMenuVisible] = useState(false);
    const [exclamationMarkVisibility, setExclamationMarkVisibility] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState();
    const [currentAction, setCurrentAction] = useState();
    const [plantCare, setPlantCare] = useState({
        userPlantId: userPlant.userPlantId,
        watering: false,
        fertilizing: false,
        repotting: false
    });

    //set plant image
    useEffect(() => {
        try {
          const image = require(`../../assets/plants/${userPlant.plant.botanicalName.replace(
            /\s/g,
            "-"
          )}-image.jpg`);
          setBackgroundImage(image);
        } catch (error) {
          console.error(`Image not found for plant: ${userPlant.plant.botanicalName}`);
          setBackgroundImage(require("../../assets/common/blank.png"));
        }
      }, [userPlant.plant.botanicalName]);

    //set plant care
    useEffect(() => {
        for (const plantCarePlan of requiredActions) {
            if (plantCarePlan.userPlantId === userPlant.userPlantId) {
                setPlantCare(plantCarePlan);
            }
        }
    }, [])

    const actionMenuDescriptions = {
        WATERING: {
            DESCRIPTION: "Podlej swoją roślinę teraz lub wybierz datę ostatniego podlania z kalendarza.",
            ACTION_NOW: "Podlej teraz",
            PICK_DATE: "Wybierz datę",
            ACTION_TYPE: 0
        },
        FERTILIZING: {
            DESCRIPTION: "Nawieź swoją roślinę teraz lub wybierz datę ostatniego podlania z kalendarza.",
            ACTION_NOW: "Nawieź teraz",
            PICK_DATE: "Wybierz datę",
            ACTION_TYPE: 1
        },
        REPOTTING: {
            DESCRIPTION: "Przesadź swoją roślinę teraz lub wybierz datę ostatniego podlania z kalendarza.",
            ACTION_NOW: "Przesadź teraz",
            PICK_DATE: "Wybierz datę",
            ACTION_TYPE: 2
        }
    }

    /**
     * Enable advanced action menu for watering
     */
    function wateringOnClickEvent() {
        setIsActionMenuVisible(true);
        setCurrentAction(actionMenuDescriptions.WATERING);
    }

    /**
     * Enable advanced action menu for fertilizing
     */
    function fertilizingOnClickEvent() {
        setIsActionMenuVisible(true);
        setCurrentAction(actionMenuDescriptions.FERTILIZING);
    }

    /**
     * Enable advanced action menu for repotting
     */
    function repottingOnClickEvent() {
        setIsActionMenuVisible(true);
        setCurrentAction(actionMenuDescriptions.REPOTTING);
    }

    console.log(userPlant.alias);

    return (
        <>
            <div className="grid-action-container-element">
                {isActionMenuVisible &&
                    <CockpitPerformActionWindow
                        setIsActionMenuVisible={setIsActionMenuVisible}
                        currentAction={currentAction}
                        userPlant={userPlant}/>
                }
                <img className="cockpit-userplant-image" src={backgroundImage} alt="plant" />
                <span className="cockpit-userplant-alias">{(userPlant.alias === null || userPlant.alias === "") ? userPlant.plant.commonName : userPlant.alias}</span>
                <div className="grid-action-icons-container">
                    {
                        plantCare.watering &&
                        <div>
                            <img className="action-icon" src={waterIcon} alt="watering" onClick={() => wateringOnClickEvent()} />
                        </div>
                    }
                    {
                        plantCare.fertilizing &&
                        <div>
                            <img className="action-icon" src={fertilizerIcon} alt="fertilizer" onClick={() => fertilizingOnClickEvent()} />
                        </div>
                    }
                    {
                        plantCare.repotting &&
                        <div>
                            <img className="action-icon" src={repottedIcon} alt="repotted" onClick={() => repottingOnClickEvent()} />
                        </div>
                    }
                    {
                        exclamationMarkVisibility &&
                        <div>
                            <img className="action-icon" src={exclamationMark} alt="exclamation mark" />
                        </div>
                    }
                </div>
            </div>
        </>
    )
}