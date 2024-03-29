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

function Marco({router, size}) {
    const [productList, setProductList] = useState([]);

    const goBuyingPage = () => router.push({pathname: "/products/market-umbrellas/marco-umbrella"});

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
                <title>Umbrella Marco - WESTSHADE</title>
                <meta name="description" content="Marco-push up outdoor umbrella. Safe choice to enjoy out door activities. UPF 50+ protected premium waterproof fabric cover. Choose from two fabrics."/>
            </Head>
            <SubHeaderBar size={size} title={"Umbrella Marco"} subTitle={"Spec"} subTitleDestination={"/umbrella/spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()}/>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <Banner title="MARCO" subtitle="Push up outdoor umbrella" url="/images/umbrella/marco/marco_display.webp" alt="marco display" imageObjectFit="contain"
                        titleMarginBottom={["12px", "16px", "20px"]} titleFont={["MinXTitle28", "MinXTitle32", "MinXTitle44"]} subtitleFont={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle24"]}
                        containerStyle={{display: "flex", justifyContent: "center"}} containerHeight={["160px", "180px", "200px"]} containerTextPosition="center"
                        containerBackground="transparent" backgroundColor="#C5E4F2" textColor="MinXPrimaryText" renderButton={<></>}
                />
                <Section title={<>SAFE TO ENJOY<br/>THE OUTDOOR</>}
                         subtitle="Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."
                         content={
                             <>
                                 <Block position="relative" width="100%" maxWidth="960px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                                     <Image src="/images/umbrella/marco/roof.webp" alt="marco roof" layout="responsive" width={912} height={324} priority/>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridRowGap={["32px", "unset"]} width="100%" maxWidth="662px" margin="auto">
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/marco/icon_upf.webp" alt="marco udf" layout="fill" objectFit="contain"/>
                                         </AspectRatioBox>
                                         <Block className={styles["text-section-card"]} width="100%" maxWidth={["unset", "167px"]} color="MinXPrimaryText">
                                             <Block marginBottom={["4px", "20px"]} font={["MinXHeading14", "MinXHeading16", "MinXHeading20"]}>UPF 50+</Block>
                                             <Block font="MinXParagraph14">The fabric blocks 98% harmful UV rays</Block>
                                         </Block>
                                     </Block>
                                     <Block display="grid" gridTemplateColumns={["auto 1fr", "1fr"]} gridRowGap={[0, "24px", "32px"]} gridColumnGap={["22px", 0]} justifyItems="center" marginRight="auto" marginLeft={[null, "auto"]}>
                                         <AspectRatioBox width={["60px", "80px"]}>
                                             <AspectRatioBoxBody as={Image} src="/images/umbrella/marco/icon_water.webp" alt="marco water" layout="fill" objectFit="contain"/>
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
                {/*<Section title={<>DETAILS<br/>WILL BE MISSED</>}*/}
                {/*         content={*/}
                {/*             <Block width="100%" maxWidth="960px" marginRight={["unset", "auto"]} marginLeft={["unset", "auto"]} display="grid"*/}
                {/*                    gridTemplateAreas={[`"a" "b" "c"`, `"a b" "c b"`, `"a b c"`]} gridColumnGap={["unset", "18px", "64px"]} gridRowGap={["32px", "40px", "0"]}*/}
                {/*             >*/}
                {/*                 <Block display="flex" flexDirection="column" alignItems="center" justifySelf={["start", "center"]} gridArea="a" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>*/}
                {/*                     <Block position="relative" width={["215px", "215px", "326px"]} height={["138px", "138px", "211px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"*/}
                {/*                            overrides={{Block: {props: {className: "section-round-corner"}}}}*/}
                {/*                     >*/}
                {/*                         <Image src="/images/umbrella/marco/detail1.webp" alt="marco detail" layout="fill" objectFit="contain" />*/}
                {/*                     </Block>*/}
                {/*                     Stainless steel fixings*/}
                {/*                 </Block>*/}
                {/*                 <Block display="flex" flexDirection="column" alignItems="center" justifySelf={["end", "center"]} gridArea="b" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>*/}
                {/*                     <Block position="relative" width={["204px", "204px", "240px"]} height={["268px", "268px", "316px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"*/}
                {/*                            overrides={{Block: {props: {className: "section-round-corner"}}}}*/}
                {/*                     >*/}
                {/*                         <Image src="/images/umbrella/marco/detail2.webp" alt="marco detail" layout="fill" objectFit="contain" />*/}
                {/*                     </Block>*/}
                {/*                     Stainless steel fixings*/}
                {/*                 </Block>*/}
                {/*                 <Block display="flex" flexDirection="column" alignItems="center" justifySelf={["start", "center"]} gridArea="c" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}>*/}
                {/*                     <Block position="relative" width={["200px", "215px", "200px"]} height={["200px", "215px", "200px"]} marginBottom={["12px", "16px", "24px"]} overflow="hidden"*/}
                {/*                            overrides={{Block: {props: {className: "section-round-corner"}}}}*/}
                {/*                     >*/}
                {/*                         <Image src="/images/umbrella/marco/detail3.webp" alt="marco detail" layout="fill" objectFit="contain" />*/}
                {/*                     </Block>*/}
                {/*                     Stainless steel fixings*/}
                {/*                 </Block>*/}
                {/*             </Block>*/}
                {/*         }*/}
                {/*/>*/}
                <Section title={<>ALL OF OUR PRODUCTS<br/>ARE HIGHLY DETAILED</>}
                         subtitle={"Features with UPF 50+ protected premium fabric cover. Available in two fabrics, European made Acrylic Polyester."}
                         content={
                             <Block className="text-center" width="100%" maxWidth="960px" display="grid" gridTemplateColumns={["repeat(2, 1fr)", null, "repeat(3, 1fr)"]} gridColumnGap={["16px", "48px", "40px"]} gridRowGap={["24px", "40px"]}
                                    justifyItems="center" margin="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]}
                             >
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" aspectRatio={327 / 211} width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/marco/detail1.webp" alt="santorini detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Stainless Steel Fixings
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" aspectRatio={241 / 317} width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/marco/detail2.webp" alt="santorini detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
                                     Nylon Hub & <span style={{color: "#23A4AD"}}>Aluminum</span> Frame
                                 </Block>
                                 <Block width={["136px", "200px", "212px"]}>
                                     <AspectRatioBox className="section-round-corner" width="inherit" marginRight="auto" marginLeft="auto" marginBottom={["12px", "16px", "24px"]}>
                                         <AspectRatioBoxBody as={Image} src="/images/umbrella/marco/detail3.webp" alt="santorini detail" layout="fill" objectFit="contain"/>
                                     </AspectRatioBox>
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
                             <Block className="section-round-corner" position="relative" maxWidth="960px" width="100%" height={["138px", "282px", "546px"]} marginRight="auto" marginLeft="auto" overflow="hidden">
                                 <Image src="/images/umbrella/marco/colors.webp" alt="marco color" layout="fill" objectFit="cover"/>
                             </Block>
                         }
                />
                <Section title={"SIZE AND SHAPES"}
                         content={
                             <Block display="grid" gridTemplateColumns="1fr" gridRowGap="12px" justifyItems="center" font="MinXLabel16">
                                 <Block position="relative" width="100%" maxWidth="366px" overflow="hidden">
                                     <Image src="/images/umbrella/marco/size.webp" alt="marco size 6.5'" layout="responsive" objectFit="contain" width={1193} height={643}/>
                                 </Block>
                                 <Block color="MinXPrimaryText">6.5’ Square</Block>
                                 <Button height="40px" text='Buy' bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => router.push("/products/market-umbrellas/marco-umbrella")}/>
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
                                     <Image src="/images/umbrella/marco/custom1.webp" alt="marco custom" layout="responsive" objectFit="contain" width={1200} height={1000}/>
                                 </Block>
                                 <Block position="relative" justifySelf={["end", "end", "center"]} gridArea="b" width={["189px", "290px", "368px"]}>
                                     <Image src="/images/umbrella/marco/custom2.webp" alt="marco custom" layout="responsive" objectFit="contain" width={1200} height={1000}/>
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

export default withRouter(Marco);
