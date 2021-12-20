import {createStore, applyMiddleware} from "redux";
import {HYDRATE, createWrapper} from "next-redux-wrapper";
import {persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers/reducers";

const persistConfig = {
    key: 'root',
    storage,
}

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENE !== "production") {
        const {composeWithDevTools} = require("redux-devtools-extension");
        return composeWithDevTools(applyMiddleware(...middleware));
    }
    return applyMiddleware(...middleware);
};

const reducer = (state, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        };
    }
    return reducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, reducer)
const store = createStore(persistedReducer, bindMiddleware([thunkMiddleware]));
const persistor = persistStore(store);

// const initStore = () => {
//     return createStore(persistedReducer, bindMiddleware([thunkMiddleware]));
// };
// export const wrapper = createWrapper(initStore);

export {store}
