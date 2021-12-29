import React from "react";
import theme from "./Maps.module.scss";
import { useState, useEffect } from "react";
import bigGrid from "./bigGrid.json";
import mediumGrid from "./mediumGrid.json";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faSpinner } from "@fortawesome/free-solid-svg-icons";
//import { faGithub } from '@fortawesome/free-brands-svg-icons'
//import firebase from "../Firebase.js";

function Maps(props) {
  const [grid, setGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumber, setRandomNumber] = useState(0);
  const [, setLocations] = useState([]);

  let allGrids = grid;
  let activeGrids = grid.filter((x) => x.active === true);

  const handleClick = async () => {
    const min = 0;
    const randomNumber = min + Math.floor(Math.random() * activeGrids.length);
    setRandomNumber(randomNumber);
  };

  useEffect(() => {
    if (props.grid === "bigGrid" && isLoading) {
      setGrid(bigGrid);
    }
    if (props.grid === "mediumGrid" && isLoading) {
      setGrid(mediumGrid);
    }
    setIsLoading(false);
  }, [isLoading, props.grid]);

  const AddOrRemove = (array, value) => {
    setRandomNumber(null);
    let item = array[value.id - 1];
    item.active = item.active ? false : true;
    allGrids[array.id - 1] = item;
    setLocations((prevState) => [...prevState, allGrids]);
  };

  return (
    <div className={theme.container}>
      <div
        className={props.grid === "mediumGrid" ? theme.mediumGridContainer : theme.gridContainer}
        style={{
          backgroundImage: `url(${props.backgroundImage})`,
        }}
      >
        {grid
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((i) => {
            return (
              <div
                onClick={() => AddOrRemove(grid, i)}
                className={
                  randomNumber && activeGrids[randomNumber].location === i.location
                    ? theme.selectedGridItem
                    : allGrids.filter((x) => x.id === i.id && x.active === false).map((x) => x.active)[0] === false
                    ? theme.inactive
                    : theme.gridItem
                }
                key={i.id}
              >
                {i.location}
              </div>
            );
          })}
      </div>
      <button className={theme.button} onClick={() => handleClick()}>
        Generate new location
      </button>
      <div>
        {}
        {randomNumber && activeGrids[randomNumber].location ? activeGrids[randomNumber].location : "AI"}
      </div>
    </div>
  );
}

// Exporting the component
export default Maps;
