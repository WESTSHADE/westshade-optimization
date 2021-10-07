import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import ArrowLeft from "baseui/icon/arrow-left";
import ArrowRight from "baseui/icon/arrow-right";

import {Benefit} from "../components/sections";

const BlockGridIcon = ({src, alt, title, content, titleSize}) => {
    return (
        <Block width="100%" marginTop="12px" marginBottom="12px" paddingRight="4px" paddingLeft="4px"
               overrides={{
                   Block: {
                       style: {textAlign: "center"},
                   },
               }}
        >
            <img src={src} alt={alt} className="icon-tent-size-alt"/>
            <Block marginTop={["12px", "12px", "24px"]} font={titleSize === "large" ? ["MinXLabel16", "MinXLabel24"] : "MinXLabel12"}
                   color="MinXPrimaryText"
            >
                {title}
            </Block>
            {content ? (
                <Block maxWidth={["184px", "184px", "280px"]} marginTop="8px" marginRight="auto" marginLeft="auto"
                       font="MinXParagraph14" color="MinXPrimaryText"
                >
                    {content}
                </Block>
            ) : null}
        </Block>
    );
};

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
            {/* 主要显示区域 */}
            <Block position="relative" alignItems="center" height={["480px", "660px", "900px"]} paddingTop={["60px", "80px", "160px"]} paddingRight="30px" paddingLeft="30px"
                   backgroundColor="rgba(0,0,0,0.2)"
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <div className="background-image">
                    <Image src="images/custom-printing/custom-printing-display.jpg" alt="custom printing" layout="fill" objectFit="cover" quality={100}/>
                </div>
                <Block marginBottom={["8px", "16px", "20px"]} font={["MinXSubtitle16", "MinXSubtitle20", "MinXSubtitle28"]} color="MinXSecondaryText">
                    Custom Printing
                </Block>
                <Block maxWidth={["262px", "450px", "659px"]} marginBottom={["8px", "16px", "20px"]} font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               style: {textAlign: "center"}
                           },
                       }}
                >
                    Print any style you like
                </Block>
                <Block width={["165px", "232px", "240px"]} height={["36px", "48px", "56px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">
                    <Button shape={SHAPE.pill}
                            overrides={{
                                BaseButton: {
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        paddingTop: "3px",
                                        paddingRight: "3px",
                                        paddingBottom: "3px",
                                        paddingLeft: "3px",
                                        color: "inherit",
                                        fontSize: "inherit",
                                        fontWeight: "inherit",
                                        lineHeight: "inherit",
                                        boxSizing: "border-box",
                                        backgroundClip: "padding-box",
                                        borderRadius: "38px",
                                        background: "linear-gradient(to left, #b827fc 0%, #2c90fc 25%, #b8fd33 50%, #fec837 75%, #fd1892 100%) border-box",
                                        ":hover": {backgroundColor: "rgba(255,255,255,0.5)"},
                                        ":active": {backgroundColor: "rgba(255,255,255,0.8)"},
                                    },
                                },
                            }}
                            onClick={() => {
                            }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "#C8C9CC",
                                borderRadius: "38px",
                            }}
                        >
                            Create Your Style
                        </div>
                    </Button>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block marginBottom="24px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">CUSTOM TENT IN USE</Block>
                <Block maxWidth="300px" marginBottom="24px" font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                    You can custom the tent in the way you like for any occasions.
                </Block>
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
                                                              className: "react-carousel-arrow left",
                                                          },
                                                          style: {
                                                              fontSize: "inherit",
                                                              fontWeight: "inherit",
                                                              lineHeight: "inherit",
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
                                                              className: "react-carousel-arrow right",
                                                          },
                                                          style: {
                                                              fontSize: "inherit",
                                                              fontWeight: "inherit",
                                                              lineHeight: "inherit",
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
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block marginBottom="24px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">HOW IT WORKS</Block>
                <Block maxWidth="300px" marginBottom="24px" font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                    2 people can set up the tent in a few minutes by following these steps.
                </Block>
                <Block width={"100%"} minHeight={["336px"]} margin={"auto"} alignItems="center" display={"grid"}
                       gridTemplateColumns={["repeat(1, 100%)", "repeat(2, 50%)", "repeat(4, 25%)"]} justifyContent="space-between">
                    <BlockGridIcon src="/images/icon/icon-order-online.png" alt="Order Online" title="1. Order Online"
                                   content="Upload images and information and place an order online." titleSize="large"/>
                    <BlockGridIcon src="/images/icon/icon-get-free-mockup.png" alt="Get Free Mockup" title="2. Get Free Mockup"
                                   content="After you place your order, we’ll send a free mockup to your email." titleSize="large"/>
                    <BlockGridIcon src="/images/icon/icon-confirm-mockup.png" alt="Confirm Mockup" title="3. Confirm Mockup"
                                   content="Let us know how do you like it and changes you’d like to make." titleSize="large"/>
                    <BlockGridIcon src="/images/icon/icon-print-ship.png" alt="Print & Ship" title="4. Print & Ship"
                                   content="We’ll print it when you are satisfied with the design and ship it to you." titleSize="large"/>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block marginBottom="24px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText">PRINTING TECH</Block>
                <Block maxWidth="300px" marginBottom="24px" font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                    You can choose between two printing technologies based on your need.
                </Block>
                <Block display={["flex", "flex", "grid"]} flexDirection={["column", "column", "row"]} justifyContent={["center", "center", "space-between"]}
                       overrides={{
                           Block: {
                               props: {
                                   className: "gird-display-media"
                               },
                           },
                       }}
                >
                    <Block display="flex" flexDirection="column" alignItems="center"
                           marginBottom={["16px", "16px", "0px"]}
                           paddingRight="0px" paddingBottom="32px" paddingLeft="0px"
                           overflow="hidden" backgroundColor={"MinXBackground"}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "container-grid-display"
                                   },
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
                    <Block display="flex" flexDirection="column" alignItems="center"
                           paddingRight="0px" paddingBottom="32px" paddingLeft="0px"
                           overflow="hidden" backgroundColor={"MinXBackground"}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "container-grid-display"
                                   },
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
            </Block>
            <Benefit/>
        </React.Fragment>
    );
}

Custom_Printing.getInitialProps = (context) => {
    return {
        newFooter: true,
    };
};

export default withRouter(Custom_Printing);
