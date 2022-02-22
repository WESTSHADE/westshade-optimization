import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox} from "baseui/aspect-ratio-box";

import {DateFn} from "Utils/tools";

const dateFn = new DateFn();

const shippedDay = dateFn.getReceivedDay();

const ShippingNote = (props) => {
    const {direction = "row"} = props;

    return (
        <Block height="auto" display="grid" gridTemplateColumns={direction === "column" ? "1fr" : ["1fr", "repeat(2, 1fr)"]} gridColumnGap="16px" gridRowGap="16px" marginLeft="auto" marginRight="auto" {...props}>
            <Block display="flex" flexDirection="row">
                <AspectRatioBox aspectRatio={1} width="20px" height="20px" marginRight="12px">
                    <Image src="/images/icon/delivery.png" alt="free shipping" layout="fill" objectFit="contain"/>
                </AspectRatioBox>
                <Block font="MinXParagraph14">
                    <Block>Free shipping on orders over $149</Block>
                    <Block>Order today, shipped by {shippedDay}.</Block>
                    <Block marginTop="4px" font="MinXParagraph12" color="MinXSecondaryText">Custom printing orders do not apply.</Block>
                </Block>
            </Block>
            <Block display="flex" flexDirection="row">
                <AspectRatioBox aspectRatio={1} width="20px" height="20px" marginRight="12px">
                    <Image src="/images/icon/pickup.png" alt="pick up" layout="fill" objectFit="contain"/>
                </AspectRatioBox>
                <Block font="MinXParagraph14">
                    Pick up in <span style={{color: "rgb(35, 164, 173)"}}>warehouse</span>
                </Block>
            </Block>
        </Block>
    )
}

export default ShippingNote;
