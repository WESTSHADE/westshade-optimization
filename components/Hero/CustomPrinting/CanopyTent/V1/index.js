import React, {useEffect, useRef, useState} from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox} from "baseui/aspect-ratio-box";

import Button from "Components/button-n";

const Hero = ({size}) => {
    const router = useRouter();

    const ref = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const goCustomPage = () => router.push({pathname: "/products/custom-printed-canopy-tent/buy"});
    const goPackagePage = () => router.push({pathname: "/custom-printing-canopy-tent"});

    useEffect(() => {
        if (size && ref && ref.current) {
            setCircleAD(ref.current.clientHeight);
            setCircleBD(ref.current.clientWidth / 2);
        }
    }, [size, ref]);

    return (
        <Block position="relative">
            <Block ref={ref} className="banner-display text-center" height={["368px", "437px", "582px"]} display="grid" gridTemplateRows="repeat(2, min-content)" gridRowGap={["8px", "16px", "20px"]} justifyItems="center"
                   marginBottom="100px" padding={["32px 30px", "40px 30px", "64px 30px"]}
                   overrides={{
                       Block: {
                           style: {
                               ":after": {background: "linear-gradient(95.25deg, rgba(241, 120, 182, 0.85) 0%, rgba(252, 221, 236, 0) 52.6%, rgba(241, 120, 182, 0.85) 100%), #FFEAF5;"}
                           }
                       },
                   }}
            >
                <Block font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}>Customize It Your Way</Block>
                <Block display="flex" flexDirection={["column", "row"]} marginTop={["16px", 0]} marginBottom={["32px", "48px", "60px"]} $style={{gap: "24px"}}>
                    <Button type="outline" height={["36px", "48px", "56px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Custom online"
                            bundle="white" $style={{zIndex: 1}} onClick={() => goCustomPage()}
                    />
                    <Button type="outline" height={["36px", "48px", "56px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Pick a package"
                            bundle="white" $style={{zIndex: 1}} onClick={() => goPackagePage()}
                    />
                </Block>
                <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#5D5FEF", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#EF5DA8", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
            </Block>
            <Block position="absolute" width={["240px", "320px", "420px"]} marginRight="auto" marginLeft="auto" right={0} bottom={0} left={0}>
                <AspectRatioBox width="inherit">
                    <Image src="/images/custom-printing/canopy-tent/canopy-tent.webp" alt="canopy tent" layout="fill" objectFit="contain" quality={100} priority={true}/>
                </AspectRatioBox>
            </Block>
        </Block>
    )
}

export default Hero;
