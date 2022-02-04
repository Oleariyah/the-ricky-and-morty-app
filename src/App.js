import { Suspense } from "react";
import "./App.css";
import ConfigRouters from "./Routes";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <ConfigRouters />
      </div>
    </Suspense>
  );
}

export default App;
