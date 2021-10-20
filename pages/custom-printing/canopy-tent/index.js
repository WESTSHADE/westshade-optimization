import React, {useEffect, useRef, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import ArrowLeft from "baseui/icon/arrow-left";
import ArrowRight from "baseui/icon/arrow-right";
import MButton from "../../../components/button-n";

const ImageSlide = ({url, alt}) => {
    return (
        <div className="react-player">
            <img src={url} alt={alt} width="100%" height="100%" style={{objectFit: "contain"}}/>
        </div>
    );
};

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

function Custom_Printing_Canopy_Tent({router}) {
    const refBanner = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const size = useWindowSize();

    const goBuyingPage = () => router.push({pathname: "/custom-print/table-cover/fitted-table-cover"});

    const getSizeDesc = (value) => {
        let elm = null;
        switch (value) {
            case '0':
                elm = <>Size: 10’x10’<br/>Frame: Y7 Heavy Duty Aluminum</>;
                break;
            case '1':
                elm = <>Size: 10’x10’<br/>Frame: Y7 Heavy Duty Aluminum</>;
                break;
            case '2':
                elm = <>Size: 10’x20’<br/>Frame: Y7 Heavy Duty Aluminum</>;
                break;
            case '3':
                elm = <>Size: 10’x20’<br/>Frame: Y7 Heavy Duty Aluminum</>;
                break;
            case '4':
                elm = <>Size: 20’x20’<br/>Frame: Y7 Heavy Duty Aluminum</>;
                break;
            case '5':
                elm = <>Size: 20’x20’<br/>Frame: Y7 Heavy Duty Aluminum</>;
                break;
            default:
                elm = null;
        }
        return elm;
    }

    useEffect(() => {
        if (refBanner && refBanner.current) {
            setCircleAD(refBanner.current.clientHeight);
            setCircleBD(refBanner.current.clientWidth / 2);
        }
    }, [size]);

    return (
        <React.Fragment>
            <Head>
                <title>Custom Printing Canopy Tent - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
            </Head>
            <Block ref={refBanner} position="relative"
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           },
                       },
                   }}
            >
                <Block position="relative" width="100%" height={["368px", "437px", "582px"]} alignItems="center" paddingTop={["32px", "40px", "64px"]} paddingRight="16px" paddingBottom={["32px", "40px", "64px"]} paddingLeft="16px"
                       overflow="hidden"
                       overrides={{
                           Block: {
                               props: {
                                   className: "container-display"
                               },
                               style: {
                                   background: "linear-gradient(95.25deg, rgba(241, 120, 182, 0.85) 0%, rgba(252, 221, 236, 0) 52.6%, rgba(241, 120, 182, 0.85) 100%), #FFEAF5"
                               }
                           },
                       }}
                >
                    <Block marginBottom={["8px", "16px", "20px"]} font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt"
                           overrides={{
                               Block: {
                                   style: {zIndex: 1}
                               },
                           }}
                    >Customize It Your Way</Block>
                    <MButton type="outline" height={["36px", "48px", "56px"]} marginBottom={["40px", "64px", "80px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Pick an umbrella below"
                             buttonStyle={{
                                 backgroundColor: 'transparent !important',
                                 ":hover": {backgroundColor: `rgba(255, 255, 255, 0.05) !important`},
                                 ":active": {backgroundColor: `rgba(255, 255, 255, 0.1) !important`}
                             }}
                             overrides={{
                                 Block: {
                                     style: {zIndex: 1}
                                 },
                             }}
                             onClick={() => goBuyingPage()}
                    />
                    <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#5D5FEF", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                    <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#EF5DA8", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
                </Block>
                <Block position="absolute" width={["240px", "320px", "420px"]} height={["240px", "320px", "420px"]} marginRight="auto" marginLeft="auto" right={0} bottom={0} left={0}>
                    <Image src="images/custom-printing/canopy-tent/canopy-tent.png" alt="canopy tent" layout="fill" objectFit="contain" quality={100}/>
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
                <Block display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" marginBottom={["12px", "32px", "40px"]}>
                    <Block maxWidth="450px" marginBottom="12px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >ANY STYLE MULTIPLE SIZE</Block>
                    <Block maxWidth="320px" marginBottom={["0", "0", "12px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                        There is no limitation on printing styles and you can configure your tent as you wish. Westshade will meet your special needs.
                    </Block>
                </Block>
                <Block position="relative">
                    <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} infiniteLoop={true} centerMode centerSlidePercentage={46}
                              renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                  hasPrev && (
                                      <Block position="absolute" width={"17.5%"} height={"100%"} top={0} left={0}>
                                          <Button shape={SHAPE.circle} kind={KIND.secondary}
                                                  onClick={onClickHandler}
                                                  overrides={{
                                                      BaseButton: {
                                                          props: {
                                                              className: "react-carousel-arrow dark left",
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
                                      <Block position="absolute" width={"17.5%"} height={"100%"} top={0} right={0}>
                                          <Button shape={SHAPE.circle} kind={KIND.secondary}
                                                  onClick={onClickHandler}
                                                  overrides={{
                                                      BaseButton: {
                                                          props: {
                                                              className: "react-carousel-arrow dark right",
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
                                      <Block position="relative" width={"100%"} maxWidth={"560px"} height={"100%"} display="flex" flexDirection="column" marginLeft={"auto"} marginRight={"auto"}>
                                          <Block flex={1} marginRight="10px" marginBottom="32px" marginLeft="10px" overflow="hidden"
                                                 style={props.isSelected ? {transition: "0.5s ease-in-out", transform: "scale(1.2)"} : {transition: "0.5s ease-in-out", transform: "scale(0.8)"}}>
                                              <item.type {...item.props} {...props} />
                                          </Block>
                                          {props.isSelected ? (
                                              <Block font={["MinXParagraph12", "MinXParagraph14"]} color="MinXSecondaryText"
                                                     overrides={{
                                                         Block: {
                                                             style: {
                                                                 zIndex: 1,
                                                             }
                                                         },
                                                     }}
                                              >{getSizeDesc(item.key)}</Block>
                                          ) : <Block height="40px"/>}
                                      </Block>
                                  );
                              }}
                    >
                        <ImageSlide key={0} url="/images/custom-printing/canopy-tent/any_style1.jpg" alt="canopy tent"/>
                        <ImageSlide key={1} url="/images/custom-printing/canopy-tent/any_style2.jpg" alt="canopy tent"/>
                        <ImageSlide key={2} url="/images/custom-printing/canopy-tent/any_style3.jpg" alt="canopy tent"/>
                        <ImageSlide key={3} url="/images/custom-printing/canopy-tent/any_style4.jpg" alt="canopy tent"/>
                        <ImageSlide key={4} url="/images/custom-printing/canopy-tent/any_style5.jpg" alt="canopy tent"/>
                        <ImageSlide key={5} url="/images/custom-printing/canopy-tent/any_style6.jpg" alt="canopy tent"/>
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
                <Block display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" marginBottom={["12px", "24px", "40px"]}>
                    <Block maxWidth="450px" marginBottom="12px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >DESIGNED FOR YOUR SPECIAL EVENTS</Block>
                    <Block maxWidth="320px" marginBottom={["0", "0", "12px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                        Westshade provides free mockup service and we’ll help you to make you special and stand out in important events.
                    </Block>
                </Block>
                <Block position="relative" width="100%" height={["187px", "268px", "538px"]} maxWidth="1920px" marginRight="auto" marginBottom={["12px", "24px", "32px"]} marginLeft="auto">
                    <Image src="images/custom-printing/canopy-tent/event.jpg" alt="custom printing event" layout="fill" objectFit="cover" objectPosition="bottom" quality={100}/>
                </Block>
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]} marginBottom={["40px !important", "80px !important", "120px !important"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block display="flex" flexDirection={["column", "column", "row"]} justifyContent="space-between" marginBottom={["32px", "32px", "40px"]}>
                    <Block maxWidth="450px" marginBottom="12px" font={["MinXHeading32", "MinXHeading44", "MinXHeading64"]} color="MinXPrimaryText"
                           overrides={{
                               Block: {
                                   style: {lineHeight: "0.8 !important"}
                               },
                           }}
                    >CUSTOMERS' SHOW</Block>
                    <Block maxWidth="320px" marginBottom={["0", "0", "12px"]} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                        Our customers love the tents they created with us. Check them out!
                    </Block>
                </Block>
                <Block display="grid" gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["16px", "16px", "20px"]}>
                    <Block position="relative" width="100%" height={["154px", "154px", "216px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/custom-printing/canopy-tent/customer1.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                    </Block>
                    <Block position="relative" width="100%" height={["154px", "154px", "216px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/custom-printing/canopy-tent/customer2.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                    </Block>
                    <Block position="relative" width="100%" height={["154px", "154px", "216px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/custom-printing/canopy-tent/customer3.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                    </Block>
                    <Block position="relative" width="100%" height={["154px", "154px", "216px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/custom-printing/canopy-tent/customer4.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                    </Block>
                    <Block position="relative" width="100%" height={["154px", "154px", "216px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/custom-printing/canopy-tent/customer5.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                    </Block>
                    <Block position="relative" width="100%" height={["154px", "154px", "216px"]} marginRight="auto" marginLeft="auto">
                        <Image src="images/custom-printing/canopy-tent/customer6.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    )
}

Custom_Printing_Canopy_Tent.getInitialProps = (context) => {
    return {
        newFooter: true,
    };
};

export default withRouter(Custom_Printing_Canopy_Tent);