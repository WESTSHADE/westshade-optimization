import React from "react";

import Head from "next/head";

import {Block} from "baseui/block";
import {ListItem, ListItemLabel} from "baseui/list";

const CoverageItem = ({title, content, textColor}) => {
    return (
        <ListItem endEnhancer={content ? () => (
            <ListItemLabel overrides={{
                LabelContent: {
                    style: {fontSize: "inherit", fontWeight: "inherit", color: textColor ? textColor : "inherit"}
                }
            }}
            >
                {content}
            </ListItemLabel>
        ) : null}
                  overrides={{
                      Content: {
                          style: {minHeight: "48px", marginLeft: 0, paddingRight: 0,},
                      },
                  }}
        >
            <ListItemLabel overrides={{
                LabelContent: {
                    style: {fontSize: "inherit", fontWeight: "inherit", color: textColor ? textColor : "inherit"}
                }
            }}>
                {title}
            </ListItemLabel>
        </ListItem>
    )
}

function Warranty() {
    return (
        <React.Fragment>
            <Head>
                <title>Warranty - WESTSHADE</title>
                <meta name="description" content="Warranty information, Warranty Timeline Coverage and Liability Notice of Westshade."/>
            </Head>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block width="100%" maxWidth="600px" marginRight="auto" marginBottom={["32px", "40px"]} marginLeft="auto" paddingTop={["32px", "40px"]}
                       overrides={{
                           Block: {
                               style: {textAlign: "center"}
                           },
                       }}
                >
                    <Block marginBottom={["12px", "16px"]} font={["MinXSubtitle10", "MinXSubtitle14"]} color="MinXPrimaryText">CUSTOMER SERVICE</Block>
                    <Block font={["MinXTitle20", "MinXTitle32", "MinXTitle44"]} color="MinXPrimaryText">WARRANTY</Block>
                </Block>
                <Block width="100%" maxWidth="600px" marginRight="auto" marginBottom={["32px", "40px"]} marginLeft="auto">
                    <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Warranty Information</Block>
                    <Block font="MinXParagraph14" color="MinXPrimaryText">
                        <ul className="bullet-warranty">
                            <li>All products and accessories purchased from Westshade Canopy & Umbrellas are covered by manufacture’s default defects only, defined as products and
                                other merchandise either defective or damaged upon unpackaging of merchandise. Packages are checked thoroughly and inspected at facility for final
                                inspection.
                            </li>
                            <li>Warranty does not cover products and accessories for:
                                <ul className="bullet-warranty sub">
                                    <li>Merchandise Damaged by Improper Usage.</li>
                                    <li> Merchandise caused by Harmful Weather Conditions (Please use your canopy for it’s respective weather resistant capability).</li>
                                    <li> Merchandise Damaged by Improper Set-Up (Please follow instructions carefully provided).</li>
                                    <li> Merchandise Damaged caused by Transportation (Please seek out third-party shipping service for transit damage claims).</li>
                                </ul>
                            </li>
                            <li>Please contact our customer support team for consultation or any questions you may have regarding our warranty policy.</li>
                        </ul>
                    </Block>
                </Block>
                <Block width="100%" maxWidth="600px" marginRight="auto" marginBottom={["32px", "40px"]} marginLeft="auto">
                    <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Warranty Timeline Coverage</Block>
                    <Block width="100%" maxWidth="320px" font="MinXLabel14" color="MinXPrimaryText">
                        <CoverageItem title="Canopy Tent"/>
                        <CoverageItem title="Frame - Y5 Economic Steel" content="1 Year" textColor="#8C8C8C"/>
                        <CoverageItem title="Frame - Y6 Commercial Aluminum" content="5 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Frame - Y7 Heavy duty aluminum" content="10 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Roof" content="1 Year" textColor="#8C8C8C"/>
                        <CoverageItem title="Umbrella"/>
                        <CoverageItem title="Frame - Aluminum/Fiberglass" content="3 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Roof - SDP Fabric" content="2 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Roof - AGORA Fabric" content="5 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Catalina"/>
                        <CoverageItem title="Frame" content="3 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Roof" content="5 Years" textColor="#8C8C8C"/>
                        <CoverageItem title="Accessories"/>
                        <CoverageItem title="Accessories" content="3 Months" textColor="#8C8C8C"/>
                    </Block>
                </Block>
                <Block width="100%" maxWidth="600px" marginRight="auto" marginBottom={["32px", "40px"]} marginLeft="auto">
                    <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Liability Notice</Block>
                    <Block font="MinXParagraph14" color="MinXPrimaryText">
                        Under no circumstances should a damaged product be used. Damaged products should be immediately packed up and removed. In purchasing any product from
                        Westshade Canopy, you agree to not hold Westshade Canopy, Westshade Canopy representatives & Westshade Canopy directors liable for any damage or injury
                        caused by Westshade Canopy products. This limitation applies to damage or injury caused by both new, functional or damaged products. In purchasing from
                        Westshade Canopy, you also agree to not hold Westshade Canopy, Westshade Canopy representatives & Westshade Canopy directors liable for any loss, damage or
                        injury that may arise because of a product arriving faulty, incomplete, incorrect, or late.
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    );
}

export default Warranty;
