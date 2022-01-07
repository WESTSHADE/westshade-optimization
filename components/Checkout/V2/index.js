import React from "react";
import NumberFormat from "react-number-format";

import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox} from "baseui/aspect-ratio-box";
import {ChevronUp, CheckIndeterminate, Plus} from "baseui/icon";

import Button from "../../button-n";
import ThemeProvider from "../../ThemeProvider";

import {DateFn} from "Utils/tools";

import styles from "./checkout.module.scss";

const dateFn = new DateFn();

const shippedDay = dateFn.getReceivedDay();

const Quantity = (props) => {
    const {quantity = 1, isInStock = true} = props;

    return (
        <div className={styles["container-quantity"]}>
            <Button type="text" shape="circle" width="24px" height="24px" buttonClassName={styles["button-minus"]} onClick={props.onClickMinus} disabled={quantity === 1}><CheckIndeterminate/></Button>
            <Block className={styles["quantity"]} font="MinXLabel16">{quantity}</Block>
            <Button type="text" shape="circle" width="24px" height="24px" buttonClassName={styles["button-plus"]} onClick={props.onClickPlus} disabled={!isInStock}><Plus/></Button>
        </div>
    );
};

const Checkout = (props) => {
    const {totalPrice = 0, totalSalesPrice = 0, onSale = false, isAvailable = true, isInStock = true, buttonText = "Add to Bag"} = props;

    return (
        <ThemeProvider.V1>
            <Block className={`${styles["container-checkout"]} main-container-checkout`} height={["92px", null, "68px"]} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                <Block className={`${styles["inner-container"]}`} maxWidth={process.env.maxWidth + "px"}>
                    <Block className={`${styles["section-bottom"]}`} height={["48px", null, "100%"]}>
                        <Block display={["none", null, "flex"]} alignItems="center" justifyContent="center" $style={{gap: "12px"}}>
                            <AspectRatioBox aspectRatio={1} width="20px" height="20px" minWidth="20px">
                                <Image src="/images/icon/delivery.png" alt="free shipping" layout="fill" objectFit="contain"/>
                            </AspectRatioBox>
                            <Block font="MinXParagraph14">{`Order today, shipped by ${shippedDay}.`}</Block>
                        </Block>
                        <Block display="flex" justifyContent="space-between" width={["100%", null, "max-content"]} alignItems="center" $style={{gap: "32px"}}>
                            <Button shape="circle" width="32px" height="32px" buttonClassName={`${styles["button-summary"]}`} buttonHoverBackgroundColor="#E8E8E8" onClick={props.onClick}>
                                <ChevronUp color="#808080" size="25px"/>
                            </Button>
                            <Block font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText" $style={{fontWeight: "700 !important"}}>
                                {onSale ? (
                                    <Block display="flex" flexDirection="row" justifyContent="flex-end" $style={{gap: "10px"}}>
                                        {totalSalesPrice === 0 ? <Block color="#F07C7C">Free</Block> :
                                            <NumberFormat thousandSeparator={true} prefix={"$"} value={totalSalesPrice} displayType={"text"} style={{color: "#F07C7C"}}/>}
                                        <NumberFormat thousandSeparator={true} prefix={"$"} value={totalPrice} displayType={"text"} style={{textDecoration: "line-through"}}/>
                                    </Block>
                                ) : (
                                    <NumberFormat thousandSeparator={true} prefix={"$"} value={totalPrice} displayType={"text"}/>
                                )}
                            </Block>
                            <Block className={`${styles["section-top"]}`} position={["absolute", null, "relative"]} top={[0, null, "unset"]} width={["100%", null, "unset"]} height={["44px", null, "unset"]}>
                                <Block position="absolute" left={0} display={["block", null, "none"]} font="MinXParagraph12" color="MinXSecondaryText">Quantity:</Block>
                                <Quantity quantity={props.quantity} isInStock={isInStock} onClickMinus={props.onClickMinus} onClickPlus={props.onClickPlus}/>
                            </Block>
                            <Button bundle="primary" width={["128px", null, "100%"]} minWidth={["128px", null, "182px"]} height={["40px", null, "48px"]} font="MinXParagraph16" color="white" text={buttonText} disabled={!isAvailable}
                                    onClick={props.onClickAddToBag}/>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </ThemeProvider.V1>
    );
};

export default Checkout;
