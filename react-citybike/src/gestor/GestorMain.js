
import { Route, Link, Switch, useRouteMatch } from 'react-router-dom';
import Estaciones from './Estaciones';
import Bicis from './Bicis';

function GestorMain() {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <h2>Panel de Gestor</h2>
      <Switch>
        <Route exact path={`${path}/bicis`} component={Bicis} />
        <Route exact path={`${path}/estaciones`} component={Estaciones} />
      </Switch>
    </div>
  );
};

export default GestorMain;
  