import {getLocalStore} from 'next-persist';

import {MODIFY_CART, CLEAR_CART} from "../constants/cartConstants";

let defaultCart = {
    badge: 0,
    cart: [],
    cartProduct: []
};

const persistedState = getLocalStore('reducerCar', defaultCart);

export const cartReducer = (state = persistedState, action) => {
    switch (action.type) {
        case MODIFY_CART:
            // 计算badge
            let badge = 0;
            action.payload.cart.map(item => badge += item.quantity);

            return {
                ...state,
                badge: badge,
                cart: action.payload.cart,
                cartProduct: action.payload.cartProduct,
            };
        case CLEAR_CART:
            return {
                ...state,
                badge: 0,
                cart: [],
                cartProduct: []
            };
        default:
            return state;
    }
}
