import axios from "axios";

import {GET_ORDER_SUCCESS, GET_ORDER_FAIL, CLEAR_ERRORS} from "../constants/orderConstants";

import Utils from "../../utils/utils";

const utils = new Utils();

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
                let orders = JSON.parse(JSON.stringify(data));

                await Promise.all(orders.map(async order => {
                    await Promise.all(order.line_items.map(async (item, index) => {
                        console.log("order action");
                        let detail = await utils.getProductByWooId(item.product_id);
                        if (detail.hasOwnProperty("image")) {
                            item.image = detail.image;
                        } else if (detail.hasOwnProperty("images")) {
                            item.image = detail.images[0];
                        }
                    }))
                }));

                dispatch({
                    type: GET_ORDER_SUCCESS,
                    payload: {
                        orders: orders
                    }
                });
            }
        }
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAIL,
            payload: error.response
        });
    }
};

// Clear Error
export const clearOrderErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
