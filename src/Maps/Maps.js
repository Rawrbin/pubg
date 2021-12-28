import React from "react";
import theme from "./Maps.module.scss";
import { useState, useEffect } from "react";
import bigGrid from "./bigGrid.json";
import mediumGrid from "./mediumGrid.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
//import { faGithub } from '@fortawesome/free-brands-svg-icons'
//import firebase from "../Firebase.js";

function Maps(props) {
  const [mapGrid, setMapGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumber, setRandomNumber] = useState(null);
  const handleClick = () => {
    const min = 1;
    setRandomNumber(min + Math.floor(Math.random() * mapGrid.length));
  };

  useEffect(() => {
    if (props.grid === "bigGrid" && isLoading) {
      setMapGrid(bigGrid);
    }
    if (props.grid === "mediumGrid" && isLoading) {
      setMapGrid(mediumGrid);
    }
    setIsLoading(false);
  }, [isLoading, props]);

  /*useEffect(() => {
    isLoading &&
      firebase
        .firestore()
        .collection(props.grid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setMapGrid((prevState) => [...prevState, data]);
          });
        });

    setIsLoading(false);
  }, [isLoading, props]);*/

  return (
    <div className={theme.container}>
      {isLoading ? (
        <FontAwesomeIcon icon={faSpinner} title={"Loading map"} className={"fa-spin"} />
      ) : (
        <div
          className={props.grid === "mediumGrid" ? theme.mediumGridContainer : theme.gridContainer}
          style={{
            backgroundImage: `url(${props.backgroundImage})`,
          }}
        >
          {mapGrid
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((i) => {
              return (
                <div className={randomNumber === i.id ? theme.selectedGridItem : theme.gridItem} key={i.id}>
                  {i.location}
                </div>
              );
            })}
        </div>
      )}

      <button className={theme.button} onClick={() => handleClick()}>
        {props.test}
        Generate new location
      </button>
      {mapGrid
        .filter((x) => x.id === randomNumber)
        .map((x) => {
          return <div key={x.id}>{x.location}</div>;
        })}
    </div>
  );
}

// Exporting the component
export default Maps;
