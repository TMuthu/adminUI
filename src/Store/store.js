import {createStore, applyMiddleware, combineReducers} from "redux";
import { userreducer} from "../reducers/userReducer";
import { paginationreducer } from "../reducers/paginationReducer";
import thunkMiddleware from 'redux-thunk';

const reducer = combineReducers({userreducer, paginationreducer});

// export const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(reducer,applyMiddleware(thunkMiddleware));

