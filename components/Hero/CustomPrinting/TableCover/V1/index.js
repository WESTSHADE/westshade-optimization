import React, {useEffect, useRef, useState} from "react";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";

import Button from "Components/Button/V1";

const Hero = ({size}) => {
    const router = useRouter();

    const ref = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const goBuyingPage = () => router.push("/products/table-cover?id=57917", "/custom-print/table-cover/buy");

    useEffect(() => {
        if (size && ref && ref.current) {
            setCircleAD(ref.current.clientHeight);
            setCircleBD(ref.current.clientWidth / 2);
        }
    }, [size, ref]);

    return (
        <Block ref={ref} className="banner-display text-center" display="grid" gridRowGap={["8px", "16px", "20px"]} justifyItems="center" width="100vw" left="calc(50% - 50vw)" padding={["32px 30px", "40px 30px", "64px 30px"]}
               overrides={{
                   Block: {
                       style: {
                           ":after": {background: "linear-gradient(95.25deg, rgba(74, 223, 232, 0.85) 0%, rgba(194, 251, 255, 0) 52.6%, rgba(74, 223, 232, 0.85) 100%), #C2FBFF;"}
                       }
                   }
               }}
        >
            <Block font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryText" $style={{zIndex: 1}}>Customize It Your Way</Block>
            <Button bundle="black" type="outline" height={["36px", "48px", "56px"]} marginBottom={["32px", "48px", "60px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Create My Table Cover" $style={{zIndex: 1}}
                    onClick={() => goBuyingPage()}
            />
            <Block position="relative" width="100%" height={["125px", "173px", "180px"]} $style={{zIndex: 1}}>
                <Image src="/images/custom-printing/table-cover/stretch-table-cover.webp" alt="stretch table cover" layout="fill" objectFit="contain" priority={true}/>
            </Block>
            <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#97F02B", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)"}}/>
            <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#2275F2", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)"}}/>
        </Block>
    )
}

export default Hero;
