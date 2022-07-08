import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { MdaeHeader } from './widgets/MdaeHeader';
import ContactsPage from './pages/ContactsPage';
import CountriesPage from './pages/CountriesPage';
import StatesPage from './pages/StatesPage';
import { Provider } from 'react-redux';
import store from "./store";
import "./sagas";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <MdaeHeader />
        <Switch>
          <Route path="/home"><ContactsPage /></Route>
          <Route path="/countries"><CountriesPage /></Route>
          <Route path="/states"><StatesPage /></Route>
          <Route path="/"><ContactsPage /></Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
