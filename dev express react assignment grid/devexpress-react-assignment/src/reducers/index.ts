import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as asyncops } from 'async-ops';
import { contactReducer } from "../pages/ContactsPage/reducers/contactReducer";
import { countryReducer } from "../pages/CountriesPage/reducers/countryReducer";
import { stateReducer } from "../pages/StatesPage/reducers/StateReducer";

const rootReducer = combineReducers({
  asyncops,
  contactReducer,
  countryReducer,
  stateReducer
});

export default rootReducer;
