import React, {useEffect, useRef, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import ArrowDown from 'baseui/icon/arrow-down'

import {Section} from "../../../components/sections"
import MButton from "../../../components/button-n";

const SectionCard = ({router, src, alt, title, content, destination}) => {
    return (
        <Block display={["grid", "grid", "flex"]} flexDirection={["column", "column", "row-reverse"]} alignItems={["", "", "center"]} justifyContent={["", "", "space-between"]}
               gridTemplateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "unset"]} gridRowGap={["20px", "24px", "unset"]}
               marginBottom={["16px", "16px", "20px"]} paddingTop={["32px", "48px", "20px"]} paddingRight={["16px", "24px", "0px"]} paddingBottom={["32px", "48px", "0px"]} paddingLeft={["16px", "24px", "40px"]}
               overrides={{
                   Block: {
                       style: {
                           boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.05)",
                           ":last-child": {marginBottom: "60px"}
                       },
                   },
               }}
        >
            <Block position="relative" width="100%" maxWidth={["256px", "320px", "380px"]} marginRight={["auto", "auto", "0px"]} marginBottom={["12px", "24px", "0px"]} marginLeft="auto">
                <Image src={src} alt={alt} layout="responsive" width={640} height={640} quality={100}/>
            </Block>
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["12px", "12px", "16px"]}>
                <Block font={["MinXTitle20", "MinXTitle28", "MinXTitle32"]} color="MinXPrimaryText">{title}</Block>
                <Block maxWidth="400px" font={["MinXParagraph14", "MinXParagraph16", "MinXParagraph20"]} color="MinXPrimaryText">{content}</Block>
                <MButton type="outline" display="block" width="72px" height="32px" font="MinXLabel14" color="MinXPrimaryText"
                         buttonStyle={{
                             paddingTop: "0px !important",
                             paddingRight: "0px !important",
                             paddingBottom: "0px !important",
                             paddingLeft: "0px !important",
                             borderColor: `#262626 !important`,
                             ":hover": {backgroundColor: `rgba(0, 0, 0, 0.05) !important`},
                             ":active": {backgroundColor: `rgba(0, 0, 0, 0.1) !important`}
                         }}
                         onClick={() => router.push(destination)} text={"Buy"}
                />
            </Block>
        </Block>
    )
}

