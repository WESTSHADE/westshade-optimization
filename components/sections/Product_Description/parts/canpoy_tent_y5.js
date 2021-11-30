import React, {useState} from "react";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";

import Accordion from "../../../accordion";
import CardTabs from "../../../card_tabs";

const feature_1 = [{
    tabTitle: "Water Resistant",
    tabContent: "Our waterproof pop tents are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions.",
    url: "/images/product/canopy-tent/feature-fabric.webp",
    objectFit: "cover"
}, {
    tabTitle: "Fire Retardant",
    tabContent: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84.",
    url: "/images/product/canopy-tent/feature-fire.webp",
    objectFit: "cover"
}, {
    tabTitle: "UV Protection",
    tabContent: "Westshade canopies provide up to 98% UV block,  the optimal UV protection for people and pets. Our unique polyester fabric allows warm air to escape, keeping you cool on hot and sunny days.",
    url: "/images/product/canopy-tent/feature-uv.webp",
    objectFit: "cover"
}]

const feature_2 = [{
    tabTitle: "Steel",
    tabContent: "We carry steel frames for our Y5 canopies. Steel framed canopies are heavier and typically used for patio, garden, or the deck.",
    url: "/images/product/canopy-tent/feature-steel.webp",
    objectFit: "contain"
}, {
    tabTitle: "Aluminum",
    tabContent: "Our Aluminum frames (Y6, Y7) are lightweight and are used for a variety of occasions such as business events, job fairs, and exhibitions.",
    url: "/images/product/canopy-tent/feature-aluminum.webp",
    objectFit: "contain"
}]

const anatomyPart = [
    {url: "/top-corner-connector.webp", title: "TOP CORNER CONNECTOR", content: "The top corner connectors help connect together the canopy to provide stability and durability."},
    {url: "/truss-bar.webp", title: "TRUSS BAR", content: "Truss bar is the middle connector between the leg pole and helps stabilize the canopy."},
    {url: "/leg-height-connector.webp", title: "HEIGHT ADJUST CONNECTOR", content: "Adjust the shade as needed throughout the day with leg height adjustments."},
    {
        url: "/foot-plate.webp",
        title: "FOOT PLATE",
        content: "Footplates are heavy weights that rest on the feet of the pop up tent legs to offer additional anchoring in conjunction with staking kits or they can operate alone when stakes are not necessary."
    },
    {url: "/leg-pole.webp", title: "LEG POLE", content: "Our leg poles are stable and are going to provide the most coverage without taking up too much space."},
];

const QA = [
    {title: "Do your canopies set up in seconds?", content: "They sure do! Our canopies can be set up in less than 60 seconds with just two people."},
    {title: "Do you have a video showing proper setup and take down?", content: <>Yes! Check out this one minute video <Link href="https://www.youtube.com/watch?v=J9ygFXvOVn4">https://www.youtube.com/watch?v=J9ygFXvOVn4</Link></>},
    {
        title: "Can my canopy withstand wind and at what point are weight bags or steel stakes required?",
        content: "We recommend using weight bags or steel stakes in all types of weather environments. White stakes are ideal to keep your canopy secure during all outdoor activities, our professional weight bags hold up to 30lbs of sand, or anything similar material, and easily attach to your shelter for additional stability."
    },
    {
        title: "Can I use my canopy anywhere?",
        content: "Yes, our canopies stand securely on grass, dirt, or pavement without ropes and poles. In windy conditions, however, we recommend using our weight bags to anchor and prevent your canopy from tipping over."
    },
    {title: "I bought a canopy from another company,  will your replacement fit my current frame?", content: "Our tops are designed to fit Westshade brand frames. We do not recommend using our frame or top with another company's product."},
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
                    <Image src="/images/product/canopy-tent/anatomy-y5.webp" alt="anatomy y5 frame" objectFit="contain" layout="fill"/>
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["10px", "20px", "22px"]} left={["4px", "9px", "9px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(0);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["56px", "85px", "110px"]} right={["2px", "10px", "8px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(1);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["100px", "165px", "210px"]} left={["4px", "6px", "8px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(2);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["114px", "178px", "220px"]} right={["10px", "12px", "18px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(3);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["54px", "90px", "100px"]} right={["62px", "98px", "125px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(4);
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
                            <Image src={"/images/product/canopy-tent/y5" + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
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
                    <CardTabs title="Frame" tabList={feature_2} objectFit="contain" containerImageProps={{backgroundColor: "#F5FCFC"}} reverse/>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Versatile Tent</Block>
                <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "24px", "20px"]}>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(3, 1fr)"]} gridTemplateRows={["repeat(3, 220px)", "repeat(3, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="/images/product/canopy-tent/Versatile_tent_1.webp" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Shade in the backyard</Block>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="/images/product/canopy-tent/Versatile_tent_2.webp" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Parking canopy</Block>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="/images/product/canopy-tent/Versatile_tent_3.webp" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Outdoor picnic</Block>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, 220px)", "repeat(2, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="/images/product/canopy-tent/Versatile_tent_4.webp" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Outdoor dining</Block>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" overrides={{Block: {style: {borderRadius: "8px"}}}}>
                            <Image src="/images/product/canopy-tent/Versatile_tent_5.webp" alt="Versatile tent" layout="fill" objectFit={"cover"}/>
                            <Block position="absolute" bottom={"24px"} left={["24px", "24px", "32px"]} font="MinXLabel16" color="white">Mobile store</Block>
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

