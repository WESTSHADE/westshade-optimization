import axios from "axios";

import {GET_ORDER_SUCCESS, GET_ORDER_FAIL, CLEAR_ERRORS} from "../constants/orderConstants";

export const getOrder = (token) => async (dispatch) => {
    try {
        if (!token) {
            dispatch({
                type: GET_ORDER_FAIL,
                payload: "Unauthorized token"
            });
        } else {
            const {data, status} = await axios({
                method: "GET",
                url: process.env.apiBaseUrl + "/orders",
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + token,
                },
            });
            if (status === 200) {
                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: {
                        orders: data
                    }
                });
            }
        }
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error.response.data
        });
    }
};

// Clear Error
export const clearOrderErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
