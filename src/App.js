import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./helpers/routes";

function App() {
  return (
    <Router>
      <div className="App">{useRoutes()}</div>
    </Router>
  );
}

export default App;
