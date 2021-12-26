import React from "react";
import firebase from "../Firebase.js";
import theme from "./Erangel.module.scss";
import { useState, useEffect } from "react";

function Erangel() {
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
        .collection("grid")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setMapGrid((prevState) => [...prevState, data]);
          });
        });

    setIsLoading(false);
  }, [isLoading]);

  return (
    <div className={theme.container}>
      <div className={theme.gridContainer}>
        {mapGrid
          .sort((a, b) => (a.id > b.id ? 1 : -1))
          .map((i) => {
            return (
              <div
                className={
                  randomNumber === i.id
                    ? theme.selectedGridItem
                    : theme.gridItem
                }
                key={i}
              >
                {console.log(randomNumber === i.id)}
                {i.location}
              </div>
            );
          })}
      </div>
      <button onClick={() => handleClick()}>Generate new location</button>
      <div>
        {mapGrid
          .filter((x) => x.id === randomNumber)
          .map((x) => {
            return <div key={x.id}>{x.location}</div>;
          })}
      </div>
    </div>
  );
}

// Exporting the component
export default Erangel;
