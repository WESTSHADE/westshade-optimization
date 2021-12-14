import React from "react";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {CheckIndeterminate, Plus} from "baseui/icon";

import MButton from "../../button-n";
import Shipping from "../../sections/ShippingNote";

import styles from "./checkout.module.scss";

const Quantity = (props) => {
    const {quantity = 1, isInStock = true, onClickMinus, onClickPlus} = props;

    return (
        <Block font="MinXLabel14"
               overrides={{
                   Block: {
                       props: {
                           className: clsx([styles["container-product-section"], styles["quantity"]])
                       },
                   },
               }}
        >
            <Block marginBottom="16px" font="MinXLabel16">Quantity</Block>
            <Block display="flex" flexDirection="row" justifyContent="center" font="MinXLabel32" color="MinXPrimaryText">
                <Button kind={KIND.minimal} shape={SHAPE.circle}
                        overrides={{
                            BaseButton: {
                                props: {
                                    className: styles["button-quantity"]
                                },
                            },
                        }}
                        onClick={onClickMinus}
                        disabled={quantity === 1}
                >
                    <CheckIndeterminate size={24}/>
                </Button>
                <Block display="flex" justifyContent="center" alignItems="center" font="MinXLabel14" color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               props: {
                                   className: clsx([styles["button-quantity"], styles["display"]])
                               },
                           },
                       }}
                >{quantity}</Block>
                <Button kind={KIND.minimal} shape={SHAPE.circle}
                        overrides={{
                            BaseButton: {
                                props: {
                                    className: styles["button-quantity"]
                                },
                            },
                        }}
                        onClick={onClickPlus}
                        disabled={!isInStock}
                >
                    <Plus size={24}/>
                </Button>
            </Block>
            {!isInStock ? (
                <Block position="absolute" right={0} bottom={0} left={0} font="MinXLabel16" color="MinXPrimaryText">Out of stock</Block>
            ) : null}
        </Block>
    );
};

const checkout = (props) => {
    const {totalRegularPrice = "0", totalSalePrice = "", regularPrice = "0", salePrice = "", quantity = 1, shippedDay = "Monday", isAvailable = true, isInStock = true, onClickMinus, onClickPlus, addToBag, buttonText = "Add to Bag"} = props;

    return (
        <>
            <Quantity quantity={quantity} isInStock={isInStock} onClickMinus={onClickMinus} onClickPlus={onClickPlus}/>
            <Block width="100%" paddingTop="32px" paddingRight={["16px", "16px", "24px"]} paddingBottom="32px" paddingLeft={["16px", "16px", "24px"]} backgroundColor="MinXBackground">
                <Block marginBottom="20px" color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               props: {
                                   className: styles["divider"]
                               },
                           },
                       }}
                >
                    <Block display="flex" flexDirection="row" alignItems="flex-end" marginBottom="20px" font="MinXHeading20">
                        {"$" + parseFloat(totalSalePrice ? totalSalePrice : totalRegularPrice).toFixed(2)}
                        <Block marginLeft="8px" font="MinXHeading16">in total</Block>
                    </Block>
                    {salePrice ? (
                        <Block display="flex" flexDirection="row" marginBottom="12px" font="MinXParagraph14" color={"#F07C7C"}>
                            {"Price: $" + parseFloat(salePrice).toFixed(2) + " each"}
                        </Block>
                    ) : null}
                    <Block display="flex" flexDirection="row" marginBottom="12px" font="MinXParagraph14"
                           overrides={{
                               Block: {
                                   style: salePrice ? {textDecoration: "line-through"} : null
                               },
                           }}
                    >
                        {"Price: $" + parseFloat(regularPrice).toFixed(2) + " each"}
                    </Block>
                    <Block display="flex" flexDirection="row" marginBottom="20px" font="MinXParagraph14">{`Qty: ${quantity}`}</Block>
                </Block>
                <Shipping direction="column" marginBottom="20px"/>
                <MButton width={["100%", "448px", "100%"]} height="56px" marginRight="auto" marginLeft="auto" font="MinXLabel16" text={buttonText} bundle="primary" onClick={addToBag} disabled={!isAvailable}/>
            </Block>
        </>
    );
};

export default checkout;
