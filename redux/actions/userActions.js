import axios from "axios";

import {
    SIGN_UP_SUCCESS,
    SIGN_UP_FAIL,
    LOG_IN_SUCCESS,
    LOG_IN_FAIL,
    LOG_OUT,
    GET_USER_INFO_SUCCESS,
    GET_USER_INFO_FAIL,
    UPDATE_USER_INFO_SUCCESS,
    UPDATE_USER_INFO_FAIL,
    CLEAR_ERRORS,
} from "../constants/userConstants";

import {modifyCart} from "./cartActions";

export const register = ({email, password}) => async (dispatch) => {
    try {
        const {data, status} = await axios.post(process.env.apiBaseUrl + "/register", {username: email, email, password});
        if (status === 200) {
            // 成功数据："User {email} Registration was Successful"
            dispatch({
                type: SIGN_UP_SUCCESS,
            });
            setTimeout(() => dispatch(logIn({email, password})), 1000);
        }
    } catch (error) {
        dispatch({
            type: SIGN_UP_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const logIn = ({email, password}) => async (dispatch) => {
    try {
        const {data, status} = await axios.post(process.env.apiBaseUrl + "/login", {username: email, password});
        if (status === 200) {
            // localStorage.setItem("token", data.token);
            dispatch({
                type: LOG_IN_SUCCESS,
                payload: {
                    token: data.token,
                },
            });
        }
    } catch (error) {
        dispatch({
            type: LOG_IN_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const logOut = () => async (dispatch) => {
    dispatch({type: LOG_OUT});
};

export const getUser = (token) => async (dispatch) => {
    try {
        if (!token) {
            dispatch(logOut());
        } else {
            const {data, status} = await axios({
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

            if (status === 200) {
                dispatch({
                    type: GET_USER_INFO_SUCCESS,
                    payload: {
                        user: data,
                    },
                });

                let result = data.meta_data.find((data) => data.key === "cart");
                if (result) {
                    dispatch(modifyCart({cart: result.value}));
                }
            }
        }
    } catch (error) {
        dispatch({
            type: GET_USER_INFO_FAIL,
            payload: error.response.data,
        });
    }
};

export const updateUser = (token, user) => async (dispatch) => {
    try {
        if (!token) {
            dispatch(logOut());
        } else {
            const {data, status} = await axios({
                method: "put",
                url: process.env.apiBaseUrl + "/user",
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                    Authorization: "Bearer " + token,
                },
                data: user,
            });

            if (status === 200) {
                dispatch({
                    type: UPDATE_USER_INFO_SUCCESS,
                    payload: {
                        user: data,
                    },
                });

                let result = data.meta_data.find((data) => data.key === "cart");
                if (result) {
                    dispatch(modifyCart({cart: result.value}));
                }
            }
        }
    } catch (error) {
        dispatch({
            type: UPDATE_USER_INFO_FAIL,
            payload: error.response.data,
        });
    }
}

// Clear Error
export const clearUserErrors = () => (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
};
