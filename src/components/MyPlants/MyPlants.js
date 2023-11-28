import "./MyPlants.css";
import React, { useEffect, useState } from "react";
import SinglePlantRooms from "./sub/SinglePlantRooms";
import SinglePlantAll from "./sub/SinglePlantAll";

export default function MyPlants({ userPlants, rooms }) {
  const [plantsToShow, setPlantsToShow] = useState(userPlants);

  useEffect(() => {
    console.log(userPlants);
  }, [userPlants]);

  function onSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    setPlantsToShow(
      userPlants.filter((plant) =>
        plant.plant.botanicalName.toLowerCase().includes(searchTerm)
      )
    );
  }

  return (
    <>
      <div className="my-plants-container">
        <div className="search-bar-container">
          <h1>Moje rośliny</h1>
          <div className="search-container">
            <span className="search-communicate">Szukaj rośliny</span>
            <input
              type="text"
              className="search-bar"
              onChange={(e) => onSearch(e)}
            ></input>
          </div>
        </div>
        <div className="my-rooms-container">
          <h1>Moje pokoje</h1>
          <div className="headers-container">
            <p className="header-room-name">Pokój</p>
            <p className="header-plant-count">Liczba roślin</p>
          </div>
          {rooms &&
            rooms.map((room, index) => {
              const filteredPlants = plantsToShow.filter(
                (plantToShow) => plantToShow.room === room
              );
              return (
                <div className="room-container" key={index}>
                  <h2 className="room-header">{room}</h2>
                  <h2 className="plant-count">{filteredPlants.length}</h2>
                  <div className="plants-by-room-container">
                    {filteredPlants.map((filteredPlant, plantIndex) => (
                      <SinglePlantRooms
                        className="single-plant-room"
                        key={plantIndex}
                        plantName={filteredPlant.plant.botanicalName}
                      ></SinglePlantRooms>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="all-plants-container">
          <h1>Wszystkie rośliny</h1>
          <div className="headers-container">
            <p className="header-plant-name">Rośliny</p>
            <p className="header-plant-room">Pokój</p>
          </div>
          {plantsToShow.map((plant, index) => (
            <SinglePlantAll
              className="single-plant-all"
              key={index}
              plantName={plant.plant.botanicalName}
              plantRoom={plant.room}
            ></SinglePlantAll>
          ))}
        </div>
      </div>
    </>
  );
}
