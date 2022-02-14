import React, {useRef, useState} from "react";
import clsx from "clsx";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";

import Accordion from "Components/Accordion";
import CardTabs from "../../../card_tabs";
import {useRouter} from "next/router";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";

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

const fabric = [
    {
        name: "European Made Acrylic",
        display: "/images/umbrella/fabric-agora.webp",
        logo: "/images/icon/icon-agora.png",
        label: "",
        material: "Acrylic",
        fastness: {
            description: "Anti-aging & Light fastness",
            rating: "10/10"
        },
        uvProtection: {
            rating: 4.5
        },
        quality: "High-end profession",
        frameWarranty: "5"
    },
    {
        name: "Solution Dyed Polyster",
        display: "/images/umbrella/fabric-sdp.webp",
        logo: "",
        label: "SDP",
        material: "Polyester",
        fastness: {
            description: "Anti-aging & Light fastness",
            rating: "4/10"
        },
        uvProtection: {
            rating: 2
        },
        quality: "Profession",
        frameWarranty: "2"
    },
]

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
    const router = useRouter();

    const refFrame = useRef(null);
    const refFabric = useRef(null);
    const refProduct = useRef(null);
    const refFaq = useRef(null);

    const [displayIntro, setDisplayIntro] = useState(false);
    const [frameIntroIsModal, setFrameIntroIsModal] = useState(false);
    const [frameIntroPosition, setFrameIntroPosition] = useState(0);

    const goFrameSection = () => window && window.scrollTo({top: refFrame.current.offsetTop - 40, behavior: 'smooth'});
    const goFabricSection = () => window && window.scrollTo({top: refFabric.current.offsetTop - 40, behavior: 'smooth'});
    const goProductSection = () => window && window.scrollTo({top: refProduct.current.offsetTop - 40, behavior: 'smooth'});
    const goFaqSection = () => window && window.scrollTo({top: refFaq.current.offsetTop - 40, behavior: 'smooth'});

    return (
        <>
            <Block className="section-full-width" position="sticky !important" top={["64px", null, "116px"]} display={["none", null, "block"]} height="44px" backgroundColor="#F7F7F7"
                   $style={{zIndex: 3, borderTop: "1px solid #D9D9D9", borderBottom: "1px solid #D9D9D9"}}
            >
                <Block display="flex" justifyContent="space-between" alignItems="center" width="100%" height="100%" maxWidth="750px" margin="auto" padding="0 20px" font="MinXLabel14">
                    <Block className="cursor hover-underline" onClick={() => goFrameSection()}>FRAME</Block>
                    <Block className="cursor hover-underline" onClick={() => goFabricSection()}>FABRIC</Block>
                    <Block className="cursor hover-underline" onClick={() => goProductSection()}>PRODUCT IN USE</Block>
                    <Block className="cursor hover-underline" onClick={() => goFaqSection()}>FAQS</Block>
                </Block>
            </Block>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["24px", null, "48px"]} maxWidth={process.env.maxWidth + "px"} marginRight="auto" marginLeft="auto" paddingBottom={["16px", null, "20px"]}>
                <Block ref={refFrame} position="relative" backgroundColor="#F7F7F7" paddingBottom={["18px", null, "24px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Frame</Block>
                    <Block className="text-center" marginTop="16px" marginBottom="16px" font="MinXParagraph14">Click the dots to explore the frame details.</Block>
                    <Block position="relative" width="90%" maxWidth="566px" marginRight="auto" marginLeft="auto" $style={{aspectRatio: 1}}>
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
                           onClick={() => {
                               setFrameIntroIsModal(false);
                               setTimeout(() => setDisplayIntro(false), 800);
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
                <Block paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Features</Block>
                    <Block display="grid" gridTemplateColumns="1fr" gridRowGap="24px" paddingTop={["16px", null, "24px"]}>
                        <CardTabs title="Roof Top" tabList={feature_1} containerImageProps={{backgroundColor: "#F5FCFC"}}
                                  downLoadText="Download AGORA fabric spec" downloadLink="https://s3.us-west-2.amazonaws.com/static.westshade.com/files/agora+fabric+spec.pdf"
                        />
                        <CardTabs title="Frame" tabList={feature_2} containerImageProps={{backgroundColor: "#F5FCFC"}} reverse/>
                    </Block>
                </Block>
                <Block ref={refFabric} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Fabric</Block>
                    <Block marginBottom={["27px", null, "40px"]} paddingTop={["16px", null, "24px"]} maxWidth="1152px" width="100%" margin="auto">
                        <Block display="grid" gridTemplateColumns={["1fr", "1fr", "2fr 3fr"]} gridTemplateAreas={[`"a" "b"`, `"a" "b"`, `"b a"`]} marginBottom={["27px", null, "40px"]} backgroundColor="MinXBackground" width="100%"
                               overflow="hidden" $style={{borderRadius: "16px"}}>
                            <Block gridArea="a" backgroundColor="#F5FCFC" position="relative" width="100%" height="auto" minHeight={["200px", "226px", "380px"]}>
                                <Image src="/images/umbrella/fabric-agora.webp" alt="fabric-agora" layout="fill" objectFit="cover"/>
                            </Block>
                            <Block gridArea="b" display="flex" flexDirection="column" justifyContent="flex-start" padding={["16px", "16px", "32px 40px"]}>
                                <Block font={["MinXLabel12", "MinXLabel12", "MinXLabel16"]} color="#33DED2">RECOMMENDED</Block>
                                <Block position="relative" width="35%" maxWidth="229px" marginBottom={["24px", null, "40px"]}>
                                    <Image src="/images/icon/icon-agora.png" alt="fabric-agora" width={229} height={57} layout="responsive" objectFit="contain"/>
                                </Block>
                                <Block marginBottom={["4px", null, "8px"]} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]}>AGORA - 500D Acrylic</Block>
                                <Block marginBottom={["4px", null, "8px"]} font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]}>All of our umbrellas are designed to offer the ideal coverage and protection needed for all your
                                    events. It is easy to clean, maintain and is also mold resistant for longer durability, making it ideal for all weather conditions. </Block>
                                <Block as="a" font="MinXParagraph14" color="#8C8C8C !important" href="https://s3.us-west-2.amazonaws.com/static.westshade.com/files/agora+fabric+spec.pdf" target="_blank"><Block
                                    $style={{textDecoration: "underline"}}>Download AGORA fabric spec</Block></Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns={["1fr", null, "1fr auto"]} gridColumnGap="70px" gridRowGap="16px" maxWidth="1152px" marginRight="auto" marginLeft="auto" marginBottom={["27px", null, "40px"]}>
                        <Block className="text-center" display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap={["14px", null, "21px"]} height={["165px", null, "410px"]}>
                            <Block position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" backgroundColor="rgba(0, 0, 0, 0.4)" overflow="hidden"
                                   $style={{borderRadius: "8px"}}>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXLabel12", "MinXLabel12", "MinXLabel16"]} color="#33DED2">For stock color</Block>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXHeading14", "MinXHeading14", "MinXHeading24"]} color="white">500D polyester/acrylic</Block>
                                <Block width="100px" height={["24px", null, "32px"]} font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph16"]} color="white">SDP / AGORA</Block>
                                <Block $style={{zIndex: "-1"}}>
                                    <Image src="/images/product/umbrella/umbrella_fabric_stock.webp" alt="500d polyester" layout="fill" objectFit="cover"/>
                                </Block>
                            </Block>
                            <Block position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" backgroundColor="rgba(0, 0, 0, 0.4)" overflow="hidden"
                                   $style={{borderRadius: "8px"}}>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXLabel12", "MinXLabel12", "MinXLabel16"]} color="#33DED2">For custom printing</Block>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXHeading14", "MinXHeading14", "MinXHeading24"]} color="white">900D polyester</Block>
                                <Block width="100px" height={["24px", null, "32px"]} font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph16"]} color="white"/>
                                {/*<ButtonV1 bundle="primary" width="auto" height={["24px", null, "32px"]} text="Custom printing >" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]}*/}
                                {/*          onClick={() => router.push("/custom-printing")}/>*/}
                                <Block $style={{zIndex: "-1"}}>
                                    <Image src="/images/product/umbrella/umbrella_fabric_custom.webp" alt="500d polyester" layout="fill" objectFit="cover"/>
                                </Block>
                            </Block>
                        </Block>
                        <Block display="grid" gridRowGap={["20px", null, "30px"]}>
                            <Block display="grid" gridTemplateColumns="auto 1fr" gridColumnGap={["16px", null, "26px"]} alignItems="center" marginRight="auto">
                                <AspectRatioBox width={["45px", null, "60px"]}>
                                    <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/icon_water.webp" alt="Water resistant" layout="fill" objectFit="contain"/>
                                </AspectRatioBox>
                                <Block width="100%" maxWidth={["unset", null, "234px"]} color="MinXPrimaryText">
                                    <Block marginBottom={["4px", null, "8px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading18"]} $style={{fontWeight: "400 !important"}}>Water Resistant</Block>
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">The fabric has a waterproof treatment.</Block>
                                </Block>
                            </Block>
                            <Block display="grid" gridTemplateColumns="auto 1fr" gridColumnGap={["16px", null, "26px"]} alignItems="center" marginRight="auto">
                                <AspectRatioBox width={["45px", null, "60px"]}>
                                    <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/icon_fire.webp" alt="fire retardant" layout="fill" objectFit="contain"/>
                                </AspectRatioBox>
                                <Block width="100%" maxWidth={["unset", null, "234px"]} color="MinXPrimaryText">
                                    <Block marginBottom={["4px", null, "8px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading18"]} $style={{fontWeight: "400 !important"}}>Fire Retardant</Block>
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">The fabric meets CPAI-84 fire resistant requirements.</Block>
                                </Block>
                            </Block>
                            <Block display="grid" gridTemplateColumns="auto 1fr" gridColumnGap={["16px", null, "26px"]} alignItems="center" marginRight="auto">
                                <AspectRatioBox width={["45px", null, "60px"]}>
                                    <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/icon_upf.webp" alt="UPF 50+" layout="fill" objectFit="contain"/>
                                </AspectRatioBox>
                                <Block width="100%" maxWidth={["unset", null, "234px"]} color="MinXPrimaryText">
                                    <Block marginBottom={["4px", null, "8px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading18"]} $style={{fontWeight: "400 !important"}}>UPF 50+</Block>
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">The fabric blocks 98% harmful UV rays.</Block>
                                </Block>
                            </Block>
                            <Block display="grid" gridTemplateColumns="auto 1fr" gridColumnGap={["16px", null, "26px"]} alignItems="center" marginRight="auto">
                                <AspectRatioBox width={["45px", null, "60px"]}>
                                    <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/icon_wind.webp" alt="wind resistant" layout="fill" objectFit="contain"/>
                                </AspectRatioBox>
                                <Block width="100%" maxWidth={["unset", null, "234px"]} color="MinXPrimaryText">
                                    <Block marginBottom={["4px", null, "8px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading18"]} $style={{fontWeight: "400 !important"}}>Wind Resistant</Block>
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">The fabric stands a 35-45 mph wind.</Block>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block>
                        <Block className="text-center" marginBottom={["8px", null, "16px"]}>
                            <Block font={["MinXLabel20", "MinXLabel20", "MinXLabel24"]}>AGORA or SDP?</Block>
                            <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]}>A brief comparison of two fabrics.</Block>
                        </Block>
                        <Block display="flex" width="100%" maxWidth="840px" margin="auto" justifyContent="center">
                            {fabric.map((item) => (
                                <Block width="50%" key={item.name} display="flex" flexDirection="column" alignItems="center">
                                    <Block width="100%" minHeight={["46px", null, "68px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center" paddingBottom={["8px", null, "16px"]}>
                                        <Block position="relative" width="100%" maxWidth="250px" marginBottom={["8px", null, "16px"]}>
                                            <Image src={item.display} alt={item.name} width={928} height={516} layout="responsive" objectFit="contain"/>
                                        </Block>
                                        {item.logo ?
                                            <Image src={item.logo} alt={item.name} width={70} height={24} layout="fixed" objectFit="contain"/>
                                            :
                                            <Block color="#000000" font="MinXParagraph16">{item.label}</Block>
                                        }
                                    </Block>
                                    <Block width="100%" minHeight={["46px", null, "68px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center" backgroundColor="#F7F7F7" $style={{gap: "4px"}}>
                                        <Block as="h4" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]} color="#8C8C8C">Material</Block>
                                        <Block as="h3" font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]}>{item.material}</Block>
                                    </Block>
                                    <Block width="100%" minHeight={["46px", null, "68px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center" $style={{gap: "4px"}}>
                                        <Block as="h4" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]} color="#8C8C8C">{item.fastness.description}</Block>
                                        <Block as="h3" font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]}>{item.fastness.rating}</Block>
                                    </Block>
                                    <Block width="100%" minHeight={["46px", null, "68px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center" backgroundColor="#F7F7F7">
                                        <Block as="h4" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]} color="#8C8C8C">UV Protection</Block>
                                        <Block as="h3">
                                            {[...Array(5)].map((_, idx) => {
                                                if (item.uvProtection.rating > idx && item.uvProtection.rating < idx + 1) {
                                                    return <Block key={idx} as="i" marginLeft="1.5px" marginRight="1.5px" width="18px" height="18px"><Image src="images/icon/icon-star-half.png" alt="star" width={18} height={18}
                                                                                                                                                            layout="fixed"/></Block>
                                                } else if (item.uvProtection.rating > idx) {
                                                    return <Block key={idx} as="i" marginLeft="1.5px" marginRight="1.5px" width="18px" height="18px"><Image src="images/icon/icon-star-blue.png" alt="star" width={18} height={18}
                                                                                                                                                            layout="fixed"/></Block>
                                                } else {
                                                    return <Block key={idx} as="i" marginLeft="1.5px" marginRight="1.5px" width="18px" height="18px"><Image src="images/icon/icon-star-blank.png" alt="star" width={18} height={18}
                                                                                                                                                            layout="fixed"/></Block>
                                                }
                                            })}
                                        </Block>
                                    </Block>
                                    <Block width="100%" minHeight={["46px", null, "68px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center" $style={{gap: "4px"}}>
                                        <Block as="h4" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]} color="#8C8C8C">Quality</Block>
                                        <Block as="h3" font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]}>{item.quality}</Block>
                                    </Block>
                                    <Block width="100%" minHeight={["46px", null, "68px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center" backgroundColor="#F7F7F7" $style={{gap: "4px"}}>
                                        <Block as="h4" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]} color="#8C8C8C">Warranty</Block>
                                        <Block as="h3" font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]}>{item.frameWarranty}</Block>
                                    </Block>
                                </Block>
                            ))}
                        </Block>
                    </Block>
                </Block>
                <Block ref={refProduct} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Product in use</Block>
                    <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto" paddingTop={["16px", null, "24px"]} display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "24px", "20px"]}>
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
                <Block ref={refFaq} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >FAQs</Block>
                    <Accordion.V1 paddingTop={["16px", null, "20px"]} list={QA}/>
                </Block>
            </Block>
        </>
    )
}
