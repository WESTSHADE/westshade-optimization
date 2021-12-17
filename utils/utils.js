import axios from "axios";

export default class Utils {
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

    async updateOrder(token, data) {
        try {
            const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/order", {
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

    async checkout(data) {
        try {
            const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/checkout", {
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

    async getProductByWooId(pid) {
        try {
            if (!pid) return null;

            const {data, status} = await axios({
                method: "GET",
                url: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/product?productId=" + pid,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (status !== 200) {
                console.log(pid);
            }
            return data;
        } catch (error) {
            console.error(error);
            // expected output: ReferenceError: nonExistentFunction is not defined
            // Note - error messages will vary depending on browser
        }
    }

    async getProductByTagId(pid) {
        try {
            const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/products?tagId=" + pid, {
                method: "GET",
                headers: {
                    "Access-Control-Allow-Headers": "*",
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

    async getProductByCategoryId(pid) {
        try {
            const {data, status} = await axios({
                method: "GET",
                url: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/products?categoryId=" + pid,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (status !== 200) {
                console.log(pid);
            }

            return data;
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
            const {data, status} = await axios({
                method: "GET",
                url: "https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/variations?productId=" + pid,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                },
            });

            if (status !== 200) {
                console.log(pid);
            }

            return data;
        } catch (error) {
            console.error(error);
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

    async updateContact(data) {
        try {
            const res = await fetch("https://43kjv8b4z4.execute-api.us-west-2.amazonaws.com/v1/contact", {
                method: "PUT",
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

    async imageUpload(file, name) {
        try {
            const {data, status} = await axios({
                method: "PUT",
                url: "https://westshade.s3.us-west-2.amazonaws.com/custom-printing-attachments/" + name,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": file.type,
                },
                data: file,
            });

            if (status !== 200) {

            }

            // return data;
        } catch (error) {
            console.error(error);
        }
    }

    async imageUploadV2(file, name) {
        try {
            const {data, status} = await axios({
                method: "PUT",
                url: "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + name,
                headers: {
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": file.type,
                },
                data: file,
            });

            if (status !== 200) {
                return {status};
            } else {
                return {
                    status,
                    url: "https://westshade.s3.us-west-2.amazonaws.com/contacts/" + name
                }
            }
            // return data;
        } catch (error) {
            console.error(error);
            return {status: 400}
        }
    }
}
