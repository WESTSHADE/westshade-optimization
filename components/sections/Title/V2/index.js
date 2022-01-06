import React from "react";

import {Block} from "baseui/block";

const Title = ({category, title, content}) => {
    return (
        <Block className="text-center" display="grid" gridTemplateColumns="1fr" gridRowGap={["8px", null, "16px"]} maxWidth="676px" justifyItems="center" margin="auto">
            {category ? (
                <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading20"]} color="#33DED2"
                       overrides={{
                           Block: {
                               style: {
                                   fontWeight: "500 !important", letterSpacing: "0.1em", lineHeight: "1em !important", textTransform: "uppercase"
                               }
                           },
                       }}
                >{category}</Block>
            ) : null}
            {title ? (
                <Block font={["MinXTitle24", "MinXTitle24", "MinXTitle44"]} color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               style: {fontWeight: "700 !important", lineHeight: "1em !important", textTransform: "capitalize"}
                           },
                       }}
                >{title}</Block>
            ) : null}
            {content ? (
                <Block as="p" font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]} color="MinXSecondaryText"
                       overrides={{
                           Block: {
                               style: {fontWeight: "400 !important", lineHeight: "1.5em !important"}
                           },
                       }}
                >{content}</Block>
            ) : null}
        </Block>
    )
}

export default Title;
