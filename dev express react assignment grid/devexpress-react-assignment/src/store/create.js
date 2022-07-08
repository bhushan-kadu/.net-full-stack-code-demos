import { createStore, compose } from 'redux';
import reducers from '../reducers';
import createMiddleware from './middleware';
export default () => createStore(reducers, compose(createMiddleware(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
