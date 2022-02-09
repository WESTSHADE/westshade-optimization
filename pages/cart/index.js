import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import NumberFormat from "react-number-format";
import clsx from "clsx";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {CheckIndeterminate, Plus} from 'baseui/icon'

import {OrderSummary, ShippingNote} from "Components/Sections";
import {Modal} from "Components/surfaces";


import {removeFromCart, clearCart} from "../../redux/actions/gtagActions";
import {modifyCart} from "../../redux/actions/cartActions";
import {updateUser} from "../../redux/actions/userActions";

import styles from "./cart.module.scss";

import Cart from "./cart.svg";

function Cart_Page({router}) {
    const [availableCheckout, setAvailableCheckout] = useState(false);

    const [showClear, setShowClear] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    ////////////////////////////////////////

    const dispatch = useDispatch();

    const {loggedIn, token} = useSelector(({user}) => user);
    const {cart, cartProduct} = useSelector(({cart}) => cart);

    const handlePlusToCart = (index) => {
        let c = JSON.parse(JSON.stringify(cart));
        c[index].quantity += 1;

        handleUpdateCart(c);
    }

    const handleMinusToCart = (index) => {
        let c = JSON.parse(JSON.stringify(cart));
        if (c[index].quantity > 1) {
            c[index].quantity -= 1;

            handleUpdateCart(c);
        }
    }

    const handleRemoveFromCart = (index) => {
        let c = JSON.parse(JSON.stringify(cart));

        removeFromCart(cartProduct[index], c[index].quantity)

        c.splice(index, 1);

        handleUpdateCart(c);
    }

    const handleClearCart = () => {
        setShowClear(false);

        let c = JSON.parse(JSON.stringify(cart));

        clearCart(cartProduct, c)

        handleUpdateCart([]);
    }

    const handleUpdateCart = (cartList) => {
        if (loggedIn) {
            let userData = {
                meta_data: [
                    {
                        key: "cart",
                        value: cartList,
                    },
                ],
            };
            dispatch(updateUser(token, userData));
        } else {
            dispatch(modifyCart({cart: cartList}))
        }
    }

    const goPreCheckout = () => router.push("/pre-checkout/");

    useEffect(() => {
        if (cart.length < 1 || cartProduct.length < 1 || cart.length !== cartProduct.length) return;

        setAvailableCheckout(true);
    }, [cart, cartProduct]);

    return (
        <React.Fragment>
            <Head>
                <title>Shopping Cart - Proceed to Checkout | WESTSHADE</title>
                <meta name="description" content="Free shipping on orders over $100. Add products to your shopping cart and proceed to checkout to place your order."/>
            </Head>
            <Block className="container-display" maxWidth="1152px !important" paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]} marginRight="auto" marginLeft="auto">
                {cart.length > 0 ? (
                    <Block display={["block", "block", "grid"]} flexDirection={["column", "column", "row"]} gridTemplateColumns={["", "", "auto 332px"]}
                           gridColumnGap="64px">
                        <Block position="relative" marginBottom="24px">
                            <Block position="sticky" top={["64px", null, "116px"]} display="flex" alignItems="center" justifyContent="space-between" padding={["8px 0", "16px 0"]} backgroundColor="white" font="MinXHeading20"
                                   color="MinXPrimaryText"
                                   $style={{zIndex: "9"}}>
                                <Block>Shopping cart</Block>
                                <Button shape={SHAPE.square} kind={KIND.minimal}
                                        startEnhancer={() => (
                                            <Block position="relative" width="20px" marginRight="8px">
                                                <Image src={"/images/icon/icon-delete.png"} alt="delete" layout="responsive" width={40} height={40} objectFit="contain"/>
                                            </Block>
                                        )}
                                        overrides={{
                                            BaseButton: {
                                                props: {
                                                    className: clsx([styles["empty-button"]])
                                                },
                                            },
                                        }}
                                        onClick={() => setShowClear(true)}
                                >
                                    Empty cart
                                </Button>
                            </Block>
                            <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "16px", "22px"]} marginTop={["32px", null, "47px"]}>
                                {cart.length > 0 && cartProduct.length > 0
                                    ? cartProduct.map((product, index) => {
                                        return (
                                            <Block key={index} display="flex" flexDirection={["column", "row"]} justifyContent="space-between">
                                                <Block display="flex" flexDirection="row" marginBottom="16px">
                                                    <Block position="relative" width={["60px", "120px"]} height={["60px", "120px"]} marginRight={["15px", "24px"]}>
                                                        {product.images.length > 0 ? (
                                                            <Image src={product.images[0].src} alt={product.images[0].alt} layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
                                                        ) : (
                                                            <Image src={"/images/product/default-product.webp"} alt={product.name} layout="fill" objectFit="contain"/>
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
                                                <Block display="flex" flexDirection={["row", "column"]} alignItems={["center", "flex-end"]} marginBottom="16px">
                                                    <Block display="flex" flexDirection={["row", "column"]} flex={[1, 0]} justifyContent="flex-start"
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
                                                               onClick={() => handleRemoveFromCart(index)}
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
                                                                    onClick={() => handleMinusToCart(index)}
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
                                                                    onClick={() => handlePlusToCart(index)}
                                                            >
                                                                <Plus/>
                                                            </Button>
                                                        </Block>
                                                    </Block>
                                                    <Block display="grid" gridTemplateColumns="1fr" gridRowGap="6px" paddingLeft="20px" font="MinXLabel14" color="MinXPrimaryText" $style={{fontWeight: 700}}>
                                                        <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price} displayType={"text"} style={product.on_sale ? {textDecoration: "line-through"} : {}}/>
                                                        {product.on_sale ?
                                                            <Block color="#F07C7C">
                                                                {(product.sale_price === "" || product.sale_price === "0" || product.sale_price === 0 || !product.sale_price) ? "Free" :
                                                                    <NumberFormat thousandSeparator={true} prefix={"$"} value={product.sale_price} displayType={"text"}/>
                                                                }
                                                            </Block> : null}
                                                    </Block>
                                                </Block>
                                            </Block>
                                        )
                                    }) : null}
                            </Block>
                        </Block>
                        <Block marginTop="24px" marginBottom="24px">
                            <Block position={["relative", "relative", "sticky"]} top={["", "", "120px"]}>
                                <OrderSummary.V1 cart={cart} cartProduct={cartProduct} bottomDivider/>
                                <Block width="100%" height="40px" marginBottom="24px" font="MinXLabel16" color="MinXPrimaryTextAlt">
                                    <Button shape={SHAPE.pill}
                                            overrides={{
                                                BaseButton: {
                                                    props: {
                                                        className: styles["checkout-button"],
                                                    },
                                                    style: ({$theme}) => ({
                                                        backgroundColor: !availableCheckout ? "#e0e0e0" : $theme.colors.MinXButton,
                                                        ":hover": !availableCheckout ? {} : {backgroundColor: $theme.colors.MinXButtonHover},
                                                        ":active": !availableCheckout ? {} : {backgroundColor: $theme.colors.MinXButtonActive},
                                                    }),
                                                },
                                            }}
                                            onClick={goPreCheckout}
                                            disabled={!availableCheckout}
                                    >
                                        CHECKOUT
                                    </Button>
                                </Block>
                                <ShippingNote.V1 direction="column"/>
                            </Block>
                        </Block>
                    </Block>
                ) : (
                    <Block display="flex" flex={1} flexDirection="column" alignItems="center" paddingTop={["114px", "114px", "66px"]} paddingBottom={["114px", "114px", "66px"]}>
                        <Block marginBottom="18px"><Cart style={{width: "24px", height: "24px"}} color={"#323232"}/></Block>
                        <Block font="MinXParagraph16" color="MinXPrimaryText">Your shopping cart is empty</Block>
                    </Block>
                )}
                {/*TODO: 相关产品模组*/}
                {/*<Block position="relative" marginBottom="24px">*/}
                {/*    <Block marginBottom={["32px", "47px"]} paddingTop="24px" font="MinXHeading20" color="MinXPrimaryText">Accessories might need</Block>*/}
                {/*</Block>*/}
            </Block>
            <Modal type="alertdialog" isOpen={showLoading} onClose={() => setShowLoading(false)} content="loading"/>
            <Modal type="alertdialog" isOpen={showClear} onClose={() => setShowClear(false)} header="Are you sure?"
                   dialogStyles={{padding: "0px 40px 20px"}}
                   footer={
                       <Block display="grid" gridTemplateColumns="repeat(2, 94px)" gridColumnGap="40px" height="40px" justifyContent="center">
                           <Button kind={KIND.minimal} shape={SHAPE.pill}
                                   overrides={{
                                       BaseButton: {
                                           props: {
                                               className: clsx([styles["confirm-empty-button"]])
                                           },
                                       },
                                   }}
                                   onClick={() => handleClearCart()}
                           >
                               Empty
                           </Button>
                           <Button kind={KIND.minimal} shape={SHAPE.pill}
                                   overrides={{
                                       BaseButton: {
                                           props: {
                                               className: clsx([styles["cancel-empty-button"]])
                                           },
                                       },
                                   }}
                                   onClick={() => setShowClear(false)}
                           >
                               Cancel
                           </Button>
                       </Block>
                   }
            >
                <Block font="MinXParagraph12">Once you empty the cart, this cannot be undo.</Block>
            </Modal>
        </React.Fragment>
    );
}

export default withRouter(Cart_Page);
