import { Route, useLocation, Switch } from "react-router-dom";

import { HomeScene, PokedexScene } from "../scenes";

export default function MainNavigator() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path="/" component={HomeScene} />
      <Route exact path="/pokedex" component={PokedexScene} />
    </Switch>
  );
}
