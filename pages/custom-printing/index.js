import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import ArrowLeft from "baseui/icon/arrow-left";
import ArrowRight from "baseui/icon/arrow-right";

import {Benefit, OrderProcess, Section} from "../../components/sections";
import Sandwich from "../../components/sandwich";

import MButton from "../../components/button-n";

const ImageSlide = ({url}) => {
    return (
        <div className="react-player">
            <img src={url} width="100%" height="100%"/>
        </div>
    );
};

function Custom_Printing({router}) {
    return (
        <React.Fragment>
            <Head>
                <title>Custom Printing - WESTSHADE</title>
                <meta name="description" content="Print your canopy and make it unique! All occasions. Choose from Dye Sublimation and UV Printing."/>
            </Head>
            {/* 主要显示区域 */}
            <Block position="relative" height={["480px", "660px", "900px"]} paddingTop={["60px", "80px", "160px"]} paddingRight="30px" paddingLeft="30px"
                   display="grid" gridTemplateColumns="1fr" gridRowGap={["8px", "16px", "20px"]} alignItems="center"
                   backgroundImage={"url(\"/images/custom-printing/custom-printing-display.jpg\")"} backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat"
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display text-center"
                           },
                       },
                   }}
            >
                <Block font={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle28"]} color="MinXSecondaryText">Custom Printing</Block>
                <Block maxWidth={["262px", "450px", "659px"]} font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryText">
                    Print any style you like
                </Block>
                <MButton type="rainbow" height={["36px", "48px", "56px"]}
                         font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText" buttonBackgroundColor="#FAFBFF" text="Create Your Style"
                         onClick={() => router.push("/custom-printing-canopy-tent")}
                />
            </Block>
            <Section upperContainerDirection={"column"}
                     title={"CUSTOM TENT IN USE"}
                     subtitle={"You can custom the tent in the way you like for any occasions."}
                     content={
                         <>
                             <Block display={["block", "block", "none"]}>
                                 <Block display="flex" flexDirection="column" alignItems="center"
                                        paddingBottom={["6px", "20px"]}
                                        overflow="hidden"
                                        overrides={{
                                            Block: {
                                                props: {className: "react-image-carousel-small"},
                                            },
                                        }}
                                 >
                                     <Carousel showStatus={false} showThumbs={false} showArrows={false} showIndicators={true} swipeable={true}
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
                                                               aria-label={`Selected: ${label} ${index + 1}`}
                                                           />
                                                       );
                                                   }
                                                   return (
                                                       <li style={{backgroundColor: "#C4C4C4", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
                                                           onClick={onClickHandler}
                                                           onKeyDown={onClickHandler}
                                                           value={index}
                                                           key={index}
                                                           role="button"
                                                           tabIndex={0}
                                                           title={`${label} ${index + 1}`}
                                                           aria-label={`${label} ${index + 1}`}
                                                       />
                                                   );
                                               }}
                                     >
                                         <ImageSlide key={0} url="/images/custom-printing/live-example-01.jpg"/>
                                         <ImageSlide key={1} url="/images/custom-printing/live-example-02.jpg"/>
                                         <ImageSlide key={2} url="/images/custom-printing/live-example-03.jpg"/>
                                     </Carousel>
                                 </Block>
                             </Block>
                             <Block display={["none", "none", "block"]}>
                                 <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} centerMode centerSlidePercentage={65}
                                           renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                               hasPrev && (
                                                   <Block position="absolute" width={"17.5%"} height={["320px", "509px"]} top={0} left={0}>
                                                       <Button shape={SHAPE.circle} kind={KIND.secondary}
                                                               onClick={onClickHandler}
                                                               overrides={{
                                                                   BaseButton: {
                                                                       props: {
                                                                           className: "cursor react-carousel-arrow left",
                                                                       }
                                                                   },
                                                               }}
                                                       >
                                                           <ArrowLeft size={28} color={"white"}/>
                                                       </Button>
                                                   </Block>
                                               )
                                           }
                                           renderArrowNext={(onClickHandler, hasNext, label) =>
                                               hasNext && (
                                                   <Block position="absolute" width={"17.5%"} height={["320px", "509px"]} top={0} right={0}>
                                                       <Button shape={SHAPE.circle} kind={KIND.secondary}
                                                               onClick={onClickHandler}
                                                               overrides={{
                                                                   BaseButton: {
                                                                       props: {
                                                                           className: "cursor react-carousel-arrow right",
                                                                       }
                                                                   },
                                                               }}
                                                       >
                                                           <ArrowRight size={28} color={"white"}/>
                                                       </Button>
                                                   </Block>
                                               )
                                           }
                                           renderItem={(item, props) => {
                                               return (
                                                   <Block position="relative" height={["320px", "509px"]} marginRight="10px" marginBottom="32px" marginLeft="10px" overflow="hidden">
                                                       {props.isSelected ? null : <div className="react-carousel-dusk"/>}
                                                       <item.type {...item.props} {...props} />
                                                   </Block>
                                               );
                                           }}
                                 >
                                     <ImageSlide key={0} url="/images/custom-printing/live-example-01.jpg"/>
                                     <ImageSlide key={1} url="/images/custom-printing/live-example-02.jpg"/>
                                     <ImageSlide key={2} url="/images/custom-printing/live-example-03.jpg"/>
                                 </Carousel>
                             </Block>
                         </>}
            />
            <Section upperContainerDirection={"column"}
                     title={"HOW IT WORKS"}
                     subtitle={"2 people can set up the tent in a few minutes by following these steps."}
                     content={<OrderProcess/>}
            />
            <Section upperContainerDirection={"column"}
                     title={"PRINTING TECH"}
                     subtitle={"You can choose between two printing technologies based on your need."}
                     content={
                         <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridRowGap={["16px", "20px"]} gridColumnGap="20px">
                             <Block display="flex" flexDirection="column" alignItems="center" paddingRight="0px" paddingBottom="32px" paddingLeft="0px" overflow="hidden" backgroundColor={"MinXBackground"}
                                    overrides={{
                                        Block: {
                                            style: {borderRadius: "32px"}
                                        },
                                    }}
                             >
                                 <Block position="relative" width="100%" height={["320px", "446px"]} marginBottom="32px">
                                     <img width="100%" height="100%" src="/images/custom-printing/dye-sublimation-printing.jpg" alt="Dye Sublimation Printing" style={{objectFit: "cover"}}/>
                                 </Block>
                                 <div style={{paddingRight: "16px", paddingLeft: "16px", textAlign: "center"}}>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>THERMAL</Block>
                                     <Block marginBottom="32px" font="MinXParagraph20" color={"MinXPrimaryText"}
                                            overrides={{
                                                Block: {
                                                    style: {fontWeight: "700"},
                                                },
                                            }}
                                     >
                                         Dye Sublimation
                                     </Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>USAGE</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>Good for logo printing</Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>METHOD</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>Transfer color from a printed paper to the fabric</Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>FEATURE</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>No peeling, fading, or extra fabric build-up</Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>FABRIC</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>600D fabric, 288 gsm</Block>
                                 </div>
                             </Block>
                             <Block display="flex" flexDirection="column" alignItems="center" paddingRight="0px" paddingBottom="32px" paddingLeft="0px" overflow="hidden" backgroundColor={"MinXBackground"}
                                    overrides={{
                                        Block: {
                                            style: {borderRadius: "32px"}
                                        },
                                    }}
                             >
                                 <Block position="relative" width="100%" height={["320px", "446px"]} marginBottom="32px">
                                     <img width="100%" height="100%" src="/images/custom-printing/uv-printing-n.jpg" alt="UV Printing" style={{objectFit: "cover"}}/>
                                 </Block>
                                 <div style={{paddingRight: "16px", paddingLeft: "16px", textAlign: "center"}}>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>DIGITAL</Block>
                                     <Block marginBottom="32px" font="MinXParagraph20" color={"MinXPrimaryText"}
                                            overrides={{
                                                Block: {
                                                    style: {fontWeight: "700"},
                                                },
                                            }}
                                     >
                                         UV Printing
                                     </Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>USAGE</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>Good for whole tent printing</Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>METHOD</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>Directly print CMYK ink onto the fabric</Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>FEATURE</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>2-3 times lifespan of dye sublimation</Block>
                                     <Block marginBottom="8px" font="MinXHeading14" color={"MinXSecondaryText"}>FABRIC</Block>
                                     <Block marginBottom="16px" font="MinXParagraph14" color={"MinXPrimaryText"}>900D fabric, 360 gsm</Block>
                                 </div>
                             </Block>
                         </Block>
                     }
            />
            <Benefit/>
        </React.Fragment>
    );
}

export default withRouter(Custom_Printing);
