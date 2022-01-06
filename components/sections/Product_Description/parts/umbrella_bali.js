import React, {useState} from "react";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";

import Accordion from "Components/Accordion";
import CardTabs from "../../../card_tabs";

const feature_1 = [{
    tabTitle: "Waterproof",
    tabContent: "All of our umbrellas are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions.",
    url: "/images/product/umbrella/bali/feature-water.webp",
    objectFit: "cover"

}, {
    tabTitle: "UV Protection",
    tabContent: "The fabric blocks 98% harmful UV rays.",
    url: "/images/product/umbrella/bali/feature-uv.webp",
    objectFit: "cover"

}]

const feature_2 = [{
    tabTitle: "Steel frame",
    tabContent: "Our Bali umbrella is made of strong steel that is coated with a bronze powder coated finish.",
    url: "/images/product/umbrella/bali/feature-frame.webp",
    objectFit: "cover"
}, {
    tabTitle: "Crank System",
    tabContent: "The Bali umbrella is a crank umbrella. A crank is a handle usually placed at the center of the pole and that works by turning the crank until the umbrella is fully opened.",
    url: "/images/product/umbrella/bali/feature-crank-system.webp",
    objectFit: "contain"
}]

const anatomyPart = [
    {url: "/part-hub.webp", title: "HUB", content: "Strong lighting system embedded into the hub of the umbrella."},
    {url: "/part-crank.webp", title: "CRANK", content: "Simple and easy to use crank lift system."},
    {url: "/part-tilt.webp", title: "TILT", content: "Easy to use push button tilt for adjustable shading."},
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
    {title: "Is the Bali umbrella adjustable?", content: "Yes, the push-button on the frame makes the umbrella adjust to the desirable shade."},
    {title: "What function does the Bali Umbrella use?", content: "It uses the simple lifting system where you crank the umbrella and lift. The push button tilt also makes it easy to adjust the angle of your umbrella."},
    {
        title: "Does Bali use the tilt method?",
        content: "Yes it does, the Bali does feature shades that can be tilted to accommodate the different positions of the sun at different times of the day. A tilting mechanism enables more sun blocking capabilities. The Bali is only  available with a crank lift system."
    },
    {title: "Should I use an umbrella cover?", content: "You can use an umbrella cover if need be to prevent debris and moisture from reaching your umbrella."},
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
                    <Image src="/images/product/umbrella/anatomy-bali.webp" alt="anatomy bali frame" objectFit="contain" layout="fill"/>
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["75px", "115px", "150px"]} left={["105px", "165px", "210px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(0);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["120px", "185px", "240px"]} right={["120px", "190px", "240px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(1);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["90px", "140px", "180px"]} right={["125px", "195px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(2);
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
                            <Image src={"/images/product/umbrella/bali" + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
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
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "2fr 1fr"]} gridTemplateRows={["repeat(2, 220px)", "repeat(2, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/bali/versatile/umbrella-bali-1.webp" alt="Versatile Umbrella Bali" layout="fill" objectFit="cover"/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/bali/versatile/umbrella-bali-2.webp" alt="Versatile Umbrella Bali" layout="fill" objectFit="cover"/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "1fr 2fr"]} gridTemplateRows={["repeat(2, 220px)", "repeat(2, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/bali/versatile/umbrella-bali-3.webp" alt="Versatile Umbrella Bali" layout="fill" objectFit="cover"/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/bali/versatile/umbrella-bali-4.webp" alt="Versatile Umbrella Bali" layout="fill" objectFit="cover"/>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Let’s answer your questions</Block>
                <Accordion.V1 maxWidth="660px" list={QA}/>
            </Block>
        </Block>
    )
}
