import React from "react";
import clsx from "clsx";

import Link from "next/link";

import {Block} from "baseui/block";

import Button from "../../button-n";

const Bar = ({containerClassName, title, subTitle, subTitleDestination, buttonText, onClick}) => {
    return (
        <Block position="sticky" top="92px" font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText"
               overrides={{
                   Block: {
                       props: {
                           className: clsx(["glassmorphism", containerClassName])
                       },
                       style: {
                           zIndex: 2
                       },
                   },
               }}
        >
            <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" height="40px"
                   overrides={{
                       Block: {
                           props: {
                               className: clsx(["m-subheader-wrap", "m-wrap-side"])
                           },
                       },
                   }}
            >
                <div>{title}</div>
                <Block display="grid" gridTemplateColumns="repeat(2, max-content)" gridColumnGap="16px" alignItems="center">
                    <Block font="MinXLabel14" color="MinXPrimaryText">
                        <Link href={subTitleDestination}>{subTitle}</Link>
                    </Block>
                    <Button width="105px" height="28px" font="MinXLabel14" text={buttonText} onClick={onClick}/>
                </Block>
            </Block>
        </Block>
    )
}

export default Bar;
