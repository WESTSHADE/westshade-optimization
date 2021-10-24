import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import {Block} from "baseui/block";
import ChevronRight from "baseui/icon/chevron-right";

import {BannerDisplay, SubHeaderBar} from "../../../components/sections";
import MButton from "../../../components/button-n";
import Utils from "../../../utils/utils";

import styles from "../umbrella.module.scss";

const utils = new Utils();

function Bali({router}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"});

    // useEffect(async () => {
    //     let products0 = await utils.getProductByWooId(19212);
    //     setProductList([products0, products0, products0, products0]);
    // }, []);

    const ProductItem = ({detail}) => {
        let imageSrc = '/images/default-product.jpg';
        let link = 'https://www.westshade.com/products/accessories/?id=' + detail.id;

        const setMainImage = (images) => {
            if (!images || images.length === 0) return;
            imageSrc = images[0].src.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");
        };

        if (detail.hasOwnProperty("image")) {
            setMainImage([detail.image]);
        } else if (detail.hasOwnProperty("images")) {
            setMainImage(detail.images);
        }

        return (
            <Block display="flex" flexDirection="column" alignItems="center" justifyContent="space-between">
                <Block display="flex" flexDirection="column" alignItems="center" flex={1}>
                    <Block position="relative" width="100%" maxHeight="120px" marginBottom={["8px", "12px", "16px"]}>
                        <img src={imageSrc} width="100%" height="100%" style={{objectFit: "contain"}}/>
                    </Block>
                    <Block marginBottom="12px" font="MinXLabel14" color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               },
                           }}
                    >{detail.name}</Block>
                </Block>
                <Block width={"100%"} display="flex" flexDirection="column" alignItems="center">
                    <Block marginBottom={["8px", "12px", "16px"]} font="MinXLabel12" color="MinXSecondaryText">{"$" + parseFloat(detail.price).toFixed(2)}</Block>
                    <MButton type="solid" height="28px" marginRight="auto" marginLeft="auto" font="MinXLabel12" text='Buy'
                             buttonStyle={{paddingTop: "8px !important", paddingRight: "20px !important", paddingBottom: "8px !important", paddingLeft: "20px !important"}}
                             onClick={() => router.push(link)}
                    />
                </Block>
            </Block>
        )
    }

    return (
        <React.Fragment>
            <Head>
                <title>Umbrella Bali - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
            </Head>
            <SubHeaderBar title={"Umbrella Bali"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <BannerDisplay title="BALI" subtitle="Push-button tilt & crank lift umbrella" url="images/umbrella/bali/bali_display.jpg" alt="bali display"
                           titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                           containerStyle={{display: "flex", justifyContent: "center", paddingBottom: "0 !important"}} containerHeight={["160px", "180px", "200px"]} containerMarginBottom={["24px", "40px", "60px"]}
                           containerBackground="rgba(0,0,0,0.5)" textColor="MinXPrimaryTextAlt" renderButton={<></>}
            />
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" marginBottom={["12px", "24px", "40px"]}>
                    <Block marginBottom="12px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >SAFE TO ENJOY<br/>THE OUTDOOR</Block>
                    <Block maxWidth="320px" marginBottom={["0", "0", "12px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                        Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester.
                    </Block>
                </Block>
                <Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                    <Image src="images/umbrella/bali/roof.png" alt="bali roof" layout="responsive" width={912} height={324} quality={100}/>
                </Block>
                <Block display="flex" flexDirection={["column", "row"]} justifyContent="space-around" width="100%" maxWidth="662px" marginRight="auto" marginLeft="auto">
                    <Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["32px", "unset"]} marginLeft="auto">
                        <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>
                            <Image src="images/umbrella/bali/icon_upf.png" alt="bali udf" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        <Block width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText"
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["text-section-card"]
                                       },
                                   },
                               }}
                        >
                            <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>UPF 50+</Block>
                            <Block font="MinXParagraph14">The fabric blocks 98% harmful UV rays</Block>
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["32px", "unset"]} marginLeft="auto">
                        <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>
                            <Image src="images/umbrella/bali/icon_water.png" alt="bali water" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        <Block width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText"
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["text-section-card"]
                                       },
                                   },
                               }}
                        >
                            <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>Waterproof</Block>
                            <Block maxWidth={["unset", "167px"]} font="MinXParagraph14">The fabric has a waterproof treatment</Block>
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["unset"]} marginLeft="auto">
                        <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>
                            <Image src="images/umbrella/bali/icon_wind.png" alt="bali wind" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        <Block width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText"
                               overrides={{
                                   Block: {
                                       props: {
                                           className: styles["text-section-card"]
                                       },
                                   },
                               }}
                        >
                            <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>Wind resistant</Block>
                            <Block maxWidth={["unset", "167px"]} font="MinXParagraph14">The fabric stands a 50-70km/h wind</Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block marginBottom={["32px", "64px"]} font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               style: {lineHeight: "0.8 !important"}
                           },
                       }}
                >NO DETAILS<br/>WILL BE MISSED</Block>
                <Block width="100%" maxWidth="960px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "48px", "20px"]}
                       gridRowGap={["24px", "40px", "0px"]}>
                    <Block marginRight="auto" marginLeft="auto" width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               },
                           }}
                    >
                        <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                               overrides={{
                                   Block: {
                                       style: {borderRadius: "32px"}
                                   },
                               }}
                        >
                            <Image src="images/umbrella/bali/detail1.jpg" alt="bali detail" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        Stainless Steel Fixings
                    </Block>
                    <Block marginRight="auto" marginLeft="auto" width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               },
                           }}
                    >
                        <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                               overrides={{
                                   Block: {
                                       style: {borderRadius: "32px"}
                                   },
                               }}
                        >
                            <Image src="images/umbrella/bali/detail2.jpg" alt="bali detail" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        Nylon Hub & Steel Frame
                    </Block>
                    <Block marginRight="auto" marginLeft="auto" width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               },
                           }}
                    >
                        <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                               overrides={{
                                   Block: {
                                       style: {borderRadius: "32px"}
                                   },
                               }}
                        >
                            <Image src="images/umbrella/bali/detail3.jpg" alt="bali detail" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        Crank Lift
                    </Block>
                    <Block marginRight="auto" marginLeft="auto" width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               },
                           }}
                    >
                        <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                               overrides={{
                                   Block: {
                                       style: {borderRadius: "32px"}
                                   },
                               }}
                        >
                            <Image src="images/umbrella/bali/detail4.jpg" alt="bali detail" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        Push Button To Tilt
                    </Block>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" marginBottom={["12px", "24px", "40px"]}>
                    <Block marginBottom="12px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >6 PREMADE COLORS</Block>
                    <Block width="100%" maxWidth="320px" marginBottom={["4px", "6px", "8px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                        <div>We provide 6 premade colors. You can also custom print any color or pattern.</div>
                        <Block color="MinXPrimaryText">
                            <Link color="inherit" href="/custom-printing/umbrella">Learn about Custom Printing ></Link>
                        </Block>
                    </Block>
                </Block>
                <Block position="relative" maxWidth="960px" width="100%" height={["138px", "282px", "546px"]} marginRight="auto" marginBottom="12px" marginLeft="auto" overflow="hidden"
                       overrides={{
                           Block: {
                               style: {borderRadius: "32px"}
                           },
                       }}
                >
                    <Image src="images/umbrella/bali/colors.jpg" alt="bali color" layout="fill" objectFit="cover" quality={100}/>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block marginBottom={["32px", "64px"]} font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               style: {lineHeight: "0.8 !important"}
                           },
                       }}
                >SIZE AND SHAPES</Block>
                <Block position="relative" maxWidth="475px" width="100%" marginRight="auto" marginBottom="12px" marginLeft="auto" overflow="hidden"
                       overrides={{
                           Block: {
                               style: {borderRadius: "32px"}
                           },
                       }}
                >
                    <Image src="images/umbrella/bali/size.png" alt="bali size 6.5'" layout="responsive" objectFit="contain" width={2050} height={665} quality={100}/>
                </Block>
                <Block marginRight="auto" marginBottom="12px" marginLeft="auto" font="MinXLabel16" color="MinXPrimaryText">6.5’ Square</Block>
                <MButton type="solid" height="40px" marginRight="auto" marginLeft="auto" font="MinXLabel16" text='Buy'
                         buttonStyle={{paddingTop: "12px !important", paddingRight: "32px !important", paddingBottom: "12px !important", paddingLeft: "32px !important"}}
                         endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push("/products/tilt-umbrellas/bali-crank-lift-patio-umbrella")}
                />
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" marginBottom={["12px", "24px", "40px"]}>
                    <Block marginBottom="12px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >CUSTOMIZE IT<br/>YOUR WAY</Block>
                    <Block width="100%" maxWidth="320px" marginBottom={["4px", "6px", "8px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                        <div>Showcase your design, attach your logo, advertise your product, present eye-catching pictures, the choices are limitless.</div>
                        <Block color="MinXPrimaryText">
                            <Link color="inherit" href="/custom-printing/umbrella">Learn more ></Link>
                        </Block>
                    </Block>
                </Block>
                <Block width="100%" maxWidth="960px" marginRight={["unset", "unset", "auto"]} marginLeft={["unset", "unset", "auto"]} display="grid" gridTemplateAreas={["\"b\"\n" + "\"a\"\n", "\"b\"\n" + "\"a\"\n", "\"a b\""]}
                       gridRowGap={["24px", "32px", "0"]} alignItems="end"
                >
                    <Block position="relative" justifySelf={["start", "start", "center"]} gridArea="a" width={["243px", "345px", "524px"]}>
                        <Image src="images/umbrella/bali/custom1.jpg" alt="bali custom" layout="responsive" objectFit="contain" width={1200} height={1000} quality={100}/>
                    </Block>
                    <Block position="relative" justifySelf={["end", "end", "center"]} gridArea="b" width={["189px", "290px", "368px"]}>
                        <Image src="images/umbrella/bali/custom2.jpg" alt="bali custom" layout="responsive" objectFit="contain" width={1200} height={1000} quality={100}/>
                    </Block>
                </Block>
            </Block>
            <Block marginBottom="40px"/>
            {productList.length > 0 ? (
                <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                       overrides={{
                           Block: {
                               props: {
                                   className: "container-display"
                               }
                           },
                       }}
                >
                    <Block marginBottom={["32px", "64px"]} font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >ACCESSORIES</Block>
                    <Block maxWidth="960px" width="100%" display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridColumnGap="16px" gridRowGap="32px" marginRight="auto" marginBottom="32px"
                           marginLeft="auto">
                        {productList.map((item, index) => {
                            return (
                                <ProductItem key={index} detail={item}/>
                            )
                        })}
                    </Block>
                </Block>
            ) : null}
        </React.Fragment>
    )
}

export default withRouter(Bali);
