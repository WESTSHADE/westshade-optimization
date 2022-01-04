import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';
import {ChevronDown} from "baseui/icon";

import Button from "Components/button-n";
import {FreeMockupForm} from "Components/sections"

const Package = [{
    imageUrl: "/images/custom-printed-package/custom-printing-10X10.webp",
    alt: "custom-printing-10X10",
    title: "10X10 ft",
    url: "/custom-printed-package/f1010cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-10X15.webp",
    alt: "custom-printing-10X15",
    title: "10X15 ft",
    url: "/custom-printed-package/f1015cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-10X20.webp",
    alt: "custom-printing-10X20",
    title: "10X20 ft",
    url: "/custom-printed-package/f1020cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-13X13.webp",
    alt: "custom-printing-13X13",
    title: "13X13 ft",
    url: "/custom-printed-package/f1313cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-13X20.webp",
    alt: "custom-printing-13X20",
    title: "13X20 ft",
    url: "/custom-printed-package/f1320cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-13X26.webp",
    alt: "custom-printing-13X26",
    title: "13X26 ft",
    url: "/custom-printed-package/f1326cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-16X16.webp",
    alt: "custom-printing-16X16",
    title: "16X16 ft",
    url: "/custom-printed-package/f1616cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printing-20X20.webp",
    alt: "custom-printing-20X20",
    title: "20X20 ft",
    url: "/custom-printed-package/f2020cpp"
}]

const PackageItem = ({imageUrl, alt, title, url, router}) => {
    return (
        <>
            <Block position="relative" width="90%" margin="auto">
                <Image src={imageUrl} alt={alt} layout="responsive" width={1024} height={1024} objectFit="contain"/>
            </Block>
            <Block font="MinXLabel26" color="MinXPrimaryText">{title}</Block>
            <Block position="relative" width="100%">
                <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
            </Block>
            <Button bundle="primary" height="30px" shape="square" text="View Print Packages" font="MinXLabel14" onClick={() => router.push(url)}/>
        </>
    )
}

function Custom_Printing_Canopy_Tent({router}) {
    const [showForm, setShowForm] = useState(false);
    const [formStyle, setFormStyle] = useState({height: "0"});

    useEffect(() => {
        if (!showForm) {
            setTimeout(() => setFormStyle({height: "0"}), 300);
        } else {
            setFormStyle({height: "auto"})
        }
    }, [showForm]);

    return (
        <React.Fragment>
            <Head>
                <title>Printed Package - Custom Printing Canopy Tent | WESTSHADE</title>
                <meta name="description" content="Printing packages are based on your needs with a large selection of sizes and colors to promo your business, get free design today!"/>
            </Head>
            <Block className="banner" position="relative" width="100vw" height={["250px", "360px", "500px"]} left="calc(50% - 50vw)" color="white" font="MinXTitle20"
                   $style={{
                       ":after": {
                           background: `url('/images/banner/2000-700-1.webp') center/cover`,
                       }
                   }}
            >
                Canopy Tent Custom Printing Packages
            </Block>
            <Block className="text-center" maxWidth="960px" marginRight="auto" marginLeft="auto" padding={["24px 16px", null, "24px"]}>
                <Block marginBottom="16px" font="MinXHeading26" color="MinXPrimaryText">View custom printed package gallery below to find the best fit plan quickly.</Block>
                <Block font="MinXParagraph14" color="MinXSecondaryText">
                    Our professional team helps your canopy tents attract audiences by the unique design stands out at any trade shows, restaurants outdoor dining, job fairs, and many more! Each of our custom canopy is easy
                    pop up design and comes with a free rolling travel bag. Start with a free personalized print design from our professional designers, and promote your business and brand today!
                </Block>
            </Block>
            <Block paddingBottom={["40px", null, "64px", "90px"]} paddingTop={["40px", null, "64px", "90px"]}>
                <Block display="grid" placeItems="center" marginBottom={["24px", null, "32px", "40px"]}>
                    <Button bundle="primary" height="56px" iconStyle={{transform: showForm ? "rotate(-180deg)" : "rotate(0deg)", transition: "all .3s ease-in-out"}} font="MinXLabel16" endEnhancer={() => <ChevronDown size={20}/>}
                            onClick={() => setShowForm(!showForm)}
                    >
                        Get a free mockup
                    </Button>
                </Block>
                <Block width="100%" placeItems="center"
                       $style={{
                           ...formStyle,
                           opacity: showForm ? "1" : "0",
                           transform: showForm ? "scaleY(1)" : "scaleY(0)",
                           visibility: showForm ? "visible" : "hidden",
                           userSelect: showForm ? "auto" : "none",
                           transformOrigin: "0 0",
                           transformStyle: "flat",
                           transition: "all .5s ease-in-out"
                       }}
                >
                    <FreeMockupForm/>
                </Block>
            </Block>
            <Block className="text-center" marginBottom={["32px", "40px"]}>
                <Block font={["MinXTitle20", "MinXTitle32"]} color="MinXPrimaryText">DIFFERENCE SIZES</Block>
                <FlexGrid flexGridColumnCount={[1, 2]} flexGridColumnGap={["scale600", "scale800"]} flexGridRowGap={["scale600", "scale800"]} width="100%" maxWidth="960px" margin="auto">
                    {Package.map(({title, imageUrl, alt, url}, index) => (
                        <FlexGridItem key={title} flexGridItemIndex={index} display="grid" gridRowGap="scale600">
                            <PackageItem title={title} imageUrl={imageUrl} alt={alt} url={url} router={router}/>
                        </FlexGridItem>
                    ))}
                </FlexGrid>
            </Block>
        </React.Fragment>
    );
}

export default withRouter(Custom_Printing_Canopy_Tent);
