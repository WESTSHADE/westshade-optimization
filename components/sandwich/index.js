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
        <Block className="text-center" display="grid" gridTemplateColumns="1fr" gridRowGap="8px" width="100%" height="fit-content" {...containerProps}>
            {src ? (
                <AspectRatioBox aspectRatio={1} width="100%" marginRight="auto" marginLeft="auto" {...containerImageProps}>
                    <Image src={src} alt={alt} layout="fill" objectFit={objectFit}  {...imageProps} />
                < /AspectRatioBox>
            ) : null}
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap="8px" justifyContent="center" marginRight="auto" marginLeft="auto" {...containerTextProps}>
                {title ? <Block font={["MinXLabel16", "MinXLabel24"]} color={titleColor} $style={{whiteSpace: "nowrap"}} {...titleProps}>{title}</Block> : null}
                {content ? <Block font="MinXParagraph14" color={contentColor} {...contentProps}>{content}</Block> : null}
            </Block>
        </Block>
    )
}

export default Sandwich;
