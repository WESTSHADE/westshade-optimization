import {GET_ORDER_SUCCESS, GET_ORDER_FAIL, CLEAR_ERRORS} from "../constants/orderConstants";

export const orderReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case GET_ORDER_SUCCESS:
            return {
                ...state,
                orders: action.payload.orders,
            };
        case GET_ORDER_FAIL:
            return {
                ...state,
                message: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                message: null,
            };
        default:
            return state;
    }
};
