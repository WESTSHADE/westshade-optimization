import {Block} from "baseui/block";
import {ChevronDown, ChevronLeft, ChevronRight} from "baseui/icon";
import {Tabs, Tab} from "baseui/tabs-motion";
import Image from "next/image";
import {useRef, useState} from "react";
import ReactPlayer from "react-player";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from "react-responsive-carousel";
import ButtonM from "../../components/button-n"
import BenefitV2 from "../../components/sections/Benefit/BenefitV2.js";
import FreeMockupForm from "../../components/sections/FormSections";
import styles from "./custom-promotion.module.scss"
import {Button} from "baseui/button";

const features = [
    {
        label: "High-fidelity colors",
        color: "#6BDB6F"
    },
    {
        label: "Long-lasting color fastness",
        color: "#6DE8E8"
    },
    {
        label: "UV Protection 50+",
        color: "#EF3535"
    },
    {
        label: "Water Resistant",
        color: "#F69829"
    },
    {
        label: "Fire Retardant",
        color: "#F4D94D"
    },
    {
        label: "We design for you",
        color: "#B566F2"
    },
    {
        label: "24/7 customer service",
        color: "#68B7FF"
    },
]

const printingSpecs = [
    {
        name: "UV Printing",
        image: "/images/custom-promotion/uv-printing.webp",
        color: {
            title: "COLOR",
            content: "<span>Moer vivid</span> Pantone colors;<br/> <span>Great<span/> opacity and contrast"
        },
        colorDurability: {
            title: "COLOR DURABILITY",
            content: "<span> 4-5 </span> years*"
        },
        fabric: {
            title: "FABRIC",
            content: "<span> 900D, 360 gsm </span> polyester<br/>with PU coating"
        },
        printingProcess: {
            title: "PROCESS",
            content: "<span>Directly print</span> artwork the fabric",
        },
        ink: {
            title: "INK",
            content: "Imported from <span> Japan </span>; "
        },
        application: {
            title: "APPLICATION",
            content: "Excellent for whole tent printing"
        },
        cost: {
            title: "COST",
            content: "$$$"
        }
    },
    {
        name: "Dye Sublimation",
        image: "/images/custom-promotion/dye-sublimation.webp",
        color: {
            title: "Color",
            content: "Vivid Pantone colors;<br/>Good opacity and contrast"
        },
        colorDurability: {
            title: "COLOR DURABILITY",
            content: "<span> 2-3 </span> years*"
        },
        fabric: {
            title: "FABRIC",
            content: "<span> 600D, 288 gsm </span> polyester <br/> with PU coating"
        },
        printingProcess: {
            title: "PROCESS",
            content: "<span>Heat press</span> artwork on transfer paper onto fabric",
        },
        ink: {
            title: "INK",
            content: "Imported from <span> Korea </span>; "
        },
        application: {
            title: "APPLICATION",
            content: "Excellent for logo printing"
        },
        cost: {
            title: "COST",
            content: "$$"
        }
    },
]
const tentParts = [
    {
        name: "Peak",
        label: "TENT ROOF",
        image: "/images/custom-promotion/roof-peak.webp"
    },
    {
        name: "Valance",
        label: "TENT ROOF",
        image: "/images/custom-promotion/roof-valance.webp"
    },
    {
        name: "Side Wall",
        label: "TENT ACCESSORY",
        image: "/images/custom-promotion/side-wall.webp"
    },
]

