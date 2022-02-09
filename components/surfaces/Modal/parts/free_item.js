import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";

const ProductItem = ({src, alt, title, content, count}) => {
    return (
        <Block position="relative" display="grid" gridTemplateColumns={["60px 1fr", null, "100px 1fr"]} gridColumnGap={["8px", null, "24px"]} width="100%" padding={["8px", null, "16px"]} backgroundColor="#F7F7F7"
               overflow="hidden" $style={{borderRadius: "8px"}}
        >
            <Block position="relative" width={["60px", null, "100px"]} height={["60px", null, "100px"]} backgroundColor="white" $style={{borderRadius: "8px"}}>
                <Image src={src} alt={alt} layout="responsive" width={1024} height={1024} objectFit="contain"/>
            </Block>
            <Block padding="4px 0">
                <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading16"]}>{title}</Block>
                <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]}>
                    <Block as="span" marginRight="8px" font={["MinXLabel16", "MinXLabel16", "MinXLabel18"]} color="#FF7847">Free</Block>
                    Value: {content}
                </Block>
                <Block font="MinXParagraph14" color="MinXSecondaryText">{count}</Block>
            </Block>
            {/*Corner Ribbon*/}
            <Block className="text-center" width="150px" position="absolute" bottom="10px" right="-55px" backgroundColor="#F5FCFC" font="MinXParagraph14" color="#23A4AD"
                   $style={{border: "1px solid #23A4AD", transform: "rotate(-45deg)"}}>
                Free
            </Block>
        </Block>
    )
}

export default function content() {
    return (
        <Block width="100%" paddingTop={["36px", null, "40px"]} paddingBottom={["32px", null, "36px"]}>
            <Block display="flex" flexDirection="column" alignItems="center" margin="auto auto 27px">
                <Block position="relative" marginBottom="16px">
                    <Image src="/images/icon/icon-gift.png" alt="icon gifts" width={14} height={14} layout="fixed" objectFit="contain"/>
                    <Block as="span" marginLeft={["6px", null, null, "8px"]} font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph14", "MinXParagraph20"]} $style={{fontWeight: "500 !important"}}>
                        Buy tent, get 4 for free
                    </Block>
                </Block>
                <Block display="flex" justifyContent="space-between" font="MinXParagraph14">
                    <Block>Cost: <Block as="span" className="text-line-through" marginRight="8px">$280+</Block>
                        <Block as="span" color="#E51717" font="MinXParagraph20" $style={{fontWeight: "700 !important"}}>$0</Block>
                    </Block>
                </Block>
            </Block>
            <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(2, 50%)"]} gridRowGap={["12px", null, "16px"]} gridColumnGap="16px">
                <ProductItem src="/images/product/accessories/protective-cover.webp" alt="protective-cover" title="Protective cover" content="from $92" count="x1"/>
                <ProductItem src="/images/product/accessories/tie-down-straps.webp" alt="tie-down-straps" title="Tie down straps" content="$48" count="x4"/>
                <ProductItem src="/images/product/accessories/sandbag.webp" alt="sandbag" title="Sandbag" content="$100" count="x4"/>
                <ProductItem src="/images/product/accessories/steel-stakes.webp" alt="steel-stakes" title="Steel Stakes" content="$40" count="x1 (8 stakes)"/>
            </Block>
        </Block>
    )
}
