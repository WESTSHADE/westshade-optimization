import axios from "axios";

import { LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, USER_INFO_SUCCESS, USER_INFO_FAIL, CLEAR_ERRORS } from "../constants/userConstants";

export const logIn =
	({ username, password }) =>
	async (dispatch) => {
		try {
			const { data, status } = await axios.post(process.env.apiBaseUrl + "/login", { username, password });

			if (status === 200) {
				localStorage.setItem("token", data.token);
			}

			dispatch({
				type: LOG_IN_SUCCESS,
				payload: {
					token: data.token,
				},
			});
		} catch (error) {
			dispatch({
				type: LOG_IN_FAIL,
				payload: error.response.data,
			});
		}
	};

export const logOut = () => async (dispatch) => {
	dispatch({ type: LOG_OUT });
};

export const getUser = (token) => async (dispatch) => {
	try {
		const { data } = await axios({
			method: "get",
			url: process.env.apiBaseUrl + "/user",
			headers: {
				"Access-Control-Allow-Headers": "*",
				"Content-Type": "application/json",
				Accept: "application/json",
				"Access-Control-Allow-Origin": "*",
				Authorization: "Bearer " + token,
			},
		});

		dispatch({
			type: USER_INFO_SUCCESS,
			payload: {
				user: data,
			},
		});
	} catch (error) {
		dispatch({
			type: USER_INFO_FAIL,
			payload: error.response.data,
		});
	}
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
	dispatch({ type: CLEAR_ERRORS });
};
