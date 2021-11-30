import React, {useEffect, useRef, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import ChevronRight from "baseui/icon/chevron-right";

import {BannerDisplay, Section} from "../../components/sections";
import MButton from "../../components/button-n";

const data = {
    display: [
        {title: "Bali", picUrl: "/images/umbrella/spec/bali.webp", alt: "Bali Umbrella Spec", buyUrl: '/products/tilt-umbrellas/bali-crank-lift-patio-umbrella'},
        {title: "Kapri", picUrl: "/images/umbrella/spec/kapri.webp", alt: "Kapri Umbrella Spec", buyUrl: '/products/tilt-umbrellas/kapri-umbrella'},
        {title: "Marco", picUrl: "/images/umbrella/spec/marco.webp", alt: "Marco Umbrella Spec", buyUrl: '/products/market-umbrellas/marco-umbrella'},
        {title: "Santorini", picUrl: "/images/umbrella/spec/santorini.webp", alt: "Santorini Umbrella Spec", buyUrl: '/products/market-umbrellas/santorini-umbrella'},
        {title: "Catalina", picUrl: "/images/umbrella/spec/catalina.webp", alt: "Catalina Umbrella Spec", buyUrl: '/products/cantilever-umbrellas/catalina-umbrella'},
    ],
    open_system: [["Crank"], ["Crank"], ["Push up"], ["Pulley"], ["Crank"]],
    size: [["9'"], ["6.5'", "7.5'", "9'", "10'"], ["6.5'"], ["6.5'", "7.5'", "9'", "10'", "11.5'"], ["10'", "11.5'", "13'", "16.4'"]],
    frame: [["Steel"], ["Aluminum"], ["Aluminum"], ["Aluminum", "Fiberglass"], ["Aluminum"]],
    fabric: [["SDP"], ["AGORA"], ["SDP", "AGORA"], ["SDP", "AGORA"], ["AGORA"]],
    tilt: [true, true, false, true, false],
};

const SectionBlock = ({title, content, displayList = []}) => {
    return (
        <Section upperContainerDirection={"column"}
                 title={title}
                 subtitle={content}
                 subtitleStyles={{maxWidth: "unset !important"}}
                 content={
                     <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridColumnGap="20px" gridRowGap="24px">
                         {displayList.map(({url, alt, title, content}, index) => {
                             return (
                                 <Block key={index} display="grid" gridTemplateColumns="1fr" gridRowGap={["8px", "12px"]} justifyItems="center" overflow="hidden">
                                     <Block position="relative" width="100%" height={["220px", "300px"]}>
                                         <Image src={url} alt={alt} layout="fill" objectFit="cover" quality={100}/>
                                     </Block>
                                     <Block font="MinXHeading16" color={"MinXPrimaryText"}>{title}</Block>
                                     <Block justifyItems="flex-start" font="MinXParagraph16" color={"MinXSecondaryText"}>{content}</Block>
                                 </Block>
                             )
                         })}
                     </Block>
                 }
        />
    )
}

function Umbrella({router, size}) {
    const ref = useRef(null);

    const [compareColumnWidth, setCompareColumnWidth] = useState(0);
    const [signDisplay, setSignDisplay] = useState(true);

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
                <meta name="description" content="Best commercial umbrella in Southern California. Find your desired umbrella with different frames, different shape and different fabric!"/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <>
                                 <Block marginBottom="24px" paddingTop={["24px", "40px"]} font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">UMBRELLA RANGES</Block>
                                 <Block marginBottom={["40px", "80px", "120px"]}>
                                     <BannerDisplay title="MARCO" subtitle="Push up umbrellas" url="/images/umbrella/series-marco.webp" alt="series marco"
                                                    containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                                    renderButton={
                                                        <Block display="flex" flexDirection="row" alignItems="center">
                                                            <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]} font="MinXLabel20" color="MinXPrimaryTextAlt"
                                                                     buttonStyle={{borderColor: "white"}}
                                                                     onClick={() => router.push("/products/market-umbrellas/marco-umbrella")} text={"Buy"}
                                                            />
                                                            <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryTextAlt">
                                                                <Link color="inherit" href="marco">LEARN MORE</Link>
                                                            </Block>
                                                        </Block>
                                                    }
                                     />
                                     <BannerDisplay title="SANTORINI" subtitle="Pulley umbrellas; Two frames options" url="/images/umbrella/series-santorini.webp" alt="series santorini"
                                                    containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                                    textColor="MinXPrimaryText"
                                                    renderButton={
                                                        <Block display="flex" flexDirection="row" alignItems="center">
                                                            <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                                     font="MinXLabel20" color="MinXPrimaryText"
                                                                     buttonStyle={{borderColor: "#262626"}}
                                                                     onClick={() => router.push("/products/market-umbrellas/santorini-umbrella")} text={"Buy"}
                                                            />
                                                            <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText">
                                                                <Link color="inherit" href="santorini">LEARN MORE</Link>
                                                            </Block>
                                                        </Block>
                                                    }
                                     />
                                     <BannerDisplay title="BALI" subtitle="Tilt umbrellas with steel frame" url="/images/umbrella/series-bali.webp" alt="series bali"
                                                    containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                                    renderButton={
                                                        <Block display="flex" flexDirection="row" alignItems="center">
                                                            <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                                     font="MinXLabel20" color="MinXPrimaryTextAlt"
                                                                     buttonStyle={{borderColor: "white"}}
                                                                     onClick={() => router.push("/products/tilt-umbrellas/bali-crank-lift-patio-umbrella")} text={"Buy"}
                                                            />
                                                            <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryTextAlt">
                                                                <Link color="inherit" href="bali">LEARN MORE</Link>
                                                            </Block>
                                                        </Block>
                                                    }
                                     />
                                     <BannerDisplay title="Kapri" subtitle="Tilt umbrellas with aluminum frame" url="/images/umbrella/series-kapri.webp" alt="series kapri"
                                                    containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                                    renderButton={
                                                        <Block display="flex" flexDirection="row" alignItems="center">
                                                            <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                                     font="MinXLabel20" color="MinXPrimaryTextAlt"
                                                                     buttonStyle={{borderColor: "white"}}
                                                                     onClick={() => router.push("/products/tilt-umbrellas/kapri-umbrella")} text={"Buy"}
                                                            />
                                                            <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryTextAlt">
                                                                <Link color="inherit" href="kapri">LEARN MORE</Link>
                                                            </Block>
                                                        </Block>
                                                    }
                                     />
                                     <BannerDisplay title="CATALINA" subtitle="Oversized umbrellas" url="/images/umbrella/series-catalina.webp" alt="series catalina"
                                                    containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent"
                                                    textColor="MinXPrimaryText"
                                                    renderButton={
                                                        <Block display="flex" flexDirection="row" alignItems="center">
                                                            <MButton type="outline" display="block" width={["90px", "100px", "120px"]} height={["24px", "32px", "40px"]}
                                                                     font="MinXLabel20" color="MinXPrimaryText"
                                                                     buttonStyle={{borderColor: "#262626"}}
                                                                     onClick={() => router.push("/products/cantilever-umbrellas/catalina-umbrella")} text={"Buy"}
                                                            />
                                                            <Block marginLeft="24px" font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText">
                                                                <Link color="inherit" href="catalina">LEARN MORE</Link>
                                                            </Block>
                                                        </Block>
                                                    }
                                     />
                                 </Block>
                                 <BannerDisplay title="CUSTOM PRINTING" subtitle="Make your umbrellas special for your activity." url="/images/umbrella/series-custom-printing.webp" alt="custom printing"
                                                containerHeight={["250px", "360px", "500px"]} containerMarginBottom={["12px", "20px"]} containerBackground="transparent" containerBackgroundPosition="bottom"
                                                textColor={"#262626"} subTextColor={"#8C8C8C"}
                                                renderButton={
                                                    <MButton type="solid" height={["24px", "32px", "40px"]} font={["MinXLabel14", "MinXLabel16"]} text='Learn More'
                                                             endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push("/custom-printing/umbrella")}
                                                    />
                                                }
                                 />
                             </>
                         }
                />
                <Section upperContainerDirection={"column"}
                         title={"Compare"}
                         subtitle={"Have a quick look at all umbrella series."}
                         subtitleStyles={{maxWidth: "unset !important"}}
                         subtitleMoreText={"All specs >"}
                         subtitleMoreDestination={"spec"}
                         content={
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
                                     {data.display.map((item, index) => {
                                         return (
                                             <Block key={index} width="100%" minWidth={compareColumnWidth + "px"} display="flex" flexDirection="column" alignItems="center" paddingTop="24px" paddingRight="10px" paddingLeft="10px"
                                                    backgroundColor={index % 2 ? "white" : "MinXBackground"}>
                                                 <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16" color="MinXPrimaryText">
                                                     <Block position="relative" width="100%" height="54px" marginRight="auto" marginLeft="auto">
                                                         <Image src={item.picUrl} alt={item.alt} layout="fill" objectFit="contain" quality={100}/>
                                                     </Block>
                                                     <Block>{item.title}</Block>
                                                     <MButton type="solid" height="24px" marginRight="auto" marginLeft="auto" font="MinXLabel14" text='Buy'
                                                              buttonStyle={{paddingTop: "0px !important", paddingRight: "20px !important", paddingBottom: "0px !important", paddingLeft: "20px !important"}}
                                                              onClick={() => router.push(item.buyUrl)}
                                                     />
                                                 </Block>
                                                 <Block minHeight="22px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                                     {data.open_system[index].map((os, i) => <Block key={i}>{os}</Block>)}
                                                 </Block>
                                                 <Block minHeight="110px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                                     {data.size[index].map((s, i) => <Block key={i}>{s}</Block>)}
                                                 </Block>
                                                 <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                                     {data.frame[index].map((f, i) => <Block key={i}>{f}</Block>)}
                                                 </Block>
                                                 <Block minHeight="44px" marginBottom="32px" font="MinXLabel14" color="MinXPrimaryText">
                                                     {data.fabric[index].map((f, i) => <Block key={i}>{f}</Block>)}
                                                 </Block>
                                                 <Block minHeight="22px" marginBottom="32px">
                                                     <Block width="22px" height="22px">
                                                         {data.tilt[index] ? (
                                                             <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                                         ) : (
                                                             <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                                                         )}
                                                     </Block>
                                                 </Block>
                                             </Block>
                                         )
                                     })}
                                 </Block>
                                 {signDisplay && size.width < 959 ? (
                                     <Block position="absolute" width="100%" height="100%" onClick={() => setSignDisplay(false)}>
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
                                         >
                                             <Block position="relative" width="50px" height="50px">
                                                 <Image src="/images/umbrella/slide.webp" alt="Slide Sign" layout="fill" objectFit="contain" quality={100}/>
                                             </Block>
                                         </Block>
                                     </Block>
                                 ) : null}
                             </Block>
                         }
                />
                <SectionBlock title="FABRIC" content="We provide fabric from two brands - SDP and AGORA."
                              displayList={[
                                  {url: "/images/umbrella/fabric-sdp.webp", alt: "fabric sdp", title: "SDP", content: "The SDP fabric is made of solution dyed polyester with a UPF 50+ protection. It is water repellent, stain resistant."},
                                  {url: "/images/umbrella/fabric-agora.webp", alt: "fabric agora", title: "AGORA", content: "The AGORA fabric is made of solution dyed acrylic with a UPF 50+ protection. AGORA has a longer lifespan than SDP."}
                              ]}
                />
                <SectionBlock title="FRAME" content="There are two types of frames you can choose from - fiberglass and aluminum if available."
                              displayList={[
                                  {
                                      url: "/images/umbrella/frame-aluminum.webp",
                                      alt: "frame aluminum",
                                      title: "Aluminum",
                                      content: "The lightweight, durable, corrosion resistance aluminum frame comes with an excellent finish. It is strong and will not break in high winds."
                                  },
                                  {
                                      url: "/images/umbrella/frame-fiberglass.webp",
                                      alt: "frame fiberglass",
                                      title: "Fiberglass",
                                      content: "The lightweight, flexible, and strong fiberglass allows the frame to bend without breaking, even in the most severe storms."
                                  }
                              ]}
                />
                <SectionBlock title="OPEN SYSTEM" content="There are two types of open system - push up and pulley lift."
                              displayList={[
                                  {
                                      url: "/images/umbrella/open-push-up.webp",
                                      alt: "open push up",
                                      title: "Push up",
                                      content: "Simply pushing the umbrella upwards and open from the hub. Effortlessly open your umbrella in 15 seconds."
                                  },
                                  {
                                      url: "/images/umbrella/open-pulley.webp",
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

export default withRouter(Umbrella);