function Custom_Printing_Umbrella({router, size}) {
    const ref = useRef(null);
    const refBanner = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const goBuyingSection = () => {
        if (window) window.scrollTo({top: size.width > 959 ? ref.current.offsetTop - 120 : ref.current.offsetTop - 72, behavior: 'smooth'});
    };

    useEffect(() => {
        if (refBanner && refBanner.current) {
            setCircleAD(refBanner.current.clientHeight);
            setCircleBD(refBanner.current.clientWidth / 2);
        }
    }, [size]);

    return (
        <React.Fragment>
            <Head>
                <title>Custom Printing Umbrella - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
            </Head>
            <Block ref={refBanner} position="relative" alignItems="center" paddingTop={["32px", "40px", "64px"]} paddingRight="16px" paddingBottom={["32px", "40px", "64px"]} paddingLeft="16px"
                   overflow="hidden"
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           },
                           style: {
                               background: "linear-gradient(95.25deg, rgba(120, 121, 241, 0.85) 0%, rgba(211, 212, 255, 0) 52.6%, rgba(120, 121, 241, 0.85) 100%), #BFC0FF;"
                           }
                       },
                   }}
            >
                <Block marginBottom={["8px", "16px", "20px"]} font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt"
                       overrides={{
                           Block: {
                               style: {zIndex: 1}
                           },
                       }}
                >Customize It Your Way</Block>
                <Block maxWidth={["260px", "420px", "580px", "640px"]} marginBottom={["8px", "16px", "20px"]}
                       font={["MinXSubtitle16", "MinXSubtitle24", 'MinXSubtitle28']} color="MinXPrimaryTextAlt"
                       overrides={{
                           Block: {
                               props: {
                                   style: {textAlign: "center", zIndex: 1}
                               }
                           },
                       }}
                >
                    You can print your own artwork on any umbrellas
                </Block>
                <MButton type="outline" height={["36px", "48px", "56px"]} marginBottom={["40px", "64px", "80px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Pick an umbrella below"
                         startEnhancer={() => <ArrowDown size={36}/>}
                         buttonStyle={{
                             backgroundColor: 'transparent !important',
                             ":hover": {backgroundColor: `rgba(255, 255, 255, 0.05) !important`},
                             ":active": {backgroundColor: `rgba(255, 255, 255, 0.1) !important`}
                         }}
                         overrides={{
                             Block: {
                                 style: {zIndex: 1}
                             },
                         }}
                         onClick={() => goBuyingSection()}
                />
                <Block width="100%" display="grid" justifyContent={["", "", "space-around"]}
                    // gridTemplateAreas={[`"a b c" "d d d"`, `"a b c" "d d d"`, "unset"]} gridTemplateColumns={["", "", "152px 153px 171px 338px"]}
                       gridTemplateAreas={[`"a c" "d d"`, `"a c" "d d"`, "unset"]} gridTemplateColumns={["", "", "152px 171px 338px"]}
                       gridColumnGap="20px" gridRowGap={["40px", "40px", "unset"]}
                       overrides={{
                           Block: {
                               style: {zIndex: 1}
                           },
                       }}
                >
                    <Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["a", "a", "unset"]}>
                        <Block position="relative" width="100%" height={["81px", "142px", "166px"]} marginRight="auto" marginLeft="auto">
                            <Image src="images/custom-printing/umbrella/icon-bali.png" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>
                        </Block>
                        <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Kapri</Block>
                    </Block>
                    {/*<Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["a", "a", "unset"]}>*/}
                    {/*    <Block position="relative" width="100%" height={["81px", "142px", "166px"]} marginRight="auto" marginLeft="auto">*/}
                    {/*        <Image src="images/custom-printing/umbrella/icon-bali.png" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>*/}
                    {/*    </Block>*/}
                    {/*    <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Bali</Block>*/}
                    {/*</Block>*/}
                    {/*<Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["b", "b", "unset"]}>*/}
                    {/*    <Block position="relative" width="100%" height={["86px", "136px", "159px"]} marginRight="auto" marginLeft="auto">*/}
                    {/*        <Image src="images/custom-printing/umbrella/icon-marco.png" alt="marco" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>*/}
                    {/*    </Block>*/}
                    {/*    <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Marco</Block>*/}
                    {/*</Block>*/}
                    <Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["c", "c", "unset"]}>
                        <Block position="relative" width="100%" height={["91px", "148px", "175px"]} marginRight="auto" marginLeft="auto">
                            <Image src="images/custom-printing/umbrella/icon-santorini.png" alt="santorini" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>
                        </Block>
                        <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Santorini</Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["d", "d", "unset"]}>
                        <Block position="relative" width="100%" height={["109px", "180px", "212px"]} marginRight="auto" marginLeft="auto">
                            <Image src="images/custom-printing/umbrella/icon-catalina.png" alt="catalina" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>
                        </Block>
                        <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Catalina</Block>
                    </Block>
                </Block>
                <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#F02B9B", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#7E49F2", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
            </Block>
            <Section title={<>DESIGNED FOR<br/>YOUR SPECIALLY</>}
                     subtitle={"Westshade provides free mockup service. Give us your idea and we will give you the tent you want."}
                     content={
                         <Block position="relative" width="100%" maxWidth="1920px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                             <Image src="images/custom-printing/umbrella/custom-printing-banner.jpg" alt="custom printing display" layout="responsive" width={1920} height={610} quality={100}/>
                         </Block>
                     }
            />
            <Block ref={ref}>
                <Section title={"UMBRELLA SERIES"}
                         subtitle={"Westshade provides 4 series of umbrellas to fulfill your unique needs."}
                         content={
                             <>
                                 {/*<SectionCard router={router} title={"Bali Tilt Umbrella"} content={"Bali umbrella is made of steel, and it comes in one size (9’) and six premade colors."}*/}
                                 {/*             src={"images/custom-printing/umbrella/bali.jpg"} alt={"bali"}*/}
                                 {/*             destination={"/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"}*/}
                                 {/*/>*/}
                                 {/*<SectionCard router={router} title={"Marco Push-Up Umbrella"} content={"Marco umbrella is made of aluminum, and it comes in one size (6.5’) and six premade colors."}*/}
                                 {/*             src={"images/custom-printing/umbrella/marco.jpg"} alt={"marco"}*/}
                                 {/*             destination={"/products/market-umbrellas/marco-umbrella"}*/}
                                 {/*/>*/}
                                 <SectionCard router={router} title={"Kapri Tilt Umbrella"} content={"Kapri umbrella is made of aluminum, and it comes in 4 sizes with height adjustment."}
                                              src={"images/custom-printing/umbrella/kapri.jpg"} alt={"kapri"}
                                              destination={"/"}
                                 />
                                 <SectionCard router={router} title={"Santorini Pulley Umbrella"} content={"Santorini umbrella is made of aluminum or fiberglass, and it comes in five sizes and six premade colors."}
                                              src={"images/custom-printing/umbrella/santorini.jpg"} alt={"santorini"}
                                              destination={"/products/market-umbrellas/santorini-umbrella"}
                                 />
                                 <SectionCard router={router} title={"Catalina Oversized Umbrella"} content={"Catalina umbrella is made of aluminum, and it comes in four sizes and white color."}
                                              src={"images/custom-printing/umbrella/catalina.jpg"} alt={"catalina"}
                                              destination={"/products/cantilever-umbrellas/catalina-umbrella"}
                                 />
                             </>
                         }
                />
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Custom_Printing_Umbrella);
