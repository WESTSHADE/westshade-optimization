import React, {useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {ArrowRight, ArrowLeft} from "baseui/icon";

import Button from "Components/button-n";
import {ThemeV1 as ThemeProvider} from "Components/ThemeProvider";
import {Benefit, OrderProcess, Section, FreeMockupForm} from "Components/sections";

const data = [
    {
        title: "Canopy tent",
        content: "This is a description for table cover which is longer than it is now and even longer and it takes more than one line.",
        iconUrl: "/images/custom-printing/tab-canopy-tent.webp",
        imageUrl: "/images/custom-printing/live-example-01.webp",
        url: "/custom-printing/canopy-tent/"
    },
    {
        title: "Umbrella",
        content: "This is a description for table cover which is longer than it is now and even longer and it takes more than one line.",
        iconUrl: "/images/custom-printing/tab-umbrella.webp",
        imageUrl: "/images/custom-printing/live-example-02.webp",
        // buttonText: "Coming Soon",
        url: "/custom-printing/umbrella/"
    },
    {
        title: "Table cover",
        content: "This is a description for table cover which is longer than it is now and even longer and it takes more than one line.",
        iconUrl: "/images/custom-printing/tab-table-cover.webp",
        imageUrl: "/images/custom-printing/live-example-03.webp",
        url: "/custom-printing/table-cover/"
    },
    {
        title: "Side wall",
        content: "This is a description for table cover which is longer than it is now and even longer and it takes more than one line.",
        iconUrl: "/images/custom-printing/tab-side-wall.webp",
        imageUrl: "/images/custom-printing/live-example-01.webp",
        buttonText: "Coming Soon",
        url: ""
    },
];

const ImageSlide = ({url}) => {
    return (
        <Block className="react-player" width="100vw !important">
            <Image src={url} alt="live-example" layout="fill" objectFit="cover"/>
        </Block>
    );
};

function Custom_Printing({router}) {
    const [tabActiveKey, setTabActiveKey] = useState(0);

    return (
        <ThemeProvider>
            <Head>
                <title>Custom Printing - WESTSHADE</title>
                <meta name="description" content="Print your canopy and make it unique! All occasions. Choose from Dye Sublimation and UV Printing."/>
            </Head>
            {/* 主要显示区域 */}
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingTop={["32px", null, "64px"]}>
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <>
                                 <Block marginBottom={["16px", null, "24px"]} font={["MinXTitle20", "MinXTitle20", "MinXTitle32"]} color="MinXPrimaryText"
                                        overrides={{
                                            Block: {
                                                style: {fontWeight: "500 !important", lineHeight: "1em !important"}
                                            },
                                        }}
                                 >I want to customize...</Block>
                                 <Tabs activeKey={tabActiveKey} onChange={({activeKey}) => setTabActiveKey(parseInt(activeKey + ""))} fill={FILL.fixed} overrides={{TabBorder: {props: {hidden: true}}}}>
                                     {data.map(({title, content, iconUrl, imageUrl, buttonText = "Learn more >", url}, index) => (
                                         <Tab key={index} title={title} artwork={() => <Image src={iconUrl} alt={title} width={80} height={80} layout="intrinsic" objectFit="contain"/>}
                                              overrides={{
                                                  TabPanel: {
                                                      props: {
                                                          className: "tab-panel-custom-printing"
                                                      },
                                                  },
                                                  Tab: {
                                                      props: {
                                                          className: "tab-custom-printing"
                                                      },
                                                      style: ({$isActive}) => ({
                                                          borderColor: $isActive ? "#23A4AD" : "transparent",
                                                          background: $isActive ? "#F7F7F7" : "transparent",
                                                          ":hover": {background: $isActive ? "#F7F7F7" : "transparent"},
                                                      }),
                                                  },
                                                  ArtworkContainer: {
                                                      props: {
                                                          className: "tab-artwork-custom-printing"
                                                      },
                                                  }
                                              }}
                                         >
                                             <Block display="flex" flexDirection={["column", null, "row"]} justifyContent="center" alignItems="center">
                                                 <Block display={["block", null, "none"]} position="relative" width="100%">
                                                     <Image src={imageUrl} alt={title} layout="responsive" objectFit="cover" width={1600} height={900}/>
                                                 </Block>
                                                 <Block display={["none", null, "block"]} position="relative" width="50%" minHeight="400px">
                                                     <Image src={imageUrl} alt={title} layout="fill" objectFit="cover"/>
                                                 </Block>
                                                 <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows="repeat(3, max-content)" gridRowGap={["8px", null, "16px"]} flex={1} padding="16px 32px" height="100%">
                                                     <Block marginRight="auto" marginLeft={["auto", null, "unset"]} width="fit-content" font={["MinXTitle24", "MinXTitle24", "MinXTitle40"]} color="MinXPrimaryText"
                                                            overrides={{
                                                                Block: {
                                                                    style: {fontWeight: "500 !important", lineHeight: "1em !important", textTransform: "capitalize"}
                                                                },
                                                            }}
                                                     >{title}</Block>
                                                     <Block as="p" width="fit-content" maxWidth={[null, null, "454px"]} font={["MinXSubtitle14", "MinXSubtitle14", "MinXSubtitle16"]} color="MinXSecondaryText"
                                                            overrides={{
                                                                Block: {
                                                                    style: {
                                                                        fontWeight: "400 !important", lineHeight: "1.2em !important", textAlign: "center",
                                                                        '@media (min-width: 672px)': {textAlign: "left"},
                                                                    }
                                                                },
                                                            }}
                                                     >{content}</Block>
                                                     <Button bundle="primary" marginRight="auto" marginLeft={["auto", null, "unset"]} height={["48px", null, "56px"]} font={["MinXLabel14", "MinXLabel14", "MinXLabel16"]} text={buttonText}
                                                             onClick={() => router.push(url)}
                                                     />
                                                 </Block>
                                             </Block>
                                         </Tab>
                                     ))}
                                 </Tabs>
                             </>
                         }
                />
                <Section upperContainerDirection="column"
                         title="CUSTOM TENT IN USE"
                         subtitle="You can custom the tent in the way you like for any occasions."
                         content={
                             <>
                                 <Block display={["block", "block", "none"]}>
                                     <Block className="react-image-carousel-small" display="flex" flexDirection="column" alignItems="center" paddingBottom={["6px", "20px"]} overflow="hidden">
                                         <Carousel showStatus={false} showThumbs={false} showArrows={false} showIndicators={true} swipeable={true} emulateTouch={true}
                                                   renderItem={(item, props) => {
                                                       return (
                                                           <Block position="relative" height={["320px", "509px"]} marginBottom={["16px", "32px"]} overflow="hidden">
                                                               <item.type {...item.props} {...props} />
                                                           </Block>
                                                       );
                                                   }}
                                                   renderIndicator={(onClickHandler, isSelected, index, label) => {
                                                       if (isSelected) {
                                                           return (
                                                               <li style={{backgroundColor: "#43878C", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
                                                                   title={`Selected: ${label} ${index + 1}`}
                                                               />
                                                           );
                                                       }
                                                       return (
                                                           <li key={index}
                                                               style={{backgroundColor: "#C4C4C4", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
                                                               onClick={onClickHandler}
                                                               onKeyDown={onClickHandler}
                                                               value={index}
                                                               role="button"
                                                               tabIndex={0}
                                                               title={`${label} ${index + 1}`}
                                                           />
                                                       );
                                                   }}
                                         >
                                             <ImageSlide key={0} url="/images/custom-printing/live-example-01.webp"/>
                                             <ImageSlide key={1} url="/images/custom-printing/live-example-02.webp"/>
                                             <ImageSlide key={2} url="/images/custom-printing/live-example-03.webp"/>
                                         </Carousel>
                                     </Block>
                                 </Block>
                                 <Block display={["none", "none", "block"]}>
                                     <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} centerMode centerSlidePercentage={65}
                                               renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                                   hasPrev && (
                                                       <Block position="absolute" width={"17.5%"} height={["320px", "509px"]} top={0} left={0}>
                                                           <Button shape="circle" buttonClassName={"cursor react-carousel-arrow left"} bundle="gray" onClick={onClickHandler}>
                                                               <ArrowLeft size={28} color={"white"}/>
                                                           </Button>
                                                       </Block>
                                                   )
                                               }
                                               renderArrowNext={(onClickHandler, hasNext, label) =>
                                                   hasNext && (
                                                       <Block position="absolute" width={"17.5%"} height={["320px", "509px"]} top={0} right={0}>
                                                           <Button shape="circle" buttonClassName={"cursor react-carousel-arrow right"} bundle="gray" onClick={onClickHandler}>
                                                               <ArrowRight size={28} color={"white"}/>
                                                           </Button>
                                                       </Block>
                                                   )
                                               }
                                               renderItem={(item, props) => {
                                                   return (
                                                       <Block position="relative" height={["320px", "509px"]} marginRight="10px" marginLeft="10px" overflow="hidden">
                                                           {props.isSelected ? null : <div className="react-carousel-dusk"/>}
                                                           <item.type {...item.props} {...props} />
                                                       </Block>
                                                   );
                                               }}
                                     >
                                         <ImageSlide key={0} url="/images/custom-printing/live-example-01.webp"/>
                                         <ImageSlide key={1} url="/images/custom-printing/live-example-02.webp"/>
                                         <ImageSlide key={2} url="/images/custom-printing/live-example-03.webp"/>
                                     </Carousel>
                                 </Block>
                             </>}
                />
                <Section upperContainerDirection="column"
                         title="HOW IT WORKS"
                         subtitle="2 people can set up the tent in a few minutes by following these steps."
                         content={<OrderProcess/>}
                />
                <Section upperContainerDirection="column"
                         title="Get a free mockup"
                         subtitle="Not sure about what it will look like? Just fill out the form and our graphic team will make a free mockup for you."
                         content={<FreeMockupForm/>}
                         containerClassName="m-wrap-side-full"
                         upperContainerProps={{marginBottom: ["32px", "32px", "40px"], padding: ["0 16px", "0 32px",]}}
                         subtitleStyles={{maxWidth: "unset !important"}}
                />
                <Section upperContainerDirection="column"
                         title="PRINTING TECH"
                         subtitle="You can choose between two printing technologies based on your need."
                         content={
                             <Block className="text-center" display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridRowGap={["16px", "20px"]} gridColumnGap="20px">
                                 <Block className="section-round-corner" backgroundColor="MinXBackground">
                                     <Block position="relative" height={["320px", "446px"]}>
                                         <Image src="/images/custom-printing/dye-sublimation-printing.webp" alt="Dye Sublimation Printing" layout="fill" objectFit="cover"/>
                                     </Block>
                                     <Block padding="32px 16px">
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">THERMAL</Block>
                                         <Block marginBottom="32px" font="MinXParagraph20" color="MinXPrimaryText" $style={{fontWeight: 700}}>Dye Sublimation</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">USAGE</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">Good for logo printing</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">METHOD</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">Transfer color from a printed paper to the fabric</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">FEATURE</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">No peeling, fading, or extra fabric build-up</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">FABRIC</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">600D fabric, 288 gsm</Block>
                                     </Block>
                                 </Block>
                                 <Block className="section-round-corner" backgroundColor="MinXBackground">
                                     <Block position="relative" height={["320px", "446px"]}>
                                         <Image src="/images/custom-printing/uv-printing.webp" alt="UV Printing" layout="fill" objectFit="cover"/>
                                     </Block>
                                     <Block padding="32px 16px">
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">DIGITAL</Block>
                                         <Block marginBottom="32px" font="MinXParagraph20" color="MinXPrimaryText" $style={{fontWeight: 700}}>UV Printing</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">USAGE</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">Good for whole tent printing</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">METHOD</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">Directly print CMYK ink onto the fabric</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">FEATURE</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">2-3 times lifespan of dye sublimation</Block>
                                         <Block marginBottom="8px" font="MinXHeading14" color="MinXSecondaryText">FABRIC</Block>
                                         <Block marginBottom="16px" font="MinXParagraph14" color="MinXPrimaryText">900D fabric, 360 gsm</Block>
                                     </Block>
                                 </Block>
                             </Block>
                         }
                />
                <Benefit containerClassName="m-body-section-wrap" light/>
            </Block>
        </ThemeProvider>
    );
}

export default withRouter(Custom_Printing);
