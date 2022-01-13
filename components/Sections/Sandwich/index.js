import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox} from 'baseui/aspect-ratio-box';

const Sandwich = ({
                      containerProps,
                      containerImageProps,
                      containerTextProps,
                      imageProps,
                      titleProps,
                      titleStyle,
                      contentProps,
                      contentStyle,
                      src = "",
                      alt = "",
                      objectFit = "contain",
                      title = "",
                      content = "",
                      titleColor = "MinXPrimaryText",
                      contentColor = "MinXPrimaryText"
                  }) => {
    return (
        <Block className="text-center" display="grid" gridTemplateColumns="1fr" gridTemplateRows={src ? "max-content 1fr" : "1fr"} gridRowGap={["12px", null, "24px"]} width="100%" height="100%" {...containerProps}>
            {src ? (
                <AspectRatioBox aspectRatio={1} width="80%" marginRight="auto" marginLeft="auto" {...containerImageProps}>
                    <Image src={src} alt={alt} layout="fill" objectFit={objectFit}  {...imageProps} />
                < /AspectRatioBox>
            ) : null}
            <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="auto 1fr" gridRowGap="8px" justifyContent="center" marginRight="auto" marginLeft="auto" {...containerTextProps}>
                {title ? <Block font={["MinXLabel16", "MinXLabel24"]} color={titleColor} $style={{whiteSpace: "nowrap", ...titleStyle}} {...titleProps}>{title}</Block> : null}
                {content ? <Block font="MinXParagraph14" color={contentColor} $style={{...contentStyle}} {...contentProps}>{content}</Block> : null}
            </Block>
        </Block>
    )
}

export default Sandwich;
