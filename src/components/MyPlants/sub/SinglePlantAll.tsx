import { useEffect } from "react";
import { useState } from "react";
import "./SinglePlantAll.css";
import PlantMenu from "./PlantMenu";
import EditPlant from "../../EditPlant/EditPlant";
import ISinglePlant from "../../../models/interfaces/ISinglePlant";

export default function SinglePlantResult({
  plant,
  rooms,
  token,
  getUserRooms,
  getUserPlants,
} : ISinglePlant) {
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const [isEditPlantShown, setIsEditPlantShown] = useState<boolean>(false);

  useEffect(() => {
    try {
      const image = require(`../../../assets/plants/${plant.plant.botanicalName.replace(
        /\s/g,
        "-"
      )}-image.jpg`);
      setBackgroundImage(image);
    } catch (error) {
      console.error(`Image not found for plant: ${plant.plant.botanicalName}`);
      setBackgroundImage(require("../../../assets/common/blank.png"));
    }
  }, [plant.plant.botanicalName]);

  function close() : void{
    setIsEditPlantShown(false);
  }

  return (
    <>
      {isEditPlantShown ? (
        <EditPlant
          close={close}
          plant={plant}
          rooms={rooms}
          token={token}
          getUserPlants={getUserPlants}
          getUserRooms={getUserRooms}
        ></EditPlant>
      ) : (
        <></>
      )}
      <div
        className="single-plant-all"
        onMouseEnter={() => setIsMenuActive(true)}
        onMouseLeave={() => setIsMenuActive(false)}
      >
        {isMenuActive ? (
          <PlantMenu plant={plant} clickEvent={() => setIsEditPlantShown}></PlantMenu>
        ) : (
          <div
            className="plant-image-all"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          ></div>
        )}
        <div className="plant-name-all">
          <p>{plant.plant.botanicalName}</p>
        </div>
        {plant.alias && (
          <div className="plant-alias-rooms">
            <span>{plant.alias}</span>
          </div>
        )}
        <div className="plant-room-all">
          <p>{plant.room}</p>
        </div>
      </div>
    </>
  );
}