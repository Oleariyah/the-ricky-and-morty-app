import { Suspense } from "react";
import "./App.css";
import ConfigRouters from "./Routes";
import Spinner from "react-spinner-material";

function App() {
  return (
    <Suspense
      fallback={
        <div className="loading">
          <Spinner size={120} visible={true} />
        </div>
      }
    >
      <div className="App">
        <ConfigRouters />
      </div>
    </Suspense>
  );
}

export default App;
