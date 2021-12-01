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

function Marco({router}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/market-umbrellas/marco-umbrella"});

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
                <title>Umbrella Marco - WESTSHADE</title>
                <meta name="description" content="Marco-push up outdoor umbrella. Safe choice to enjoy out door activities. UPF 50+ protected premium waterproof fabric cover. Choose from two fabrics."/>
            </Head>
            <SubHeaderBar title={"Umbrella Marco"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <BannerDisplay title="MARCO" subtitle="Push up outdoor umbrella" url="/images/umbrella/marco/marco_display.webp" alt="marco display" imageObjectFit="contain"
                               titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                               containerStyle={{display: "flex", justifyContent: "center"}} containerHeight={["160px", "180px", "200px"]} containerTextPosition="center"
                               containerBackground="transparent" backgroundColor="#C5E4F2" textColor="MinXPrimaryText" renderButton={<></>}
                />
                <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                         subtitle="Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."
                         content={
                             <>
                                 <Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                                     <Image src="/images/umbrella/marco/roof.webp" alt="marco roof" layout="responsive" width={912} height={324} quality={100}/>
                                 </Block>
                                 <Block display="flex" flexDirection={["column", "row"]} justifyContent="space-around" width="100%" maxWidth="662px" marginRight="auto" marginLeft="auto">
                                     <Block display="flex" flexDirection={["row", "column"]} alignItems="center" marginRight="auto" marginBottom={["32px", "unset"]} marginLeft="auto">
                                         <Block position="relative" width={["60px", "80px"]} height={["60px", "80px"]} marginRight={["22px", "0"]} marginBottom={["0", "24px", "32px"]}>
                                             <Image src="/images/umbrella/marco/icon_upf.webp" alt="marco udf" layout="fill" objectFit="contain" quality={100}/>
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
                                             <Image src="/images/umbrella/marco/icon_water.webp" alt="marco water" layout="fill" objectFit="contain" quality={100}/>
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
                                     {/*        <Image src="/images/umbrella/marco/icon_wind.webp" alt="marco wind" layout="fill" objectFit="contain" quality={100}/>*/}
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
                {/*<Section title={<>DETAILS<br/>WILL BE MISSED</>}*/}
                {/*         content={*/}
                {/*             <Block width="100%" maxWidth="960px" marginRight={["unset", "auto"]} marginLeft={["unset", "auto"]} display="grid"*/}
                {/*                    gridTemplateAreas={[`"a" "b" "c"`, `"a b" "c b"`, `"a b c"`]} gridColumnGap={["unset", "18px", "64px"]} gridRowGap={["32px", "40px", "0"]}*/}
                {/*             >*/}
                {/*                 <Block display="flex" flexDirection="column" alignItems="center" justifySelf={["start", "center"]} gridArea="a" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>*/}
                {/*                     <Block position="relative" width={["215px", "215px", "326px"]} height={["138px", "138px", "211px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"*/}
                {/*                            overrides={{Block: {props: {className: "section-round-corner"}}}}*/}
                {/*                     >*/}
                {/*                         <Image src="/images/umbrella/marco/detail1.webp" alt="marco detail" layout="fill" objectFit="contain" quality={100}/>*/}
                {/*                     </Block>*/}
                {/*                     Stainless steel fixings*/}
                {/*                 </Block>*/}
                {/*                 <Block display="flex" flexDirection="column" alignItems="center" justifySelf={["end", "center"]} gridArea="b" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>*/}
                {/*                     <Block position="relative" width={["204px", "204px", "240px"]} height={["268px", "268px", "316px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"*/}
                {/*                            overrides={{Block: {props: {className: "section-round-corner"}}}}*/}
                {/*                     >*/}
                {/*                         <Image src="/images/umbrella/marco/detail2.webp" alt="marco detail" layout="fill" objectFit="contain" quality={100}/>*/}
                {/*                     </Block>*/}
                {/*                     Stainless steel fixings*/}
                {/*                 </Block>*/}
                {/*                 <Block display="flex" flexDirection="column" alignItems="center" justifySelf={["start", "center"]} gridArea="c" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>*/}
                {/*                     <Block position="relative" width={["200px", "215px", "200px"]} height={["200px", "215px", "200px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"*/}
                {/*                            overrides={{Block: {props: {className: "section-round-corner"}}}}*/}
                {/*                     >*/}
                {/*                         <Image src="/images/umbrella/marco/detail3.webp" alt="marco detail" layout="fill" objectFit="contain" quality={100}/>*/}
                {/*                     </Block>*/}
                {/*                     Stainless steel fixings*/}
                {/*                 </Block>*/}
                {/*             </Block>*/}
                {/*         }*/}
                {/*/>*/}
                <Section title={<>NO DETAILS<br/>WILL BE MISSED</>}
                         subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                         content={
                             <Block width="100%" maxWidth="960px" marginRight="auto" marginLeft="auto" display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "48px", "40px"]}
                                    gridRowGap={["24px", "40px", "0px"]} justifyItems="center" overrides={{Block: {props: {className: "text-center"}}}}>
                                 <Block width={["136px", "200px", "220px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "220px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="/images/umbrella/marco/detail1.webp" alt="santorini detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Stainless Steel Fixings
                                 </Block>
                                 <Block width={["136px", "200px", "220px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "220px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="/images/umbrella/marco/detail2.webp" alt="santorini detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Nylon Hub & <span style={{color: "#23A4AD"}}>Aluminum</span> Frame
                                 </Block>
                                 <Block width={["136px", "200px", "220px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>
                                     <Block position="relative" width="100%" height={["136px", "200px", "220px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"
                                            overrides={{Block: {props: {className: "section-round-corner"}}}}
                                     >
                                         <Image src="/images/umbrella/marco/detail3.webp" alt="santorini detail" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     Nylon Arm Joints
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
                                 <Image src="/images/umbrella/marco/colors.webp" alt="marco color" layout="fill" objectFit="cover" quality={100}/>
                             </Block>
                         }
                />
                <Section title={"SIZE AND SHAPES"}
                         content={
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                 <Block position="relative" width="100%" maxWidth="366px" overflow="hidden">
                                     <Image src="/images/umbrella/marco/size.webp" alt="marco size 6.5'" layout="responsive" objectFit="contain" width={1193} height={643} quality={100}/>
                                 </Block>
                                 <Block font="MinXLabel16" color="MinXPrimaryText">6.5’ Square</Block>
                                 <MButton type="solid" height="40px" font="MinXLabel16" text='Buy' endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push("/products/market-umbrellas/marco-umbrella")}/>
                             </Block>
                         }
                />
                <Section title={<>CUSTOMIZE IT<br/>YOUR WAY</>}
                         subtitle={"Showcase your design, attach your logo, advertise your product, present eye-catching pictures, the choices are limitless."}
                         subtitleMoreText={"Learn more >"}
                         subtitleMoreDestination={"/custom-printing/umbrella"}
                         content={
                             <Block width="100%" maxWidth="960px" marginRight={["unset", "unset", "auto"]} marginLeft={["unset", "unset", "auto"]}
                                    display="grid" gridTemplateAreas={[`"b" "a"`, `"b" "a"`, `"a b"`]} gridRowGap={["24px", "32px", "0"]} alignItems="end"
                             >
                                 <Block position="relative" justifySelf={["start", "start", "center"]} gridArea="a" width={["243px", "345px", "524px"]}>
                                     <Image src="/images/umbrella/marco/custom1.webp" alt="marco custom" layout="responsive" objectFit="contain" width={1200} height={1000} quality={100}/>
                                 </Block>
                                 <Block position="relative" justifySelf={["end", "end", "center"]} gridArea="b" width={["189px", "290px", "368px"]}>
                                     <Image src="/images/umbrella/marco/custom2.webp" alt="marco custom" layout="responsive" objectFit="contain" width={1200} height={1000} quality={100}/>
                                 </Block>
                             </Block>
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
                            {productList.map((item, index) => <ProductItem key={index} detail={item}/>)}
                        </Block>
                    </Block>
                ) : null}
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Marco);
