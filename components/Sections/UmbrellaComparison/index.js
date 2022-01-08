import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";

import {useRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';

import Button from "../../button-n";

import UMBRELLA from "Assets/spec-umbrella-chart.json";

import styles from "./comparison.module.scss"

const Section = ({size}) => {
    const router = useRouter();

    const ref = useRef(null);

    const [signDisplay, setSignDisplay] = useState(true);
    const [compareColumnWidth, setCompareColumnWidth] = useState(0);

    useEffect(() => {
        if (size.width && ref && ref.current) setCompareColumnWidth(ref.current.clientWidth);
    }, [size, ref]);

    return (
        <Block position="relative" display="grid" gridTemplateColumns={["1fr 1fr", "1fr 2fr", "1fr 5fr"]}>
            <Block ref={ref} paddingTop="24px" font="MinXParagraph14" color="MinXSecondaryText" backgroundColor="white">
                <Block maxWidth="110px" minHeight="134px" marginBottom="40px" font="MinXHeading20" color="MinXPrimaryText">UMBRELLA SERIES</Block>
                <Block minHeight="22px" marginBottom="32px">OPEN SYSTEM</Block>
                <Block minHeight="110px" marginBottom="32px">SIZE</Block>
                <Block minHeight="44px" marginBottom="32px">FRAME</Block>
                <Block minHeight="44px" marginBottom="32px">FABRIC</Block>
                <Block minHeight="22px" marginBottom="32px">TILT</Block>
            </Block>
            <Block className="text-center" display="flex" flexDirection="row" overflow={["scrollX", null, "hidden"]}>
                {UMBRELLA.display.map(({title, picUrl, alt, buyUrl}, index) => (
                    <Block key={index} className={styles["container-column"]} minWidth={compareColumnWidth + "px"} font="MinXLabel14" color="MinXPrimaryText" backgroundColor={index % 2 ? "white" : "MinXBackground"}>
                        <Block display="grid" gridRowGap="16px" width="100%" minHeight="134px" marginBottom="40px" font="MinXParagraph16">
                            <AspectRatioBox aspectRatio={32 / 27} width="64px" margin="auto"><AspectRatioBoxBody as={Image} src={picUrl} alt={alt} layout="fill" objectFit="contain"/></AspectRatioBox>
                            <Block>{title}</Block>
                            <Button height="24px" font="MinXLabel14" text='Buy' bundle="primary" buttonStyle={{paddingRight: "20px", paddingLeft: "20px"}} onClick={() => router.push(buyUrl)}/>
                        </Block>
                        <Block minHeight="22px" marginBottom="32px">{UMBRELLA.open_system[index].map((os, i) => <Block key={i}>{os}</Block>)}</Block>
                        <Block minHeight="110px" marginBottom="32px">{UMBRELLA.size[index].map((s, i) => <Block key={i}>{s}</Block>)}</Block>
                        <Block minHeight="44px" marginBottom="32px">{UMBRELLA.frame[index].map((f, i) => <Block key={i}>{f}</Block>)}</Block>
                        <Block minHeight="44px" marginBottom="32px">{UMBRELLA.fabric[index].map((f, i) => <Block key={i}>{f}</Block>)}</Block>
                        <Block minHeight="22px" marginBottom="32px">
                            <AspectRatioBox width="24px">
                                <AspectRatioBoxBody as={Image} src={UMBRELLA.tilt[index] ? "/images/umbrella/related.webp" : "/images/umbrella/unrelated.webp"} alt="tilt" layout="fill" objectFit="contain"/>
                            </AspectRatioBox>
                        </Block>
                    </Block>
                ))}
            </Block>
            {signDisplay && size.width < 673 ? (
                <Block position="absolute" width="100%" height="100%" onClick={() => setSignDisplay(false)}>
                    <Block className={clsx(["cursor", styles["container-slide"]])}>
                        <AspectRatioBox width="50px"><AspectRatioBoxBody as={Image} src="/images/umbrella/slide.webp" alt="slide sign" layout="fill" objectFit="contain"/></AspectRatioBox>
                    </Block>
                </Block>
            ) : null}
        </Block>
    )
}

export default Section;
