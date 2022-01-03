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
    url: "/images/product/umbrella/catalina/feature-fabric.webp",
    objectFit: "cover"
}, {
    tabTitle: "Fire Retardant",
    tabContent: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84.",
    url: "/images/product/umbrella/catalina/feature-fire.webp",
    objectFit: "cover"
}, {
    tabTitle: "UV Protection",
    tabContent: "The fabric blocks 98% harmful UV rays.",
    url: "/images/product/umbrella/catalina/feature-uv.webp",
    objectFit: "cover"
}
// , {
//     tabTitle: "Fabric",
//     tabContent: "Heavy duty welded PVC fabric that is super strong and has ¼ inches thickness, 850 gsm also fully waterproof and gives excellent protection against UV rays.",
//     url:"/images/product/umbrella/catalina/feature-fabric.webp",
// }
]

const feature_2 = [
//     {
//     tabTitle: "Crank System",
//     tabContent: "The Catalina umbrella is a crank umbrella. A crank is a handle usually placed at the center of the pole and that works by turning the crank until the umbrella is fully opened.",
//     url:"/images/product/umbrella/marco/feature-pushup.webp",
// },
    {
        tabTitle: "Aluminum",
        tabContent: "Our aluminum umbrellas are extremely strong and durable. They are rust resistant and sturdy.",
        url: "/images/product/umbrella/catalina/feature-aluminum.webp",
        objectFit: "cover"
    }]

const anatomyPart = [
    {url: "/part-fixings.webp", title: "FIXINGS", content: "Our Marine grade stainless steel cables are strong and built to last, with toughness and characteristics."},
    {url: "/part-hub.webp", title: "ALUMINUM HUB", content: "Our hubs are made with the strongest materials available. Stainless steel is constructed of marine grade aluminum creating a modern and streamlined umbrella."},
    {url: "/part-crank-lift.webp", title: "CRANK LIFT SYSTEM", content: 'A unique "rack and pinion" gear system. It easily opens and closes with a removable handle that prevents unauthorized access.'},
    {url: "/part-reinforced-channel.webp", title: "REINFORCED CHANNEL", content: "Umbrella poles adapt to marine grade aluminum with powder coating. Its internal reinforcing channels are super strong to resist heavy wind."},
    {url: "/part-base-plate.webp", title: "BASE PLATE", content: "Rugged cast alloy based plates adapt a marine grade aluminum with powder coating. It is a simple design without losing details."},
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
    {title: "What are the dimensions of the Catalina Umbrella?", content: "260 cm x 49 cm x 66 cm"},
    {
        title: "What type of cables come with the Catalina?",
        content: "The Catalina comes with high strength concealed cables that are marine grade. These cables are stainless steel and provide the necessary strength and durability to deliver a functional canopy system."
    },
    {
        title: "How should I care for the Catalina Umbrella?",
        content: "Never force the umbrella to open. All of the mechanics on the Catalina umbrella should open gently and easily. Make sure to always close the canopy of your umbrella when not in use to reduce the chances of breaking when exposed to outdoor elements such as wind and dust."
    },
    {title: "Should I use an umbrella cover?", content: "You can use an umbrella cover if need be to prevent debris and moisture from reaching your umbrella."},
    {title: "How should I store my Catalina umbrella?", content: "When not using your Catalina umbrella, store your umbrella in an enclosed space such as a garage or basement during off-season."},
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
                    <Image src="/images/product/umbrella/anatomy-catalina.webp" alt="anatomy catalina frame" objectFit="contain" layout="fill"/>
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["105px", "160px", "210px"]} right={["5px", "10px", "5px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(0);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} top={["90px", "140px", "175px"]} right={["148px", "235px", "300px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(1);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["95px", "145px", "190px"]} right={["120px", "195px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(2);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["125px", "195px", "250px"]} left={["125px", "195px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
                           onClick={() => {
                               setDisplayIntro(true);
                               setFrameIntroIsModal(true);
                               setFrameIntroPosition(3);
                           }}
                    />
                    <Block width={["8px", "12px", "20px"]} height={["8px", "12px", "20px"]} bottom={["60px", "90px", "115px"]} left={["125px", "195px", "250px"]} overrides={{Block: {props: {className: "cursor feature-frame-dot"}}}}
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
                            <Image src={"/images/product/umbrella/catalina" + anatomyPart[frameIntroPosition].url} alt="anatomy frame part" objectFit="contain" layout="fill"/>
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
                    <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="286px" gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/catalina/versatile/umbrella-catalina-1.webp" alt="Versatile Umbrella Catalina" layout="fill" objectFit="cover"/>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, 220px)", "repeat(2, 286px)", "286px"]} gridRowGap={["16px", "24px", "20px"]} gridColumnGap="20px">
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/catalina/versatile/umbrella-catalina-2.webp" alt="Versatile Umbrella Catalina" layout="fill" objectFit="cover"/>
                        </Block>
                        <Block position="relative" width="100%" height="100%" overflow="hidden" $style={{borderRadius: "8px"}}>
                            <Image src="/images/product/umbrella/catalina/versatile/umbrella-catalina-3.webp" alt="Versatile Umbrella Catalina" layout="fill" objectFit="cover"/>
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
