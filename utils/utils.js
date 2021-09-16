import axios from "axios";

export default class Utils {
	async logIn(data) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/login", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(data),
			});
			const json = await res.json();
			if (res.status === 200) {
				localStorage.setItem("token", json.token);
			}
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	async register(data) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/register", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(data),
			});

			if (res.status === 200) {
				res.text().then((s) => {
					return s;
				});
			} else {
				res.text().then((s) => {
					return s;
				});
			}
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	async getUser(token) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/user", {
				method: "GET",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + token,
				},
			});
			const json = await res.json();
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	async updateUser(token, data) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/user", {
				method: "PUT",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify(data),
			});
			const json = await res.json();
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	async getUserOrders(token) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/orders", {
				method: "GET",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + token,
				},
			});
			const json = await res.json();
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	async createOrder(token, data) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/order", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
					Authorization: "Bearer " + token,
				},
				body: JSON.stringify(data),
			});
			const json = await res.json();
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	async getProductByWooId(pid) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/product?productId=" + pid, {
				method: "GET",
				headers: {
					"Access-Control-Allow-Headers": "*",
					// "Content-Type": "application/json",
					// Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
			const json = await res.json();
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}

	/*
	 *
	 * Sample Product Options
	 *
	 * const options = {
	 *   Size: "10x10",
	 *   Color: "White"
	 * }
	 *
	 */
	async getVariantByWooProductId(pid) {
		try {
			// const stock = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/variations?productId=" + pid, {
			// 	method: "GET",
			// 	headers: {
			// 		"Access-Control-Allow-Headers": "*",
			// 		// "Content-Type": "application/json",
			// 		// Accept: "application/json",
			// 		"Access-Control-Allow-Origin": "*",
			// 	},
			// });

			const { data, status } = await axios({
				method: "GET",
				url: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/variations?productId=" + pid,
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Access-Control-Allow-Origin": "*",
				},
			});

			// const json = await stock.json();
			// if (json.message) {
			// 	console.log(pid);
			// }
			// return json;

			if (status != 200) {
				console.log(pid);
			}

			return data;
		} catch (error) {
			// console.error(error);
		}
	}

	async contact(data) {
		try {
			const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/contact", {
				method: "POST",
				headers: {
					"Access-Control-Allow-Headers": "*",
					"Content-Type": "application/json",
					Accept: "application/json",
					"Access-Control-Allow-Origin": "*",
				},
				body: JSON.stringify(data),
			});
			const json = await res.json();
			return json;
		} catch (error) {
			console.error(error);
			// expected output: ReferenceError: nonExistentFunction is not defined
			// Note - error messages will vary depending on browser
		}
	}
}
