import "./App.css";
import firebase from "./Firebase.js";
import Erangel from "./Erangel/Erangel.js";
import { useState, useEffect } from "react";
import theme from "./App.module.scss";

function App() {
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

      {activeMap === "Erangel" && (
        <div>
          <Erangel />
        </div>
      )}

      {activeMap === "Miramar" && <div className={theme.centerContent}>Coming soon</div>}

      {activeMap === "Sanhok" && <div className={theme.centerContent}>Coming soon</div>}

      {activeMap === "Taego" && <div className={theme.centerContent}>Coming soon</div>}

      {activeMap === "Vikendi" && <div className={theme.centerContent}>Coming soon</div>}
    </div>
  );
}

export default App;
