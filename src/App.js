import Nav from "./Navigation/Nav.js";
import theme from "./App.module.scss";

function App() {
  return (
    <div className={theme.container}>
      <Nav />
    </div>
  );
}

export default App;
