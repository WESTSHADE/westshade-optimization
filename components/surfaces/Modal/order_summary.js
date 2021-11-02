import React from "react";

import {Block} from "baseui/block";

import styles from "./modal.module.scss";

import Shipping from "../../sections/ShippingNote";

export default function content({dataTable}) {
    return (
        <Block width={["100%", "448px", "702px"]} marginTop={["62px", "62px", "32px"]} marginRight={"auto"} marginBottom="32px" marginLeft={"auto"}
               paddingRight={["0px", "0px", "56px"]} paddingBottom={["62px", "62px", "0px"]} paddingLeft={["0px", "0px", "56px"]}
        >
            <Block display={"flex"} flexDirection={"column"} height={["520px", "520px", "368px"]} marginBottom={["16px", "16px", "32px"]} backgroundColor={"white"} overflow="hidden"
                   overrides={{
                       Block: {
                           props: {
                               className: styles["inner-container-radius"]
                           }
                       }
                   }}
            >
                {dataTable}
            </Block>
            <Shipping/>
        </Block>
    )
}
