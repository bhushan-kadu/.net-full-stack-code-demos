import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './app/store'
import AddContact from "./app/components/AddContacts";
import 'fontsource-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <AddContact />
    </div >
  );
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
