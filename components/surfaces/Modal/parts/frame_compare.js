import React from "react";

import {useRouter} from 'next/router'

import {Block} from "baseui/block";

import styles from "./parts.module.scss";

const data = [{
    name: "Aluminum",
    feature: "Firm",
    pole: "Aluminum",
    rib: "Aluminum",
    durability: "Durable",
    recyclability: "Yes"
}, {
    name: "Fiberglass",
    feature: "Flexible",
    pole: "Aluminum",
    rib: "Fiberglass",
    durability: "Most durable",
    recyclability: "No"
}];

export default function Content({product}) {
    const router = useRouter();

    const goSpecPage = () => router.push({pathname: "/canopy-tent/spec"});


    if (product === "canopy") {
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
                            <Block>0.05&quot;</Block>
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
                            <Block>0.06&quot;</Block>
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
                            <Block>0.07&quot;</Block>
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
    } else if (product === "umbrella") {
        return (
            <>
                <Block className={styles.frame_compare}>
                    <Block display="flex" width="100%" justifyContent="center">
                        {data.map((item) => (
                            <Block width="50%" key={item.name} display="flex" flexDirection="column" alignItems="center">
                                <Block className={styles.fabric_compare__logo} display="flex" flexDirection="column" alignItems="center">
                                    <Block as="h3" marginTop="4px">{item.name}</Block>
                                </Block>
                                <Block display="flex" flexDirection="column" alignItems="center">
                                    <Block as="h4" marginTop="4px">{item.feature}</Block>
                                    <Block marginTop="8px" as="h3">Feature</Block>
                                </Block>
                                <Block display="flex" flexDirection="column" alignItems="center">
                                    <Block as="h4" marginTop="4px">{item.pole}</Block>
                                    <Block marginTop="8px" as="h3">Pole</Block>
                                </Block>
                                <Block display="flex" flexDirection="column" alignItems="center">
                                    <Block as="h4" marginTop="4px">{item.rib}</Block>
                                    <Block marginTop="8px" as="h3">Rib</Block>
                                </Block>
                                <Block display="flex" flexDirection="column" alignItems="center">
                                    <Block as="h4" marginTop="4px">{item.durability}</Block>
                                    <Block marginTop="8px" as="h3">Durability</Block>
                                </Block>
                                <Block display="flex" flexDirection="column" alignItems="center">
                                    <Block as="h4" marginTop="4px">{item.recyclability}</Block>
                                    <Block marginTop="8px" as="h3">Recyclability</Block>
                                </Block>
                            </Block>
                        ))}
                    </Block>
                </Block>
            </>
        )
    }
}

