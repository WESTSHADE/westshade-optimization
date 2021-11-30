import React from "react";

import {Block} from "baseui/block";

import {DateFn} from "../../../utils/tools";

const dateFn = new DateFn();

const shippedDay = dateFn.getReceivedDay();

const shipping_note = (props) => {
    const {direction = "row"} = props;

    return (
        <Block height="auto" display="grid" gridTemplateColumns={direction === "column" ? "1fr" : ["1fr", "repeat(2, 1fr)"]} gridColumnGap="16px" gridRowGap="16px" marginLeft="auto" marginRight="auto" {...props}>
            <Block display="flex" flexDirection="row">
                <img src={"/images/icon/delivery.png"} style={{width: 20, height: 20, marginRight: 12}} alt={"free shipping"}/>
                <Block font="MinXParagraph14">
                    <Block>Free shipping on orders over $149</Block>
                    <Block>Order today, shipped by {shippedDay}.</Block>
                    <Block marginTop="4px" font="MinXParagraph12" color="MinXSecondaryText">Custom printing orders do not apply.</Block>
                </Block>
            </Block>
            <Block display="flex" flexDirection="row">
                <img src={"/images/icon/pickup.png"} style={{width: 20, height: 20, marginRight: 12}} alt={"pick up"}/>
                <Block font="MinXParagraph14">
                    Pick up in <span style={{color: "rgb(35, 164, 173)"}}>warehouse</span>
                </Block>
            </Block>
        </Block>
    )
}

export default shipping_note;
