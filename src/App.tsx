import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { RenderView } from "./components";
import MainNavigator from "./navigation/MainNavigator";

function App() {
  return (
    <Router>
      <RenderView>
        <MainNavigator />
      </RenderView>
    </Router>
  );
}

export default App;