const customPrints = [
    {
        image: "/images/custom-promotion/custom-printed-umbrella.webp",
        name: "Custom Printed Umbrellas",
        availability: "5 ranges available"
    },
    {
        image: "/images/custom-promotion/custom-printed-table-cover.webp",
        name: "Custom Printed Table Covers",
        availability: "2 types available"
    }
]
const canopyFeatures = [
    {
        order: "01",
        title: "50+ UPF",
        content: "Westshade canopies provide up to 98% UV block and 50+ UPF. Our unique polyester fabric allows warm air to escape, keeping you cool on hot and sunny days."
    },
    {
        order: "02",
        title: "Water resistant",
        content: "Our waterproof pop tents are designed to offer the ideal coverage and protection needed for all your events."
    },
    {
        order: "03",
        title: "Fire retartdant",
        content: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84."
    }
]
const mockupProcess = [
    {
        order: "01",
        title: "Pick the product",
        content: "Decide on the size and range of the product that you want and our customer service team will be more than happy to help you!"
    },
    {
        order: "02",
        title: "Upload your artwork",
        content: "You can upload through our website or give us a call! If you don't have an artwork, don't worry! Our designers are here to help you every step of the way!"
    },
    {
        order: "03",
        title: "Confirm the design",
        content: "We will send you a mockup and make sure you are happy with it. The production will begin after your confirmation of the design."
    },
    {
        order: "04",
        title: "Delivery",
        content: "The production and delivery process takes about 5-10 business days. If you have any questions regarding your order please call us."
    }
]
const testimonies = [
    {
        rating: 5,
        owner: "Tom McLeod",
        message: "Everything arrived quickly. The quality exceeded expectations. I love how Westshade customer service went above and beyond with helping me place my order. It was a great purchase and met the needs of our organization entirely. I highly recommend them! "
    },
    {
        rating: 5,
        owner: "Samantha Vogel",
        message: "We absolutely love how the pop-up tents and the graphics turned out. Our first night though there was some unexpected wind that occurred but our tent was strong enough to withstand the wind! We also bought some sandbags as well just in case weather conditions get worse."
    },
    {
        rating: 5,
        owner: "Jessica Chao",
        message: "The logo on our 10x10 tents looks fantastic. How easy it is to put up is incredible. The roller bag and weights were great additions. Very pleased with the investment."
    }
]
const SectionHeader = ({title, subTitle, body}) => {
    return (
        <Block maxWidth="676px" width="100%" className={styles.sectionHeader}>
            <Block as="h4" color="#33DED2">
                {subTitle}
            </Block>
            <Block marginTop={["8px", "8px", "16px"]} as="h2" color="MinXPrimaryText">
                {title}
            </Block>
            <Block marginTop={["8px", "8px", "16px"]} as="p" color="#8c8c8c">
                {body}
            </Block>
        </Block>
    )
}

const CustomTab = ({children, active, backgroundColor}) => {
    return (
        <Block height="48px" className="text-center" color="MinXButton"
               $style={{
                   fontSize: "14px",
                   lineHeight: "1",
                   width: "100%",
                   display: "flex",
                   justifyContent: "center",
                   alignItems: "center",
                   borderTopLeftRadius: "44px",
                   borderTopRightRadius: "44px",
                   borderBottomLeftRadius: "44px",
                   borderBottomRightRadius: "44px",
                   borderTopWidth: active ? "2px" : "1px",
                   borderBottomWidth: active ? "2px" : "1px",
                   borderLeftWidth: active ? "2px" : "1px",
                   borderRightWidth: active ? "2px" : "1px",
                   borderTopStyle: "solid",
                   borderLeftStyle: "solid",
                   borderRightStyle: "solid",
                   borderBottomStyle: "solid",
                   borderColor: active ? "#23A4AD" : "#b2b2b2",
                   backgroundColor: backgroundColor ? backgroundColor : "#ffffff",
                   fontWeight: "500",
                   boxShadow: active ? "0px 0px 0px 6px rgba(35,164,173,0.2)" : "none",
                   transition: "all .3s ease-in-out"
               }}
        >
            {children}
        </Block>
    )
}

const PrintingTechSpec = (props) => {
    let {image, name, color, colorDurability, fabric, printingProcess, ink, application, cost} = props.spec;
    const createDangerousContent = (copy) => {
        return {__html: copy}
    }
    return (
        <>
            <Block width="100%" className={styles.printingTech__spec}>
                <Block width="100%">
                    <Block paddingBottom="16px" paddingTop="16px" className={styles.printingTech__spec__image}>
                        <Block>
                            <Image src={image} width={100} height={100} objectFit="cover" layout="responsive" alt="name"/>
                        </Block>
                        <Block as="h3" $style={{textAlign: "center"}} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} paddingTop="16px">
                            {name}
                        </Block>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {color.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(color.content)}/>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {colorDurability.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(colorDurability.content)}/>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {fabric.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(fabric.content)}/>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {printingProcess.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(printingProcess.content)}/>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {ink.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(ink.content)}/>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {application.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(application.content)}/>
                    </Block>
                    <Block className={styles.printingTech__spec__detail}>
                        <Block as="h3">
                            {cost.title}
                        </Block>
                        <Block dangerouslySetInnerHTML={createDangerousContent(cost.content)}/>
                    </Block>
                </Block>
            </Block>
        </>
    )
}


