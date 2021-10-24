import React from "react";

import Link from "next/link";

import {Block} from "baseui/block";

import MButton from "../../button-n";

const Bar = ({title, subTitle, subTitleDestination, buttonText, onClick}) => {
    return (
        <Block position="sticky" top={["47px", "47px", "95px"]} display="flex" alignItems="center" justifyContent="center" height={["44px", "60px"]}
               marginTop="-1px" paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]} backgroundColor="white"
               font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText"
               overrides={{
                   Block: {
                       style: {zIndex: 2, boxShadow: "rgb(0 0 0 / 14%) 0px 4px 5px 0px"},
                   },
               }}>
            <Block width="100%" maxWidth="1920px" display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                <div>{title}</div>
                <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Block display="flex" justifyContent="center" alignItems="center" width="56px" height={["24px", "40px"]} marginRight="16px" marginLeft="16px"
                           font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText"
                    >
                        <Link href={subTitleDestination}>{subTitle}</Link>
                    </Block>
                    <MButton width={["105px", "113px"]} height={["24px", "40px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} text={buttonText}
                             onClick={onClick}
                    />
                </Block>
            </Block>
        </Block>
    )
}

export default Bar;
