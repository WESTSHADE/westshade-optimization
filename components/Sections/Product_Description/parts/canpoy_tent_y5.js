import React, {useCallback, useEffect, useRef, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";
import clsx from "clsx";

import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/router";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {ArrowLeft, ArrowRight, Delete} from "baseui/icon";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";

import Accordion from "Components/Accordion";
import ButtonV1 from "Components/Button/V1";
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
    {
        title: "How long will the fabric last?",
        content: "For stock color canopy tents, we use 500D, 320 gsm polyester with PVC coating that is durable even with abrasion and distortion. For custom printed tents, we use 600D (Dye Sublimation) and 900D (UV Printing) polyester with PU coating. Both have no peeling, fading, or extra fabric build-up, and UV printing fabric has 2-3 times lifespan than dye sublimation."
    },
    {title: "What material do you use and what are their special features?", content: "Our canopies use CPAI-84 certified material that is resistant to UV, water, fire, and wind, providing a safe shade."},
    {title: "Does your canopy fabric block out UV?", content: "Yes. The fabric blocks 98% of harmful UV rays."},
    {title: "How much wind can the canopy stand?", content: "Can stand in wind up to 50 mph"},
    {title: "How can I get my canopy customized?", content: "You can choose your printing style package from the custom printing tab and send us your design. Once received we will make a free mockup for you before you pay for the order."},
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

const refs = [];

const BlockVideo = ({src, isSelected, step}) => {
    const refBlockVideo = useRef(null);

    if (step && step > 0) refs[step - 1] = refBlockVideo;

    const handleScroll = useCallback(() => {
        if (refBlockVideo.current) {
            const box = refBlockVideo.current.children[0].children[0];
            const rect = refBlockVideo.current.children[0].getBoundingClientRect();

            if (box) {
                box.muted = true; // without this line it's not working, so I have "muted" in HTML

                // 全部显现
                if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                    if (isSelected) {
                        if (box.paused) box.play();
                    } else {
                        if (!box.paused) box.pause();
                    }
                }
                // 全部不显示
                if ((rect.top > window.innerHeight && rect.bottom > window.innerHeight) || (rect.top < 0 && rect.bottom < 0)) {
                    box.pause();
                }
                // 部分显现
                // if (rect.top < window.innerHeight && rect.bottom >= 0) {}
            }
        }
    }, [isSelected])

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div ref={refBlockVideo} style={{height: "100%"}}>
            <ReactPlayer className="react-player" width="100%" height="100%" url={process.env.imageBaseUrl + src} playsinline loop
                         config={{
                             file: {
                                 attributes: {
                                     // crossOrigin: "anonymous",
                                     controlsList: "nofullscreen",
                                 },
                             },
                         }}
            />
        </div>
    )
};

const VideoSlide = ({url, isSelected, step}) => {
    return (
        <div className="react-player">
            <BlockVideo src={url} type="video/mp4" isSelected={isSelected} step={step}/>
        </div>
    );
};

