import React, {useEffect, useRef} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {ChevronRight, ArrowLeft, ArrowRight} from "baseui/icon";

import {Benefit, TentSizeDisplay, Section, SubHeaderBar} from "../../components/sections";
import MButton from "../../components/button-n";

const refs = [];

const BlockVideo = ({src, type, isSelected, step}) => {
    const refBlockVideo = useRef(null);

    if (step && step > 0) {
        refs[step - 1] = refBlockVideo;
    }

    const handleScroll = (x) => {
        if (refBlockVideo.current) {
            const box = refBlockVideo.current.children[0].children[0];
            const rect = box.getBoundingClientRect();
            box.muted = true; // without this line it's not working although I have "muted" in HTML

            // 全部显现
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                if (isSelected) {
                    if (box.paused) box.play();
                } else {
                    if (!box.paused) box.pause();
                }
            }
            // 全部不显示
            if ((rect.top > window.innerHeight && rect.bottom > window.innerHeight) || (rect.top < 0 && rect.bottom < 0)) {
                box.pause();
            }
            // 部分显现
            // if (rect.top < window.innerHeight && rect.bottom >= 0) {}
        }
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div ref={refBlockVideo} style={{height: "100%"}}>
            <ReactPlayer className="react-player" width="100%" height="100%" url={src} loop
                         config={{
                             file: {
                                 attributes: {
                                     crossorigin: "anonymous",
                                     controlsList: "nofullscreen",
                                     disablepictureinpicture: "true"
                                 },
                             },
                         }}/>
        </div>
    )

    // return (
    //     <video ref={refBlockVideo} width="100%" height="100%" loop>
    //         <source src={src} type={type}/>
    //     </video>
    // );

    // return (
    //     <div ref={refBlockVideo} style={{height: "100%"}}
    //          dangerouslySetInnerHTML={{
    //              __html: `<video width="100%" height="100%" loop><source src=${src} type=${type} /></video>`,
    //          }}
    //     />
    // );
};

// const VideoSlide = ({ url, isSelected }) => <ReactPlayer className="react-player" width="100%" height="100%" url={url} playing={isSelected} loop />;
const VideoSlide = ({url, isSelected, step}) => {
    return (
        <div className="react-player">
            <BlockVideo src={url} type="video/mp4" isSelected={isSelected} step={step}/>
        </div>
    );
};

const BlockDisplay = ({title, content, src, button}) => {
    return (
        <Block position="relative" width="100%" display="flex" flexDirection="column" alignItems="center" height={["228px", "448px", "520px"]} paddingTop={["30px", "40px", "50px", "60px"]} paddingRight="18px" paddingLeft="18px"
               backgroundColor="rgba(0, 0, 0, 0.2)" overflow="hidden"
               overrides={{
                   Block: {
                       style: {textAlign: "center", borderRadius: "32px"}
                   },
               }}
        >
            <Block position="absolute" width="100%" height="100%" top={0} right={0} bottom={0} left={0}
                   backgroundImage={"url(" + src + ")"} backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat"
                   overrides={{
                       Block: {
                           style: {zIndex: "-1"}
                       },
                   }}
            />
            <Block marginBottom={["8px", "16px"]} font={["MinXHeading24", "MinXHeading36"]} color="MinXPrimaryTextAlt">{title}</Block>
            <Block maxWidth={["250px", "346px"]} marginBottom="16px" font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph20"]} color="MinXPrimaryTextAlt">{content}</Block>
            {button ? button() : null}
        </Block>
    );
};

