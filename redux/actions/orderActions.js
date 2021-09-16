import axios from "axios";

import { GET_ORDER_SUCCESS, GET_ORDER_FAIL, CLEAR_ERRORS } from "../constants/orderConstants";

export const getOrder = (token) => async (dispatch) => {
	try {
		const { data } = await axios({
			method: "get",
			url: process.env.apiBaseUrl + "/orders",
			headers: {
				"Access-Control-Allow-Headers": "*",
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: "Bearer " + token,
			},
		});

		dispatch({
			type: GET_ORDER_SUCCESS,
			payload: { order: data },
		});
	} catch (error) {
		dispatch({
			type: GET_ORDER_FAIL,
			payload: error.response.data.message,
		});
	}
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
