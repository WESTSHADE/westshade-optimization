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

const BlockVideo = ({src, isSelected, step}) => {
    const refBlockVideo = useRef(null);

    if (step && step > 0) refs[step - 1] = refBlockVideo;

    const handleScroll = (x) => {
        if (refBlockVideo.current) {
            const box = refBlockVideo.current.children[0].children[0];
            const rect = refBlockVideo.current.children[0].getBoundingClientRect();

            if (box) {
                box.muted = true; // without this line it's not working although I have "muted" in HTML
            }

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
            <ReactPlayer className="react-player" width="100%" height="100%" url={src} playsinline loop
                         config={{
                             file: {
                                 attributes: {
                                     crossOrigin: "anonymous",
                                     controlsList: "nofullscreen",
                                 },
                             },
                         }}/>
        </div>
    )
};

const VideoSlide = ({url, isSelected, step}) => {
    return (
        <div className="react-player">
            <BlockVideo src={url} type="video/mp4" isSelected={isSelected} step={step}/>
        </div>
    );
};

const BlockDisplay = ({title, content, src, button}) => {
    return (
        <Block width="100%" height={["228px", "448px", "520px"]} display="grid" gridTemplateRows="repeat(3, min-content)" gridRowGap={["8px", "16px"]} justifyContent="center"
               paddingTop={["30px", "40px", "50px", "60px"]} paddingRight="18px" paddingLeft="18px"
               overrides={{
                   Block: {
                       props: {
                           className: "banner-display section-round-corner text-center"
                       },
                       style: {
                           ":after": {background: "url(" + src + ")"},
                       }
                   },
               }}
        >
            <Block font={["MinXHeading24", "MinXHeading36"]} color="MinXPrimaryTextAlt">{title}</Block>
            <Block maxWidth={["250px", "346px"]} font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph20"]} color="MinXPrimaryTextAlt">{content}</Block>
            {button ? button() : null}
        </Block>
    );
};

const Spec_Section = ({title, content, unit, titleSize = ["MinXSubtitle14", "MinXSubtitle18"], contentSize = ["MinXTitle32", "MinXTitle36"], unitSize = ["MinXSubtitle14", "MinXSubtitle16"], titleColor, contentColor}) => {
    return (
        <Block display="grid" gridAutoRows="max-content" gridRowGap="16px" justifyItems="center" axnWidth="80px">
            <Block font={titleSize} color={titleColor} $style={{fontWeight: "400 !important", lineHeight: "100% !important"}}>{title}</Block>
            <Block>
                <Block font={contentSize} color={contentColor} $style={{fontWeight: "300 !important", lineHeight: "100% !important"}}>{content}</Block>
                {unit ? (
                    <Block font={unitSize} color={titleColor} $style={{fontWeight: "400 !important", lineHeight: "100% !important"}}>{unit}</Block>
                ) : null}
            </Block>
        </Block>
    )
}


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
            <SubHeaderBar title="Canopy Tent" subTitle="Spec" subTitleDestination="/canopy-tent/spec" buttonText="Buy Now" onClick={() => goBuyingPage()}/>
            {/* 主要显示区域 */}
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]}>
                <Block>
                    <Block height={["456px", "780px"]} display="grid" gridAutoRows="max-content" gridRowGap="8px" justifyItems="center" padding={["102px 30px 0", "98px 30px 0"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "banner-display text-center"
                                   },
                                   style: {
                                       ":after": {background: "url('/images/canopy-tent/canopy-tent-hero-display.webp')"},
                                   }
                               }
                           }}
                    >
                        <Block font={["MinXSubtitle16", "MinXSubtitle18"]} color="#AFFA64" $style={{fontWeight: "300 !important"}}>WESTSHADE</Block>
                        <Block marginBottom="8px" font={["MinXTitle42", "MinXTitle74"]} color="MinXPrimaryTextAlt" $style={{fontWeight: "300 !important"}}>Canopy Tent</Block>
                        <Block marginBottom="8px" font={["MinXSubtitle16", "MinXSubtitle20"]} color="MinXPrimaryTextAlt" $style={{fontStyle: "italic"}}>Protect you and your family with our best.</Block>
                        <MButton width={["194px", "202px"]} height={["48px", "52px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Buy Now" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                    </Block>
                    <Block className="text-center" position="relative" width="100%" padding={["0 16px", "0 20px"]} display={["grid", "flex"]} flexDirection={[null, "column"]} gridRowGap="12px" justifyContent={["space-between"]}
                           gridTemplateColumns={["1fr", ""]}>
                        <Block width="100%" height={["136px", "160px"]} maxWidth="390px" display="flex" flexDirection="row" justifyContent="space-evenly" alignItems="center" backgroundColor="#595957 !important" className="glassmorphism"
                               $style={{borderRadius: "8px"}} marginRight="auto" marginLeft="auto" marginTop={["-68px", "-420px"]} marginBottom={[null, "168px"]}
                        >
                            <Spec_Section title="Stand in wind*" content="50" unit="mph" titleColor="MinXPrimaryTextAlt" contentColor="#AFFA64" contentSize={["MinXTitle42", "MinXTitle52"]}/>
                            <Spec_Section title="UV protection" content="50+" unit="mph" titleColor="MinXPrimaryTextAlt" contentColor="#AFFA64" contentSize={["MinXTitle42", "MinXTitle52"]}/>
                        </Block>
                        <Block width="100%" maxWidth="1015px" display="grid" gridTemplateRows={["repeat(2, auto)", "none"]} gridTemplateColumns={["1fr", "auto auto"]} gridRowGap="12px" marginRight="auto" marginLeft="auto"
                               className="container-canopy-tent-spec canopy-tent-spec-display-outer"
                        >
                            <Block width="100%" height={["136px", "158px"]} display="flex" alignItems="center" className="container-canopy-tent-spec canopy-tent-spec-display-inner">
                                <Block width="inherit" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-around">
                                    <Spec_Section title="Set up in" content="3" unit="min." titleColor="MinXSecondaryText" contentColor="MinXPrimaryText"/>
                                    <Spec_Section title="Pole diameter*" content="2 ¼" unit="inches" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText"/>
                                    <Spec_Section title="Pole thickness*" content="0.07" unit="inches" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText"/>
                                </Block>
                            </Block>

                            <Block width="100%" height={["136px", "158px"]} display="flex" alignItems="center" className="container-canopy-tent-spec canopy-tent-spec-display-inner">
                                <Block width="inherit" display="flex" flexDirection="row" alignItems="flex-start" justifyContent="space-around">
                                    <Spec_Section title="Roof top*" content="600D" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText"/>
                                    <Spec_Section title="Warranty*" content="10" unit="years" titleColor="MinXSecondaryText" contentColor="MinXPrimaryText"/>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Section title="FABRIC FEATURE"
                         content={
                             <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="20px" gridRowGap={["16px", "16px", "24px"]} justifyItems="center">
                                 <BlockDisplay title="Safe Shade" content="The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade."
                                               src="/images/canopy-tent/tent_fabric.webp"/>
                                 <BlockDisplay title="Long-lasting Fabric" content="The 320 gsm, 500D polyester with PVC coating is durable even with abrasion and distortion."
                                               src="/images/canopy-tent/fabric_structure.webp"/>
                                 <BlockDisplay title="Unlimited Colors" content="There are 6 preset color to choose from and you can also custom any color you like."
                                               src="/images/canopy-tent/fabric_colors.webp"
                                               button={() => (
                                                   <MButton height="48px" font="MinXLabel16" text="Customize My Tent" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                                               )}
                                 />
                             </Block>
                         }
                />
                <Section upperContainerDirection="column"
                         title="MANY SIZE OPTIONS"
                         subtitle="There are 8 size options for you to meet your needs in any occasions."
                         subtitleButton={
                             <MButton marginTop="12px" height="48px" font="MinXLabel16" text="Buy Now" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                         }
                         content={
                             <TentSizeDisplay/>
                         }
                />
                <Section title="STRONG STRUCTURE"
                         content={
                             <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap="16px" gridRowGap="16px" className="text-center">
                                 <Block position="relative" display="flex" flexDirection="column" alignItems="center" height={["510px", "571px"]} padding={["40px 18px", "40px 18px 12px"]} backgroundColor="MinXBackground"
                                        overrides={{
                                            Block: {
                                                props: {
                                                    className: "section-round-corner"
                                                }
                                            }
                                        }}
                                 >
                                     <Block marginBottom="16px" font={["MinXHeading28", "MinXHeading36"]} color="MinXPrimaryText">Built-in stability</Block>
                                     <Block maxWidth={["250px", "346px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                         The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade.
                                     </Block>
                                     <Block position="relative" display="flex" width="100%" height={["259px", "307px", "307px", "331px"]} marginBottom="auto" padding="0 4px">
                                         <Image src="/images/canopy-tent/built-in/connecting-poles.webp" alt="Connecting Poles" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     <Block position="relative" display="inline-flex" width="100%" justifyContent="space-between" $style={{gap: "8px"}}>
                                         <Image src="/images/canopy-tent/built-in/footpads.webp" alt="Footpads" layout="fixed" width="100%" height="74px" objectFit="contain" quality={100}/>
                                         <Image src="/images/canopy-tent/built-in/nuts-and-bolts.webp" alt="Nuts and Bolts" layout="fixed" width="100%" height="74px" objectFit="contain" quality={100}/>
                                         <Image src="/images/canopy-tent/built-in/bracket-connectors.webp" alt="Bracket Connectors" layout="fixed" width="100%" height="74px" objectFit="contain" quality={100}/>
                                         <Image src="/images/canopy-tent/built-in/pole-dimensions.webp" alt="Pole Dimensions" layout="fixed" width="100%" height="74px" objectFit="contain" quality={100}/>
                                     </Block>
                                 </Block>
                                 <Block position="relative" display="flex" flexDirection="column" alignItems="center" height={["510px", "571px"]} padding={["40px 18px 24px", "", "40px 18px 0px"]} backgroundColor="MinXBackground"
                                        overrides={{
                                            Block: {
                                                props: {
                                                    className: "section-round-corner"
                                                }
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
                <Section upperContainerDirection="column"
                         title="EASY SET-UP"
                         subtitle="2 people can set up the tent in a few minutes by following these steps."
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
                                         <Carousel showStatus={false} showThumbs={false} showArrows={false} showIndicators={true} swipeable={true} emulateTouch={true}
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
                                                               />
                                                           );
                                                       }
                                                       return (
                                                           <li key={index} style={{backgroundColor: "#C4C4C4", width: 20, height: 4, display: "inline-block", margin: "0 4px"}}
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
                <Benefit containerClassName="m-body-section-wrap"/>
            </Block>
        </React.Fragment>
    )
        ;
}

Canopy_Tent.getInitialProps = (context) => {
    return {
        fullPage: true,
    };
};


export default withRouter(Canopy_Tent);
