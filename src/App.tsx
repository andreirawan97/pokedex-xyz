import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client/react";

import { RenderView } from "./components";
import MainNavigator from "./navigation/MainNavigator";
import { client } from "./graphql/client";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <RenderView>
          <MainNavigator />
        </RenderView>
      </Router>
    </ApolloProvider>
  );
}

export default App;
