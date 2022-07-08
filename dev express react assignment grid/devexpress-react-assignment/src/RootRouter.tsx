import { Switch, Route } from 'react-router-dom';
import './App.scss';
import MdaeLoader from "./widgets/MdaeLoader";
import ContactsPage from './pages/contacts_page';
import CountriesPage from './pages/countries_page';
import StatesPage from './pages/states_page';
import App from './App';
import "./sagas";
import { Suspense } from 'react';

function RootRouter() {
  return (
    <App>
      <Suspense fallback={<MdaeLoader isLoading />}>
        <Switch>
          <Route path="/home"><ContactsPage /></Route>
          <Route path="/countries"><CountriesPage /></Route>
          <Route path="/states"><StatesPage /></Route>
          <Route path="/"><ContactsPage /></Route>
        </Switch>
      </Suspense>
    </App>
  );
}

export default RootRouter;
