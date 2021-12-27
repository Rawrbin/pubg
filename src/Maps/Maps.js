import React from "react";
import firebase from "../Firebase.js";
import theme from "./Maps.module.scss";
import { useState, useEffect } from "react";
import taego from "../images/taego.jpg";
import sanhok from "../images/sanhok.jpg";
import erangel from "../images/erangel.jpg";
import vikendi from "../images/vikendi.jpg";
import miramar from "../images/miramar.jpg";

function Maps(props) {
  const [mapGrid, setMapGrid] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [randomNumber, setRandomNumber] = useState(null);
  const handleClick = () => {
    const min = 1;
    setRandomNumber(min + Math.floor(Math.random() * mapGrid.length));
  };

  useEffect(() => {
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
  }, [isLoading, props]);

  return (
    <div className={theme.container}>
      <div
        className={props.grid === "mediumGrid" ? theme.mediumGridContainer : theme.gridContainer}
        style={{
          backgroundImage: `url(${
            props.name === "Taego"
              ? taego
              : props.name === "Sanhok"
              ? sanhok
              : props.name === "Erangel"
              ? erangel
              : props.name === "Miramar"
              ? miramar
              : vikendi
          })`,
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
      <button className={theme.button} onClick={() => handleClick()}>
        {props.test}
        Generate new location
      </button>
      {mapGrid
        .filter((x) => x.id === randomNumber)
        .map((x) => {
          return <div>{x.location}</div>;
        })}
    </div>
  );
}

// Exporting the component
export default Maps;
