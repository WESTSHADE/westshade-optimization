import React, {useEffect, useRef, useState} from "react";

import Image from "next/image";

import {Block} from "baseui/block";

import Button from "Components/Button/V1";
import {ArrowDown} from "baseui/icon";

const Hero = ({size, onClick}) => {
    const ref = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

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
                           ":after": {background: "linear-gradient(95.25deg, rgba(120, 121, 241, 0.85) 0%, rgba(211, 212, 255, 0) 52.6%, rgba(120, 121, 241, 0.85) 100%), #BFC0FF;"}
                       }
                   },
               }}
        >
            <Block font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}>Customize It Your Way</Block>
            <Block maxWidth={["260px", "420px", "580px", "640px"]} font={["MinXSubtitle16", "MinXSubtitle24", 'MinXSubtitle28']} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}>
                You can print your own artwork on any umbrellas
            </Block>
            <Button bundle="white" type="outline" height={["36px", "48px", "56px"]} marginBottom={["8px", "12px", "20px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Pick an umbrella below" $style={{zIndex: 1}}
                    startEnhancer={() => <ArrowDown size={36}/>} onClick={onClick}
            />
            <Block width="100%" maxWidth={process.env.maxWidth + "px"} display="grid" justifyContent={[null, null, "space-around"]} gridTemplateAreas={[`"a c" "d d"`, null, "unset"]} gridTemplateColumns={[null, null, "152px 171px 338px"]}
                   gridColumnGap="20px" gridRowGap={["40px", null, "unset"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}
            >
                <Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["a", null, "unset"]}>
                    <Block position="relative" width="100%" height={["81px", "142px", "166px"]}>
                        <Image src="/images/custom-printing/umbrella/icon-bali.webp" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom" priority={true}/>
                    </Block>
                    Kapri
                </Block>
                {/*<Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["a", "a", "unset"]}>*/}
                {/*    <Block position="relative" width="100%" height={["81px", "142px", "166px"]}>*/}
                {/*        <Image src="/images/custom-printing/umbrella/icon-bali.webp" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom"/>*/}
                {/*    </Block>*/}
                {/*    Bali*/}
                {/*</Block>*/}
                {/*<Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["b", "b", "unset"]}>*/}
                {/*    <Block position="relative" width="100%" height={["86px", "136px", "159px"]}>*/}
                {/*        <Image src="/images/custom-printing/umbrella/icon-marco.webp" alt="marco" layout="fill" objectFit="contain" objectPosition="bottom"/>*/}
                {/*    </Block>*/}
                {/*    Marco*/}
                {/*</Block>*/}
                <Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["c", null, "unset"]}>
                    <Block position="relative" width="100%" height={["91px", "148px", "175px"]}>
                        <Image src="/images/custom-printing/umbrella/icon-santorini.webp" alt="santorini" layout="fill" objectFit="contain" objectPosition="bottom" priority={true}/>
                    </Block>
                    Santorini
                </Block>
                <Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["d", null, "unset"]}>
                    <Block position="relative" width="100%" height={["109px", "180px", "212px"]}>
                        <Image src="/images/custom-printing/umbrella/icon-catalina.webp" alt="catalina" layout="fill" objectFit="contain" objectPosition="bottom" priority={true}/>
                    </Block>
                    Catalina
                </Block>
            </Block>
            <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#F02B9B", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)"}}/>
            <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#7E49F2", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)"}}/>
        </Block>
    )
}

export default Hero;
