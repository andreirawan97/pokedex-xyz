import { Route, useLocation, Switch } from "react-router-dom";
import { SCENE_NAME } from "../constants/navigation";

import {
  HomeScene,
  NoMatchScene,
  PokedexScene,
  PokemonDetailScene,
  MyPokemonsScene,
} from "../scenes";

export default function MainNavigator() {
  const location = useLocation();

  return (
    <Switch location={location}>
      <Route exact path={SCENE_NAME.home} component={HomeScene} />
      <Route exact path={SCENE_NAME.pokedex} component={PokedexScene} />
      <Route exact path={SCENE_NAME.myPokemons} component={MyPokemonsScene} />
      <Route
        exact
        path={`${SCENE_NAME.pokemonDetail}:pokemonId`}
        component={PokemonDetailScene}
      />
      <Route path="*">
        <NoMatchScene />
      </Route>
    </Switch>
  );
}
