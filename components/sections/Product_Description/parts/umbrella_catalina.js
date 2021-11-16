import React, {useState} from "react";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import {Delete} from "baseui/icon";
import {Button, KIND, SHAPE} from "baseui/button";
import {Accordion, Panel} from "baseui/accordion";

import CardTabs from "../../../card_tabs";

const feature_1 = [{
    tabTitle: "Waterproof",
    tabContent: "All of our umbrellas are designed to offer the ideal coverage and protection needed for all your events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions.",
    url: "images/product/umbrella/catalina/feature-water.jpg",
}, {
    tabTitle: "Fire Retardant",
    tabContent: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84.",
    url: "images/product/umbrella/catalina/feature-fire.jpg",
}, {
    tabTitle: "UV Protection",
    tabContent: "The fabric blocks 98% harmful UV rays.",
    url: "images/product/umbrella/catalina/feature-uv.jpg",
}]

const feature_2 = [{
    tabTitle: "Crank System",
    tabContent: "The Catalina umbrella is a crank umbrella. A crank is a handle usually placed at the center of the pole and that works by turning the crank until the umbrella is fully opened.",
    url: "images/product/umbrella/marco/feature-pushup.jpg",
}, {
    tabTitle: "Aluminum",
    tabContent: "Our aluminum umbrellas are extremely strong and durable. They are rust resistant and sturdy.",
    url: "images/product/umbrella/marco/feature-aluminum.jpg",
}]

const anatomyPart = [
    {url: "/part-fixings.jpg", title: "FIXINGS", content: "Stainless steel fittings to ensure the canopy stays stable."},
    {url: "/part-hub.jpg", title: "HUB", content: "High quality nylon hub is easy to use just push up lift system."},
    {url: "/part-joint.jpg", title: "JOINT", content: "Marco umbrella is of high strength and high quality moulded nylon arm joints."},
];

export default function description() {
    const [displayIntro, setDisplayIntro] = useState(false);
    const [frameIntroIsModal, setFrameIntroIsModal] = useState(false);
    const [frameIntroPosition, setFrameIntroPosition] = useState(0);

    return (
        <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["40px", "64px", "120px"]} paddingBottom={["40px", "64px", "120px"]}>
            <Block position="relative" backgroundColor="#F7F7F7" paddingTop={["36px", "42px", "54px"]} paddingBottom={["36px", "42px", "54px"]}>
                <Block marginBottom={["24px", "36px", "38px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>The anatomy of frame</Block>
                <Block position="relative" width={["282px", "440px", "566px"]} height={["282px", "440px", "566px"]} marginRight="auto" marginLeft="auto">
                    <Image src="images/product/umbrella/anatomy-marco.png" alt="anatomy marco frame" objectFit="contain" layout="fill"/>
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["48px", "70px", "90px"]} right={["8px", "12px", "16px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
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
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["45px", "68px", "80px"]} left={["75px", "115px", "145px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
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
                            <Image src={"images/product/umbrella/marco" + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
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
                    <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="400px" gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="images/product/umbrella/marco/versatile/umbrella-marco_1.jpg" alt="Versatile Umbrella Marco" layout="fill" objectFit="cover"/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, 400px)", "repeat(2, 400px)", "400px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="images/product/umbrella/marco/versatile/umbrella-marco_2.jpg" alt="Versatile Umbrella Marco" layout="fill" objectFit="cover"/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="images/product/umbrella/marco/versatile/umbrella-marco_3.jpg" alt="Versatile Umbrella Marco" layout="fill" objectFit="cover"/>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}>
                <Block marginBottom={["24px", "36px", "64px"]} font="MinXHeading28" overrides={{Block: {style: {fontWeight: 400, textAlign: "center"}}}}>Let’s answer your questions</Block>
                <Block width="100%" maxWidth="660px" marginRight="auto" marginLeft="auto" font="MinXHeading14" color="MinXPrimaryText">
                    <Accordion overrides={{
                        Root: {
                            style: {
                                borderBottomColor: "#F0F0F0"
                            }
                        },
                        Header: {
                            props: {
                                className: "accordion-header"
                            },
                            style: {
                                minHeight: "48px",
                                paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", color: "inherit"
                            }
                        },
                        Content: {
                            style: {
                                paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                                fontSize: "inherit", fontWeight: "400", fontFamily: "inherit", color: "inherit",
                                backgroundColor: "translate"
                            }
                        },
                    }}>
                        <Panel title="What are the dimensions of the Marco Umbrella?">
                            7’6 ½’ x 6 ¼ x 6 ¼ (230cm x 16cm x 16cm).
                        </Panel>
                        <Panel title="What is the difference between push and pulley?">
                            The pulley method uses a rope to assist in raising the umbrella hub with a system of pulleys. The push up method operates similar to a personal umbrella; just simply graph the hub of the umbrella and manually guide it up
                            the pole to the desired height.
                        </Panel>
                        <Panel title="How should I care for the Marco Umbrella?">
                            Never force the umbrella to open. All of the mechanics on the Marco umbrella should open gently and easily. Make sure to always close the canopy of your umbrella when not in use to reduce the chances of breaking when
                            exposed to outdoor elements such as wind and dust.
                        </Panel>
                        <Panel title="Should I use an umbrella cover?">
                            You can use an umbrella cover if need be to prevent debris and moisture from reaching your umbrella.
                        </Panel>
                        <Panel title="How should I store my Marco umbrella?">
                            When not using your Marco umbrella, store your umbrella in an enclosed space such as a garage or basement during off-season.
                        </Panel>
                    </Accordion>
                </Block>
            </Block>
        </Block>
    )
}