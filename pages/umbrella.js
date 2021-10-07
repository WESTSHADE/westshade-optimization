import React from "react";

import {withRouter} from "next/router";
import Head from "next/head";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import ChevronRight from "baseui/icon/chevron-right";

import BannerDisplay from "../components/sections/BannerDisplay";

const Section = ({title, content, displayList = []}) => {
    return (
        <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
               overrides={{
                   Block: {
                       props: {
                           className: "container-display"
                       },
                   },
               }}
        >
            <Block marginBottom="8px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">{title}</Block>
            <Block marginBottom={["32px", "36px", "18px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">{content}</Block>
            <Block display={["flex", "grid"]} flexDirection={["column", "row"]} justifyContent={["center", "space-between"]}
                   gridTemplateColumns={["repeat(1, 100%)", "repeat(2, 50%)"]}
            >
                {displayList.map(({url, alt, title, content}, index) => {
                    return (
                        <Block key={index} display="flex" flexDirection="column" alignItems="center"
                               marginBottom={index === 0 ? ["24px", "0px"] : "0px"}
                               paddingRight={index === 0 ? ["8px", "10px"] : "0px"}
                               paddingLeft={index !== 0 ? ["8px", "10px"] : "0px"}
                               overflow="hidden">
                            <Block position="relative" width="100%" height={["220px", "300px"]} marginBottom={["4px", "12px"]}>
                                <img width="100%" height="100%" src={url} alt={alt} style={{objectFit: "cover"}}/>
                            </Block>
                            <Block marginBottom="8px" font="MinXHeading16" color={"MinXPrimaryText"}>{title}</Block>
                            <Block alignSelf="flex-start" font="MinXParagraph16" color={"MinXPrimaryText"}>{content}</Block>
                        </Block>
                    )
                })}
            </Block>
        </Block>
    )
}

function Umbrella({router}) {
    return (
        <React.Fragment>
            <Head>
                <title>Umbrella - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
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
                <Block marginBottom="24px" paddingTop={["24px", "40px"]} font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">
                    UMBRELLA SERIES
                </Block>
                <BannerDisplay title="MARCO" subtitle="Pull up umbrellas" url="images/home/custom_printing.jpg"
                               containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]}
                               router={router} destination="/custom-printing" arrowButton/>
                <BannerDisplay title="SANTORINI" subtitle="Pulley umbrellas; Two frames options" url="images/home/custom_printing.jpg"
                               containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]}
                               router={router} destination="/custom-printing" arrowButton/>
                <BannerDisplay title="BALI" subtitle="Tilt umbrellas" url="images/home/custom_printing.jpg"
                               containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]}
                               router={router} destination="/custom-printing" arrowButton/>
                <BannerDisplay title="CATALINA" subtitle="Oversize umbrellas" url="images/home/custom_printing.jpg"
                               containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]}
                               router={router} destination="/custom-printing" arrowButton textColor={"#262626"}
                               buttonHoverColor={"rgba(15,15,15,0.5)"} buttonActiveColor={"rgba(15,15,15,0.8)"}/>
                <BannerDisplay title="CUSTOM PRINTING" subtitle="Make your umbrellas special for your activity." url="images/home/custom_printing.jpg"
                               containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]}
                               router={router} destination="/custom-printing" textColor={"#262626"}
                               renderButton={
                                   <Block width={["148px", "175px"]} height="40px" font={["MinXLabel14", "MinXLabel16"]}>
                                       <Button shape={SHAPE.pill}
                                               overrides={{
                                                   BaseButton: {
                                                       style: ({$theme}) => ({
                                                           width: "100%",
                                                           height: "100%",
                                                           paddingTop: 0,
                                                           paddingRight: 0,
                                                           paddingBottom: 0,
                                                           paddingLeft: 0,
                                                           fontSize: "inherit",
                                                           fontWeight: "inherit",
                                                           lineHeight: "inherit",
                                                           backgroundColor: $theme.colors.MinXButton,
                                                           whiteSpace: "nowrap",
                                                           textOverflow: "ellipsis",
                                                           ":hover": {backgroundColor: $theme.colors.MinXButtonHover},
                                                           ":active": {backgroundColor: $theme.colors.MinXButtonActive},
                                                       }),
                                                   },
                                               }}
                                               endEnhancer={() => <ChevronRight size={24}/>}
                                               onClick={() => router.push("/")}
                                       >
                                           Learn More
                                       </Button>
                                   </Block>
                               }
                />
            </Block>
            <Section title="FABRIC" content="We provide fabric from two brands - SDP and AGORA."
                     displayList={[
                         {url: "", alt: "", title: "SDP", content: "2 people can set up the tent in a few minutes by following these steps."},
                         {url: "", alt: "", title: "AGORA", content: "2 people can set up the tent in a few minutes by following these steps."}
                     ]}
            />
            <Section title="FRAME" content="2 people can set up the tent in a few minutes by following these steps."
                     displayList={[
                         {url: "", alt: "", title: "Aluminum", content: "2 people can set up the tent in a few minutes by following these steps."},
                         {url: "", alt: "", title: "Fiberglass", content: "2 people can set up the tent in a few minutes by following these steps."}
                     ]}
            />
            <Section title="OPEN SYSTEM" content="2 people can set up the tent in a few minutes by following these steps."
                     displayList={[
                         {url: "", alt: "", title: "Pulley", content: "2 people can set up the tent in a few minutes by following these steps."},
                         {url: "", alt: "", title: "Pull up", content: "2 people can set up the tent in a few minutes by following these steps."}
                     ]}
            />
            <Block height={["22px", "44px", "66px"]}/>
        </React.Fragment>
    )

}

Umbrella.getInitialProps = () => {
    return {
        newFooter: true,
    };
};

export default withRouter(Umbrella);
