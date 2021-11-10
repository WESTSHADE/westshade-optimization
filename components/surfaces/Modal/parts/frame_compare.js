import React from "react";

import {useRouter} from 'next/router'

import {Block} from "baseui/block";

export default function content() {
    const router = useRouter();

    const goSpecPage = () => router.push({pathname: "/canopy-tent/spec"});

    return (
        <Block marginTop={["64px", "64px", "30px"]}
               overrides={{
                   Block: {
                       props: {
                           className: "hideScrollBar"
                       },
                       style: {textAlign: "center", overflowX: "scroll"}
                   }
               }}
        >
            <Block display="grid" gridTemplateColumns="repeat(3, 200px)" gridColumnGap="32px" width="fit-content" marginRight={["auto", "auto", "56px"]} marginBottom="16px" marginLeft={["auto", "auto", "56px"]} paddingBottom="16px"
                   overrides={{
                       Block: {
                           style: {borderBottomWidth: "1px", borderBottomStyle: "solid", borderBottomColor: "#D9D9D9",}
                       }
                   }}
            >
                <Block font="MinXParagraph14">
                    <Block>Y5 Economic steel</Block>
                    <Block marginTop="4px" color="#23A4AD"
                           overrides={{
                               Block: {
                                   style: {
                                       ":hover": {cursor: 'pointer'}
                                   }
                               }
                           }}
                           onClick={() => goSpecPage()}
                    >Learn more</Block>
                </Block>
                <Block font="MinXParagraph14">
                    <Block>Y6 Commercial Aluminum</Block>
                    <Block marginTop="4px" color="#23A4AD"
                           overrides={{
                               Block: {
                                   style: {
                                       ":hover": {cursor: 'pointer'}
                                   }
                               }
                           }}
                           onClick={() => goSpecPage()}
                    >Learn more</Block>
                </Block>
                <Block font="MinXParagraph14">
                    <Block>Y7 Heavy duty aluminum</Block>
                    <Block marginTop="4px" color="#23A4AD"
                           overrides={{
                               Block: {
                                   style: {
                                       ":hover": {cursor: 'pointer'}
                                   }
                               }
                           }}
                           onClick={() => goSpecPage()}
                    >Learn more</Block>
                </Block>
            </Block>
            <Block display="grid" gridTemplateColumns="repeat(3, 200px)" gridColumnGap="32px" width="fit-content"
                   marginRight={["auto", "auto", "56px"]} marginLeft={["auto", "auto", "56px"]} paddingBottom="16px"
            >
                <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px">
                    <Block font="MinXLabel20">
                        <Block>Steel</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>0.05"</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole thickness</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>45mm</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole diameter</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>3</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Size available</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>1 year</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame warranty</Block>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px">
                    <Block font="MinXLabel20">
                        <Block>Aluminum</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>0.06"</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole thickness</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>45mm</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole diameter</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>3</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Size available</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>5 years</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame warranty</Block>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px">
                    <Block font="MinXLabel20">
                        <Block>Aluminum</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>0.07"</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole thickness</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>57mm</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Pole diameter</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>9</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Size available</Block>
                    </Block>
                    <Block font="MinXLabel20">
                        <Block>10 years</Block>
                        <Block marginTop="4px" font="MinXParagraph14" color="MinXSecondaryText">Frame warranty</Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

