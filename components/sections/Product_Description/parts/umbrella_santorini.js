import React, {useState} from "react";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";

import Accordion from "../../../accordion";
import CardTabs from "../../../card_tabs";

const feature_1 = [{
    tabTitle: "Waterproof",
    tabContent: "All of our umbrellas are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions.",
    url: "images/product/umbrella/santorini/feature-water.jpg",
    objectFit: "cover"
}, {
    tabTitle: "UV Protection",
    tabContent: "Available in two fabrics - SDP (Solution Dyed Polyester) and AGORA (Solution Dyed Acrylic). Both fabrics block 98% harmful UV rays.",
    url: "images/product/umbrella/santorini/feature-uv.jpg",
    objectFit: "cover"
}]

const feature_2 = [{
    tabTitle: "Aluminum",
    tabContent: "Our aluminum umbrellas are extremely strong and durable. They are rust resistant and sturdy.",
    url: "images/product/umbrella/santorini/feature-aluminum.jpg",
    objectFit: "cover"
}, {
    tabTitle: "Fiberglass",
    tabContent: "Our fiberglass ribs can bend and flex making the umbrellas super durable and able to withstand wind and rough weather conditions.",
    url: "images/product/umbrella/santorini/feature-fiberglass.jpg",
    objectFit: "cover"
}, {
    tabTitle: "Pulley System",
    tabContent: "The santorini umbrella is a pulley umbrella. The pulley method uses a rope to assist in raising the umbrella hub with a system of integrated cords that work to expand and open the umbrella canopy.",
    url: "images/product/umbrella/santorini/feature-pulley-system.jpg",
    objectFit: "cover"
}]

const anatomyPart = [
    {url: "/part-aluminum-fixings.png", title: "FIXINGS", content: "Stainless steel fittings to ensure the umbrella stays stable."},
    {url: "/part-aluminum-hub.jpg", title: "HUB", content: "High quality nylon hub is easy to use just push up lift system."},
    {url: "/part-aluminum-joint.jpg", title: "JOINT", content: "High strength and high quality moulded nylon arm joints."},
    {url: "/part-fiberglass-fixings.png", title: "FIXINGS", content: "Stainless steel fittings to ensure the umbrella stays stable."},
    {url: "/part-fiberglass-hub.png", title: "HUB", content: "High quality nylon hub is easy to use just push up lift system."},
    {url: "/part-fiberglass-joint.png", title: "JOINT", content: "High strength and high quality moulded nylon arm joints."},
];

const QA = [
    {title: "What are the dimensions of the Santorini Umbrella?", content: "9 ¼’x 5’4 ½ (23.3 cm x 164cm)"},
    {
        title: "Does the Santorini Umbrella come in pulley function?",
        content: "Yes, the pulley method uses rope to assist in raising the umbrella hub with a system of integrated cords that work to expand and open the umbrella canopy. The open shade is typically held in place with a pin."
    },
    {
        title: "How should I care for the Santorini Umbrella?",
        content: "Never force the umbrella to open. All of the mechanics on the Santorini umbrella should open gently and easily. Make sure to always close the canopy of your umbrella when not in use to reduce the chances of breaking when exposed to outdoor elements such as wind and dust."
    },
    {title: "Should I use an umbrella cover?", content: "You can use an umbrella cover if need be to prevent debris and moisture from reaching your umbrella."},
    {title: "How should I store my Santorini umbrella?", content: "When not using your Santorini umbrella, store your umbrella in an enclosed space such as a garage or basement during off-season."},
];

