import React, {useState} from "react";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";

import {AccordionV1 as Accordion} from "Components/Accordion";
import CardTabs from "../../../card_tabs";

const feature_1 = [{
    tabTitle: "Waterproof",
    tabContent: "All of our umbrellas are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions.",
    url: "/images/product/umbrella/kapri/feature-water.webp",
    objectFit: "cover"
}, {
    tabTitle: "UV Protection",
    tabContent: "The fabric blocks 98% harmful UV rays.",
    url: "/images/product/umbrella/kapri/feature-uv.webp",
    objectFit: "cover"
}]

const feature_2 = [{
    tabTitle: "Aluminum",
    tabContent: "Marine-Grade anodized aluminum material frame.",
    url: "/images/product/umbrella/kapri/feature-aluminum.webp",
    objectFit: "cover"
}, {
    tabTitle: "Crank System",
    tabContent: "The Kapri umbrella is a smooth crank system. The unique crank system can continue to rotate when the umbrella is opened, so that the umbrella can be automatically tilted for individual adjustment according to the position of the sun.",
    url: "/images/product/umbrella/kapri/feature-crank-system.webp",
    objectFit: "contain"
}, {
    tabTitle: "Height Adjustment",
    tabContent: "Kapri Umbrella height can be adjusted by simply turning the knob.",
    url: "/images/product/umbrella/kapri/feature-height-adjustment.webp",
    objectFit: "contain"
}]

const anatomyPart = [
    {url: "/part-fixings.webp", title: "SELF-TENSIONING TIPS", content: "The top of the ribs adopts retractable parts."},
    {url: "/part-hub.webp", title: "NYLON HUB & ALUMINUM FRAME", content: "Strong nylon hub that bears strength and resistance."},
    {url: "/part-joint.webp", title: "NYLON ARM JOINTS", content: "High strength and high quality moulded nylon arm joints."},
    {url: "/part-tilt.webp", title: "TILT", content: "Use the crank to tilt the umbrella when it’s open."},
    {url: "/part-crank.webp", title: "CRANK", content: "Simple and easy to use crank lift system."},
    {url: "/part-knot.webp", title: "KNOT", content: "Easy to use adjustment knob to adjust the height of the umbrella."},
];

const QA = [
    {
        title: "What fabric do you use for your umbrella?",
        content: "We provide fabric from two brands - SDP and AGORA. The SDP fabric is made of solution-dyed polyester while the AGORA fabric is made of solution-dyed acrylic. Both are water-repellent, stain-resistant,  with UPF 50+ protection. Additionally, AGORA has a longer lifespan than SDP."
    },
    {title: "Is your umbrella fabric waterproof?", content: "Yes. The fabric we use has a waterproof treatment."},
    {title: "Does your umbrella fabric block out UV?", content: "Yes. The fabric blocks 98% of harmful UV rays."},
    {
        title: "Can I get my umbrella customized?",
        content: "Yes. You can customize online or feel free to reach out to our customer service representatives with the kind of style you like and we will get back to you with a free mockup and a quote."
    },
    {title: "Is the Kapri umbrella adjustable?", content: "Yes, the push-button on the frame makes the umbrella adjust to the desirable shade 40-50 cm."},
    {title: "What function does the Kapri Umbrella use?", content: "The Kapri has an automatic tilt function; it is a marine-grade anodized aluminum material frame."},
    {title: "What are the enhanced features?", content: "The Kapri features are its upright frame and smooth crack system to provide adjustment depending on the position of the sun."},
    {
        title: "Is the Kapri Umbrella easy to use?",
        content: "Yes, it is easy to use, it has an easy to use crack system with automatic tilting function. Umbrellas that have this feature can be tilted to accommodate different positions of the sun and also the tilting enables more sun-blocking capabilities."
    },
];

export default function Description() {
    const [displayIntro, setDisplayIntro] = useState(false);
    const [frameIntroIsModal, setFrameIntroIsModal] = useState(false);
    const [frameIntroPosition, setFrameIntroPosition] = useState(0);

    return (
        <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["40px", "64px", "120px"]} paddingBottom={["40px", "64px", "120px"]}>
            <Block position="relative" backgroundColor="#F7F7F7" paddingTop={["36px", "42px", "54px"]} paddingBottom={["36px", "42px", "54px"]}>
                <Block marginBottom={["24px", "36px", "38px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>The anatomy of frame</Block>
                <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                    <Image src="/images/product/umbrella/anatomy-kapri.webp" alt="anatomy kapri frame" objectFit="contain" layout="fill"/>
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["48px", "70px", "90px"]} right={["20px", "25px", "30px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(0);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["45px", "72px", "90px"]} right={["125px", "200px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(1);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["40px", "60px", "75px"]} left={["85px", "135px", "175px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(2);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["55px", "85px", "105px"]} left={["125px", "195px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(3);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["125px", "190px", "240px"]} left={["120px", "190px", "230px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(4);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["75px", "115px", "150px"]} right={["125px", "190px", "245px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(5);
                           }}
                    />
                </Block>
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
                            <Image src={"/images/product/umbrella/kapri" + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
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
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Versatile Umbrella</Block>
                <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "24px", "20px"]}>
                    <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="400px" gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/kapri/versatile/umbrella-kapri-1.webp" alt="Versatile Umbrella Kapri" layout="fill" objectFit="cover"/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, 400px)", "repeat(2, 400px)", "400px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/kapri/versatile/umbrella-kapri-2.webp" alt="Versatile Umbrella Kapri" layout="fill" objectFit="cover"/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/kapri/versatile/umbrella-kapri-3.webp" alt="Versatile Umbrella Kapri" layout="fill" objectFit="cover"/>
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
