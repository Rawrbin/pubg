import React from "react";
import firebase from "../Firebase.js";
import theme from "./Nav.module.scss";
import Maps from "../Maps/Maps.js";
import { useState, useEffect } from "react";
import taego from "../images/taego.jpg";
import sanhok from "../images/sanhok.jpg";
import erangel from "../images/erangel.jpg";
import vikendi from "../images/vikendi.jpg";
import miramar from "../images/miramar.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMap, setActiveMap] = useState(null);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const toggleNav = () => {
    setToggleMenu(!toggleMenu);
  };

  useEffect(() => {
    const changeWidth = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", changeWidth);
    // Clean up function
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, [screenWidth]);

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
        <button className={theme.button}>
          <FontAwesomeIcon icon={faBars} onClick={() => toggleNav()} />
        </button>
        <nav className={theme.navigation}>
          {(toggleMenu || screenWidth > 640) && (
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
          )}
        </nav>
      </div>
      {activeMap === null && <div className={theme.centerContent}>Select a map from the menu above</div>}
      {activeMap === "Erangel" && <Maps name="Erangel" grid="bigGrid" backgroundImage={erangel} />}
      {activeMap === "Miramar" && <Maps name="Miramar" grid="bigGrid" backgroundImage={miramar} />}
      {activeMap === "Taego" && <Maps name="Taego" grid="bigGrid" backgroundImage={taego} />}
      {activeMap === "Sanhok" && <Maps name="Sanhok" grid="smallGrid" backgroundImage={sanhok} />}
      {activeMap === "Vikendi" && <Maps name="Vikendi" grid="mediumGrid" backgroundImage={vikendi} />}
    </div>
  );
}

// Exporting the component
export default Navbar;
