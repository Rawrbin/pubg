import React from "react";
import firebase from "../Firebase.js";
import theme from "./Nav.module.scss";
import Maps from "../Maps/Maps.js";
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
      {activeMap === "Erangel" && <Maps name="Erangel" grid="grid" />}
      {activeMap === "Miramar" && <Maps name="Miramar" grid="grid" />}
      {activeMap === "Taego" && <Maps name="Taego" grid="grid" />}
      {activeMap === "Sanhok" && <Maps name="Sanhok" grid="mediumGrid" />}
      {activeMap === "Vikendi" && <Maps name="Vikendi" grid="mediumGrid" />}
    </div>
  );
}

// Exporting the component
export default Navbar;
