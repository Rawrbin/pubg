import './App.css';
import firebase from './Firebase.js'
import { useState, useEffect } from 'react';
import theme from './App.module.scss'

function App() {
  const ref = firebase.firestore().collection("maps");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMap, setActiveMap] = useState(null);

  console.log(activeMap)
  function getData() {
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      })
      setData(items);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getData();
    getData();
  }, [])

  return (
    <div className={theme.container}>
      <h1>#Firebase storage</h1>
      <div className={theme.activeMaps}>
        {!isLoading && data.filter(x => x.active === true).map((map) => {
          return (
              <li className={theme.mapNames} onClick={() => setActiveMap(map.id)} key={map.id}>{map.name}</li>
          )
        })}
        </div>
    </div>
  );
}

export default App;
