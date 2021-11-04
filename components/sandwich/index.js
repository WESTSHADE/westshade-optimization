import React from "react";

import {Block} from "baseui/block";
import Image from "next/image";

const Sandwich = ({
                      containerProps,
                      containerImageProps,
                      containerTextProps,
                      imageProps,
                      titleProps,
                      contentProps,
                      src = "",
                      alt = "",
                      objectFit = "contain",
                      title = "",
                      content = "",
                      titleColor = "MinXPrimaryText",
                      contentColor = "MinXPrimaryText"
                  }) => {

    return (
        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="8px" width="100%" height="fit-content" {...containerProps}
               overrides={{
                   Block: {
                       style: {
                           textAlign: "center"
                       },
                   },
               }}
        >
            {src ? (
                <Block position="relative" width="100%" marginRight="auto" marginLeft="auto" {...containerImageProps}
                       overrides={{
                           Block: {
                               style: {
                                   aspectRatio: 1
                               }
                           }
                       }}
                >
                    <Image src={src} alt={alt} layout="fill" objectFit={objectFit} quality={100} {...imageProps} />
                < /Block>
            ) : null}
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap="8px" justifyContent="center" marginRight="auto" marginLeft="auto" {...containerTextProps}>
                {title ? (
                    <Block font={["MinXLabel16", "MinXLabel24"]} color={titleColor} {...titleProps}
                           overrides={{
                               Block: {
                                   style: {
                                       whiteSpace: "nowrap"
                                   }
                               }
                           }}
                    >{title}</Block>
                ) : null}
                {content ? (
                    <Block font="MinXParagraph14" color={contentColor} {...contentProps}>{content}</Block>
                ) : null}
            </Block>
        </Block>
    )
}

export default Sandwich;
