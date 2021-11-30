import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../../sandwich";

const sizes = ["10x10", "10x15", "13x13", "10x20", "16x16", "13x20", "13x26", "20x20"]

const TentSizeDisplay = () => {
    return (
        <Block width="100%" display="grid" gridTemplateColumns={["repeat(3, 1fr)", "repeat(4, 1fr)", "repeat(4, 1fr)", "repeat(8, 1fr)"]} gridColumnGap="8px" gridRowGap="24px" justifyItems="center">
            {sizes.map((size, index) => {
                let number = size.split("x");
                return (
                    <Sandwich key={index} src={"images/icon/icon-" + size + ".png"} alt={`Tent Size ${size}`} title={`${number[0]}’ x ${number[1]}’`} containerImageProps={{minWidth: "60px", width: "76%"}}
                              titleProps={{font: "MinXLabel14"}} titleColor="MinXSecondaryText"
                    />
                )
            })}
        </Block>
    )
}

export default TentSizeDisplay;
