import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";
import {ChevronRight} from "baseui/icon";

import {Banner, Section, SubHeaderBar, UmbrellaProductItem} from "Components/Sections";
import Button from "Components/Button/V1";
import Utils from "Utils/utils";

import styles from "../umbrella.module.scss";

const utils = new Utils();

function Catalina({router, size}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella"});

    useEffect(() => {
        async function fetchProduct() {
            const products = await utils.getProductByCategoryId(693);
            setProductList(products);
        }

        fetchProduct().then(() => null);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Umbrella Catalina - WESTSHADE</title>
                <meta name="description" content='Oversized Telescopic Umbrella. Heavy duty welded PVC fabric. The fabric is super strong and heavy duty. 1/4" thickness. 1/850 gsm. Self-cleaning finishing.'/>
            </Head>
            <SubHeaderBar size={size} title={"Umbrella Catalina"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <Banner title="CATALINA" subtitle="Oversized Telescopic Umbrella" url="/images/umbrella/catalina/catalina_display.webp" alt="catalina display"
                        titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                        containerStyle={{display: "flex", justifyContent: "center", paddingBottom: "0 !important"}} containerHeight={["160px", "180px", "200px"]} containerTextPosition="center"
                        containerBackground="rgba(0,0,0,0.2)" textColor="MinXPrimaryTextAlt" renderButton={<></>}
                />
                <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                         subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                         content={
                             <>
                                 <Block position="relative" width="100%" maxWidth="960px" height={["312px", "400px", "450px"]} display="flex" flexDirection="column" alignItems="center"
                                        marginRight="auto" marginBottom={["24px", "24px", "40px"]} marginLeft="auto" paddingTop={["32px", "40px"]}
                                        backgroundImage={`url("${process.env.imageBaseUrl}/images/umbrella/catalina/fabric.webp")`} backgroundSize={"cover"} backgroundPosition="center" backgroundRepeat="no-repeat"
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
                                     >1/4" thickness</Block>
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
                                     <Image src="/images/umbrella/catalina/roof.webp" alt="catalina roof" layout="responsive" width={912} height={324}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridRowGap={["32px", "unset"]} width="100%" maxWidth="662px" margin="auto">
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/icon_upf.webp" alt="catalina udf" layout='fill' objectFit="contain"/>
                                         </AspectRatioBox>
                                         <Block className={styles["text-section-card"]} width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText">
                                             <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>UPF 50+</Block>
                                             <Block font="MinXParagraph14">The fabric blocks 98% harmful UV rays</Block>
                                         </Block>
                                     </Block>
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/icon_water.webp" alt="catalina water" layout='fill' objectFit="contain"/>
                                         </AspectRatioBox>
                                         <Block className={styles["text-section-card"]} width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText">
                                             <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>Waterproof</Block>
                                             <Block maxWidth={["unset", "167px"]} font="MinXParagraph14">The fabric has a waterproof treatment</Block>
                                         </Block>
                                     </Block>
                                 </Block>
                             </>
                         }
                />
                <Section title={<>ALL OF OUR PRODUCTS<br/>ARE HIGHLY DETAILED</>}
                         subtitle="Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."
                         content={
                             <Block className="text-center" width="100%" maxWidth="960px" display="grid" gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(3, 1fr)"]} gridColumnGap={["16px", "48px", "40px"]} gridRowGap={["24px", "40px"]}
                                    justifyItems="center" margin="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                             >
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/detail1.webp" alt="catalina detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Stainless Steel Fixings
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/detail2.webp" alt="catalina detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     <span style={{color: "#23A4AD"}}>Aluminum</span> Hub & Frame
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/detail3.webp" alt="catalina detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Crank Lift
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/detail4.webp" alt="catalina detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Internal With Reinforced Channel
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/catalina/detail5.webp" alt="catalina detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Cast Alloy Base-Plate
                                 </Block>
                             </Block>
                         }
                />
                <Section title="SIZE AND SHAPES"
                         content={
                             <Block maxWidth="960px" width="100%" display="grid" gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridRowGap={["32px", null, "64px"]} margin="auto" font="MinXLabel16">
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/catalina/size1.webp" alt="catalina size 10'ft" layout="responsive" objectFit="contain" width={1193} height={643}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">10’ Square</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>}
                                             onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "10ft"}})}
                                     />
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/catalina/size2.webp" alt="catalina size 11.5'ft" layout="responsive" objectFit="contain" width={1193} height={643}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">11.5’ Square</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>}
                                             onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "11.5ft"}})}
                                     />
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/catalina/size3.webp" alt="santorini size 13'ft" layout="responsive" objectFit="contain" width={1193} height={643}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">13’ Square</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>}
                                             onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "13ft"}})}
                                     />
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/catalina/size4.webp" alt="santorini size 16.4'ft" layout="responsive" objectFit="contain" width={1193} height={643}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">16.4’ Hexagon</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>}
                                             onClick={() => router.push({pathname: "/products/cantilever-umbrellas/catalina-umbrella", query: {size: "16.4ft"}})}
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
                                     <Image src="/images/umbrella/catalina/custom.webp" alt="catalina custom" layout="responsive" width={912} height={374}/>
                                 </Block>
                             </>
                         }
                />
                {productList.length > 0 ? (
                    <Section title="ACCESSORIES"
                             content={
                                 <Block width="100%" display="grid" gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(4, 1fr)"]} gridColumnGap="16px" gridRowGap="32px" margin="auto">
                                     {productList.slice(0, 4).map((item) => (<UmbrellaProductItem key={item.id} detail={item}/>))}
                                 </Block>
                             }
                    />
                ) : null}
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Catalina);
