import React from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {FlexGrid, FlexGridItem} from 'baseui/flex-grid';

import Button from "Components/button-n";
import {Section, SectionTitle} from "Components/sections"
import ThemeProvider from "Components/ThemeProvider";

const Package = [{
    imageUrl: "/images/custom-printed-package/custom-printed-package-01.webp",
    alt: "custom-printed-package-01",
    title: "Package 1",
    subtitle: "1 valance",
    url: "/custom-printed-package/f1010cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-02.webp",
    alt: "custom-printed-package-02",
    title: "Package 2",
    subtitle: "4 valances",
    url: "/custom-printed-package/f1015cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-03.webp",
    alt: "custom-printed-package-03",
    title: "Package 3",
    subtitle: "4 Peaks",
    url: "/custom-printed-package/f1020cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-04.webp",
    alt: "custom-printed-package-04",
    title: "Package 4",
    subtitle: "1 valance + 1 Peak",
    url: "/custom-printed-package/f1313cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-05.webp",
    alt: "custom-printed-package-05",
    title: "Package 5",
    subtitle: "Full roof",
    url: "/custom-printed-package/f1320cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-06.webp",
    alt: "custom-printed-package-06",
    title: "Package 6",
    subtitle: "1 valance + 1 Peak + 1 Full wall",
    url: "/custom-printed-package/f1326cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-07.webp",
    alt: "custom-printed-package-07",
    title: "Package 7",
    subtitle: "1 valance + 1 Peak + 3 Full walls",
    url: "/custom-printed-package/f1616cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-08.webp",
    alt: "custom-printed-package-08",
    title: "Package 8",
    subtitle: "Full roof + 1 full wall + 2 half wall",
    url: "/custom-printed-package/f2020cpp"
}, {
    imageUrl: "/images/custom-printed-package/custom-printed-package-09.webp",
    alt: "custom-printed-package-09",
    title: "Package 9",
    subtitle: "Full roof + 2 full walls + 2 half wall",
    url: "/custom-printed-package/f2020cpp"
}]

const PackageItem = ({imageUrl, alt, title, subtitle, url, router}) => {
    return (
        <Block display="flex" flexDirection="column" padding={["8px", null, "24px 16px"]} backgroundColor="#FAFAFA" overflow="hidden" $style={{borderRadius: "8px"}}>
            <Block position="relative" width="100%" height="150px" margin={["auto auto 8px", null, "auto auto 24px"]} backgroundColor="white">
                <Image src={imageUrl} alt={alt} layout="fill" width={1024} height={1024} objectFit="contain"/>
            </Block>
            <Block className="text-left" display="flex" flexDirection="column" justifyContent="space-between" flex={1} $style={{gap: "8px"}}>
                <Block>
                    <Block display="flex" justifyContent="space-between" marginBottom="8px" padding="16px 0">
                        <Block font="MinXHeading16" color="MinXPrimaryText">{title}</Block>
                    </Block>
                    <Block font="MinXHeading16" color="MinXPrimaryText" $style={{fontWeight: "400 !important", lineHeight: "1.2 !important"}}>{subtitle}</Block>
                </Block>
                <Block>
                    <Block marginBottom="16px" font="MinXHeading16" color="MinXPrimaryText" $style={{fontWeight: "400 !important", lineHeight: "1 !important"}}>{`From`}</Block>
                    <Button bundle="primary" width="100%" height="36px" marginBottom="8px" text="Choose" font="MinXLabel14" onClick={() => router.push(url)}/>
                </Block>
            </Block>
        </Block>
    )
}

function Custom_Printing_Canopy_Tent({router}) {
    return (
        <ThemeProvider.V1>
            <Head>
                <title>Printed Package - Custom Printing Canopy Tent | WESTSHADE</title>
                <meta name="description" content="Printing packages are based on your needs with a large selection of sizes and colors to promo your business, get free design today!"/>
            </Head>
            <Block position="absolute" width="100vw" height="auto" top={0} left="calc(50% - 50vw)"
                   $style={{aspectRatio: "32/13", background: `url('${process.env.imageBaseUrl}/images/custom-printing/canopy-tent/hero-bg.webp')`, zIndex: "-1"}}/>
            <FlexGrid className="text-center" flexGridColumnCount={1} flexGridRowGap={["scale900", null, "scale1000"]} justifyContent="center" paddingTop={["scale900", null, "scale1600"]} paddingBottom={["scale900", null, "scale1600"]}>
                <FlexGridItem>
                    <Section upperContainerProps={{hidden: true}}
                             content={
                                 <FlexGrid gridRowGap="24px">
                                     <FlexGridItem>
                                         <SectionTitle.V2 category="custom printing package" title="Customize in 3 steps"
                                                          content="This space is for SEO. Say something that users would search, any key words, products name, blabla. Westshade provides various custom printing packages to make it easy for you to custom even when your artwork is not ready."
                                         />
                                     </FlexGridItem>
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
                                     {Package.map(({title, subtitle, imageUrl, alt, url}, index) => (
                                         <FlexGridItem key={title} flexGridItemIndex={index} display="grid" gridRowGap="scale600">
                                             <PackageItem title={title} subtitle={subtitle} imageUrl={imageUrl} alt={alt} url={url} router={router}/>
                                         </FlexGridItem>
                                     ))}
                                 </FlexGrid>
                             }
                    />
                </FlexGridItem>
            </FlexGrid>
        </ThemeProvider.V1>
    );
}

export default withRouter(Custom_Printing_Canopy_Tent);
