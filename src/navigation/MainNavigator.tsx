import { BrowserRouter, Switch, Route } from "react-router-dom";

import { HomeScene } from "../scenes";

export default function MainNavigator() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HomeScene />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
