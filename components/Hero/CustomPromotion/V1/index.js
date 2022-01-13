import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";

import Button from "../../../Button/V1";

import styles from "./hero.module.scss";

const features = [{
    label: "High-fidelity colors",
    color: "#6BDB6F"
}, {
    label: "Long-lasting color fastness",
    color: "#6DE8E8"
}, {
    label: "UV Protection 50+",
    color: "#EF3535"
}, {
    label: "Water Resistant",
    color: "#F69829"
}, {
    label: "Fire Retardant",
    color: "#F4D94D"
}];

const Hero = ({onClick}) => {
    return (
        <Block className="section-full-width" height={["591px", null, "788px", "900px"]} padding={["0 16px", null, "0 20px"]} backgroundColor="black !important" overflow="hidden">
            <Block position="relative" display="grid" gridTemplateColumns={["1fr", null, "repeat(2,1fr)"]} width="100%" height="100%" maxWidth={process.env.maxWidth + "px"} margin="0 auto" alignContent={[null, null, "center"]}>
                <Block width="100%" maxWidth={["467px", null, "unset"]} marginTop={["36px", null, "unset"]} marginLeft="auto" marginRight="auto" $style={{zIndex: 9}}>
                    <Block display="grid" gridTemplateColumns="max-content" gridRowGap="4px" marginBottom={["32px", null, "64px"]} color="MinXPrimaryTextAlt">
                        <Block font={["MinXTitle20", "MinXTitle20", "MinXTitle32"]} $style={{fontWeight: "400 !important", lineHeight: "1em !important"}}>CUSTOM PRINTINGS THAT</Block>
                        <Block font={["MinXTitle50", "MinXTitle50", "MinXTitle100"]} $style={{zIndex: 9}}>STAND OUT</Block>
                        <Button type="rainbow" width={["282px", null, "298px"]} height={["48px", null, "56px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} color="MinXPrimaryTextAlt" text="GET A FREE MOCKUP"
                                buttonStyle={{backgroundImage: "linear-gradient(270deg, #5611EB 0%, #F02222 102.87%) !important"}} onClick={onClick}
                        />
                    </Block>
                    <Block as="ul" className={styles["ul-list"]} width="max-content" padding="24px" backgroundColor="rgba(255, 255, 255, 0.1)" $style={{backdropFilter: "blur(40px)", borderRadius: "8px"}}>
                        {features.map((feature) => (
                            <Block key={feature.label} as="li" display="flex" alignItems="center" font="MinXLabel16" color="MinXPrimaryTextAlt">
                                <Block as="span" width="8px" height="8px" marginRight="12px" backgroundColor={feature.color}/> {feature.label}
                            </Block>
                        ))}
                    </Block>
                </Block>
                <Block position={[null, null, "relative"]}>
                    <Block display="inline-grid" width="auto" height="fit-content" position="absolute" top={["152px", null, "50%"]} left={["50%", null, "-150px"]} right={[0, null, "unset"]} justifyContent="center"
                           overrides={{
                               Block: {
                                   style: {
                                       zIndex: 0,
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
                        <Block position="relative" width="1181px" height="100%" margin="auto">
                            <Image src="/images/custom-promotion/bg-desktop-large.webp" alt="canopy tent" width={1181} height={900} layout="responsive" objectFit="contain" priority={true}/>
                        </Block>
                    </Block>
                </Block>
                <Block position="absolute" display={["none", null, null, "grid"]} gridTemplateColumns="repeat(3, 1fr)" justifyItems="center" bottom="32px" right={0} left={0} font="MinXLabel16" color="MinXPrimaryTextAlt">
                    <Block display="flex" alignItems="center">
                        <Image src="/images/icon/icon-free-shipping-v2-y.png" alt="free shipping" width={24} height={17} layout="fixed" objectFit="contain"/>
                        <Block as="span" marginLeft="12px">Free shipping on all custom printing orders </Block>
                    </Block>
                    <Block display="flex" alignItems="center">
                        <Image src="/images/icon/icon-design-2.png" alt="professional design" width={30} height={20} layout="fixed" objectFit="contain"/>
                        <Block as="span" marginLeft="12px">Professional designs for any occasions</Block>
                    </Block>
                    <Block display="flex" alignItems="center">
                        <Image src="/images/icon/icon-outstanding.png" alt="high resolution printing" width={30} height={20} layout="fixed" objectFit="contain"/>
                        <Block as="span" marginLeft="12px">High-resolution digital printing</Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default Hero;