export default function Description() {
    const router = useRouter();

    const refFrame = useRef(null);
    const refFabric = useRef(null);
    const refProduct = useRef(null);
    const refSetup = useRef(null);
    const refFaq = useRef(null);

    const [displayIntro, setDisplayIntro] = useState(false);
    const [frameIntroIsModal, setFrameIntroIsModal] = useState(false);
    const [frameIntroPosition, setFrameIntroPosition] = useState(0);

    const goFrameSection = () => window && window.scrollTo({top: refFrame.current.offsetTop - 40, behavior: 'smooth'});
    const goFabricSection = () => window && window.scrollTo({top: refFabric.current.offsetTop - 40, behavior: 'smooth'});
    const goProductSection = () => window && window.scrollTo({top: refProduct.current.offsetTop - 40, behavior: 'smooth'});
    const goSetupSection = () => window && window.scrollTo({top: refSetup.current.offsetTop - 40, behavior: 'smooth'});
    const goFaqSection = () => window && window.scrollTo({top: refFaq.current.offsetTop - 40, behavior: 'smooth'});

    const onChangeCarousel = (index) => {
        if (refs.length > 0) {
            refs.forEach((ref, i) => {
                const box = ref.current.children[0].children[0];
                if (i === index) {
                    if (box.paused) box.play();
                } else {
                    if (!box.paused) box.pause();
                }
            });
        }
    };

    const getStepDesc = (value) => {
        let elm = null;
        switch (value) {
            case '0':
                elm = <><strong>Step 1</strong> Open Frame 75% of full extension</>;
                break;
            case '1':
                elm = <><strong>Step 2</strong> Position the roof on the frame</>;
                break;
            case '2':
                elm = <><strong>Step 3</strong> Fit the roof velco to the legs</>;
                break;
            case '3':
                elm = <><strong>Step 4</strong> Fit the roof cap on top of the center pole</>;
                break;
            case '4':
                elm = <><strong>Step 5</strong> Open the frame completely</>;
                break;
            case '5':
                elm = <><strong>Step 6</strong> Lift all roof connectors until hearing “click”</>;
                break;
            case '6':
                elm = <><strong>Step 7</strong> Attach roof straps and interlock the clips</>;
                break;
            case '7':
                elm = <><strong>Step 8</strong> Extend all legs to desired height</>;
                break;
            default:
                elm = null;
        }
        return elm;
    }

    return (
        <>
            <Block className="section-full-width" position="sticky !important" top={["64px", null, "116px"]} display={["none", null, "block"]} height="44px" backgroundColor="#F7F7F7"
                   $style={{zIndex: 3, borderTop: "1px solid #D9D9D9", borderBottom: "1px solid #D9D9D9"}}
            >
                <Block display="flex" justifyContent="space-between" alignItems="center" width="100%" height="100%" maxWidth="750px" margin="auto" padding="0 20px" font="MinXLabel14">
                    <Block className="cursor hover-underline" onClick={() => goFrameSection()}>FRAME</Block>
                    <Block className="cursor hover-underline" onClick={() => goFabricSection()}>FABRIC</Block>
                    <Block className="cursor hover-underline" onClick={() => goProductSection()}>PRODUCT IN USE</Block>
                    <Block className="cursor hover-underline" onClick={() => goSetupSection()}>HOW TO SET UP</Block>
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
                <Block paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Features</Block>
                    <Block display="grid" gridTemplateColumns="1fr" gridRowGap="24px" paddingTop={["16px", null, "24px"]}>
                        <CardTabs title="Roof Top" tabList={feature_1} containerImageProps={{backgroundColor: "#F5FCFC"}}
                                  downLoadText="Download AGORA fabric spec" downloadLink="https://s3.us-west-2.amazonaws.com/static.westshade.com/files/agora+fabric+spec.pdf"
                        />
                        <CardTabs title="Frame" tabList={feature_2} objectFit="contain" containerImageProps={{backgroundColor: "#F5FCFC"}} reverse/>
                    </Block>
                </Block>
                <Block ref={refFabric} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Fabric</Block>
                    <Block display="grid" gridTemplateColumns={["1fr", null, "1fr auto"]} gridColumnGap="70px" gridRowGap="16px" paddingTop={["16px", null, "24px"]}>
                        <Block className="text-center" display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap={["14px", null, "21px"]} height={["165px", null, "410px"]}>
                            <Block position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" backgroundColor="rgba(0, 0, 0, 0.4)" overflow="hidden"
                                   $style={{borderRadius: "8px"}}>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXLabel12", "MinXLabel12", "MinXLabel16"]} color="#33DED2">For stock color</Block>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXHeading14", "MinXHeading14", "MinXHeading24"]} color="white">500D polyester</Block>
                                <Block width="100px" height={["24px", null, "32px"]}/>
                                <Block $style={{zIndex: "-1"}}>
                                    <Image src="/images/product/canopy-tent/tent_fabric_stock.webp" alt="500d polyester" layout="fill" objectFit="cover"/>
                                </Block>
                            </Block>
                            <Block position="relative" display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" backgroundColor="rgba(0, 0, 0, 0.4)" overflow="hidden"
                                   $style={{borderRadius: "8px"}}>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXLabel12", "MinXLabel12", "MinXLabel16"]} color="#33DED2">For custom printing</Block>
                                <Block marginBottom={["8px", null, "12px"]} font={["MinXHeading14", "MinXHeading14", "MinXHeading24"]} color="white">600D polyester</Block>
                                <ButtonV1 bundle="primary" width="auto" height={["24px", null, "32px"]} text="Custom printing >" font={["MinXParagraph12", "MinXParagraph12", "MinXParagraph14"]}
                                          onClick={() => router.push("/custom-printing")}/>
                                <Block $style={{zIndex: "-1"}}>
                                    <Image src="/images/product/canopy-tent/tent_fabric_custom.webp" alt="600d polyester" layout="fill" objectFit="cover"/>
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
                </Block>
                <Block ref={refProduct} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >Product in use</Block>
                    <Block width="100%" maxWidth="1152px" marginRight="auto" marginLeft="auto" paddingTop={["16px", null, "24px"]} display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", "24px", "20px"]}>
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
                <Block ref={refSetup} paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]}>
                    <Block as="h3" className="section-full-width text-center" display="flex" justifyContent="center" alignItems="center" height={["32px", null, "52px"]} font={["MinXHeading16", "MinXHeading16", "MinXHeading24"]}
                           backgroundColor="#E4F4F5" $style={{fontWeight: "400 !important"}}
                    >How to set up</Block>
                    <Block position="relative" paddingTop={["16px", null, "24px"]}>
                        <Block display={["block", "block", "none"]}>
                            <Block display="flex" flexDirection="column" alignItems="center" paddingBottom={["36px", "60px"]} overflow="hidden" backgroundColor={"MinXBackground"}
                                   overrides={{
                                       Block: {
                                           props: {
                                               className: "react-carousel react-carousel-small"
                                           },
                                       },
                                   }}
                            >
                                <Carousel showStatus={false} showThumbs={false} showArrows={false} showIndicators={true} swipeable={true} emulateTouch={true}
                                          onChange={onChangeCarousel}
                                          renderItem={(item, props) => {
                                              return (
                                                  <>
                                                      <Block position="relative" height={["320px", "509px"]} marginBottom={["16px", "32px"]} overflow="hidden">
                                                          <item.type {...item.props} {...props} />
                                                      </Block>
                                                      {props.isSelected ? (
                                                          <Block font="MinXParagraph14" color="MinXPrimaryText">{getStepDesc(item.key)}</Block>
                                                      ) : null}
                                                  </>
                                              );
                                          }}
                                          renderIndicator={(onClickHandler, isSelected, index, label) => {
                                              if (isSelected) {
                                                  return (
                                                      <li style={{backgroundColor: "#fff", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
                                                          title={`Selected: ${label} ${index + 1}`}
                                                      />
                                                  );
                                              }
                                              return (
                                                  <li key={index} style={{backgroundColor: "#C4C4C4", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
                                                      onClick={onClickHandler}
                                                      onKeyDown={onClickHandler}
                                                      value={index}
                                                      role="button"
                                                      tabIndex={0}
                                                      title={`${label} ${index + 1}`}
                                                  />
                                              );
                                          }}
                                >
                                    <VideoSlide key={0} url="/images/canopy-tent/set-up-tent/step_1.mp4" step={1}/>
                                    <VideoSlide key={1} url="/images/canopy-tent/set-up-tent/step_2.mp4" step={2}/>
                                    <VideoSlide key={2} url="/images/canopy-tent/set-up-tent/step_3.mp4" step={3}/>
                                    <VideoSlide key={3} url="/images/canopy-tent/set-up-tent/step_4.mp4" step={4}/>
                                    <VideoSlide key={4} url="/images/canopy-tent/set-up-tent/step_5.mp4" step={5}/>
                                    <VideoSlide key={5} url="/images/canopy-tent/set-up-tent/step_6.mp4" step={6}/>
                                    <VideoSlide key={6} url="/images/canopy-tent/set-up-tent/step_7.mp4" step={7}/>
                                    <VideoSlide key={7} url="/images/canopy-tent/set-up-tent/step_8.mp4" step={8}/>
                                </Carousel>
                            </Block>
                        </Block>
                        <Block display={["none", "none", "block"]}>
                            <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} centerMode centerSlidePercentage={65}
                                      onChange={(index) => onChangeCarousel(index + 8)}
                                      renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                          hasPrev && (
                                              <Block position="absolute" width="17.5%" height={["320px", "400px"]} top={0} left={0}>
                                                  <ButtonV1 shape="circle" buttonClassName="cursor react-carousel-arrow left" bundle="gray" onClick={onClickHandler}>
                                                      <ArrowLeft size={28} color={"white"}/>
                                                  </ButtonV1>
                                              </Block>
                                          )
                                      }
                                      renderArrowNext={(onClickHandler, hasNext, label) =>
                                          hasNext && (
                                              <Block position="absolute" width="17.5%" height={["320px", "400px"]} top={0} right={0}>
                                                  <ButtonV1 shape="circle" buttonClassName="cursor react-carousel-arrow right" bundle="gray" onClick={onClickHandler}>
                                                      <ArrowRight size={28} color={"white"}/>
                                                  </ButtonV1>
                                              </Block>
                                          )
                                      }
                                      renderItem={(item, props) => {
                                          return (
                                              <div>
                                                  <Block className="react-carousel" position="relative" height={["320px", "400px"]} marginRight="10px" marginBottom="32px" marginLeft="10px" overflow="hidden">
                                                      {props.isSelected ? null : <div className="react-carousel-dusk round"/>}
                                                      <item.type {...item.props} {...props} />
                                                  </Block>
                                                  {props.isSelected ? (
                                                      <Block font="MinXParagraph16" color="MinXPrimaryText">{getStepDesc(item.key)}</Block>
                                                  ) : null}
                                              </div>
                                          );
                                      }}
                            >
                                <VideoSlide key={0} url="/images/canopy-tent/set-up-tent/step_1.mp4" step={9}/>
                                <VideoSlide key={1} url="/images/canopy-tent/set-up-tent/step_2.mp4" step={10}/>
                                <VideoSlide key={2} url="/images/canopy-tent/set-up-tent/step_3.mp4" step={11}/>
                                <VideoSlide key={3} url="/images/canopy-tent/set-up-tent/step_4.mp4" step={12}/>
                                <VideoSlide key={4} url="/images/canopy-tent/set-up-tent/step_5.mp4" step={13}/>
                                <VideoSlide key={5} url="/images/canopy-tent/set-up-tent/step_6.mp4" step={14}/>
                                <VideoSlide key={6} url="/images/canopy-tent/set-up-tent/step_7.mp4" step={15}/>
                                <VideoSlide key={7} url="/images/canopy-tent/set-up-tent/step_8.mp4" step={16}/>
                            </Carousel>
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

