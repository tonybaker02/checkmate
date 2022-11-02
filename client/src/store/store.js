import {createStore,applyMiddleware} from  'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import allReducers from '../reducers/index';
import thunk from 'redux-thunk';

const initialState = {};

const middleware = [thunk];

export const store  = createStore(
    allReducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);