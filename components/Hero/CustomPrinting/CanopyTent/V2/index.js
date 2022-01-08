import React, {useEffect, useRef, useState} from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";

import Button from "../../../../button-n";
import ThemeProvider from "../../../../ThemeProvider";

let timeoutOpacity, timeoutCounter;

const Hero = () => {
    const router = useRouter();

    const ref = useRef(null);

    const [counter, setCounter] = useState(0);

    const goCustomPage = () => router.push("/products/custom-printed-canopy-tent", "/products/custom-printed-canopy-tent/buy");
    const goPackagePage = () => router.push({pathname: "/custom-printing-package"});

    useEffect(() => {
        return () => {
            clearTimeout(timeoutOpacity);
            clearTimeout(timeoutCounter);
        };
    }, []);

    useEffect(() => {
        if (ref && ref.current && ref.current.children.length > 0) {
            ref.current.children[counter].style.opacity = 1;
            timeoutOpacity = setTimeout(() => {
                ref.current.children[counter].style.opacity = 0;
            }, 3200)

            timeoutCounter = setTimeout(() => {
                if (counter === 2) {
                    setCounter(0);
                } else {
                    setCounter(counter + 1);
                }
            }, 3000);
        }
    }, [ref, counter]);

    return (
        <ThemeProvider.V2>
            <Block className="banner-display" width="100vw" height={["auto", null, "700px", "775px"]} left="calc(50% - 50vw)" padding={["0 16px", null, "0 20px"]}
                   overrides={{
                       Block: {
                           style: {
                               background: "transparent !important",
                               ":after": {background: `url('${process.env.imageBaseUrl}/images/custom-printing/canopy-tent/hero-bg.webp')`},
                           }
                       }
                   }}
            >
                <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(2,1fr)"]} height="100%" alignContent="center">
                    <Block position="relative">
                        <Block display={[null, null, "inline-grid"]} width="auto" height="fit-content" position={["relative", null, "absolute"]} top={[null, null, "50%"]} right={[null, null, "-175px"]}
                               overrides={{
                                   Block: {
                                       style: {
                                           '@media (min-width: 672px)': {
                                               transform: "translateY(-50%)",
                                               "-ms-transform": "translateY(-50%)",
                                               "-webkit-transform": "translateY(-50%)",
                                               "-moz-transform": "translateY(-50%)",
                                               "-o-transform": "translateY(-50%)",
                                           },
                                       }
                                   }
                               }}
                        >
                            <Block position="relative" width={["100%", null, "1073px"]} height="100%" maxWidth={["375px", null, "unset"]} margin="auto">
                                <Image src="/images/custom-printing/canopy-tent/canopy-tent-v2.webp" alt="canopy tent" width={1073} height={775} layout="responsive" objectFit="contain" priority={true}/>
                            </Block>
                        </Block>
                    </Block>
                    <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="repeat(3, max-content)" flex={1} paddingBottom="40px" marginRight="auto" marginLeft={["auto", null, "unset"]} $style={{zIndex: 9}}>
                        <Block width="fit-content" maxWidth={[null, null, "467px"]} marginBottom={["32px", null, null, "80px"]} font={["MinXTitle36", "MinXTitle36", "MinXTitle48"]} color="MinXPrimaryText"
                               overrides={{
                                   Block: {
                                       style: {fontWeight: "400 !important", lineHeight: "1em !important", textTransform: "capitalize"}
                                   },
                               }}
                        >
                            <Block $style={{float: "left"}}>We print&nbsp;</Block>
                            <Block ref={ref} position="relative" display="inline-block" $style={{float: "left"}}>
                                <Block position="absolute" className="text-gradient" backgroundImage="linear-gradient(#2FE900, #06ECF4)" left={0} $style={{opacity: 0}}>sharp</Block>
                                <Block position="absolute" className="text-gradient" backgroundImage="linear-gradient(#2C80FE, #EA21FB)" left={0} $style={{opacity: 0}}>quality</Block>
                                <Block position="absolute" className="text-gradient" backgroundImage="linear-gradient(#FE502C, #FBB921)" left={0} $style={{opacity: 0}}>brilliant</Block>
                            </Block>
                            <Block>canopy tent</Block>
                        </Block>
                        <Block as="p" width="fit-content" maxWidth={[null, null, process.env.maxWidth / 2 + "px"]} marginBottom={["16px", null, null, "32px"]} font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]}
                               color="MinXSecondaryText"
                               overrides={{
                                   Block: {
                                       style: {
                                           fontWeight: "400 !important", lineHeight: "1.5em !important",
                                           '@media (min-width: 672px)': {textAlign: "left"},
                                       }
                                   },
                               }}
                        >Westshade aims to provide the best printing service in producing high-end custom printed canopy tents. High-quality fabric and state-of-art printing technology are adopted to offer the best to our customers.</Block>
                        <Block display="flex" flexDirection="row" width="100%" maxWidth={[null, null, "467px"]} $style={{gap: "24px"}}>
                            <Button type="rainbow" width="100%" height={["48px", null, null, "56px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText" text="Customize online" buttonBackgroundColor="#FFF"
                                    buttonStyle={{boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)", zIndex: 1}} buttonHoverStyle={{color: "#8C8C8C"}} onClick={() => goCustomPage()}
                            />
                            <Button type="outline" width="100%" height={["48px", null, null, "56px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText" text="Pick a package" buttonBackgroundColor="#FFF"
                                    buttonStyle={{paddingRight: "4px !important", paddingLeft: "4px !important", borderColor: "#D0D9D9", boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1)", zIndex: 1}} buttonHoverStyle={{color: "#8C8C8C"}}
                                    onClick={() => goPackagePage()}
                            />
                        </Block>
                    </Block>
                </Block>
            </Block>
        </ThemeProvider.V2>
    )
}

export default Hero;
