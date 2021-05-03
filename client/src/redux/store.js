import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const middleware = [thunk];
const initState = {};

const store = createStore(
    rootReducer,
    initState,
    compose(
        applyMiddleware(...middleware),
        process.env.NODE_ENV !== 'production' &&
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;