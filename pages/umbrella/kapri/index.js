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

function Kapri({router}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella"});

    // useEffect(async () => {
    //     let products0 = await utils.getProductByWooId(19212);
    //     setProductList([products0, products0, products0, products0]);
    // }, []);

    const ProductItem = ({detail}) => {
        let imageSrc = '/images/product/default-product.webp';
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
                <title>Umbrella Kapri - WESTSHADE</title>
                <meta name="description" content="Crank lift tilt umbrella with height adjustment. Feature with UPF 50+ protected premium fabric cover. Wind resistant which the umbrella stands in 50-70-km/h wind."/>
            </Head>
            <SubHeaderBar title={"Umbrella Kapri"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <BannerDisplay title="Kapri" subtitle="Crank lift tilt umbrella with height adjustment" url="images/umbrella/kapri/kapri_display.webp" alt="kapri display" imageObjectFit="contain"
                               titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                               containerStyle={{display: "flex", justifyContent: "center", paddingBottom: "0 !important"}} containerHeight={["160px", "180px", "200px"]}
                               containerBackground="transparent" backgroundColor="#EEF3FA" textColor="MinXPrimaryText" renderButton={<></>}
                />
                <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                         subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                         content={
                             <>
                                 {/*<Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">*/}
                                 {/*    <Image src="images/umbrella/kapri/roof.webp" alt="kapri roof" layout="responsive" width={912} height={324} quality={100}/>*/}
                                 {/*</Block>*/}
                                 <Block display="flex" flexDirection={["column", "row"]} justifyContent="space-around" width="100%" maxWidth="662px" marginRight="auto" marginLeft="auto">
                                     <Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["32px", "unset"]} marginLeft="auto">
                                         <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>
                                             <Image src="images/umbrella/kapri/icon_upf.webp" alt="kapri udf" layout="fill" objectFit="contain" quality={100}/>
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
                                             <Image src="images/umbrella/kapri/icon_water.webp" alt="kapri water" layout="fill" objectFit="contain" quality={100}/>
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
                                     {/*<Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["unset"]} marginLeft="auto">*/}
                                     {/*    <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>*/}
                                     {/*        <Image src="images/umbrella/kapri/icon_wind.webp" alt="kapri wind" layout="fill" objectFit="contain" quality={100}/>*/}
                                     {/*    </Block>*/}
                                     {/*    <Block width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText"*/}
                                     {/*           overrides={{*/}
                                     {/*               Block: {*/}
                                     {/*                   props: {*/}
                                     {/*                       className: styles["text-section-card"]*/}
                                     {/*                   },*/}
                                     {/*               },*/}
                                     {/*           }}*/}
                                     {/*    >*/}
                                     {/*        <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>Wind resistant</Block>*/}
                                     {/*        <Block maxWidth={["unset", "167px"]} font="MinXParagraph14">The fabric stands a 50-70km/h wind</Block>*/}
                                     {/*    </Block>*/}
                                     {/*</Block>*/}
                                 </Block>
                             </>
                         }
                />
                <Section title={<>NO DETAILS<br/>WILL BE MISSED</>}
                         content={
                             <Block width="100%" maxWidth="960px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "48px", "20px"]}
                                    gridRowGap={["24px", "40px", "0px"]} justifyItems="center" overrides={{Block: {props: {className: "text-center"}}}}
                             >
                                 <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} backgroundColor="white"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="images/umbrella/kapri/detail1.webp" alt="kapri detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Self-Tensioning Tips
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} backgroundColor="white"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="images/umbrella/kapri/detail2.webp" alt="kapri detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Nylon Hub
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} backgroundColor="white"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="images/umbrella/kapri/detail3.webp" alt="kapri detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Crank Lift & Tilt
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "212px"]} marginBottom={["12px", "16px", "24px"]} backgroundColor="white"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="images/umbrella/kapri/detail4.webp" alt="kapri detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Height Adjustment
                                 </Block>
                             </Block>
                         }
                />
                <Section title={"6 PREMADE COLORS"}
                         subtitle={"We provide 6 premade colors. You can also custom print any color or pattern."}
                         subtitleMoreText={"Learn about Custom Printing >"}
                         subtitleMoreDestination={"/custom-printing/umbrella"}
                         content={
                             <Block position="relative" maxWidth="960px" width="100%" height={["138px", "282px", "546px"]} marginRight="auto" marginLeft="auto" overflow="hidden"
                                    overrides={{Block: {props: {className: "section-round-corner"}}}}
                             >
                                 <Image src="images/umbrella/kapri/colors.webp" alt="kapri color" layout="fill" objectFit="cover" quality={100}/>
                             </Block>
                         }
                />
                <Section title={"SIZE AND SHAPES"}
                         content={
                             <Block maxWidth="960px" width="100%" display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridRowGap={["32px", "32px", "64px"]} marginRight="auto" marginLeft="auto">
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="images/umbrella/kapri/size1.webp" alt="kapri size 6.5'ft" layout="responsive" objectFit="contain" width={992} height={624} quality={100}/>
                                     </Block>
                                     <Block font="MinXLabel16" color="MinXPrimaryText">6.5’ Square</Block>
                                     <MButton type="solid" height="40px" font="MinXLabel16" text='Buy' endEnhancer={() => <ChevronRight size={24}/>}
                                              onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "6.5ft"}})}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="images/umbrella/kapri/size2.webp" alt="kapri size 7.5'ft" layout="responsive" objectFit="contain" width={992} height={624} quality={100}/>
                                     </Block>
                                     <Block font="MinXLabel16" color="MinXPrimaryText">7.5’ Square</Block>
                                     <MButton type="solid" height="40px" font="MinXLabel16" text='Buy' endEnhancer={() => <ChevronRight size={24}/>}
                                              onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "7.5ft"}})}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="images/umbrella/kapri/size3.webp" alt="kapri size 9'ft" layout="responsive" objectFit="contain" width={992} height={624} quality={100}/>
                                     </Block>
                                     <Block font="MinXLabel16" color="MinXPrimaryText">9’ Square</Block>
                                     <MButton type="solid" height="40px" font="MinXLabel16" text='Buy' endEnhancer={() => <ChevronRight size={24}/>}
                                              onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "9ft"}})}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="images/umbrella/kapri/size4.webp" alt="kapri size 10'ft" layout="responsive" objectFit="contain" width={992} height={624} quality={100}/>
                                     </Block>
                                     <Block font="MinXLabel16" color="MinXPrimaryText">10’ Square</Block>
                                     <MButton type="solid" height="40px" font="MinXLabel16" text='Buy' endEnhancer={() => <ChevronRight size={24}/>}
                                              onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "10ft"}})}/>
                                 </Block>
                             </Block>
                         }
                />
                <Section title={<>CUSTOMIZE IT<br/>YOUR WAY</>}
                         subtitle={"Showcase your design, attach your logo, advertise your product, present eye-catching pictures, the choices are limitless."}
                         subtitleMoreText={"Learn more >"}
                         subtitleMoreDestination={"/custom-printing/umbrella"}
                         content={
                             <Block position="relative" width="100%" height={["138px", "282px", "546px"]} marginRight="auto" marginLeft="auto" overflow="hidden">
                                 <Image src="images/umbrella/kapri/custom3.webp" alt="kapri custom" layout="fill" objectFit="cover" quality={100}/>
                             </Block>
                             // <Block width="100%" maxWidth="960px" marginRight={["unset", "unset", "auto"]} marginLeft={["unset", "unset", "auto"]}
                             //        display="grid" gridTemplateAreas={[`"b" "a"`, `"b" "a"`, `"a b"`]} gridRowGap={["24px", "32px", "0"]} alignItems="end"
                             // >
                             //     <Block position="relative" justifySelf={["start", "start", "center"]} gridArea="a" width={["243px", "345px", "524px"]}>
                             //         <Image src="images/umbrella/kapri/custom1.webp" alt="bali custom" layout="responsive" objectFit="contain" width={1200} height={1000} quality={100}/>
                             //     </Block>
                             //     <Block position="relative" justifySelf={["end", "end", "center"]} gridArea="b" width={["189px", "290px", "368px"]}>
                             //         <Image src="images/umbrella/kapri/custom2.webp" alt="bali custom" layout="responsive" objectFit="contain" width={1200} height={1000} quality={100}/>
                             //     </Block>
                             // </Block>
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
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Kapri);
