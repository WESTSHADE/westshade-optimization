import {getLocalStore} from 'next-persist';

import {SIGN_UP_SUCCESS, SIGN_UP_FAIL, LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, GET_USER_INFO_SUCCESS, GET_USER_INFO_FAIL, UPDATE_USER_INFO_SUCCESS, UPDATE_USER_INFO_FAIL, CLEAR_ERRORS} from "../constants/userConstants";

let defaultUser = {
    loggedIn: false,
    token: "",
    user: {
        first_name: "",
        last_name: "",
        billing: {
            first_name: "",
            last_name: "",
            company: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "US",
            email: "",
            phone: "",
        },
        shipping: {
            first_name: "",
            last_name: "",
            company: "",
            address_1: "",
            address_2: "",
            city: "",
            state: "",
            postcode: "",
            country: "US",
            email: "",
            phone: "",
        }
    },
};

const persistedState = getLocalStore('reducerUser', defaultUser);

export const userReducer = (state = persistedState, action) => {
    switch (action.type) {
        case SIGN_UP_SUCCESS:
            return {
                ...state,
            };
        case SIGN_UP_FAIL:
            return {
                ...state,
                message: action.payload,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                token: action.payload.token,
            };
        case LOG_IN_FAIL:
            return {
                ...state,
                loggedIn: false,
                token: "",
                message: action.payload,
            };
        case LOG_OUT:
            return {
                loggedIn: false,
                token: "",
                user: {
                    first_name: "",
                    last_name: "",
                    billing: {
                        first_name: "",
                        last_name: "",
                        company: "",
                        address_1: "",
                        address_2: "",
                        city: "",
                        state: "",
                        postcode: "",
                        country: "US",
                        email: "",
                        phone: "",
                    },
                    shipping: {
                        first_name: "",
                        last_name: "",
                        company: "",
                        address_1: "",
                        address_2: "",
                        city: "",
                        state: "",
                        postcode: "",
                        country: "US",
                        email: "",
                        phone: "",
                    }
                },
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            };
        case GET_USER_INFO_FAIL:
            return {
                ...state,
                message: action.payload,
            };
        case UPDATE_USER_INFO_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
            };
        case UPDATE_USER_INFO_FAIL:
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
