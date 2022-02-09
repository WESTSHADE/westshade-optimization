import React, {useState} from "react";
import NumberFormat from "react-number-format";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';

import {Modal} from "Components/surfaces"
import {Section, SectionTitle} from "Components/Sections"
import ThemeProvider from "Components/ThemeProvider";
import Button from "Components/Button"

import Utils from "Utils/utils";

const utils = new Utils();

import DATA from "Assets/custom-printing-package.json";

const PackageItem = ({productDetail, packageNum, imageUrl, alt, title, subtitle, url, asUrl, alertClick, router}) => {
    return (
        <Block position="relative" display="flex" flexDirection="column" padding={["8px", null, "24px 16px"]} backgroundColor="white" overflow="hidden" $style={{borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)"}}>
            <Block position="relative" width="100%" height="150px" margin="auto auto 8px" backgroundColor="white">
                <Image src={imageUrl} alt={alt} layout="fill" objectFit="contain"/>
            </Block>
            <Block className="text-left" display="flex" flexDirection="column" justifyContent="space-between" flex={1} $style={{gap: "8px"}}>
                <Block display="flex" justifyContent="space-between" alignItems="center" padding={[null, null, "8px 0"]}>
                    <Block display={["none", null, "block"]} font="MinXHeading16" color="MinXPrimaryText">{title}</Block>
                    <Block position={["absolute", null, "relative"]} top={["118px", null, "unset"]} right={["16px", null, "unset"]}>
                        <Button.V1 shape="square" type="outline" width="92px" height="32px" text="Details &" font="MinXParagraph14" color="#262626"
                                   buttonStyle={{borderWidth: "1px !important", borderColor: "#D9D9D9", backgroundColor: "#F0F0F0 !important"}}
                                   endEnhancer={
                                       <Block position="relative" width="16px" height="16px">
                                           <Image src="/images/icon/icon-gift.png" alt="icon gifts" layout="fill" objectFit="contain"/>
                                       </Block>
                                   }
                                   onClick={alertClick}/>
                    </Block>
                </Block>
                <Block display="flex" justifyContent="space-between" alignItems="center" marginBottom="16px">
                    <Block display="flex" flexDirection="column" flex={1} $style={{gap: "8px"}}>
                        <Block font="MinXHeading16" color="MinXPrimaryText" $style={{fontWeight: "400 !important", lineHeight: "1.2 !important"}}>{subtitle}</Block>
                        {productDetail && productDetail.price ? (
                            <Block font="MinXParagraph14" color="MinXPrimaryText" $style={{lineHeight: "1 !important"}}>
                                From <Block as={"span"}><NumberFormat thousandSeparator={true} prefix={"$"} value={productDetail.price} displayType={"text"}/></Block>
                            </Block>
                        ) : null}
                    </Block>
                    <Block display="flex" alignItems="center" position={["absolute", null, "relative"]} top={["8px", null, "unset"]} left={["8px", null, "unset"]} padding="4px" backgroundColor="rgba(255, 255, 255, 0.6)"
                           $style={{borderRadius: "4px"}}>
                        <Block position="relative" width="35px" height="35px">
                            {packageNum === 1 ? (
                                <Image src="/images/icon/icon-one-valance.png" alt="icon one valance" layout="fill" objectFit="contain"/>
                            ) : packageNum === 2 ? (
                                <Image src="/images/icon/icon-full-valances.png" alt="icon full valances" layout="fill" objectFit="contain"/>
                            ) : packageNum === 3 ? (
                                <Image src="/images/icon/icon-full-peaks.png" alt="icon full peaks" layout="fill" objectFit="contain"/>
                            ) : packageNum === 4 || packageNum === 6 || packageNum === 7 ? (
                                <Image src="/images/icon/icon-one-valance-one-peak.png" alt="icon one valance one peak" layout="fill" objectFit="contain"/>
                            ) : packageNum === 5 || packageNum === 8 || packageNum === 9 ? (
                                <Image src="/images/icon/icon-full-roof.png" alt="icon full roof" layout="fill" objectFit="contain"/>
                            ) : null}
                        </Block>
                        {packageNum === 6 ? (
                            <Block font="MinXParagraph14" color="#23A4AD"> +Wall </Block>
                        ) : packageNum === 7 ? (
                            <Block font="MinXParagraph14" color="#23A4AD"> +3 Walls </Block>
                        ) : packageNum === 8 ? (
                            <Block font="MinXParagraph14" color="#23A4AD"> +2 Walls </Block>
                        ) : packageNum === 9 ? (
                            <Block font="MinXParagraph14" color="#23A4AD"> +4 Walls </Block>
                        ) : null}
                    </Block>
                </Block>
                <Button.V1 bundle="primary" width="100%" height="36px" text="Choose" font="MinXLabel14" onClick={() => router.push(url)}/>
            </Block>
        </Block>
    )
}

function Custom_Printing_Package({router, products}) {
    const [showModal, setShowModal] = useState(false);
    const [activePackage, setActivePackage] = useState(0);

    return (
        <ThemeProvider.V2>
            <Head>
                <title>Printed Package - Custom Printing Canopy Tent | WESTSHADE</title>
                <meta name="description" content="Printing packages are based on your needs with a large selection of sizes and colors to promo your business, get free design today!"/>
            </Head>
            <Block position="absolute" width="100vw" height="auto" top={0} left="calc(50% - 50vw)"
                   $style={{aspectRatio: "32/13", backgroundImage: `url('${process.env.imageBaseUrl}/images/custom-printing/canopy-tent/hero-bg.webp')`, backgroundRepeat: "no-repeat", backgroundSize: "cover", zIndex: "-1"}}/>
            <FlexGrid className="text-center" flexGridColumnCount={1} flexGridRowGap={["scale900", null, "scale1000"]} justifyContent="center" paddingTop={["scale900", null, "scale1600"]} paddingBottom={["scale900", null, "scale1600"]}>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <FlexGrid gridRowGap="24px">
                                     <FlexGridItem>
                                         <SectionTitle.V2 category="custom printing package" title="Customize in 3 steps"
                                                          content="Custom print your own logo and design on our pop up canopy tents! Sidewalls on our canopy can also be printed as well. Our high quality inks and long-lasting printing technology are fade resistant that keeps your logo looking fresh time after time. Our fabric is also Waterproof, Wind-Proof, Fire Retardant, and has UPF 50+ Protection. Easy to set up and pack away when not needed. Personalized portable tents are great for trade shows, events, or for any other special occasion."
                                         />
                                     </FlexGridItem>
                                     <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", null, null, "repeat(4, 1fr)"]} gridRowGap="10px" justifyItems="center" width="100%" maxWidth={["676px", null, null, "1000px"]}
                                            margin={["auto auto 0", null, null, "auto auto 16px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel14", "MinXLabel16"]}
                                     >
                                         <Block display="flex" alignItems="center">
                                             <Block position="relative" width={["24px", null, null, "30px"]} height={["16px", null, null, "20px"]}>
                                                 <Image src="/images/icon/icon-gift.png" alt="icon gifts" layout="fill" objectFit="contain"/>
                                             </Block>
                                             <Block as="span" marginLeft={["8px", null, null, "10px"]}>Special gifts</Block>
                                         </Block>
                                         <Block display="flex" alignItems="center">
                                             <Block position="relative" width={["24px", null, null, "30px"]} height={["16px", null, null, "20px"]}>
                                                 <Image src="/images/icon/icon-free-shipping-v2-y.png" alt="icon shipping" layout="fill" objectFit="contain"/>
                                             </Block>
                                             <Block as="span" marginLeft={["8px", null, null, "10px"]}>Free shipping</Block>
                                         </Block>
                                         <Block display="flex" alignItems="center">
                                             <Block position="relative" width={["24px", null, null, "30px"]} height={["16px", null, null, "20px"]}>
                                                 <Image src="/images/icon/icon-free-mockup-v2.png" alt="icon mockups" layout="fill" objectFit="contain"/>
                                             </Block>
                                             <Block as="span" marginLeft={["8px", null, null, "10px"]}>Free mockups</Block>
                                         </Block>
                                         <Block display="flex" alignItems="center">
                                             <Block position="relative" width={["24px", null, null, "30px"]} height={["16px", null, null, "20px"]}>
                                                 <Image src="/images/icon/icon-outstanding.png" alt="icon quality" layout="fill" objectFit="contain"/>
                                             </Block>
                                             <Block as="span" marginLeft={["8px", null, null, "10px"]}>Outstanding quality</Block>
                                         </Block>
                                     </Block>
                                     <FlexGridItem>
                                         <FlexGrid flexGridColumnCount={3} maxWidth="676px" margin="auto">
                                             <FlexGridItem display="grid" gridTemplateRows="repeat(3, max-content)" gridRowGap="8px">
                                                 <Block width="40px" height="40px" margin="auto" padding="3px" font="MinXLabel28" color="#23A4AD" backgroundColor="#E5F5F1" $style={{borderRadius: "50%"}}>1</Block>
                                                 <Block font={["MinXTitle18", "MinXTitle18", "MinXTitle24"]} $style={{fontWeight: "500 !important"}}>Pick</Block>
                                                 <Block font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]} $style={{fontWeight: "400 !important"}}>A Package</Block>
                                             </FlexGridItem>
                                             <FlexGridItem display="grid" gridTemplateRows="repeat(3, max-content)" gridRowGap="8px">
                                                 <Block width="40px" height="40px" margin="auto" padding="3px" font="MinXLabel28" color="#23A4AD" backgroundColor="#E5F5F1" $style={{borderRadius: "50%"}}>2</Block>
                                                 <Block font={["MinXTitle18", "MinXTitle18", "MinXTitle24"]} $style={{fontWeight: "500 !important"}}>Choose</Block>
                                                 <Block font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]} $style={{fontWeight: "400 !important"}}>Size & Frame</Block>
                                             </FlexGridItem>
                                             <FlexGridItem display="grid" gridTemplateRows="repeat(3, max-content)" gridRowGap="8px">
                                                 <Block width="40px" height="40px" margin="auto" padding="3px" font="MinXLabel28" color="#23A4AD" backgroundColor="#E5F5F1" $style={{borderRadius: "50%"}}>3</Block>
                                                 <Block font={["MinXTitle18", "MinXTitle18", "MinXTitle24"]} $style={{fontWeight: "500 !important"}}>Choose</Block>
                                                 <Block font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]} $style={{fontWeight: "400 !important"}}>Printing Method</Block>
                                             </FlexGridItem>
                                         </FlexGrid>
                                     </FlexGridItem>
                                 </FlexGrid>
                             }
                    />
                </FlexGridItem>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <Block position="relative" display="grid" gridTemplateRows="repeat(2, max-content)" gridRowGap={["16px", null, "12px"]} justifyContent="center">
                                     <Block font={["MinXLabel40", "MinXLabel40", "MinXLabel64"]} color="#23A4AD">1</Block>
                                     <Block font={["MinXTitle20", "MinXTitle20", "MinXTitle28"]} $style={{fontWeight: "700 !important"}}>Pick A Package</Block>
                                     <Block position="absolute" right={0} bottom={0} left={0} width={["64px", null, "88px"]} height={["64px", null, "88px"]} margin="auto" backgroundColor="#E5F5F1"
                                            $style={{borderRadius: "50%", zIndex: "-1"}}/>
                                 </Block>
                             }
                    />
                </FlexGridItem>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <FlexGrid flexGridColumnCount={[2, 2, 3, 4]} flexGridColumnGap={["scale600", null, null, "scale700"]} flexGridRowGap={["scale800", null, null, "scale900"]} width="100%">
                                     {DATA.map(({title, subtitle, imageUrl, alt, url, asUrl}, index) => (
                                         <FlexGridItem key={title} flexGridItemIndex={index} display="grid" gridRowGap="scale600">
                                             <PackageItem productDetail={products[index]} title={title} subtitle={subtitle} imageUrl={imageUrl} packageNum={index + 1} alt={alt} url={url} asUrl={asUrl} alertClick={() => {
                                                 setActivePackage(index);
                                                 setShowModal(true);
                                             }} router={router}/>
                                         </FlexGridItem>
                                     ))}
                                 </FlexGrid>
                             }
                    />
                </FlexGridItem>
            </FlexGrid>
            <Modal type="alertdialog" bodyClassName="modal-body-no-margin" closeStyles={{top: "21px !important", right: "21px !important"}} isOpen={showModal} onClose={() => setShowModal(false)}>
                <Block display="grid" gridRowGap={["21px", null, "45px"]} maxWidth="672px" padding={[null, null, "56px 40px"]}>
                    <Block display="grid" gridTemplateColumns={["1fr", null, "auto 1fr"]} gridRowGap="8px" gridColumnGap="16px" padding={["16px", null, "0 16px"]} backgroundColor="white" overflow="hidden" $style={{borderRadius: "16px"}}>
                        <Block position="relative" width={["160px", null, "200px"]} height={["160px", null, "200px"]} margin="auto">
                            <Image src={DATA[activePackage].imageUrl} alt={DATA[activePackage].alt} layout="intrinsic" width={1024} height={1024} objectFit="contain"/>
                        </Block>
                        <Block className="text-left" display="flex" flexDirection="column" flex={1} padding={[null, null, "16px 0"]} $style={{gap: "8px"}}>
                            <Block font="MinXHeading18" color="MinXPrimaryText">{DATA[activePackage].title}</Block>
                            <Block font="MinXHeading14" color="MinXPrimaryText" $style={{lineHeight: "1.2 !important"}}>{DATA[activePackage].subtitle}</Block>
                            <Block font="MinXParagraph14" color="MinXSecondaryText" $style={{lineHeight: "1.2 !important"}}>{DATA[activePackage].description}</Block>
                            <Button.V1 bundle="primary" width="123px" height="36px" marginTop={["4px", null, "auto"]} marginRight="auto" marginLeft={["auto", null, "unset"]} text="Choose" font="MinXLabel14"
                                       onClick={() => router.push(DATA[activePackage].url, DATA[activePackage].asUrl)}/>
                        </Block>
                    </Block>
                    <Block padding={["0 16px 32px", null, "0"]}>
                        <Block display="flex" alignItems="center" marginBottom={["12px", null, "20px"]} $style={{gap: "12px"}}>
                            <Image src="/images/icon/icon-gift.png" alt={DATA[activePackage].alt} layout="fixed" width={20} height={20} objectFit="contain"/>
                            <Block>We have gift(s) below for you if you order now</Block>
                        </Block>
                        <Block className="text-center" display="grid" gridTemplateColumns={["repeat(4, min(100%,100px))", null, "repeat(4, min(100%, 120px))"]} width="100%" overflow="scroll" font="MinXLabel14" color="MinXPrimaryText"
                               $style={{gap: "8px"}}>
                            <Block>
                                <Block position="relative" width="100%" marginBottom="12px">
                                    <Image src="/images/product/accessories/protective-cover.webp" alt="protective-cover" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                                </Block>
                                Protective cover
                            </Block>
                            <Block>
                                <Block position="relative" width="100%" marginBottom="12px">
                                    <Image src="/images/product/accessories/tie-down-straps.webp" alt="tie-down-straps" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                                </Block>
                                <Block>Tie down straps</Block>
                            </Block>
                            <Block>
                                <Block position="relative" width="100%" marginBottom="12px">
                                    <Image src="/images/product/accessories/steel-stakes.webp" alt="steel-stakes" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                                </Block>
                                <Block>Steel Stakes</Block>
                            </Block>
                            <Block>
                                <Block position="relative" width="100%" marginBottom="12px">
                                    <Image src="/images/product/accessories/sandbag.webp" alt="sandbag" layout="responsive" width={1024} height={1024} objectFit="contain"/>
                                </Block>
                                <Block>Sandbag*4</Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </Modal>
        </ThemeProvider.V2>
    );
}

export async function getStaticProps() {
    const ids = [61953, 62002, 62031, 62060, 62089, 62118, 62147, 62205, 62176];
    let products = [];

    products = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));

    return {
        props: {
            products: products
        }, // will be passed to the page component as props
        revalidate: 10
    }
};

export default withRouter(Custom_Printing_Package);
