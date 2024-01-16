import "./Recommendation.css";
import { useState, useEffect, useContext, ReactElement, SetStateAction } from "react";

import RecommendedPlant from "./sub/RecommendedPlant";
import AddPlant from "../AddPlant/AddPlant";

//constants
import COMPONENT_STATES from "../../constants/myAccountComponentStates";

//context
import FunctionalityElementContext from "../../context/FunctionalityElementContext";

//interfaces
import IQuizAnswers from "../../models/interfaces/IQuizAnswers";

export default function Recommendation({ token, userId }:{token:string, userId:number}) {
    const {functionalityElement, setValue: setFunctionalityElement} = useContext(FunctionalityElementContext);
    const [userQuizAnswers, setUserQuizAnswers] = useState<IQuizAnswers>();
    const [recommendedPlants, setRecommendedPlants] = useState<{id:number,botanicalName:string}[]>();
    const [shouldDisplayRecommeneded, setShouldDisplayRecommended] = useState<boolean>(false);
    const [shouldDisplayAddPlant, setShouldDisplayAddPlant] = useState<boolean>(false);
    const [plantId, setPlantId] = useState<number>();
    const [image, setImage] = useState<string>();
    const [name, setName] = useState<string>();

    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        if (userQuizAnswers === undefined) getUserQuiz(userId);
        if (userQuizAnswers !== undefined) getRecommendedPlants();
    }, [userQuizAnswers]);

    useEffect(() => {
        if (recommendedPlants !== undefined) setShouldDisplayRecommended(true);
    }, [recommendedPlants]);

    async function getUserQuiz(userId:number) {
        try {
            const response = await fetch(`${BASE_URL}/quiz/get-quiz-result?userId=` + userId,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

            if (response.status === 200) {
                const data = await response.json();
                if (data !== undefined) setUserQuizAnswers(data);
            }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    async function getRecommendedPlants() {
        try {
            if (userQuizAnswers){
            const response = await fetch(`${BASE_URL}/plant/filter/plants-by-quiz?isToxic=${userQuizAnswers.toxicity}&sun=${userQuizAnswers.sun}&isAirPurifying=${userQuizAnswers['air_purifying']}&matureSize=${userQuizAnswers['mature_size']}&careDifficulty=${userQuizAnswers['care_difficulty']}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })

            if (response.status === 200) {
                const data = await response.json();
                if (data !== undefined) setRecommendedPlants(data);
            }
        }
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    function open(e: React.MouseEvent<HTMLDivElement, MouseEvent>, backgroundImage:string|undefined, botanicalName:string) {
        setShouldDisplayAddPlant(!shouldDisplayAddPlant);
        setPlantId(parseInt(e.currentTarget.id, 10));
        setImage(backgroundImage);
        setName(botanicalName);
    }

    function close() {
        setShouldDisplayAddPlant(!shouldDisplayAddPlant);
    }

    return (
        <>
            {(shouldDisplayAddPlant ? <AddPlant close={close} userId={userId} plantId={plantId}
                token={token} name={name}></AddPlant> : <></>)}{
                userQuizAnswers !== undefined ?
                    <div id="recommended-plants-container">
                        <span id="recommended-plants-title">Teraz możesz zobaczyć rekomendowane rośliny do Twojego wnętrza</span>
                        <div id="communicate-container">
                            <span id="plant-communicate">Rekomendowane rośliny</span>
                            <span id="sun-communicate" className="criteria-communicate">Nasłonecznienie</span>
                            <span id="mature-size-communicate" className="criteria-communicate">Wielkość<br></br> dorosłej rośliny</span>
                            <span id="difficulty-communicate" className="criteria-communicate">Trudność</span>
                            <span id="airpurifying-communicate" className="criteria-communicate">Oczyszczanie <br></br>powietrza</span>
                            <span id="toxic-communicate" className="criteria-communicate">Bezpieczny<br></br> dla zwierząt <br></br>i dzieci</span>
                            <span id="add-to-my-plants-communicate" className="criteria-communicate">Dodaj do<br></br> moich roślin</span>
                        </div>
                        <div id="plants-container">
                            {shouldDisplayRecommeneded ? recommendedPlants && recommendedPlants.map((plant, index) => <RecommendedPlant key={"recommendedPlant" + index} plant={plant} quiz={userQuizAnswers}
                                open={open}></RecommendedPlant>) : <></>}
                        </div>
                    </div>
                    : <>
                        <div className="cockpit-no-plants-container flex-column-center-center">
                            <div className="cockpit-text flex-column-center-center">
                                <p>
                                    <span className="green-underscore-text"> Wypełnij quiz</span>,
                                    dzięki czemu dowiesz się z jakimi roślinami będzie Ci najlepiej.
                                </p>
                            </div>
                            <button className="start-quiz-button" type="button" onClick={() => setFunctionalityElement(COMPONENT_STATES.QUIZ)}>Wypełnij quiz!</button>
                        </div>
                    </>}</>
    )
}   