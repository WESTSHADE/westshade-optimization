import React from "react";

import {Block} from "baseui/block";

export default function content() {
    return (
        <Block width="100%" maxWidth={["288px", "334px", "580px"]} display="grid" gridTemplateColumns="1fr" gridRowGap="16px" justifyItems="center" marginRight={"auto"} marginLeft={"auto"}
               paddingTop={["36px", "54px"]} paddingRight={["36px", "54px"]} paddingBottom={["36px", "54px"]} paddingLeft={["36px", "54px"]}
               overrides={{
                   Block: {
                       style: {textAlign: "center"}
                   }
               }}
        >
            {/*<div className="loader"/>*/}
            <div className="loader-circle"/>
            <Block font="MinXLabel20">Please wait...</Block>
            <Block maxWidth={["207px", "325px"]} font="MinXParagraph16">We are working hard to bring the page to you. Thank you for your patience!</Block>
        </Block>
    )
}
