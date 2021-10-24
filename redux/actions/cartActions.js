import axios from "axios";

import {MODIFY_CART} from "../constants/cartConstants"
import Utils from "../../utils/utils";

const utils = new Utils();

const fetchProduct = async (id) => {
    if (!id) return;
    return await utils.getProductByWooId(id);
};

export const modifyCart = ({cart}) => async (dispatch) => {
    try {
        let cartList = [], cartProductList = [];
        // 简化cart，消除重复项.
        cart.forEach((item, index) => {
            const i = cartList.findIndex(({id}) => id === item.id);
            if (i > -1) {
                cartList[i].quantity += item.quantity;
            } else {
                cartList.push(item);
            }
        })

        // 获取cart对应产品信息.
        cartProductList = await Promise.all(cartList.map((product) => fetchProduct(product.id)));

        dispatch({
            type: MODIFY_CART,
            payload: {
                cart: cartList,
                cartProduct: cartProductList
            }
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
