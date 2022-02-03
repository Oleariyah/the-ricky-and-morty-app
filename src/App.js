import { useEffect } from "react";
import { getAllCharacters, getCharacters } from "./store/characters";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const characters = useSelector(getCharacters);

  useEffect(() => {
    dispatch(getAllCharacters());
  }, [dispatch]);

  useEffect(() => {
    console.log("gg", characters);
  }, [characters]);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
