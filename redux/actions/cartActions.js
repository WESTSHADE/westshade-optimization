import axios from "axios";

import {MODIFY_CART} from "../constants/cartConstants"
import Utils from "Utils/utils";
import {NumberFn} from "Utils/tools";

const utils = new Utils();
const numberFn = new NumberFn();

const fetchProduct = async (id) => {
    if (!id) return;
    return await utils.getProductByWooId(id);
};

export const modifyCart = ({cart}) => (dispatch) => {
    try {
        let cartList = [], cartProductList = [];
        let indexCP = []; //Custom Printing Canopy Only;

        // 简化cart，消除重复项.
        cart.forEach((item, index) => {
            const i = cartList.findIndex(({id}) => id === item.id);

            if (i > -1 && item.id !== 61289) {
                cartList[i].quantity += item.quantity;
            } else {
                cartList.push(item);
            }
        })

        indexCP = cartList.map((item, index) => {
            if (item.id === 61289) return index
        }).filter(item => item !== undefined); //Custom Printing Canopy Only;

        // 获取cart对应产品信息.
        // cartProductList = await Promise.all(cartList.map((product) => fetchProduct(product.id)));
        async function fetchCartProducts() {
            return await Promise.all(cartList.map((product) => fetchProduct(product.id)));
        }

        fetchCartProducts().then(res => {
            let cartProductList = res;

            if (indexCP.length > 0) {
                indexCP.map((item, idx) => {
                    if (item < 0) return;

                    async function fetchProducts() {
                        return await Promise.all(cartList[item].component.map((product) => fetchProduct(product.id)));
                    }

                    fetchProducts().then(result => {
                        cartProductList[idx].on_sale = !!(result[0].on_sale || result[1].on_sale)
                        cartProductList[idx].price = numberFn.strToInt(result[0].price, 0) + numberFn.strToInt(result[1].price, 0) + "";
                        cartProductList[idx].regular_price = numberFn.strToInt(result[0].regular_price, 0) + numberFn.strToInt(result[1].regular_price, 0) + "";
                        cartProductList[idx].sale_price = cartProductList[idx].on_sale ? cartProductList[idx].price : "";
                    })
                });
            }

            setTimeout(() => dispatch({
                type: MODIFY_CART,
                payload: {
                    cart: cartList,
                    cartProduct: cartProductList
                }
            }), 250)
        })
    } catch (error) {
        console.log(error);
    }
};

// TODO: 获取cart对应产品信息
// Promise.all(cartList.map((product) => fetchProduct(product.id))).then((responses) => {
//     setProducts(responses);
//
//     responses.forEach((res, index) => {
//         if (res.parent_id) {
//             itemList.push({
//                 product_id: res.parent_id,
//                 variation_id: res.id,
//                 quantity: cartList[index].quantity,
//             });
//         } else {
//             itemList.push({
//                 product_id: res.id,
//                 quantity: cartList[index].quantity,
//             });
//         }
//     });
//     setLineItem(itemList);
// });