export default function description({frame = "aluminum"}) {
    const [displayIntro, setDisplayIntro] = useState(false);
    const [frameIntroIsModal, setFrameIntroIsModal] = useState(false);
    const [frameIntroPosition, setFrameIntroPosition] = useState(0);

    return (
        <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["40px", "64px", "120px"]} paddingBottom={["40px", "64px", "120px"]}>
            <Block position="relative" backgroundColor="#F7F7F7" paddingTop={["36px", "42px", "54px"]} paddingBottom={["36px", "42px", "54px"]}>
                <Block marginBottom={["24px", "36px", "38px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>The anatomy of frame</Block>
                {frame === "aluminum" ? (
                    <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/product/umbrella/anatomy-santorini-aluminum.png" alt="anatomy santorini frame" objectFit="contain" layout="fill"/>
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["50px", "72px", "90px"]} right={["8px", "5px", "0px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(0);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["70px", "100px", "130px"]} right={["125px", "190px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(1);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["52px", "75px", "95px"]} left={["92px", "145px", "185px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(2);
                               }}
                        />
                    </Block>
                ) : frame === "fiberglass" ? (
                    <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/product/umbrella/anatomy-santorini-fiberglass.png" alt="anatomy santorini frame" objectFit="contain" layout="fill"/>
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["60px", "92px", "120px"]} right={["10px", "12px", "15px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(3);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["70px", "100px", "130px"]} right={["125px", "190px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(4);
                               }}
                        />
                        <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["52px", "75px", "95px"]} left={["92px", "145px", "185px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                               onClick={() => {
                                   setDisplayIntro(true);
                                   setFrameIntroIsModal(true);
                                   setFrameIntroPosition(5);
                               }}
                        />
                    </Block>
                ) : null}
                <Block position="absolute" top={0} right={0} bottom={0} left={0} alignItems="center" justifyContent="center" flexDirection="column"
                       overrides={{
                           Block: {
                               props: {
                                   className: clsx(displayIntro ? "displayFlex" : "displayNone", frameIntroIsModal ? "frame-intro-background-in" : "frame-intro-background-out")
                               },
                               style: {textAlign: "center", transition: "opacity 800ms ease-in-out"}
                           },
                       }}
                >
                    <Block display="grid" gridTemplateColumns="1fr" gridRowGap="16px" justifyItems="center" marginBottom="32px">
                        <Block position="relative" width={["150px", "200px", "250px"]} height={["150px", "200px", "250px"]}
                               overrides={{
                                   Block: {
                                       props: {
                                           className: "frame-intro"
                                       }
                                   },
                               }}
                        >
                            <Image src={"images/product/umbrella/santorini" + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
                        </Block>
                        <Block font="MinXParagraph20" color="MinXPrimaryText">{anatomyPart[frameIntroPosition].title}</Block>
                        <Block maxWidth="250px" font="MinXParagraph16" color="MinXSecondaryText">{anatomyPart[frameIntroPosition].content}</Block>
                    </Block>
                    <Button kind={KIND.secondary} shape={SHAPE.circle}
                            onClick={() => {
                                setFrameIntroIsModal(false);
                                setTimeout(() => setDisplayIntro(false), 800);
                            }}
                            overrides={{
                                BaseButton: {
                                    style: {backgroundColor: "rgba(0, 0, 0, 0.3)"}
                                }
                            }}
                    >
                        <Delete size={24} color={"white"}/>
                    </Button>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Features</Block>
                <Block display="grid" gridTemplateColumns="1fr" gridRowGap="24px">
                    <CardTabs title="Roof Top" tabList={feature_1} containerImageProps={{backgroundColor: "#F5FCFC"}}/>
                    <CardTabs title="Frame" tabList={feature_2} containerImageProps={{backgroundColor: "#F5FCFC"}} reverse/>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Versatile Tent</Block>
                <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "24px", "20px"]}>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)"]} gridTemplateRows={["repeat(3, 220px)", "repeat(3, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/umbrella/santorini/versatile/umbrella-santorini-1.jpg" alt="Versatile Umbrella Santorini" layout="fill" objectFit="cover" objectPosition="right"/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/umbrella/santorini/versatile/umbrella-santorini-2.jpeg" alt="Versatile Umbrella Santorini" layout="fill" objectFit={"cover"}/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/umbrella/santorini/versatile/umbrella-santorini-3.jpg" alt="Versatile Umbrella Santorini" layout="fill" objectFit="cover" objectPosition="left"/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, 220px)", "repeat(2, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/umbrella/santorini/versatile/umbrella-santorini-4.jpeg" alt="Versatile Umbrella Santorini" layout="fill" objectFit={"cover"}/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="images/product/umbrella/santorini/versatile/umbrella-santorini-5.jpg" alt="Versatile Umbrella Santorini" layout="fill" objectFit={"cover"}/>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Let’s answer your questions</Block>
                <Accordion maxWidth="660px" list={QA}/>
            </Block>
        </Block>
    )
}