const CustomPromotion = () => {
    const [activePrintingSample, setActivePrintingSample] = useState(0);
    const [showComparison, setShowComparison] = useState(true);
    const mockupRef = useRef(null);
    const goToFreeMockup = () => {
        if (window) window.scrollTo({top: mockupRef.current.offsetTop, behavior: 'smooth'});
    };
    const createDangerousContent = (copy) => {
        return {__html: copy}
    }

    return (
        <>
            <Block backgroundColor="#000000" as="section" className={styles.section}>
                <Block width="100%" maxWidth="1920px" className={styles.heroWrapper} position="relative">
                    <Block display="flex" flexDirection="column" alignItems="flex-start" maxWidth="1312px" className={styles.hero}>
                        <Block color="#ffffff" as="h1">
                            Custom printings that <br/> <Block marginTop="7px" as="span"> STAND OUT</Block>
                        </Block>
                        <Block marginTop="7px">
                            <ButtonM
                                text="GET A FREE MOCKUP"
                                onClick={goToFreeMockup}
                                color="#ffffff"
                                font="MinXLabel16"
                                buttonStyle={{
                                    backgroundImage: "linear-gradient(270deg, #5611EB 0%, #F02222 102.87%)",
                                }}
                            />
                        </Block>
                        <Block as="ul" className={styles.hero__features}>
                            {
                                features.map((feature) => (
                                    <Block color="#ffffff" font="MinXLabel16" key={feature.label} display="flex" alignItems="center" as="li">
                                        <Block backgroundColor={feature.color} as="span"></Block> {feature.label}
                                    </Block>
                                ))
                            }
                        </Block>
                        <Block className={styles.hero__benefits} maxWidth="1312px">
                            <Block display="flex" alignItems="center">
                                <Image src="/images/icon/icon-free-shipping-v2-2.png" alt="free shipping" width={30} height={20} layout="fixed" objectFit="contain"/>
                                <Block marginLeft="12px" as="span"> Free shipping on all custom printing orders </Block>
                            </Block>
                            <Block display="flex" alignItems="center">
                                <Image src="/images/icon/icon-design-2.png" alt="professional design" width={30} height={20} layout="fixed" objectFit="contain"/>
                                <Block marginLeft="12px" as="span">Professional designs for any occasions</Block>
                            </Block>
                            <Block display="flex" alignItems="center">
                                <Image src="/images/icon/icon-outstanding.png" alt="high resolution printing" width={30} height={20} layout="fixed" objectFit="contain"/>
                                <Block marginLeft="12px" as="span"> High-resolution digital printing</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block backgroundColor="#ffffff" as="section" className={styles.section}>
                <Block maxWidth="840px" as="section" className={styles.printingTech}>
                    <SectionHeader
                        title="high fidelity & resolution"
                        subTitle="printing technology"
                        body="Westshade only prints high-fidelity and high-resolution pieces. You can find the one meet your needs and budgets from two printing technologies."
                    />
                    <Block className={styles.printingTech__samples}>
                        <Block color="MinXTitle" className={styles.printingTech__samples__header} $style={{textAlign: "center"}} font={["MinXLabel20", "MinXLabel20", "MinXLabel32"]}>
                            Check out real samples below
                        </Block>
                        <Block>
                            <Tabs
                                onChange={({activeKey}) => {
                                    setActivePrintingSample(activeKey);
                                }}
                                activeKey={activePrintingSample}
                                overrides={{
                                    TabList: {
                                        style: {
                                            backgroundColor: "transparent",
                                            justifyContent: "space-around",
                                            maxWidth: "682px",
                                            marginTop: "0",
                                            marginBottom: "0",
                                            marginLeft: "auto",
                                            marginRight: "auto",
                                            paddingTop: "10px",
                                            paddingBottom: "0",
                                            overflow: "visible"
                                        }
                                    },
                                    TabHighlight: {
                                        style: {display: "none"}
                                    },
                                    TabBorder: {
                                        style: {
                                            display: "none"
                                        }
                                    },
                                }}
                            >
                                <Tab
                                    overrides={{
                                        Tab: {
                                            style: {width: "30%", paddingTop: "0", paddingBottom: "0", paddingLeft: "0", paddingRight: "0", ":hover": {backgroundColor: "transparent !important"}}
                                        },
                                        TabPanel: {
                                            style: {
                                                paddingRight: "0px",
                                                paddingLeft: "0px",
                                                paddingBottom: "0px",
                                                "@media (min-width: 673px)": {
                                                    paddingTop: "32px"
                                                }
                                            }
                                        }
                                    }}
                                    title={<Block width="100%"><CustomTab active={parseInt(activePrintingSample) === 0}>UV Printing</CustomTab></Block>}
                                >
                                    <Block className={styles.printingTech__image}>
                                        <Image src="/images/custom-printed-canopy-tent/pmt-uv-printing-v2.webp" alt="UV Printing" layout="fill" objectFit="cover" objectPosition="center"/>
                                    </Block>
                                </Tab>
                                <Tab
                                    overrides={{
                                        Tab: {
                                            style: {width: "30%", paddingTop: "0", paddingBottom: "0", paddingLeft: "0", paddingRight: "0", ":hover": {backgroundColor: "transparent !important"}}
                                        },
                                        TabPanel: {
                                            style: {
                                                paddingRight: "0px",
                                                paddingLeft: "0px",
                                                paddingBottom: "0px",
                                                "@media (min-width: 673px)": {
                                                    paddingTop: "32px"
                                                }
                                            }
                                        }
                                    }}
                                    title={<Block width="100%"><CustomTab active={parseInt(activePrintingSample) === 1}>
                                        Dye Sublimation</CustomTab></Block>}
                                >
                                    <Block className={styles.printingTech__image}>
                                        <Image src="/images/custom-printed-canopy-tent/pmt-dye-sublimation-v2.webp" alt="Dye Sublimation" layout="fill" objectFit="cover" objectPosition="center"/>
                                    </Block>
                                </Tab>
                                <Tab
                                    overrides={{
                                        Tab: {
                                            style: {width: "30%", paddingTop: "0", paddingBottom: "0", paddingLeft: "0", paddingRight: "0", ":hover": {backgroundColor: "transparent !important"}}
                                        },
                                        TabPanel: {
                                            style: {
                                                paddingRight: "0px",
                                                paddingLeft: "0px",
                                                paddingBottom: "0px",
                                                "@media (min-width: 673px)": {
                                                    paddingTop: "32px"
                                                }
                                            }
                                        }
                                    }}
                                    title={<Block width="100%"><CustomTab active={parseInt(activePrintingSample) === 2}>Actual Digital image</CustomTab></Block>}>
                                    <Block className={styles.printingTech__image}>
                                        <Image src="/images/custom-printed-canopy-tent/pmt-original.png" alt="UV Printing" layout="fill" objectFit="cover" objectPosition="center"/>
                                    </Block>
                                </Tab>
                            </Tabs>
                        </Block>

                        <Block className={styles.printingTech__comparison}>
                            <Block maxWidth="287px" width="100%">
                                <ButtonM
                                    width="100%"
                                    onClick={() => setShowComparison(!showComparison)}
                                    endEnhancer={() => <Block as="i" $style={{display: "grid", placeItems: "center", transition: "all .5s ease-in-out", transform: showComparison ? "rotate(180deg)" : "rotate(0deg)"}}><ChevronDown size={20}/></Block>}
                                    text="More comparisons"
                                    bundle="primary"
                                    font="MinXLabel14"
                                    buttonStyle={{
                                        paddingTop: "20px !important",
                                        paddingBottom: "20px !important",
                                        lineHeight: "1 !important"
                                    }}
                                />
                            </Block>
                            <Block
                                $style={{
                                    visibility: showComparison ? "visible" : "hidden",
                                    height: showComparison ? "auto" : "0",
                                    opacity: showComparison ? "1" : "0",
                                    transition: "all .3s ease-in"
                                }}
                                className={styles.printingTech__comparison__content}
                            >
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block paddingBottom="16px" paddingTop="16px" className={styles.printingTech__spec__image}>
                                            <Block>
                                                <Image src={printingSpecs[0].image} width={100} height={100} objectFit="cover" layout="responsive" alt="name"/>
                                            </Block>
                                            <Block as="h3" $style={{textAlign: "center"}} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} paddingTop="16px">
                                                {printingSpecs[0].name}
                                            </Block>
                                        </Block>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block paddingBottom="16px" paddingTop="16px" className={styles.printingTech__spec__image}>
                                            <Block>
                                                <Image src={printingSpecs[1].image} width={100} height={100} objectFit="cover" layout="responsive" alt="name"/>
                                            </Block>
                                            <Block as="h3" $style={{textAlign: "center"}} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} paddingTop="16px">
                                                {printingSpecs[1].name}
                                            </Block>
                                        </Block>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].color.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].color.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].color.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].color.content)}/>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].colorDurability.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].colorDurability.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].colorDurability.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].colorDurability.content)}/>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].fabric.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].fabric.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].fabric.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].fabric.content)}/>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].printingProcess.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].printingProcess.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].printingProcess.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].printingProcess.content)}/>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].ink.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].ink.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].ink.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].ink.content)}/>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].application.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].application.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].application.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].application.content)}/>
                                    </Block>
                                </Block>
                                <Block width="100%" display="flex" alignItems="stretch">
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[0].cost.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[0].cost.content)}/>
                                    </Block>
                                    <Block className={styles.printingTech__spec__detail}>
                                        <Block as="h3">
                                            {printingSpecs[1].cost.title}
                                        </Block>
                                        <Block dangerouslySetInnerHTML={createDangerousContent(printingSpecs[1].cost.content)}/>
                                    </Block>
                                </Block>
                            </Block>
                            {
                                showComparison &&
                                <Block color="#8C8C8C" marginTop="16px" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} $style={{textAlign: "center",}}>
                                    *Color durability depends on usage and weather condition.
                                </Block>
                            }
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block backgroundColor="#F7F7F7" as="section" className={styles.section} display="grid" placeItems="center">
                <BenefitV2/>
            </Block>
            <Block backgroundColor="#ffffff" as="section" className={styles.section}>
                <Block maxWidth="840px" className={styles.service}>
                    <SectionHeader
                        title={
                            <>
                                print any <Block as="span" backgroundImage="linear-gradient(90deg, #FFC700 0%, #FF00C7 100%);" $style={{"-webkit-text-fill-color": "transparent", "-webkit-background-clip": "text"}}>colors</Block>
                            </>
                        }
                        subTitle="service"
                        body="You can print a variety of colors, styles or any combination. The
                    possibilities are endless! Our professional designers will help bring your
                    ideas to life! Check out the examples in the video below."
                    />
                    <Block maxWidth={["201px", "287px"]} width="100%" marginLeft="auto" marginRight="auto" marginTop={["8px", "16px"]}>
                        <ButtonM
                            width="100%"
                            text="Get a free mockup"
                            onClick={goToFreeMockup}
                            bundle="primary"
                            font="MinXLabel14"
                            buttonStyle={{
                                paddingTop: "11px !important",
                                paddingBottom: "11px !important",
                                letterSpacing: "normal",
                                textTransform: "capitalize",
                                lineHeight: "1 !important",
                                "@media (min-width: 1056px)": {
                                    paddingTop: "20px !important",
                                    paddingBottom: "20px !important",
                                    letterSpacing: ".1em",
                                    textTransform: "uppercase",
                                }
                            }}
                        />
                    </Block>
                    <Block width="100%" display="grid" placeItems="center" className={styles.service__video}>
                        <ReactPlayer
                            url="https://www.youtube.com/watch?v=ud5m8ET8sE8"
                            playIcon={<Block as="i" width={["57px", "57px", "140px"]}><Image src="/images/icon/icon-play-video.png" width={140} height={100} layout="responsive" quality={10}/></Block>}
                            light={process.env.imageBaseUrl + "/images/custom-promotion/video-thumb.webp"}
                            width="100%"
                            height="100%"
                        />
                    </Block>
                    <Block width="100%" display="flex" justifyContent="space-between" className={styles.service__tentParts}>
                        {
                            tentParts.map((tent) => (
                                <Block key={tent.name} width="32%">
                                    <Block width="100%">
                                        <Image src={tent.image} alt={tent.name} width={103} height={77} layout="responsive" quality={30}/>
                                    </Block>
                                    <Block marginTop="24px" color="#8c8c8c" font="MinXLabel14" as="p">
                                        {tent.label.toUpperCase()}
                                    </Block>
                                    <Block as="h3" color="MinXTitle" font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]}>
                                        {tent.name}
                                    </Block>
                                </Block>
                            ))
                        }
                    </Block>
                </Block>
            </Block>
            <Block backgroundColor="#f7f7f7" as="section" className={styles.section}>
                <Block className={`${styles.service} ${styles.service__wide}`}>
                    <SectionHeader
                        title={
                            <>
                                Print <Block as="span" backgroundImage="linear-gradient(90deg, #FFC700 0%, #FF00C7 100%);" $style={{"-webkit-text-fill-color": "transparent", "-webkit-background-clip": "text"}}>Umbrellas</Block>
                            </>
                        }
                        subTitle="service"
                        body="We print great quality on umbrellas and also table covers."
                    />
                    <Block maxWidth={["201px", "287px"]} width="100%" marginLeft="auto" marginRight="auto" marginTop={["8px", "16px"]}>
                        <ButtonM
                            width="100%"
                            text="Get a free mockup"
                            onClick={goToFreeMockup}
                            bundle="primary"
                            font="MinXLabel14"
                            buttonStyle={{
                                paddingTop: "11px !important",
                                paddingBottom: "11px !important",
                                letterSpacing: "normal",
                                textTransform: "capitalize",
                                lineHeight: "1 !important",
                                "@media (min-width: 1056px)": {
                                    paddingTop: "20px !important",
                                    paddingBottom: "20px !important",
                                    letterSpacing: ".1em",
                                    textTransform: "uppercase",
                                }
                            }}
                        />
                    </Block>
                    <Block width="100%" marginTop={["24px", "80px"]} display="flex" justifyContent="space-between" className={styles.service__customPrints}>
                        {
                            customPrints.map((item) => (
                                <Block key={item.name} width="49%">
                                    <Block width="100%">
                                        <Image src={item.image} alt={item.name} width={498} height={381} layout="responsive" quality={30}/>
                                    </Block>
                                    <Block color="MinXTitle" font={"MinXLabel20"} as="h3" $style={{lineHeight: "1"}}>
                                        {item.name}
                                    </Block>
                                    <Block marginTop="8px" as="p" color="#8c8c8c" font="MinXParagraph16">
                                        {item.availability}
                                    </Block>
                                </Block>
                            ))
                        }
                    </Block>
                </Block>
            </Block>
            <Block backgroundColor="#ffffff" as="section" className={styles.section}>
                <Block className={`${styles.service} ${styles.service__wide}`}>
                    <SectionHeader
                        title="Reliable For Any Occasion"
                        subTitle="CAUGHT IN THE WILD"
                        body="The reliability of Westshade lies on our
                    professional design,
                    heavy-duty fabric, and state of the art
                    printing technology.
                    We provide satisfactory service for
                    various kinds of customers.
                    From individual use to corporate
                    business usage.
                    You can always count on us!"
                    />
                    <Block width="100%" className={styles.service__canopy}>
                        <Block className={styles.service__canopy__slider}>
                            <Carousel
                                emulateTouch
                                showArrows={true}
                                showStatus={false}
                                showThumbs={false}
                                showIndicators={true}
                                width="100%"
                                renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                    hasPrev && (
                                        <Block position="absolute" width={"8%"} height="100%" display="grid" placeItems="center" top={0} left={0}>
                                            <Button $style={{opacity: ".50", zIndex: "5", transition: "all .3s ease", ":hover": {opacity: "1",}}} shape="circle" buttonClassName={"cursor react-carousel-arrow left"} bundle="gray"
                                                    onClick={onClickHandler}>
                                                <ChevronLeft size={28} color={"white"}/>
                                            </Button>
                                        </Block>
                                    )
                                }
                                renderArrowNext={(onClickHandler, hasNext, label) =>
                                    hasNext && (
                                        <Block position="absolute" width={"8%"} height="100%" display="grid" placeItems="center" top={0} right={0}>
                                            <Button $style={{opacity: ".50", zIndex: "5", transition: "all .3s ease", ":hover": {opacity: "1",}}} shape="circle" buttonClassName={"cursor react-carousel-arrow right"} bundle="gray"
                                                    onClick={onClickHandler}>
                                                <ChevronRight size={28} color={"white"}/>
                                            </Button>
                                        </Block>
                                    )
                                }
                            >
                                <Block className={styles.service__canopy__slider__slide} height="100%" width="100%">
                                    <Image src="/images/custom-promotion/slide1.webp" height={600} width={1272} objectFit="cover" objectPosition="center" layout="fill"/>
                                </Block>
                                <Block className={styles.service__canopy__slider__slide} height="100%" width="100%">
                                    <Image src="/images/custom-promotion/slide2.webp" height={600} width={1272} objectFit="cover" objectPosition="center" layout="fill"/>
                                </Block>
                                <Block className={styles.service__canopy__slider__slide} height="100%" width="100%">
                                    <Image src="/images/custom-promotion/slide3.webp" height={600} width={1272} objectFit="cover" objectPosition="center" layout="fill"/>
                                </Block>
                            </Carousel>
                        </Block>
                        <Block className={styles.service__canopy__features}>
                            {
                                canopyFeatures.map((feature) => (
                                    <Block className={styles.service__canopy__features__item} key={feature.order}>
                                        <Block as="h5">
                                            <span>Feature</span> {feature.order}.
                                        </Block>
                                        <Block marginTop="8px" color="MinXTitle" font="MinXLabel20" as="h3">
                                            {feature.title}
                                        </Block>
                                        <Block color="#8c8c8c" marginTop="8px" as="p" font={["MinXParagraph16"]}>
                                            {feature.content}
                                        </Block>
                                    </Block>
                                ))
                            }
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block backgroundColor="#f7f7f7" as="section" className={styles.section}>
                <Block maxWidth="1272px" className={`${styles.service} ${styles.service__wide}`}>
                    <SectionHeader
                        title="Steps to custom"
                        subTitle="Process"
                    />
                    <Block className={styles.service__process}>
                        {
                            mockupProcess.map((process) => (
                                <Block className={styles.service__canopy__processs__item} key={process.order}>
                                    <Block as="h5">
                                        {process.order}.
                                    </Block>
                                    <Block marginTop="8px" color="MinXTitle" font="MinXLabel20" as="h3">
                                        {process.title}
                                    </Block>
                                    <Block color="#8c8c8c" marginTop="8px" as="p" font={["MinXParagraph16"]}>
                                        {process.content}
                                    </Block>
                                </Block>
                            ))
                        }
                    </Block>
                </Block>
            </Block>
            <Block backgroundColor="#ffffff" as="section" className={styles.section}>
                <Block maxWidth="1272px" className={`${styles.service} ${styles.service__wide}`}>
                    <SectionHeader
                        title="What Customers Say"
                        subTitle="testimony"
                    />
                    <Block className={styles.service__testimonies}>
                        {
                            testimonies.map((testimony) => (
                                <Block className={styles.service__testimonies__item} key={testimony.owner}>
                                    <Block display="flex" alignItems="center" justifyContent="center">
                                        {
                                            [...Array(testimony.rating)].map((idx) => (
                                                <Block key={idx} marginLeft="3px" marginRight="3px" as="i" width="34px" height="34px" display="grid" placeItems="center"><Image src="/images/icon/icon-star.png" alt="star" width={34}
                                                                                                                                                                                height={34} layout="fixed"/> </Block>
                                            ))
                                        }
                                    </Block>
                                    <Block marginTop="24px" color="MinXTitle" font="MinXLabel16" as="h3">
                                        {testimony.owner}
                                    </Block>
                                    <Block color="#8c8c8c" marginTop="8px" as="p" font={["MinXParagraph16"]}>
                                        {testimony.message}
                                    </Block>
                                </Block>
                            ))
                        }
                    </Block>
                </Block>
            </Block>
            <Block ref={mockupRef} backgroundColor="#f7f7f7" as="section" className={styles.section}>
                <Block maxWidth="1132px" className={`${styles.contact}`}>

                    <SectionHeader
                        title="Interested?"
                        subTitle="contact info"
                        body="If you are interested and would like to use our custom
                    printing services or just interested in our product, please be
                    sure to leave your contact information with us on the form
                    below. We will get to you as soon as possible!"
                    />
                    <Block>
                        <FreeMockupForm/>
                    </Block>
                </Block>
            </Block>
        </>
    )
}
CustomPromotion.getInitialProps = async () => {
    return {
        fullPage: true
    };
};
export default CustomPromotion
