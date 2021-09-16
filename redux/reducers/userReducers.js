import { LOG_IN_SUCCESS, LOG_IN_FAIL, LOG_OUT, USER_INFO_SUCCESS, USER_INFO_FAIL, CLEAR_ERRORS } from "../constants/userConstants";

export const userReducer = (state = { loggedIn: false, token: "", user: {} }, action) => {
	switch (action.type) {
		case LOG_IN_SUCCESS:
			return {
				...state,
				loggedIn: true,
				token: action.payload.token,
			};
		case LOG_IN_FAIL:
			return {
				...state,
				message: action.payload,
			};
		case LOG_OUT:
			return {
				loggedIn: false,
				token: "",
				user: {},
			};
		case USER_INFO_SUCCESS:
			return {
				...state,
				user: action.payload.user,
			};
		case USER_INFO_FAIL:
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
