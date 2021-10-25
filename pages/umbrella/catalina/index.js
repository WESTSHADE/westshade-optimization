import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import ChevronRight from "baseui/icon/chevron-right";

import {BannerDisplay, Section, SubHeaderBar} from "../../../components/sections";
import MButton from "../../../components/button-n";
import Utils from "../../../utils/utils";

import styles from "../umbrella.module.scss";

const utils = new Utils();

function Catalina({router}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella"});

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
                <title>Umbrella Catalina - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
            </Head>
            <SubHeaderBar title={"Umbrella Catalina"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <BannerDisplay title="CATALINA" subtitle="Oversized Telescopic Umbrella" url="images/umbrella/catalina/catalina_display.jpg" alt="catalina display"
                           titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                           containerStyle={{display: "flex", justifyContent: "center", paddingBottom: "0 !important"}} containerHeight={["160px", "180px", "200px"]} containerMarginBottom={["24px", "40px", "60px"]}
                           containerBackground="rgba(0,0,0,0.2)" textColor="MinXPrimaryTextAlt" renderButton={<></>}
            />
            <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                     subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                     content={
                         <>
                             <Block position="relative" width="100%" maxWidth="960px" height={["312px", "400px", "450px"]} display="flex" flexDirection="column" alignItems="center"
                                    marginRight="auto" marginBottom={["24px", "24px", "40px"]} marginLeft="auto" paddingTop={["32px", "40px"]}
                                    backgroundImage={"url(\"/images/umbrella/catalina/fabric.png\")"} backgroundSize={"cover"} backgroundPosition="center" backgroundRepeat="no-repeat"
                             >
                                 <Block marginBottom={["4px", "4px", "12px"]} font={["MinXHeading20", "MinXHeading24"]} color="MinXPrimaryText"
                                        overrides={{
                                            Block: {
                                                style: {fontWeight: "500"},
                                            },
                                        }}
                                 >Heavy duty welded PVC fabric</Block>
                                 <Block marginBottom={["32px", "32px", "40px"]} font="MinXParagraph14" color="MinXSecondaryText">The fabric is super strong and heavy duty.</Block>
                                 <Block marginBottom={["12px", "12px", "16px"]} font={["MinXLabel28", "MinXLabel32"]} color="MinXPrimaryText"
                                        overrides={{
                                            Block: {
                                                style: {fontWeight: "900 !important"},
                                            },
                                        }}
                                 >1/4'' thickness</Block>
                                 <Block marginBottom={["12px", "12px", "16px"]} font={["MinXLabel28", "MinXLabel32"]} color="MinXPrimaryText"
                                        overrides={{
                                            Block: {
                                                style: {fontWeight: "900 !important"},
                                            },
                                        }}
                                 >1/850 gsm</Block>
                                 <Block marginBottom={["12px", "12px", "16px"]} font={["MinXLabel28", "MinXLabel32"]} color="MinXPrimaryText"
                                        overrides={{
                                            Block: {
                                                style: {fontWeight: "900 !important"},
                                            },
                                        }}
                                 >Self-cleaning finishing</Block>
                             </Block>
                             <Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                                 <Image src="images/umbrella/catalina/roof.png" alt="catalina roof" layout="responsive" width={912} height={324} quality={100}/>
                             </Block>
                             <Block display="flex" flexDirection={["column", "row"]} justifyContent="space-around" width="100%" maxWidth="662px" marginRight="auto" marginLeft="auto">
                                 <Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["32px", "unset"]} marginLeft="auto">
                                     <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>
                                         <Image src="images/umbrella/catalina/icon_upf.png" alt="santorini udf" layout="fill" objectFit="contain" quality={100}/>
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
                                         <Image src="images/umbrella/catalina/icon_water.png" alt="santorini water" layout="fill" objectFit="contain" quality={100}/>
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
                                         <Image src="images/umbrella/catalina/icon_wind.png" alt="santorini wind" layout="fill" objectFit="contain" quality={100}/>
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
                         </>
                     }
            />
            <Section title={<>NO DETAILS<br/>WILL BE MISSED</>}
                     subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                     content={
                         <Block width="100%" maxWidth="960px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "48px", "40px"]}
                                gridRowGap={["24px", "40px"]} justifyItems="center"
                                overrides={{
                                    Block: {
                                        style: {textAlign: "center"}
                                    },
                                }}
                         >
                             <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                 <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/detail1.jpg" alt="catalina detail" layout="fill" objectFit="contain" quality={100}/>
                                 </Block>
                                 Stainless Steel Fixings
                             </Block>
                             <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                 <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/detail2.jpeg" alt="catalina detail" layout="fill" objectFit="contain" quality={100}/>
                                 </Block>
                                 <span style={{color: "#23A4AD"}}>Aluminum</span> Hub & Frame
                             </Block>
                             <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                 <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/detail3.jpeg" alt="catalina detail" layout="fill" objectFit="contain" quality={100}/>
                                 </Block>
                                 Crank Lift
                             </Block>
                             <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                 <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/detail4.jpg" alt="catalina detail" layout="fill" objectFit="contain" quality={100}/>
                                 </Block>
                                 Internal With Reinforced Channel
                             </Block>
                             <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                 <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden" backgroundColor="white"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/detail5.jpg" alt="catalina detail" layout="fill" objectFit="contain" quality={100}/>
                                 </Block>
                                 Cast Alloy Base-Plate
                             </Block>
                         </Block>
                     }
            />
            <Section title={"SIZE AND SHAPES"}
                     content={
                         <Block maxWidth="960px" width="100%" display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridRowGap={["32px", "32px", "64px"]} marginRight="auto" marginLeft="auto">
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                 <Block position="relative" maxWidth="366px" width="100%" overflow="hidden"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/size1.png" alt="catalina size 10'ft" layout="responsive" objectFit="contain" width={1193} height={643} quality={100}/>
                                 </Block>
                                 <Block font="MinXLabel16" color="MinXPrimaryText">10’ Square</Block>
                                 <MButton type="solid" height="40px" font="MinXLabel16" text='Buy'
                                          buttonStyle={{paddingTop: "12px !important", paddingRight: "32px !important", paddingBottom: "12px !important", paddingLeft: "32px !important"}}
                                          endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "10ft"}})}
                                 />
                             </Block>
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                 <Block position="relative" maxWidth="366px" width="100%" overflow="hidden"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/size2.png" alt="catalina size 11.5'ft" layout="responsive" objectFit="contain" width={1193} height={643} quality={100}/>
                                 </Block>
                                 <Block font="MinXLabel16" color="MinXPrimaryText">11.5’ Square</Block>
                                 <MButton type="solid" height="40px" font="MinXLabel16" text='Buy'
                                          buttonStyle={{paddingTop: "12px !important", paddingRight: "32px !important", paddingBottom: "12px !important", paddingLeft: "32px !important"}}
                                          endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "11.5ft"}})}
                                 />
                             </Block>
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                 <Block position="relative" maxWidth="366px" width="100%" overflow="hidden"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/size3.png" alt="santorini size 13'ft" layout="responsive" objectFit="contain" width={1193} height={643} quality={100}/>
                                 </Block>
                                 <Block font="MinXLabel16" color="MinXPrimaryText">13’ Square</Block>
                                 <MButton type="solid" height="40px" font="MinXLabel16" text='Buy'
                                          buttonStyle={{paddingTop: "12px !important", paddingRight: "32px !important", paddingBottom: "12px !important", paddingLeft: "32px !important"}}
                                          endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "13ft"}})}
                                 />
                             </Block>
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                 <Block position="relative" maxWidth="366px" width="100%" overflow="hidden"
                                        overrides={{
                                            Block: {
                                                style: {borderRadius: "32px"}
                                            },
                                        }}
                                 >
                                     <Image src="images/umbrella/catalina/size4.png" alt="santorini size 16.4'ft" layout="responsive" objectFit="contain" width={1193} height={643} quality={100}/>
                                 </Block>
                                 <Block font="MinXLabel16" color="MinXPrimaryText">16.4’ Square</Block>
                                 <MButton type="solid" height="40px" font="MinXLabel16" text='Buy'
                                          buttonStyle={{paddingTop: "12px !important", paddingRight: "32px !important", paddingBottom: "12px !important", paddingLeft: "32px !important"}}
                                          endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "16.4ft"}})}
                                 />
                             </Block>
                         </Block>
                     }
            />
            <Section title={<>CUSTOMIZE IT<br/>YOUR WAY</>}
                     subtitle={"Showcase your design, attach your logo, advertise your product, present eye-catching pictures, the choices are limitless."}
                     subtitleMoreText={"Learn more >"}
                     subtitleMoreDestination={"/custom-printing/umbrella"}
                     content={
                         <>
                             <Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginLeft="auto">
                                 <Image src="images/umbrella/catalina/custom.png" alt="catalina custom" layout="responsive" width={912} height={374} quality={100}/>
                             </Block>
                         </>
                     }
            />
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
            <div/>
        </React.Fragment>
    )
}

export default withRouter(Catalina);
