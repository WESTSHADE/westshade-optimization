import React from "react";
import clsx from "clsx";

import {Block} from "baseui/block";
import {CheckIndeterminate, Plus} from "baseui/icon";

import Button from "Components/Button/V1";
import Shipping from "Components/Sections/ShippingNote";

import styles from "./checkout.module.scss";

const Quantity = (props) => {
    const {quantity = 1, isInStock = true, onClickMinus, onClickPlus} = props;

    return (
        <Block className={clsx([styles["container-product-section"], styles["quantity"]])} font="MinXLabel14">
            <Block marginBottom="16px" font="MinXLabel16">Quantity</Block>
            <Block display="flex" flexDirection="row" justifyContent="center" font="MinXLabel32" color="MinXPrimaryText">
                <Button type="outline" shape="circle" buttonClassName={styles["button-quantity"]} color="#262626" onClick={onClickMinus} disabled={quantity === 1}><CheckIndeterminate size={24}/></Button>
                <Block className={clsx([styles["button-quantity"], styles["display"]])} display="flex" justifyContent="center" alignItems="center" font="MinXLabel14" color="MinXPrimaryText">{quantity}</Block>
                <Button type="outline" shape="circle" buttonClassName={styles["button-quantity"]} color="#262626" onClick={onClickPlus} disabled={!isInStock}><Plus size={24}/></Button>
            </Block>
            {!isInStock ? <Block position="absolute" right={0} bottom={0} left={0} font="MinXLabel16" color="MinXPrimaryText">Out of stock</Block> : null}
        </Block>
    );
};

const Checkout = (props) => {
    const {totalRegularPrice = "0", totalSalePrice = "", regularPrice = "0", salePrice = "", quantity = 1, isAvailable = true, isInStock = true, onClickMinus, onClickPlus, addToBag, buttonText = "Add to Bag"} = props;

    return (
        <>
            <Quantity quantity={quantity} isInStock={isInStock} onClickMinus={onClickMinus} onClickPlus={onClickPlus}/>
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap="20px" width="100%" padding={["32px 16px", null, "32px 24px"]} backgroundColor="MinXBackground">
                <Block className={styles["divider"]} paddingBottom="20px" font="MinXParagraph14" color="MinXPrimaryText">
                    <Block marginBottom="20px" font="MinXHeading20">
                        {`$${parseFloat(totalSalePrice ? totalSalePrice : totalRegularPrice).toFixed(2)}`}<Block as="span" marginLeft="8px" font="MinXHeading16">in total</Block>
                    </Block>
                    {salePrice ? <Block display="flex" flexDirection="row" marginBottom="12px" color="#F07C7C">{`Price: $${parseFloat(salePrice).toFixed(2)} each`}</Block> : null}
                    <Block display="flex" flexDirection="row" marginBottom="12px" $style={salePrice ? {textDecoration: "line-through"} : null}>{`Price: $${parseFloat(regularPrice).toFixed(2)} each`}</Block>
                    <Block>{`Qty: ${quantity}`}</Block>
                </Block>
                <Shipping direction="column" marginLeft="unset"/>
                <Button bundle="primary" width={["100%", "448px", "100%"]} height="56px" marginRight="auto" marginLeft="auto" font="MinXLabel16" text={buttonText} onClick={addToBag} disabled={!isAvailable}/>
            </Block>
        </>
    );
};

export default Checkout;
