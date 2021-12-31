import React from "react";

import {useRouter} from "next/router";

import {Block} from "baseui/block";
import {ChevronRight} from "baseui/icon";

import Button from "Components/button-n";
import {ThemeV1 as ThemeProvider} from "Components/ThemeProvider";

const SpecSection = ({
                         title,
                         content,
                         unit,
                         titleSize = ["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle18"],
                         contentSize = ["MinXTitle32", "MinXTitle32", "MinXTitle36"],
                         unitSize = ["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"],
                         titleColor,
                         contentColor,
                         annotation
                     }) => {
    return (
        <Block display="grid" gridAutoRows="max-content" gridRowGap="16px" justifyItems="center" maxWidth="160px" padding={annotation ? "0 16px" : "5px 16px 0"}>
            <Block annotation={" " + annotation} font={titleSize} color={titleColor}
                   overrides={{
                       Block: {
                           style: {
                               fontWeight: "400 !important", lineHeight: "1em !important",
                               ":after": annotation ? {content: "attr(annotation)", fontSize: "10px", verticalAlign: "super"} : {}
                           }
                       }
                   }}>{title}</Block>
            <Block>
                <Block font={contentSize} color={contentColor} $style={{fontWeight: "300 !important", lineHeight: "1em !important"}}>{content}</Block>
                {unit ? <Block font={unitSize} color={titleColor} $style={{fontWeight: "400 !important", lineHeight: "1em !important"}}>{unit}</Block> : ""}
            </Block>
        </Block>
    )
}

const Hero = ({size}) => {
    const router = useRouter();

    const goBuyingPage = () => router.push({pathname: "/products/canopy-tent/buy"});

    return (
        <ThemeProvider>
            <Block>
                <Block className="banner-display text-center" width="calc(100vw + 2px)" height={["456px", null, "780px"]} display="grid" gridAutoRows="max-content" gridRowGap="8px" justifyItems="center" padding={["102px 30px 0", null, "98px 30px 0"]}
                       overrides={{
                           Block: {
                               style: {
                                   transform: size.width <= process.env.maxWidth ? "translate(-1px, 0)" : "translate(calc(-50vw + " + (process.env.maxWidth / 2 - 1) + "px), 0)",
                                   ":after": {background: "url('/images/canopy-tent/canopy-tent-hero-display.webp')"},
                               }
                           }
                       }}
                >
                    <Block font={["MinXSubtitle16", "MinXSubtitle16", "MinXSubtitle18"]} color="#AFFA64" $style={{fontWeight: "300 !important"}}>WESTSHADE</Block>
                    <Block marginBottom="8px" font={["MinXTitle42", "MinXTitle42", "MinXTitle74"]} color="MinXPrimaryTextAlt" $style={{fontWeight: "300 !important"}}>Canopy Tent</Block>
                    <Block marginBottom="8px" font={["MinXSubtitle16", "MinXSubtitle16", "MinXSubtitle20"]} color="MinXPrimaryTextAlt" $style={{fontWeight: "400 !important", fontStyle: "italic", letterSpacing: "0.04em"}}>Protect you and
                        your family
                        with our best.</Block>
                    <Button width={["194px", null, "202px"]} height={["48px", null, "52px"]} font="MinXLabel20" text="Buy Now" bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                </Block>
                <Block className="text-center" position="relative" width="100%" display={["grid", null, "flex"]} flexDirection={[null, null, "column"]} gridRowGap="12px" gridTemplateColumns="1fr" justifyContent="space-between"
                       padding={["0 16px", null, "0 20px"]}
                >
                    <Block className="glassmorphism" width="100%" height={["136px", null, "160px"]} maxWidth={[null, null, "390px"]} display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center"
                           margin={["-68px auto 0", null, "-420px auto 168px"]}
                           $style={{borderRadius: "8px", background: "linear-gradient(180deg, rgba(89, 89, 87, 0.9) 0%, rgba(62, 63, 60, 0.9) 100%), rgba(255, 255, 255, 0.3) !important"}}
                    >
                        <SpecSection title="Stand in wind" content="50" unit="mph" titleColor="MinXPrimaryTextAlt" contentColor="#AFFA64" contentSize={["MinXTitle42", "MinXTitle42", "MinXTitle52"]} annotation={1}/>
                        <SpecSection title="UV protection" content="50+" unit="mph" titleColor="MinXPrimaryTextAlt" contentColor="#AFFA64" contentSize={["MinXTitle42", "MinXTitle42", "MinXTitle52"]}/>
                    </Block>
                    <Block className="container-canopy-tent-spec canopy-tent-spec-display-outer" width="100%" maxWidth="1015px" display="grid" gridTemplateRows={["repeat(2, auto)", null, "1fr"]}
                           gridTemplateColumns={["1fr", "1fr", "3fr 2fr "]} gridRowGap="12px" margin="auto"
                    >
                        <Block className="container-canopy-tent-spec canopy-tent-spec-display-inner" width="100%" height={["136px", null, "158px"]} display="flex" alignItems="center">
                            <Block width="inherit" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-around">
                                <SpecSection title="Set up in" content="3" unit="min." titleColor="MinXSecondaryText" contentColor="MinXPrimaryText"/>
                                <SpecSection title="Pole diameter" content="2 ¼" unit="inches" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText" annotation={2}/>
                                <SpecSection title="Pole thickness" content="0.07" unit="inches" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText" annotation={2}/>
                            </Block>
                        </Block>
                        <Block className="container-canopy-tent-spec canopy-tent-spec-display-inner" width="100%" height={["136px", null, "158px"]} display="flex" alignItems="center">
                            <Block width="inherit" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-around">
                                <SpecSection title="Roof top" content="600D" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText" annotation={3}/>
                                <SpecSection title="Warranty" content="10" unit="years" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText" annotation={4}/>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </ThemeProvider>
    );
};

export default Hero;
