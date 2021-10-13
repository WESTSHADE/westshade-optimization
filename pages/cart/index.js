import React, {useEffect, useState} from "react";
import clsx from "clsx";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {Input} from 'baseui/input';
import CheckIndeterminate from 'baseui/icon/check-indeterminate'
import Plus from 'baseui/icon/plus'

import styles from "./cart.module.scss";

import Utils from "../../utils/utils";
import {NumberFn} from "../../utils/tools";
import {EventEmitter} from "../../utils/events";

import Cart from "./cart.svg";

const numberFn = new NumberFn();
const utils = new Utils();

function Cart_Page({router}) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    const [lineItem, setLineItem] = useState([]);
    const [addressesDone, setAddressesDone] = useState(true);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");

    const fetchUserInfo = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            return await utils.getUser(token);
        }
    };

    const fetchProduct = async (id) => {
        if (!id) return;
        return await utils.getProductByWooId(id);
    };

    const getUser = () => fetchUserInfo().then((data) => setUser(data));

    const updateCart = (c) => {
        const token = localStorage.getItem("token");
        if (token) {
            let cartList = c ? c : [...cart];
            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cartList,
                    },
                ],
            };
            localStorage.setItem("cart", "");
            utils.updateUser(token, userData).then((res) => {
                getUser();

                EventEmitter.dispatch("updateBadge");
            });
        } else {
            let cartList = c ? c : [...cart];
            let cl = JSON.stringify(cartList);
            localStorage.setItem("cart", cl);

            EventEmitter.dispatch("updateBadge");
        }
    };

    const checkout = () => {
        const token = localStorage.getItem("token");

        let checkoutData = {
            payment_method: "bacs",
            payment_method_title: "Credit Card",
            billing: null,
            shipping: null,
            // coupon_lines: lineCoupon,
            line_items: lineItem,
        };

        if (token) {
            checkoutData.billing = {...user.billing};
            checkoutData.shipping = {...user.shipping};
        }

        utils.createOrder(token, checkoutData).then((res) => {
            if (res.message) {
                setShowError(true);
                setError(res.message);
                setTimeout(function () {
                    setShowError(false);
                    setError("");
                }, 4000);
            } else {
                updateCart([]);
                router.push({pathname: "/checkout/", query: {id: res.id}})
                // setTimeout(() => router.push({pathname: "/checkout/", query: {id: res.id}}), 250);
            }
        });
    };

    const getSubtotal = () => {
        let price = 0;
        if (cart.length === products.length) {
            products.forEach((p, index) => {
                price += numberFn.strToFloat(p.price) * cart[index].quantity;
            });
        }
        return price;
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUser();
        } else {
            let cart = localStorage.getItem("cart");
            cart = cart ? JSON.parse(cart) : cart;
            let cl;

            if (cart && Array.isArray(cart)) {
                cl = [...cart];
            } else {
                cl = [];
            }

            let cartList = [],
                itemList = [];
            cl.forEach((item, index) => {
                const i = cartList.findIndex((product) => product.id === item.id);
                if (i === -1) {
                    cartList.push(item);
                } else {
                    cartList[i].quantity = cartList[i].quantity + item.quantity;
                }
            });
            setCart(cartList);

            Promise.all(cartList.map((product) => fetchProduct(product.id))).then((responses) => {
                setProducts(responses);

                responses.forEach((res, index) => {
                    if (res.parent_id) {
                        itemList.push({
                            product_id: res.parent_id,
                            variation_id: res.id,
                            quantity: cartList[index].quantity,
                        });
                    } else {
                        itemList.push({
                            product_id: res.id,
                            quantity: cartList[index].quantity,
                        });
                    }
                });
                setLineItem(itemList);
            });
        }
    }, []);

    useEffect(() => {
        if (!user) return;

        if (
            !user.billing.first_name ||
            !user.billing.last_name ||
            !user.billing.address_1 ||
            !user.billing.city ||
            !user.billing.state ||
            !user.billing.postcode ||
            !user.billing.country ||
            !user.billing.email ||
            !user.billing.phone ||
            !user.shipping.first_name ||
            !user.shipping.last_name ||
            !user.shipping.address_1 ||
            !user.shipping.city ||
            !user.shipping.state ||
            !user.shipping.postcode ||
            !user.shipping.country
        ) {
            setAddressesDone(false);
        } else {
            setAddressesDone(true);
        }

        let cart = localStorage.getItem("cart");
        cart = cart ? JSON.parse(cart) : cart;
        let cl;

        if (cart && Array.isArray(cart)) {
            cl = [...cart];
        } else {
            cl = [];
        }

        let result = user.meta_data.filter((data) => data.key === "cart");
        if (result.length > 0) {
            cl = cl.concat([...result[0].value]);

            let cartList = [],
                itemList = [];
            cl.forEach((item, index) => {
                const i = cartList.findIndex((product) => product.id === item.id);
                if (i === -1) {
                    cartList.push(item);
                } else {
                    cartList[i].quantity = cartList[i].quantity + item.quantity;
                }
            });
            setCart(cartList);

            Promise.all(cartList.map((product) => fetchProduct(product.id))).then((responses) => {
                setProducts(responses);

                responses.forEach((res, index) => {
                    if (res.parent_id) {
                        itemList.push({
                            product_id: res.parent_id,
                            variation_id: res.id,
                            quantity: cartList[index].quantity,
                        });
                    } else {
                        itemList.push({
                            product_id: res.id,
                            quantity: cartList[index].quantity,
                        });
                    }
                });
                setLineItem(itemList);
            });
        }
    }, [user]);

    return (
        <React.Fragment>
            <Head>
                <title>Shopping Cart - Proceed to Checkout | WESTSHADE</title>
                <meta name="description" content="Free shipping on orders over $100. Add products to your shopping cart and proceed to checkout to place your order."/>
            </Head>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                {cart.length > 0 ? (
                    <Block display={["block", "block", "grid"]} flexDirection={["column", "column", "row"]} gridTemplateColumns={["", "", "auto 332px"]}
                           gridColumnGap="64px">
                        <Block position="relative" marginBottom="24px">
                            <Block marginBottom={["32px", "47px"]} paddingTop="24px" font="MinXHeading20" color="MinXPrimaryText">Shopping cart</Block>
                            {cart.length > 0 && products.length > 0
                                ? products.map((product, index) => {
                                    return (
                                        <Block key={index} display="flex" flexDirection={["column", "row"]} justifyContent="space-between" marginBottom={["16px", "16px", "22px"]}>
                                            <Block display="flex" flexDirection="row" marginBottom="16px">
                                                <Block position="relative" width={["60px", "120px"]} height={["60px", "120px"]} marginRight={["15px", "24px"]}>
                                                    {product.images.length > 0 ? (
                                                        <img src={product.images[0].src} alt={product.images[0].alt} width="100%" height="100%"
                                                             style={{objectFit: "contain"}}/>
                                                    ) : (
                                                        <Image src={"/images/default-product.jpg"} alt={product.name} layout="fill" objectFit="contain" quality={100}/>
                                                    )}
                                                </Block>
                                                <Block>
                                                    <Block marginBottom="8px" font="MinXHeading16" color="MinXPrimaryText">{product.name}</Block>
                                                    {cart[index].variation.length > 0 ? (
                                                        <>{cart[index].variation.map((attr, i) => (
                                                            <Block key={i} marginBottom="8px" font="MinXParagraph14" color="MinXPrimaryText">
                                                                {`${attr.attribute}: ${attr.value}`}
                                                            </Block>
                                                        ))}</>
                                                    ) : null}
                                                </Block>
                                            </Block>
                                            <Block display="flex" flexDirection={["row", "column"]} alignItems={["center", "flex-end"]}
                                                   marginBottom="16px">
                                                <Block display="flex" flexDirection={["row", "column"]} flex={[1, 0]} justifyContent={["flex-start", ""]}
                                                       alignItems={["center", "flex-end"]} marginBottom={["", "12px"]}>
                                                    <Block width={["60px", "auto"]} marginRight={["15px", "0px"]} marginBottom={["", "12px"]} font="MinXLabel12"
                                                           color="MinXPrimaryText"
                                                           overrides={{
                                                               Block: {
                                                                   props: {
                                                                       className: styles["remove-button"]
                                                                   },
                                                               },
                                                           }}
                                                           onClick={() => {
                                                               let c = [...cart],
                                                                   p = [...products];
                                                               c.splice(index, 1);
                                                               p.splice(index, 1);

                                                               setCart(c);
                                                               setProducts(p);

                                                               updateCart(c);
                                                           }}
                                                    >
                                                        Remove
                                                    </Block>
                                                    <Block display="flex" flexDirection="row" width="105px" height="40px" font="MinXLabel14" color="MinXPrimaryText">
                                                        <Button shape={SHAPE.square}
                                                                overrides={{
                                                                    BaseButton: {
                                                                        props: {
                                                                            className: clsx([styles["quantity-button"], styles["left"]])
                                                                        },
                                                                    },
                                                                }}
                                                                onClick={() => {
                                                                    let p = [...cart];
                                                                    if (p[index].quantity > 1) {
                                                                        p[index].quantity -= 1;
                                                                        setCart(p);
                                                                        updateCart();
                                                                    }
                                                                }}
                                                        >
                                                            <CheckIndeterminate/>
                                                        </Button>
                                                        <Block display="flex" flex={1} justifyContent="center" alignItems="center" font="MinXLabel14" color="MinXPrimaryText"
                                                               overrides={{
                                                                   Block: {
                                                                       props: {
                                                                           className: styles["quantity-display"]
                                                                       },
                                                                   },
                                                               }}
                                                        >{cart[index].quantity}</Block>
                                                        <Button shape={SHAPE.square}
                                                                overrides={{
                                                                    BaseButton: {
                                                                        props: {
                                                                            className: clsx([styles["quantity-button"], styles["right"]])
                                                                        },
                                                                    },
                                                                }}
                                                                onClick={() => {
                                                                    let p = [...cart];
                                                                    p[index].quantity += 1;
                                                                    setCart(p);
                                                                    updateCart();
                                                                }}
                                                        >
                                                            <Plus/>
                                                        </Button>
                                                    </Block>
                                                </Block>
                                                <Block marginBottom={["", "12px"]} paddingLeft="20px" font="MinXLabel14" color="MinXPrimaryText"
                                                       overrides={{
                                                           Block: {
                                                               style: {fontWeight: 700,}
                                                           },
                                                       }}
                                                >
                                                    {`$` + product.price * cart[index].quantity}
                                                </Block>
                                            </Block>
                                        </Block>
                                    )
                                }) : null}
                        </Block>
                        <Block position="relative" marginBottom="24px">
                            <Block marginBottom={["16px", "16px", "24px"]} paddingTop="24px" font="MinXHeading20" color="MinXPrimaryText">Order summary</Block>
                            <Block marginBottom={["16px", "16px", "24px"]}
                                   overrides={{
                                       Block: {
                                           props: {
                                               className: styles["divider"]
                                           }
                                       },
                                   }}
                            >
                                <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="12px">
                                    <Block font="MinXParagraph14" color="MinXPrimaryText">Subtotal</Block>
                                    <Block font="MinXParagraph14" color="MinXPrimaryText">{`$` + getSubtotal()}</Block>
                                </Block>
                                {/*<Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="12px">*/}
                                {/*    <Block font="MinXParagraph14" color="MinXPrimaryText">Shipping</Block>*/}
                                {/*    <Block font="MinXParagraph14" color="MinXPrimaryText">{`$` + getSubtotal()}</Block>*/}
                                {/*</Block>*/}
                                {/*<Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom="12px">*/}
                                {/*    <Block font="MinXParagraph14" color="MinXPrimaryText">Estimated Tax</Block>*/}
                                {/*    <Block font="MinXParagraph14" color="MinXPrimaryText">{`$` + getSubtotal()}</Block>*/}
                                {/*</Block>*/}
                                <Block display="flex" flexDirection="row" justifyContent="space-between" marginBottom={["16px", "16px", "24px"]}>
                                    <Block font="MinXParagraph14" color="MinXPrimaryText"><strong>Total</strong></Block>
                                    <Block font="MinXParagraph14" color="MinXPrimaryText"><strong>{`$` + getSubtotal()}</strong></Block>
                                </Block>
                            </Block>
                            {/*<Block display="flex" flexDirection="row" height={["25px", "40px"]} font="MinXLabel12" marginBottom={["16px", "16px", "24px"]}>*/}
                            {/*    <Input placeholder="Coupon code"*/}
                            {/*           overrides={{*/}
                            {/*               Root: {*/}
                            {/*                   style: {fontSize: "inherit", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px", backgroundColor: "transparent"}*/}
                            {/*               },*/}
                            {/*               InputContainer: {*/}
                            {/*                   style: {fontSize: "inherit", backgroundColor: "transparent"}*/}
                            {/*               },*/}
                            {/*               Input: {*/}
                            {/*                   style: ({$theme}) => ({*/}
                            {/*                       fontSize: "inherit",*/}
                            {/*                       "::placeholder": {color: $theme.colors.MinXSecondaryText},*/}
                            {/*                       ":-ms-input-placeholder": {color: $theme.colors.MinXSecondaryText},*/}
                            {/*                       "::-ms-input-placeholder": {color: $theme.colors.MinXSecondaryText},*/}
                            {/*                   })*/}
                            {/*               },*/}
                            {/*           }}*/}
                            {/*    />*/}
                            {/*    <Block height="100%" color="MinXPrimaryText">*/}
                            {/*        <Button*/}
                            {/*            overrides={{*/}
                            {/*                BaseButton: {*/}
                            {/*                    style: ({$theme}) => ({*/}
                            {/*                        width: "120px",*/}
                            {/*                        height: "100%",*/}
                            {/*                        paddingRight: "0px",*/}
                            {/*                        paddingLeft: "0px",*/}
                            {/*                        fontSize: "inherit",*/}
                            {/*                        color: "inherit",*/}
                            {/*                        borderTopRightRadius: "4px",*/}
                            {/*                        borderBottomRightRadius: "4px",*/}
                            {/*                        backgroundColor: "#F0F0F0",*/}
                            {/*                        ":hover": {backgroundColor: $theme.colors.MinXDividers},*/}
                            {/*                        ":active": {backgroundColor: $theme.colors.MinXBackground},*/}
                            {/*                    }),*/}
                            {/*                },*/}
                            {/*            }}*/}
                            {/*            onClick={() => {*/}
                            {/*            }}>APPLY COUPON</Button>*/}
                            {/*    </Block>*/}
                            {/*</Block>*/}
                            <Block width="100%" height="40px" font="MinXLabel16" color="MinXPrimaryTextAlt">
                                <Button shape={SHAPE.pill}
                                        overrides={{
                                            BaseButton: {
                                                props: {
                                                    className: styles["checkout-button"],
                                                },
                                                style: ({$theme}) => ({
                                                    backgroundColor: !addressesDone || lineItem.length === 0 ? "#e0e0e0" : $theme.colors.MinXButton,
                                                    ":hover": !addressesDone || lineItem.length === 0 ? {} : {backgroundColor: $theme.colors.MinXButtonHover},
                                                    ":active": !addressesDone || lineItem.length === 0 ? {} : {backgroundColor: $theme.colors.MinXButtonActive},
                                                }),
                                            },
                                        }}
                                        onClick={checkout}
                                        disabled={!addressesDone || lineItem.length === 0}
                                >
                                    CHECKOUT
                                </Button>
                            </Block>
                        </Block>
                    </Block>

                ) : (
                    <Block display="flex" flex={1} flexDirection="column" alignItems="center" paddingTop={["114px", "114px", "66px"]}>
                        <Block marginBottom="18px"><Cart style={{width: "24px", height: "24px"}} color={"#323232"}/></Block>
                        <Block font="MinXParagraph16" color="MinXPrimaryText">Your shopping cart is empty</Block>
                    </Block>
                )}
                {/*TODO: 相关产品模组*/}
                {/*<Block position="relative" marginBottom="24px">*/}
                {/*    <Block marginBottom={["32px", "47px"]} paddingTop="24px" font="MinXHeading20" color="MinXPrimaryText">Accessories might need</Block>*/}
                {/*</Block>*/}
            </Block>
        </React.Fragment>
    );
}

Cart_Page.getInitialProps = () => {
    return {
        newFooter: true,
    };
};

export default withRouter(Cart_Page);
