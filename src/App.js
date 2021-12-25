import './App.css';
import firebase from './Firebase.js'
import { useState, useEffect } from 'react';
import theme from './App.module.scss'

function App() {
  const ref = firebase.firestore().collection("maps");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMap, setActiveMap] = useState(null);

  useEffect(() => {
    ref.onSnapshot((x) => {
      const items = [];
      x.forEach((doc) => {
        items.push(doc.data());
      })
      setData(items);
      setIsLoading(false);
    })
  }, [data, ref])

  return (
    <div className={theme.container}>
      <h1>Firebase storage</h1>
      <div className={theme.activeMaps}>
        {!isLoading && data.filter(x => x.active === true).map((map) => {
          return (
              <li className={theme.mapNames} onClick={() => setActiveMap(map.id)} key={map.id}>{map.name}</li>
          )
        })}
        <div>{activeMap}</div>
        </div>
    </div>
  );
}

export default App;