function Canopy_Tent({router}) {
    const goBuyingPage = () => router.push({pathname: "/products/canopy-tent/buy"});

    const onChangeCarousel = (index) => {
        if (refs.length > 0) {
            refs.forEach((ref, i) => {
                const box = ref.current.children[0].children[0];
                if (i === index) {
                    if (box.paused) box.play();
                } else {
                    if (!box.paused) box.pause();
                }
            });
        }
    };

    const getStepDesc = (value) => {
        let elm = null;
        switch (value) {
            case '0':
                elm = <><strong>Step 1</strong> Open Frame 75% of full extension</>;
                break;
            case '1':
                elm = <><strong>Step 2</strong> Position the roof on the frame</>;
                break;
            case '2':
                elm = <><strong>Step 3</strong> Fit the roof velco to the legs</>;
                break;
            case '3':
                elm = <><strong>Step 4</strong> Fit the roof cap on top of the center pole</>;
                break;
            case '4':
                elm = <><strong>Step 5</strong> Open the frame completely</>;
                break;
            case '5':
                elm = <><strong>Step 6</strong> Lift all roof connectors until hearing “click”</>;
                break;
            case '6':
                elm = <><strong>Step 7</strong> Attach roof straps and interlock the clips</>;
                break;
            case '7':
                elm = <><strong>Step 8</strong> Extend all legs to desired height</>;
                break;
            default:
                elm = null;
        }
        return elm;
    }

    return (
        <React.Fragment>
            <Head>
                <title>Canopy Tent - WESTSHADE</title>
                <meta name="description" content="Different types of canopy tent to meet your special needs. Safe shade, long-lasting fabric and unlimited color."/>
            </Head>
            <SubHeaderBar title={"Canopy Tent"} subTitle={"Spec"} subTitleDestination={"spec"} buttonText={"Buy Now"} onClick={() => goBuyingPage()} maxWidth={process.env.maxWidth + "px"}/>
            {/* 主要显示区域 */}
            <Block position="relative" alignItems="center" height={["480px", "660px", "900px"]} paddingTop={["60px", "80px", "160px"]} paddingRight="30px" paddingLeft="30px"
                // backgroundColor="rgba(0, 0, 0, 0.2)"
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           },
                       },
                   }}
            >
                <Block position="absolute" width="100vw" height="100%" maxWidth="1920px" top={0} bottom={0} backgroundColor="rgba(0, 0, 0, 0.2)"
                       overrides={{
                           Block: {
                               style: {zIndex: "-1"}
                           },
                       }}
                />
                <Block position="absolute" width="100vw" height="100%" maxWidth="1920px" top={0}
                    // right={0}
                       bottom={0}
                    // left={0}
                       backgroundImage={"url(\"/images/canopy-tent/canopy-tent.jpg\")"} backgroundSize="cover" backgroundPosition="center" backgroundRepeat="no-repeat"
                       overrides={{
                           Block: {
                               style: {zIndex: "-2"}
                           },
                       }}
                />
                <Block marginBottom={["8px", "16px", "20px"]} font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt">Canopy Tent</Block>
                <Block maxWidth={["260px", "420px", "580px", "640px"]} marginBottom={["8px", "16px", "20px"]}
                       font={["MinXSubtitle16", "MinXSubtitle24", 'MinXSubtitle28']} color="MinXPrimaryTextAlt"
                       overrides={{
                           Block: {
                               props: {
                                   style: {textAlign: "center"}
                               }
                           },
                       }}
                >
                    There are different types of canopy tent to meet your special needs
                </Block>
                <MButton type="outline" height={["36px", "48px", "56px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Buy"
                         buttonStyle={{
                             borderColor: "white"
                         }}
                         endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}
                />
            </Block>
            <Section containerStyles={{maxWidth: process.env.maxWidth + "px !important"}}
                     title={"FABRIC FEATURE"}
                     content={
                         <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="20px" gridRowGap={["16px", "16px", "24px"]} justifyItems="center">
                             <BlockDisplay title="Safe Shade" content="The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade."
                                           src="/images/canopy-tent/tent_fabric.jpg"/>
                             <BlockDisplay title="Long-last Fabric" content="The 320 gsm, 500D polyester with PVC coating is durable even with abrasion and distortion."
                                           src="/images/canopy-tent/fabric_structure.jpg"/>
                             <BlockDisplay title="Unlimited Colors" content="There are 6 preset color to choose from and you can also custom any color you like."
                                           src="/images/canopy-tent/fabric_colors.jpg"
                                           button={() => (
                                               <MButton height="48px" font="MinXLabel16" text="Customize My Tent" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                                           )}
                             />
                         </Block>
                     }
            />
            <Section containerStyles={{maxWidth: process.env.maxWidth + "px !important"}}
                     upperContainerDirection={"column"}
                     title={"MANY SIZE OPTIONS"}
                     subtitle={"There are 8 size options for you to meet your needs in any occasions."}
                     subtitleButton={
                         <MButton marginTop="12px" height="48px" font="MinXLabel16" text="Buy Now" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                     }
                     content={
                         <TentSizeDisplay/>
                     }
            />
            <Section containerStyles={{maxWidth: process.env.maxWidth + "px !important"}}
                     title={"STRONG STRUCTURE"}
                     content={
                         <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]} gridColumnGap="16px" gridRowGap="16px"
                                overrides={{
                                    Block: {
                                        style: {textAlign: "center"},
                                    },
                                }}
                         >
                             <Block position="relative" display="flex" flexDirection="column" alignItems="center" height={["510px", "571px"]}
                                    paddingTop="40px" paddingRight="18px" paddingBottom={["40px", "12px"]} paddingLeft="18px"
                                    overflow="hidden" backgroundColor="MinXBackground"
                                    overrides={{
                                        Block: {
                                            style: {
                                                borderRadius: "32px"
                                            },
                                        },
                                    }}
                             >
                                 <Block marginBottom="16px" font={["MinXHeading28", "MinXHeading36"]} color="MinXPrimaryText">Built-in stability</Block>
                                 <Block maxWidth={["250px", "346px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                     The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade.
                                 </Block>
                                 <Block position="relative" display="flex" height={["259px", "307px", "307px", "331px"]} marginBottom="auto">
                                     <img src="/images/canopy-tent/built-in/connecting-poles.png" alt="Connecting Poles" height="100%" style={{objectFit: "contain", padding: "0 4px"}}/>
                                 </Block>
                                 <Block position="relative" display="flex" flexDirection="row" width="100%" height="74px">
                                     <img src="/images/canopy-tent/built-in/footpads.png" alt="Footpads" width="25%" style={{objectFit: "contain", padding: "0 4px"}}/>
                                     <img src="/images/canopy-tent/built-in/nuts-and-bolts.png" alt="Nuts and Bolts" width="25%" style={{objectFit: "contain", padding: "0 4px"}}/>
                                     <img src="/images/canopy-tent/built-in/bracket-connectors.png" alt="Bracket Connectors" width="25%" style={{objectFit: "contain", padding: "0 4px"}}/>
                                     <img src="/images/canopy-tent/built-in/pole-dimensions.png" alt="Pole Dimensions" width="25%" style={{objectFit: "contain", padding: "0 4px"}}/>
                                 </Block>
                             </Block>
                             <Block position="relative" display="flex" flexDirection="column" alignItems="center" height={["510px", "571px"]}
                                    paddingTop="40px" paddingRight="18px" paddingBottom={["24px", "24px", "0px"]} paddingLeft="18px"
                                    overflow="hidden" backgroundColor="MinXBackground"
                                    overrides={{
                                        Block: {
                                            style: {
                                                borderRadius: "32px"
                                            },
                                        },
                                    }}
                             >
                                 <Block marginBottom="16px" font={["MinXHeading28", "MinXHeading36"]} color="MinXPrimaryText">Strong Support</Block>
                                 <Block maxWidth={["250px", "346px"]} marginBottom={["20px", "24px", "14px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                     The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade.
                                 </Block>
                                 <Block width={["100%", "100%", "110%", "100%"]} height={["331px", "395px", "446px", "429px"]}>
                                     <BlockVideo src="/images/canopy-tent/strong_support.mp4" type="video/mp4" isSelected={true}/>
                                 </Block>
                             </Block>
                         </Block>
                     }
            />
            <Section containerStyles={{maxWidth: process.env.maxWidth + "px !important"}}
                     upperContainerDirection="column"
                     title={"EASY SET-UP"}
                     subtitle={"2 people can set up the tent in a few minutes by following these steps."}
                     content={
                         <>
                             <Block display={["block", "block", "none"]}>
                                 <Block display="flex" flexDirection="column" alignItems="center" paddingBottom={["36px", "60px"]} overflow="hidden" backgroundColor={"MinXBackground"}
                                        overrides={{
                                            Block: {
                                                props: {
                                                    className: "react-carousel react-carousel-small"
                                                },
                                            },
                                        }}
                                 >
                                     <Carousel showStatus={false} showThumbs={false} showArrows={false} showIndicators={true} swipeable={true}
                                               onChange={onChangeCarousel}
                                               renderItem={(item, props) => {
                                                   return (
                                                       <>
                                                           <Block position="relative" height={["320px", "509px"]} marginBottom={["16px", "32px"]} overflow="hidden">
                                                               <item.type {...item.props} {...props} />
                                                           </Block>
                                                           {props.isSelected ? (
                                                               <Block font={["MinXParagraph16", "MinXParagraph24"]} color="MinXPrimaryText">{getStepDesc(item.key)}</Block>
                                                           ) : null}
                                                       </>
                                                   );
                                               }}
                                               renderIndicator={(onClickHandler, isSelected, index, label) => {
                                                   if (isSelected) {
                                                       return (
                                                           <li style={{backgroundColor: "#fff", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
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
                                         <VideoSlide key={0} url="/images/canopy-tent/set-up-tent/step_1.mp4" step={1}/>
                                         <VideoSlide key={1} url="/images/canopy-tent/set-up-tent/step_2.mp4" step={2}/>
                                         <VideoSlide key={2} url="/images/canopy-tent/set-up-tent/step_3.mp4" step={3}/>
                                         <VideoSlide key={3} url="/images/canopy-tent/set-up-tent/step_4.mp4" step={4}/>
                                         <VideoSlide key={4} url="/images/canopy-tent/set-up-tent/step_5.mp4" step={5}/>
                                         <VideoSlide key={5} url="/images/canopy-tent/set-up-tent/step_6.mp4" step={6}/>
                                         <VideoSlide key={6} url="/images/canopy-tent/set-up-tent/step_7.mp4" step={7}/>
                                         <VideoSlide key={7} url="/images/canopy-tent/set-up-tent/step_8.mp4" step={8}/>
                                     </Carousel>
                                 </Block>
                             </Block>
                             <Block display={["none", "none", "block"]}>
                                 <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} centerMode centerSlidePercentage={65}
                                           onChange={(index) => onChangeCarousel(index + 8)}
                                           renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                               hasPrev && (
                                                   <Block position="absolute" width="17.5%" height={["320px", "509px"]} top={0} left={0}>
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
                                                   <Block position="absolute" width="17.5%" height={["320px", "509px"]} top={0} right={0}>
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
                                                   <div>
                                                       <Block position="relative" height={["320px", "509px"]} marginRight="10px" marginBottom="32px" marginLeft="10px" overflow="hidden"
                                                              overrides={{
                                                                  Block: {
                                                                      props: {
                                                                          className: "react-carousel"
                                                                      },
                                                                  },
                                                              }}
                                                       >
                                                           {props.isSelected ? null : <div className="react-carousel-dusk round"/>}
                                                           <item.type {...item.props} {...props} />
                                                       </Block>
                                                       {props.isSelected ? (
                                                           <Block font="MinXParagraph20" color="MinXPrimaryText">{getStepDesc(item.key)}</Block>
                                                       ) : null}
                                                   </div>
                                               );
                                           }}
                                 >
                                     <VideoSlide key={0} url="/images/canopy-tent/set-up-tent/step_1.mp4" step={9}/>
                                     <VideoSlide key={1} url="/images/canopy-tent/set-up-tent/step_2.mp4" step={10}/>
                                     <VideoSlide key={2} url="/images/canopy-tent/set-up-tent/step_3.mp4" step={11}/>
                                     <VideoSlide key={3} url="/images/canopy-tent/set-up-tent/step_4.mp4" step={12}/>
                                     <VideoSlide key={4} url="/images/canopy-tent/set-up-tent/step_5.mp4" step={13}/>
                                     <VideoSlide key={5} url="/images/canopy-tent/set-up-tent/step_6.mp4" step={14}/>
                                     <VideoSlide key={6} url="/images/canopy-tent/set-up-tent/step_7.mp4" step={15}/>
                                     <VideoSlide key={7} url="/images/canopy-tent/set-up-tent/step_8.mp4" step={16}/>
                                 </Carousel>
                             </Block>
                         </>
                     }
            />
            <Block maxWidth={process.env.maxWidth + "px !important"} marginRight="auto" marginLeft="auto">
                <Benefit/>
            </Block>
        </React.Fragment>
    );
}

Canopy_Tent.getInitialProps = (context) => {
    return {
        fullPage: true,
    };
};


export default withRouter(Canopy_Tent);
