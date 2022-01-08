import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';
import {ChevronRight} from "baseui/icon";

import {BannerDisplay, Section, SubHeaderBar, UmbrellaProductItem} from "Components/sections";
import Button from "Components/button-n";
import Utils from "Utils/utils";

import styles from "../umbrella.module.scss";

const utils = new Utils();

function Kapri({router, size}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella"});

    useEffect(async () => {
        let products = await utils.getProductByCategoryId(693);
        setProductList(products);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Umbrella Kapri - WESTSHADE</title>
                <meta name="description" content="Crank lift tilt umbrella with height adjustment. Feature with UPF 50+ protected premium fabric cover. Wind resistant which the umbrella stands in 50-70-km/h wind."/>
            </Head>
            <SubHeaderBar size={size} title={"Umbrella Kapri"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <BannerDisplay title="Kapri" subtitle="Crank lift tilt umbrella with height adjustment" url="/images/umbrella/kapri/kapri_display.webp" alt="kapri display" imageObjectFit="contain"
                               titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                               containerStyle={{display: "flex", justifyContent: "center"}} containerHeight={["160px", "180px", "200px"]} containerTextPosition="center"
                               containerBackground="transparent" backgroundColor="#EEF3FA" textColor="MinXPrimaryText" renderButton={<></>}
                />
                <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                         subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                         content={
                             <>
                                 {/*<Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">*/}
                                 {/*    <Image src="/images/umbrella/kapri/roof.webp" alt="kapri roof" layout="responsive" width={912} height={324} />*/}
                                 {/*</Block>*/}
                                 <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridRowGap={["32px", "unset"]} width="100%" maxWidth="662px" margin="auto">
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/kapri/icon_upf.webp" alt="kapri udf" layout="fill" objectFit="contain"/>
                                         </AspectRatioBox>
                                         <Block className={styles["text-section-card"]} width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText">
                                             <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>UPF 50+</Block>
                                             <Block font="MinXParagraph14">The fabric blocks 98% harmful UV rays</Block>
                                         </Block>
                                     </Block>
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/kapri/icon_water.webp" alt="kapri water" layout="fill" objectFit="contain"/>
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
                <Section title={<>NO DETAILS<br/>WILL BE MISSED</>}
                         content={
                             <Block className="text-center" width="100%" maxWidth="960px" display="grid" gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(4, 1fr)"]} gridColumnGap={["16px", "48px", "20px"]}
                                    gridRowGap={["24px", "40px"]} justifyItems="center" margin="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                             >
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/kapri/detail1.webp" alt="kapri detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Self-Tensioning Tips
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/kapri/detail2.webp" alt="kapri detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Nylon Hub
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/kapri/detail3.webp" alt="kapri detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Crank Lift & Tilt
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/kapri/detail4.webp" alt="kapri detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
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
                             <Block className="section-round-corner" position="relative" maxWidth="960px" width="100%" height={["138px", "282px", "546px"]} marginRight="auto" marginLeft="auto" overflow="hidden">
                                 <Image src="/images/umbrella/kapri/colors.webp" alt="kapri color" layout="fill" objectFit="cover"/>
                             </Block>
                         }
                />
                <Section title={"SIZE AND SHAPES"}
                         content={
                             <Block maxWidth="960px" width="100%" display="grid" gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridRowGap={["32px", null, "64px"]} margin="auto" font="MinXLabel16">
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/kapri/size1.webp" alt="kapri size 6.5'ft" layout="responsive" objectFit="contain" width={992} height={624}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">6.5’ Octagon</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>}
                                             onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "6.5ft"}})}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/kapri/size2.webp" alt="kapri size 7.5'ft" layout="responsive" objectFit="contain" width={992} height={624}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">7.5’ Octagon</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>}
                                             onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "7.5ft"}})}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/kapri/size3.webp" alt="kapri size 9'ft" layout="responsive" objectFit="contain" width={992} height={624}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">9’ Octagon</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "9ft"}})}/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center">
                                     <Block position="relative" maxWidth="366px" width="100%" overflow="hidden">
                                         <Image src="/images/umbrella/kapri/size4.webp" alt="kapri size 10'ft" layout="responsive" objectFit="contain" width={992} height={624}/>
                                     </Block>
                                     <Block color="MinXPrimaryText">10’ Octagon</Block>
                                     <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push({pathname: "/products/tilt-umbrellas/kapri-umbrella", query: {size: "10ft"}})}/>
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
                                 <Image src="/images/umbrella/kapri/custom3.webp" alt="kapri custom" layout="fill" objectFit="cover"/>
                             </Block>
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

export default withRouter(Kapri);
