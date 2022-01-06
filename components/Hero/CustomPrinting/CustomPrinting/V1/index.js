import React, {useState} from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";

import Button from "Components/button-n";
import {Section} from "Components/sections";

const data = [
    {
        title: "Canopy tent",
        content: "Westshade provides great quality printed canopy tents. Having a branded tent can give you perfect promotional accessory at any trade fair or event.",
        iconUrl: "/images/custom-printing/tab-canopy-tent.webp",
        imageUrl: "/images/custom-printing/tab-display-custom-canopy.webp",
        url: "/custom-printing/canopy-tent/"
    },
    {
        title: "Umbrella",
        content: "Westshade provides great quality printed umbrellas. Having a branded umbrella can give you perfect promotional accessory at any trade fair or event.",
        iconUrl: "/images/custom-printing/tab-umbrella.webp",
        imageUrl: "/images/custom-printing/tab-display-umbrella.webp",
        url: "/custom-printing/umbrella/"
    },
    {
        title: "Table cover",
        content: "Westshade provides great quality printed table covers. Having a branded table cover can give you perfect promotional accessory at any trade fair or event.",
        iconUrl: "/images/custom-printing/tab-table-cover.webp",
        imageUrl: "/images/custom-printing/tab-display-table-cover.webp",
        url: "/custom-printing/table-cover/"
    },
    {
        title: "Side wall",
        content: "Westshade provides great quality printed side walls. Having a branded side walls can give you perfect promotional accessory at any trade fair or event.",
        iconUrl: "/images/custom-printing/tab-side-wall.webp",
        imageUrl: "/images/custom-printing/tab-display-side-wall.webp",
        buttonText: "Coming Soon",
        url: ""
    },
];

const Hero = () => {
    const router = useRouter();

    const [tabActiveKey, setTabActiveKey] = useState(0);

    return (
        <Section upperContainerProps={{hidden: true}}
                 content={
                     <>
                         <Block marginBottom={["16px", null, "24px"]} font={["MinXTitle20", "MinXTitle20", "MinXTitle32"]} color="MinXPrimaryText"
                                overrides={{
                                    Block: {
                                        style: {fontWeight: "500 !important", lineHeight: "1em !important"}
                                    },
                                }}
                         >I want to customize...</Block>
                         <Tabs activeKey={tabActiveKey} onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey + ""))} fill={FILL.fixed} overrides={{TabBorder: {props: {hidden: true}}}}>
                             {data.map(({title, content, iconUrl, imageUrl, buttonText = "Learn more >", url}, index) => (
                                 <Tab key={index} title={title} artwork={() => <Image src={iconUrl} alt={title} width={80} height={80} layout="intrinsic" objectFit="contain"/>}
                                      overrides={{
                                          TabPanel: {
                                              props: {
                                                  className: "tab-panel-custom-printing"
                                              },
                                          },
                                          Tab: {
                                              props: {
                                                  className: "tab-custom-printing"
                                              },
                                              style: ({$isActive}) => ({
                                                  borderColor: $isActive ? "#23A4AD" : "transparent",
                                                  background: $isActive ? "#F7F7F7" : "transparent",
                                                  ":hover": {background: $isActive ? "#F7F7F7" : "transparent"},
                                              }),
                                          },
                                          ArtworkContainer: {
                                              props: {
                                                  className: "tab-artwork-custom-printing"
                                              },
                                          }
                                      }}
                                 >
                                     <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(2,1fr)"]} gridRowGap="16px" gridColumnGap="32px">
                                         <Block display={["block", null, "none"]} position="relative" width="100%">
                                             <Image src={imageUrl} alt={title} layout="responsive" objectFit="cover" width={1600} height={900}/>
                                         </Block>
                                         <Block display={["none", null, "block"]} position="relative" width="100" minHeight="400px">
                                             <Image src={imageUrl} alt={title} layout="fill" objectFit="cover"/>
                                         </Block>
                                         <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="repeat(3, max-content)" gridRowGap={["8px", null, "16px"]} flex={1} height="100%" alignContent="center">
                                             <Block marginRight="auto" marginLeft={["auto", null, "unset"]} width="fit-content" font={["MinXTitle24", "MinXTitle24", "MinXTitle40"]} color="MinXPrimaryText"
                                                    overrides={{
                                                        Block: {
                                                            style: {fontWeight: "500 !important", lineHeight: "1em !important", textTransform: "capitalize"}
                                                        },
                                                    }}
                                             >{title}</Block>
                                             <Block as="p" width="fit-content" font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]} color="MinXSecondaryText"
                                                    overrides={{
                                                        Block: {
                                                            style: {
                                                                fontWeight: "400 !important", lineHeight: "1.5em !important", textAlign: "center",
                                                                '@media (min-width: 672px)': {textAlign: "left"},
                                                            }
                                                        },
                                                    }}
                                             >{content}</Block>
                                             <Button bundle="primary" marginRight="auto" marginLeft={["auto", null, "unset"]} height={["48px", null, "56px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} text={buttonText}
                                                     onClick={() => router.push(url)}
                                             />
                                         </Block>
                                     </Block>
                                 </Tab>
                             ))}
                         </Tabs>
                     </>
                 }
        />
    )
}

export default Hero;
