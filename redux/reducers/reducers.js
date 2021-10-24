import {combineReducers} from "redux";

import {userReducer} from "./userReducers";
import {orderReducer} from "./orderReducers";
import {cartReducer} from "./cartReducers";

const reducer = combineReducers({
    user: userReducer,
    order: orderReducer,
    cart: cartReducer,
});

export default reducer;
