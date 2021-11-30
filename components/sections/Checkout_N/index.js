import React from "react";
import NumberFormat from "react-number-format";
import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";

import ChevronUp from "baseui/icon/chevron-up";
import CheckIndeterminate from "baseui/icon/check-indeterminate";
import Plus from "baseui/icon/plus";

import styles from "./checkout.module.scss";

import {DateFn} from "../../../utils/tools";
import MButton from "../../button-n";

const dateFn = new DateFn();

const shippedDay = dateFn.getReceivedDay();

const Quantity = (props) => {
    const {quantity = 1, isInStock = true} = props;

    return (
        <div className={styles["container-quantity"]}>
            <Button kind={KIND.tertiary} shape={SHAPE.circle}
                    overrides={{
                        BaseButton: {
                            props: {
                                className: styles["button-minus"]
                            },
                        },
                    }}
                    onClick={props.onClickMinus}
                    disabled={quantity === 1}
            >
                <CheckIndeterminate/>
            </Button>
            <Block font="MinXLabel16"
                   overrides={{
                       Block: {
                           props: {
                               className: styles["quantity"]
                           },
                       },
                   }}
            >{quantity}</Block>
            <Button kind={KIND.tertiary} shape={SHAPE.circle}
                    overrides={{
                        BaseButton: {
                            props: {
                                className: styles["button-plus"]
                            },
                        },
                    }}
                    onClick={props.onClickPlus}
                    disabled={!isInStock}
            >
                <Plus/>
            </Button>
        </div>
    );
};

const checkout = (props) => {
    const {totalPrice = 0, totalSalesPrice = 0, onSale = false, isAvailable = true, isInStock = true, buttonText = "Add to Bag"} = props;

    return (
        <Block className={styles["container-checkout"]} position="fixed" width="100vw" height={["94px", "68px"]} paddingRight={["24px", "16px", "32px"]} paddingLeft={["24px", "16px", "32px"]}>
            <Block maxWidth="1440px" height="100%" marginRight="auto" marginLeft="auto">
                {/* 屏宽 小于 480 */}
                <Block position={"relative"} display={["block", "none"]} height={"40px"}>
                    <div className={styles["section-top"]}>
                        <div className={styles["text-quantity"]}>Quantity:</div>
                    </div>
                    <Block position={"absolute"} left={0} right={0} top={0} bottom={0} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Quantity quantity={props.quantity} isInStock={isInStock} onClickMinus={props.onClickMinus} onClickPlus={props.onClickPlus}/>
                    </Block>
                </Block>
                <Block width={["100%", "448px", "100%"]} height={["54px", "100%"]} display={"flex"} flexDirection={"row"} justifyContent={["center", "center", "space-between"]} alignItems={"center"} margin={"auto"}>
                    <Block display={["none", "none", "flex"]} alignItems="column" justifyContent="center">
                        <Block display="flex" flexDirection="row">
                            <img src={"images/icon/delivery.png"} style={{width: 20, height: 20, marginRight: 12}} alt={"free shipping"}/>
                            <Block font="MinXParagraph14">Order today, shipped by {shippedDay}.</Block>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns="repeat(4, auto)" gridColumnGap="24px" alignItems="center">
                        <Button
                            shape={SHAPE.circle}
                            overrides={{
                                BaseButton: {
                                    style: () => ({width: "32px", height: "32px", backgroundColor: "white", boxShadow: "0px 2px 6px 0px rgba(0, 0, 0, 0.2)"}),
                                },
                            }}
                            onClick={props.onClick}
                        >
                            <ChevronUp color={"#808080"} size={"25px"}/>
                        </Button>
                        <div style={{color: "#262626", fontSize: 16, fontWeight: "700"}}>
                            {onSale ? (
                                <Block display="flex" flexDirection="row" justifyContent="flex-end" font="MinXLabel16">
                                    {totalSalesPrice == 0 ? <Block marginRight="10px" color="#F07C7C">Free</Block> :
                                        <NumberFormat thousandSeparator={true} prefix={"$"} value={totalSalesPrice} displayType={"text"} style={{color: "#F07C7C", marginRight: 10}}/>}
                                    <NumberFormat thousandSeparator={true} prefix={"$"} value={totalPrice} displayType={"text"} style={{textDecoration: "line-through"}}/>
                                </Block>
                            ) : (
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={totalPrice} displayType={"text"}/>
                            )}
                        </div>
                        <Block display={["none", "block"]}>
                            <Quantity quantity={props.quantity} isInStock={isInStock} onClickMinus={props.onClickMinus} onClickPlus={props.onClickPlus}/>
                        </Block>
                        {/*<Block width={["116px", "148px", "160px"]}>*/}
                        {/*<Button shape={SHAPE.pill}*/}
                        {/*        overrides={{*/}
                        {/*            BaseButton: {*/}
                        {/*                style: () => ({width: "100%", height: "40px", fontSize: "16px", backgroundColor: "#23A4AD"}),*/}
                        {/*            },*/}
                        {/*        }}*/}
                        {/*        onClick={props.onClickAddToBag}*/}
                        {/*        disabled={!isAvailable}*/}
                        {/*>*/}
                        {/*    {buttonText}*/}
                        {/*</Button>*/}
                        {/*</Block>*/}
                        <MButton type="solid" minWidth={["116px", "148px", "160px"]} height="40px" font="MinXParagraph16" text={buttonText} color="white" disabled={!isAvailable}
                                 onClick={props.onClickAddToBag}
                        />
                    </Block>

                </Block>
            </Block>
        </Block>
    );
};

export default checkout;
