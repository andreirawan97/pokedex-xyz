import { Route, useLocation } from "react-router-dom";

import { SlideRoutes } from "../components";
import { HomeScene, PokedexScene } from "../scenes";

import "./MainNavigator.css";

export default function MainNavigator() {
  const location = useLocation();

  return (
    <SlideRoutes location={location} duration={400}>
      <Route exact path="/" component={HomeScene} />
      <Route exact path="/pokedex" component={PokedexScene} />
    </SlideRoutes>
  );
}
