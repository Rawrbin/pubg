import React from "react";
import firebase from "../Firebase.js";
import theme from "./Nav.module.scss";
import Erangel from "../Erangel/Erangel.js";
import Miramar from "../Miramar/Miramar.js";
import { useState, useEffect } from "react";

function Navbar() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMap, setActiveMap] = useState(null);

  useEffect(() => {
    isLoading &&
      firebase
        .firestore()
        .collection("maps")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            setData((prevState) => [...prevState, data]);
          });
        });

    setIsLoading(false);
  }, [isLoading]);

  return (
    <div className={theme.container}>
      <div className={theme.activeMaps}>
        <nav className={theme.navigation}>
          <ul>
            {!isLoading &&
              data
                .filter((x, i) => x.active === true)
                .map((map) => {
                  return (
                    <li
                      key={map.id}
                      className={activeMap === map.name ? theme.selectedMap : theme.mapNames}
                      onClick={() => setActiveMap(map.name)}
                    >
                      {map.name}
                    </li>
                  );
                })}
          </ul>
        </nav>
      </div>

      {activeMap === null && <div className={theme.centerContent}>Select a map from the menu above</div>}
      {activeMap === "Erangel" && <Erangel />}

      {activeMap === "Miramar" && <Miramar />}

      {activeMap === "Sanhok" && <div className={theme.centerContent}>Coming soon</div>}

      {activeMap === "Taego" && <div className={theme.centerContent}>Coming soon</div>}

      {activeMap === "Vikendi" && <div className={theme.centerContent}>Coming soon</div>}
    </div>
  );
}

// Exporting the component
export default Navbar;
