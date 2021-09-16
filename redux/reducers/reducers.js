import { combineReducers } from "redux";

import { userReducer } from "./userReducers";
import { orderReducer } from "./orderReducers";

const reducer = combineReducers({
	user: userReducer,
	order: orderReducer,
});

export default reducer;
