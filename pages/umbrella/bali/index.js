import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';
import {ChevronRight} from "baseui/icon";

import {Banner, Section, SubHeaderBar, UmbrellaProductItem} from "Components/Sections";
import Button from "Components/Button/V1";
import Utils from "Utils/utils";

import styles from "../umbrella.module.scss";

const utils = new Utils();

function Bali({router, size}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"});

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
                <title>Umbrella Bali - WESTSHADE</title>
                <meta name="description" content="Push-button tilt & crank lift umbrella. Safe to enjoy the out door. Feature with UPF 50+ protected premium fabric cover. Wind resistant which the umbrella stands in 50-70-km/h wind."/>
            </Head>
            <SubHeaderBar size={size} title={"Umbrella Bali"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <Banner title="BALI" subtitle="Push-button tilt & crank lift umbrella" url="/images/umbrella/bali/bali_display.webp" alt="bali display"
                        titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                        containerStyle={{display: "flex", justifyContent: "center"}} containerHeight={["160px", "180px", "200px"]} containerTextPosition="center"
                        containerBackground="rgba(0,0,0,0.5)" textColor="MinXPrimaryTextAlt" renderButton={<></>}
                />
                <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                         subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                         content={
                             <>
                                 <Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                                     <Image src="/images/umbrella/bali/roof.webp" alt="bali roof" layout="responsive" width={912} height={324} priority/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridRowGap={["32px", "unset"]} width="100%" maxWidth="662px" margin="auto">
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/icon_upf.webp" alt="bali udf" layout="fill" objectFit="contain"/>
                                         </AspectRatioBox>
                                         <Block className={styles["text-section-card"]} width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText">
                                             <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>UPF 50+</Block>
                                             <Block font="MinXParagraph14">The fabric blocks 98% harmful UV rays</Block>
                                         </Block>
                                     </Block>
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/icon_water.webp" alt="bali water" layout="fill" objectFit="contain"/>
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
                         content={
                             <Block className="text-center" width="100%" maxWidth="960px" display="grid" gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(4, 1fr)"]} gridColumnGap={["16px", "48px", "20px"]} gridRowGap={["24px", "40px"]}
                                    justifyItems="center" margin="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                             >
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/detail1.webp" alt="bali detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Stainless Steel Fixings
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/detail2.webp" alt="bali detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Nylon Hub & Steel Frame
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/detail3.webp" alt="bali detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Crank Lift
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/bali/detail4.webp" alt="bali detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Push Button To Tilt
                                 </Block>
                             </Block>
                         }
                />
                <Section title="6 PREMADE COLORS"
                         subtitle={"We provide 6 premade colors. You can also custom print any color or pattern."}
                         subtitleMoreText={"Learn about Custom Printing >"}
                         subtitleMoreDestination={"/custom-printing/umbrella"}
                         content={
                             <Block className="section-round-corner" position="relative" maxWidth="960px" width="100%" height={["138px", "282px", "546px"]} marginRight="auto" marginLeft="auto" overflow="hidden">
                                 <Image src="/images/umbrella/bali/colors.webp" alt="bali color" layout="fill" objectFit="cover"/>
                             </Block>
                         }
                />
                <Section title={"SIZE AND SHAPES"}
                         content={
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center" font="MinXLabel16">
                                 <Block position="relative" width="100%" maxWidth="475px" overflow="hidden">
                                     <Image src="/images/umbrella/bali/size.webp" alt="bali size 6.5'" layout="responsive" objectFit="contain" width={2050} height={665}/>
                                 </Block>
                                 <Block color="MinXPrimaryText">6.5’ Square</Block>
                                 <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push("/products/tilt-umbrellas/bali-crank-lift-patio-umbrella")}/>
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
                                     <Image src="/images/umbrella/bali/custom1.webp" alt="bali custom" layout="responsive" objectFit="contain" width={1200} height={1000}/>
                                 </Block>
                                 <Block position="relative" justifySelf={["end", "end", "center"]} gridArea="b" width={["189px", "290px", "368px"]}>
                                     <Image src="/images/umbrella/bali/custom2.webp" alt="bali custom" layout="responsive" objectFit="contain" width={1200} height={1000}/>
                                 </Block>
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

export default withRouter(Bali);
