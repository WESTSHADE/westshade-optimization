import React, {useEffect, useState} from "react";
import {withRouter} from "next/router";

import Head from "next/head";
import Image from "next/image";

import {useStyletron} from "baseui";
import {Button, SHAPE} from "baseui/button";
import {Block} from "baseui/block";
import {ChevronDown} from "baseui/icon";

import ButtonN from "Components/button-n";
import {FreeMockupForm} from "Components/sections"

function Custom_Printing_Canopy_Tent({router}) {
    const [css] = useStyletron();
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
            <Block width="100%">
                <Block display="grid" placeItems="center" marginTop={["24px", "32px", "40px"]} marginBottom={["40px", "64px", "90px"]}>
                    <Button onClick={() => setShowForm(!showForm)} shape={SHAPE.pill}
                            endEnhancer={() => <ChevronDown size={20}/>}
                            overrides={{
                                BaseButton: {
                                    style: {
                                        padding: "20px 0",
                                        minWidth: "284px",
                                        backgroundColor: "#23A4AD",
                                        color: "#ffffff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        ":hover": {
                                            backgroundColor: "#5FBDBE"
                                        },
                                        ":active": {
                                            backgroundColor: "#43878C"
                                        }
                                    }
                                },
                                EndEnhancer: {
                                    style: {
                                        transform: showForm ? "rotate(-180deg)" : "rotate(0deg)",
                                        transition: "all .3s ease-in-out"
                                    }
                                }
                            }}
                    >
                        Get a free mockup
                    </Button>
                </Block>
                <Block width="100%" placeItems="center" className={css({transition: "all .3s ease-in"})}>
                    <Block className={css({
                        ...formStyle,
                        opacity: showForm ? "1" : "0",
                        transform: showForm ? "scaleY(1)" : "scaleY(0)",
                        visibility: showForm ? "visible" : "hidden",
                        userSelect: showForm ? "auto" : "none",
                        transformOrigin: "0 0",
                        transformStyle: "flat",
                        transition: "all .5s ease-in-out"
                    })}
                    >
                        <FreeMockupForm/>
                    </Block>
                </Block>
            </Block>
            <Block maxWidth="960px" marginRight="auto" marginLeft="auto" marginBottom={["32px", "40px"]}>
                <Block className="text-center">
                    <Block font={["MinXTitle20", "MinXTitle32"]} color="MinXPrimaryText">DIFFERENCE SIZES</Block>
                </Block>
                <Block display="grid" gridRowGap={["16px", "24px"]} gridColumnGap={["16px", "24px"]} gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%">
                            <Image src="/images/custom-printed-package/custom-printing-10X10.webp" alt="custom-printing-10X10" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">10x10 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#fff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1010cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-10X15.webp" alt="custom-printing-10X15" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">10x15 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1015cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-10X20.webp" alt="custom-printing-10X20" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">10X20 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1020cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-13X13.webp" alt="custom-printing-13X13" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">13X13 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1313cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-13X20.webp" alt="custom-printing-13X20" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">13X20 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1320cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-13X26.webp" alt="custom-printing-13X26" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">13X26 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1326cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-16X16.webp" alt="custom-printing-16X16" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">16X16 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f1616cpp")}
                        />
                    </Block>
                    <Block display="grid" gridRowGap="16px" font="MinXLabel12" justifyItems="center">
                        <Block position="relative" width="90%" margin="auto">
                            <Image src="/images/custom-printed-package/custom-printing-20X20.webp" alt="custom-printing-20X20" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block font="MinXLabel26" color="MinXPrimaryText">20X20 ft</Block>
                        <Block position="relative" width="100%">
                            <Image src="/images/custom-printing/custom-printing-function.webp" alt="custom-printing-function" layout="responsive" width={668} height={113} objectFit="contain"/>
                        </Block>
                        <ButtonN height="30px" marginTop="8px" shape="square" text="View Print Packages"
                                 buttonStyle={{
                                     padding: "4px 20px", backgroundColor: "#23A4AD", fontSize: "inherit", fontWeight: "inherit", borderRadius: "4px !important", color: "#ffffff",
                                     ":hover": {backgroundColor: "#5FBDBE"}, ":active": {backgroundColor: "#43878C"}
                                 }}
                                 onClick={() => router.push("/custom-printed-package/f2020cpp")}
                        />
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    );
}

export default withRouter(Custom_Printing_Canopy_Tent);
