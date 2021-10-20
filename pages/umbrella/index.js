import React, {useEffect, useRef, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import ChevronRight from "baseui/icon/chevron-right";

import BannerDisplay from "../../components/sections/BannerDisplay";
import MButton from "../../components/button-n";

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
            <Block display={["flex", "grid"]} flexDirection={["column", "row"]} justifyContent={["center", "space-between"]} gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 2fr)"]}>
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
                            <Block alignSelf="flex-start" font="MinXParagraph16" color={"MinXSecondaryText"}>{content}</Block>
                        </Block>
                    )
                })}
            </Block>
        </Block>
    )
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

function Umbrella({router}) {
    const ref = useRef(null);

    const [compareColumnWidth, setCompareColumnWidth] = useState(0);
    const [signDisplay, setSignDisplay] = useState(true);

    const size = useWindowSize();

    useEffect(() => {
        if (ref && ref.current) {
            setCompareColumnWidth(ref.current.clientWidth);
        }
    }, [ref]);

    useEffect(() => {
        if (size.width && ref && ref.current) {
            setCompareColumnWidth(ref.current.clientWidth);
        }
    }, [size]);

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
                <Block marginBottom="24px" paddingTop={["24px", "40px"]} font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">UMBRELLA SERIES</Block>
                <Block marginBottom={["40px", "80px", "120px"]}>
                    <BannerDisplay title="MARCO" subtitle="Push up umbrellas" url="images/umbrella/series-marco.jpg" alt="series marco"
                                   containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                   renderButton={
                                       <Block display="flex" flexDirection="row" alignItems="center">
                                           <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                    font="MinXLabel20" color="MinXPrimaryTextAlt"
                                                    buttonStyle={{
                                                        borderColor: `white`,
                                                        ":hover": {backgroundColor: `rgba(255, 255, 255, 0.5)`},
                                                        ":active": {backgroundColor: `rgba(255, 255, 255, 0.8)`}
                                                    }}
                                                    onClick={() => router.push("/")} text={"Buy"}
                                           />
                                           <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryTextAlt">
                                               <Link color="inherit" href="marco">LEARN MORE</Link>
                                           </Block>
                                       </Block>
                                   }
                    />
                    <BannerDisplay title="SANTORINI" subtitle="Pulley umbrellas; Two frames options" url="images/umbrella/series-santorini.png" alt="series santorini"
                                   containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                   textColor="MinXPrimaryText"
                                   renderButton={
                                       <Block display="flex" flexDirection="row" alignItems="center">
                                           <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                    font="MinXLabel20" color="MinXPrimaryText"
                                                    buttonStyle={{
                                                        borderColor: `#262626 !important`,
                                                        ":hover": {backgroundColor: `rgba(0, 0, 0, 0.05) !important`},
                                                        ":active": {backgroundColor: `rgba(0, 0, 0, 0.1) !important`}
                                                    }}
                                                    onClick={() => router.push("/")} text={"Buy"}
                                           />
                                           <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText">
                                               <Link color="inherit" href="santorini">LEARN MORE</Link>
                                           </Block>
                                       </Block>
                                   }
                    />
                    <BannerDisplay title="BALI" subtitle="Tilt umbrellas" url="images/umbrella/series-bali.jpg" alt="series bali"
                                   containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                   renderButton={
                                       <Block display="flex" flexDirection="row" alignItems="center">
                                           <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                    font="MinXLabel20" color="MinXPrimaryTextAlt"
                                                    buttonStyle={{
                                                        borderColor: `white`,
                                                        ":hover": {backgroundColor: `rgba(255, 255, 255, 0.5)`},
                                                        ":active": {backgroundColor: `rgba(255, 255, 255, 0.8)`}
                                                    }}
                                                    onClick={() => router.push("/")} text={"Buy"}
                                           />
                                           <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryTextAlt">
                                               <Link color="inherit" href="bali">LEARN MORE</Link>
                                           </Block>
                                       </Block>
                                   }
                    />
                    <BannerDisplay title="CATALINA" subtitle="Oversized umbrellas" url="images/umbrella/series-catalina.jpg" alt="series catalina"
                                   containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                   textColor="MinXPrimaryText"
                                   renderButton={
                                       <Block display="flex" flexDirection="row" alignItems="center">
                                           <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                    font="MinXLabel20" color="MinXPrimaryText"
                                                    buttonStyle={{
                                                        borderColor: `#262626 !important`,
                                                        ":hover": {backgroundColor: `rgba(0, 0, 0, 0.05) !important`},
                                                        ":active": {backgroundColor: `rgba(0, 0, 0, 0.1) !important`}
                                                    }}
                                                    onClick={() => router.push("/")} text={"Buy"}
                                           />
                                           <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText">
                                               <Link color="inherit" href="catalina">LEARN MORE</Link>
                                           </Block>
                                       </Block>
                                   }
                    />
                </Block>
                <BannerDisplay title="CUSTOM PRINTING" subtitle="Make your umbrellas special for your activity." url="images/umbrella/custom-printing.png" alt="custom printing"
                               containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent" containerBackgroundPosition="bottom"
                               textColor={"#262626"} subTextColor={"#8C8C8C"}
                               renderButton={
                                   <MButton type="solid" height={["24px", "32px", "40px"]} font={["MinXLabel14", "MinXLabel16"]} text='Learn More'
                                            endEnhancer={() => <ChevronRight size={24}/>}
                                            onClick={() => router.push("/")}
                                   />
                               }
                />
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           },
                       },
                   }}
            >
                <Block marginBottom="8px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">Compare</Block>
                <Block marginBottom="8px" font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">Have a quick look at all umbrella series.</Block>
                <Block marginBottom={["44px", "32px", "24px"]} font="MinXLabel16" color="MinXPrimaryText">
                    <Link color="inherit" href="spec">All specs ></Link>
                </Block>
                <Block position="relative" display="grid" gridTemplateColumns={["1fr 1fr", "1fr 2fr", "1fr 5fr"]}>
                    <Block ref={ref} backgroundColor="white" paddingTop="24px">
                        <Block maxWidth="110px" minHeight="134px" marginBottom="40px" font="MinXHeading20" color="MinXPrimaryText">UMBRELLA SERIES</Block>
                        <Block minHeight="22px" marginBottom="32px" font="MinXParagraph14" color="MinXSecondaryText">OPEN SYSTEM</Block>
                        <Block minHeight="110px" marginBottom="32px" font="MinXParagraph14" color="MinXSecondaryText">SIZE</Block>
                        <Block minHeight="44px" marginBottom="32px" font="MinXParagraph14" color="MinXSecondaryText">FRAME</Block>
                        <Block minHeight="44px" marginBottom="32px" font="MinXParagraph14" color="MinXSecondaryText">FABRIC</Block>
                        <Block minHeight="22px" marginBottom="32px" font="MinXParagraph14" color="MinXSecondaryText">TILT</Block>
                    </Block>
                    <Block display="flex" flexDirection="row" overflow={["scrollX", "scrollX", "hidden"]}
                           overrides={{
                               Block: {
                                   style: {
                                       textAlign: "center",
                                   },
                               },
                           }}
                    >
                        <Block width="100%" minWidth={compareColumnWidth + "px"} display="flex" flexDirection="column" alignItems="center" paddingTop="24px" paddingRight="10px" paddingLeft="10px" backgroundColor="MinXBackground">
                            <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16" color="MinXPrimaryText">
                                <Block position="relative" width="100%" height="54px" marginRight="auto" marginLeft="auto">
                                    <Image src="images/umbrella/spec/bali.png" alt="Bali Umbrella Spec" layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                                <Block>Bali</Block>
                                <MButton type="solid" height="24px" marginRight="auto" marginLeft="auto" font="MinXLabel14" text='Buy'
                                         buttonStyle={{paddingTop: "0px !important", paddingRight: "20px !important", paddingBottom: "0px !important", paddingLeft: "20px !important"}}
                                         onClick={() => router.push("/")}
                                />
                            </Block>
                            <Block minHeight="22px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">Crank</Block>
                            <Block minHeight="110px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>6.5'</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>Steel</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>SDP</Block>
                            </Block>
                            <Block minHeight="22px" marginBottom="32px">
                                <Block width="22px" height="22px">
                                    <Image src="images/umbrella/related.png" alt="related tilt" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                </Block>
                            </Block>
                        </Block>
                        <Block width="100%" minWidth={compareColumnWidth + "px"} display="flex" flexDirection="column" alignItems="center" paddingTop="24px" paddingRight="10px" paddingLeft="10px">
                            <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16" color="MinXPrimaryText">
                                <Block position="relative" width="100%" height="54px" marginRight="auto" marginLeft="auto">
                                    <Image src="images/umbrella/spec/kapri.png" alt="Kapri Umbrella Spec" layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                                <Block>Kapri</Block>
                                <MButton type="solid" height="24px" marginRight="auto" marginLeft="auto" font="MinXLabel14" text='Buy'
                                         buttonStyle={{paddingTop: "0px !important", paddingRight: "20px !important", paddingBottom: "0px !important", paddingLeft: "20px !important"}}
                                         onClick={() => router.push("/")}
                                />
                            </Block>
                            <Block minHeight="22px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">Crank</Block>
                            <Block minHeight="110px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText"
                                   overrides={{
                                       Block: {
                                           style: {textAlign: "right"},
                                       },
                                   }}
                            >
                                <Block>6.5'</Block>
                                <Block>7.5'</Block>
                                <Block>9'</Block>
                                <Block>10'</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>Aluminum</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>AGORA</Block>
                            </Block>
                            <Block minHeight="22px" marginBottom="32px">
                                <Block width="22px" height="22px">
                                    <Image src="images/umbrella/related.png" alt="related tilt" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                </Block>
                            </Block>
                        </Block>
                        <Block width="100%" minWidth={compareColumnWidth + "px"} display="flex" flexDirection="column" alignItems="center" paddingTop="24px" paddingRight="10px" paddingLeft="10px" backgroundColor="MinXBackground">
                            <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16" color="MinXPrimaryText">
                                <Block position="relative" width="100%" height="54px" marginRight="auto" marginLeft="auto">
                                    <Image src="images/umbrella/spec/marco.png" alt="Marco Umbrella Spec" layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                                <Block>Marco</Block>
                                <MButton type="solid" height="24px" marginRight="auto" marginLeft="auto" font="MinXLabel14" text='Buy'
                                         buttonStyle={{paddingTop: "0px !important", paddingRight: "20px !important", paddingBottom: "0px !important", paddingLeft: "20px !important"}}
                                         onClick={() => router.push("/")}
                                />
                            </Block>
                            <Block minHeight="22px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">Push-up</Block>
                            <Block minHeight="110px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>6.5'</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>Aluminum</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>SDP</Block>
                                <Block>AGORA</Block>
                            </Block>
                            <Block minHeight="22px" marginBottom="32px">
                                <Block width="22px" height="22px">
                                    <Image src="images/umbrella/unrelated.png" alt="unrelated tilt" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                </Block>
                            </Block>
                        </Block>
                        <Block width="100%" minWidth={compareColumnWidth + "px"} display="flex" flexDirection="column" alignItems="center" paddingTop="24px" paddingRight="10px" paddingLeft="10px">
                            <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16" color="MinXPrimaryText">
                                <Block position="relative" width="100%" height="54px" marginRight="auto" marginLeft="auto">
                                    <Image src="images/umbrella/spec/santorini.png" alt="Santorini Umbrella Spec" layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                                <Block>Santorini</Block>
                                <MButton type="solid" height="24px" marginRight="auto" marginLeft="auto" font="MinXLabel14" text='Buy'
                                         buttonStyle={{paddingTop: "0px !important", paddingRight: "20px !important", paddingBottom: "0px !important", paddingLeft: "20px !important"}}
                                         onClick={() => router.push("/")}
                                />
                            </Block>
                            <Block minHeight="22px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">Pulley</Block>
                            <Block minHeight="110px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText"
                                   overrides={{
                                       Block: {
                                           style: {textAlign: "right"},
                                       },
                                   }}
                            >
                                <Block>6.5'</Block>
                                <Block>7.5'</Block>
                                <Block>9'</Block>
                                <Block>10'</Block>
                                <Block>11.5'</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>Aluminum</Block>
                                <Block>Fiberglass</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>AGORA</Block>
                            </Block>
                            <Block minHeight="22px" marginBottom="32px">
                                <Block width="22px" height="22px">
                                    <Image src="images/umbrella/related.png" alt="related tilt" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                </Block>
                            </Block>
                        </Block>
                        <Block width="100%" minWidth={compareColumnWidth + "px"} display="flex" flexDirection="column" alignItems="center" paddingTop="24px" paddingRight="10px" paddingLeft="10px" backgroundColor="MinXBackground">
                            <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16" color="MinXPrimaryText">
                                <Block position="relative" width="100%" height="54px" marginRight="auto" marginLeft="auto">
                                    <Image src="images/umbrella/spec/catalina.png" alt="Catalina Umbrella Spec" layout="fill" objectFit="contain" quality={100}/>
                                </Block>
                                <Block>Catalina</Block>
                                <MButton type="solid" height="24px" marginRight="auto" marginLeft="auto" font="MinXLabel14" text='Buy'
                                         buttonStyle={{paddingTop: "0px !important", paddingRight: "20px !important", paddingBottom: "0px !important", paddingLeft: "20px !important"}}
                                         onClick={() => router.push("/")}
                                />
                            </Block>
                            <Block minHeight="22px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">Crank</Block>
                            <Block minHeight="110px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>10'</Block>
                                <Block>11.5'</Block>
                                <Block>13'</Block>
                                <Block>16.4'</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>Aluminum</Block>
                            </Block>
                            <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                <Block>AGORA</Block>
                            </Block>
                            <Block minHeight="22px" marginBottom="32px">
                                <Block width="22px" height="22px">
                                    <Image src="images/umbrella/unrelated.png" alt="unrelated tilt" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    {signDisplay && size.width < 960 ? (
                        <Block position="absolute" width="132px" height="84px" backgroundColor="rgba(0,0,0,0.6)" top={0} right={0} bottom={0} left={0} display="flex" justifyContent="center" alignItems="center"
                               marginTop="auto" marginRight="auto" marginBottom="auto" marginLeft="auto"
                               overrides={{
                                   Block: {
                                       style: {
                                           borderTopRightRadius: "8px",
                                           borderBottomRightRadius: "8px",
                                           borderBottomLeftRadius: "8px",
                                           borderTopLeftRadius: "8px",
                                           ":hover": {cursor: 'pointer'}
                                       },
                                   },
                               }}
                               onClick={() => setSignDisplay(false)}
                        >
                            <Block position="relative" width="50px" height="50px">
                                <Image src="images/umbrella/slide.png" alt="Slide Sign" layout="fill" objectFit="contain" quality={100}/>
                            </Block>
                        </Block>
                    ) : null}
                </Block>
            </Block>
            <Block marginBottom={["22px", "44px", "66px"]}>
                <Section title="FABRIC" content="We provide fabric from two brands - SDP and AGORA."
                         displayList={[
                             {url: "/images/umbrella/fabric-sdp.jpg", alt: "fabric sdp", title: "SDP", content: "The SDP fabric is made of solution dyed polyester with a UPF 50+ protection. It is water repellent, stain resistant."},
                             {url: "/images/umbrella/fabric-agora.jpg", alt: "fabric agora", title: "AGORA", content: "The AGORA fabric is made of solution dyed acrylic with a UPF 50+ protection. AGORA has a longer lifespan than SDP."}
                         ]}
                />
                <Section title="FRAME" content="There are two types of frames you can choose from - fiberglass and aluminum if available."
                         displayList={[
                             {
                                 url: "/images/umbrella/frame-aluminum.jpg",
                                 alt: "frame aluminum",
                                 title: "Aluminum",
                                 content: "The lightweight, durable, corrosion resistance aluminum frame comes with an excellent finish. It is strong and will not break in high winds."
                             },
                             {
                                 url: "/images/umbrella/frame-fiberglass.jpg",
                                 alt: "frame fiberglass",
                                 title: "Fiberglass",
                                 content: "The lightweight, flexible, and strong fiberglass allows the frame to bend without breaking, even in the most severe storms."
                             }
                         ]}
                />
                <Section title="OPEN SYSTEM" content="There are two types of open system - push up and pulley lift."
                         displayList={[
                             {
                                 url: "/images/umbrella/open-push-up.jpg",
                                 alt: "open push up",
                                 title: "Push up",
                                 content: "Simply pushing the umbrella upwards and open from the hub. Effortlessly open your umbrella in 15 seconds."
                             },
                             {
                                 url: "/images/umbrella/open-pulley.jpg",
                                 alt: "open pulley",
                                 title: "Pulley lift",
                                 content: "Easier than push up system and raise your umbrella in a few seconds with this heavy duty pulley lift system with ease."
                             }
                         ]}
                />
            </Block>
        </React.Fragment>
    )

}

Umbrella.getInitialProps = () => {
    return {
        newFooter: true,
    };
};

export default withRouter(Umbrella);
