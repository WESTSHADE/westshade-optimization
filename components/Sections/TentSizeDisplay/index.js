import React from "react";

import {Block} from "baseui/block";

import Sandwich from "../Sandwich";

const sizes = ["10x10", "10x15", "13x13", "10x20", "16x16", "13x20", "13x26", "20x20"]

const TentSizeDisplay = () => {
    return (
        <Block width="100%" display="grid" gridTemplateColumns={["repeat(3, 1fr)", "repeat(4, 1fr)", null, "repeat(8, 1fr)"]} gridColumnGap="8px" gridRowGap="24px" justifyItems="center">
            {sizes.map(size => {
                const number = size.split("x");
                return (
                    <Sandwich key={size} src={"/images/icon/icon-" + size + ".png"} alt={`tent size ${size}`} title={`${number[0]}’ x ${number[1]}’`}
                              titleProps={{font: ["MinXLabel12", "MinXLabel12", "MinXLabel12", "MinXLabel14"]}} titleStyle={{fontWeight: "400 !important"}} titleColor="MinXSecondaryText"
                    />
                )
            })}
        </Block>
    )
}

export default TentSizeDisplay;
