import React, {useEffect, useRef, useCallback} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {ChevronRight, ArrowLeft, ArrowRight} from "baseui/icon";

import Button from "Components/Button/V1";
import Hero from "Components/Hero/CanopyTent";
import {Benefit, TentSizeDisplay, Section, SubHeaderBar} from "Components/Sections";

const refs = [];

const BlockVideo = ({src, isSelected, step}) => {
    const refBlockVideo = useRef(null);

    if (step && step > 0) refs[step - 1] = refBlockVideo;

    const handleScroll = useCallback(() => {
        if (refBlockVideo.current) {
            const box = refBlockVideo.current.children[0].children[0];
            const rect = refBlockVideo.current.children[0].getBoundingClientRect();

            if (box) {
                box.muted = true; // without this line it's not working, so I have "muted" in HTML

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
        }
    }, [isSelected])

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("scroll", handleScroll);
        }
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <div ref={refBlockVideo} style={{height: "100%"}}>
            <ReactPlayer className="react-player" width="100%" height="100%" url={process.env.imageBaseUrl + src} playsinline loop
                         config={{
                             file: {
                                 attributes: {
                                     // crossOrigin: "anonymous",
                                     controlsList: "nofullscreen",
                                 },
                             },
                         }}
            />
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
                           ":after": {background: `url(${process.env.imageBaseUrl}${src})`},
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

function Canopy_Tent({router, size}) {
    const goBuyingPage = () => router.push("/products/canopy-tent", "/products/canopy-tent/buy");

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
            <SubHeaderBar size={size} title="Canopy Tent" subTitle="Spec" subTitleDestination="/canopy-tent/spec" buttonText="Buy Now" onClick={() => goBuyingPage()}/>
            {/* 主要显示区域 */}
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]}>
                <Hero.V1/>
                <Section title="FABRIC FEATURE"
                         content={
                             <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="20px" gridRowGap={["16px", null, "24px"]} justifyItems="center">
                                 <BlockDisplay title="Safe Shade" content="The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade." src="/images/canopy-tent/tent_fabric.webp"/>
                                 <BlockDisplay title="Long-lasting Fabric" content="The 320 gsm, 500D polyester with PVC coating is durable even with abrasion and distortion." src="/images/canopy-tent/fabric_structure.webp"/>
                                 <BlockDisplay title="Unlimited Colors" content="There are 6 preset color to choose from and you can also custom any color you like." src="/images/canopy-tent/fabric_colors.webp"
                                               button={() => <Button height="48px" font="MinXLabel16" text="Customize My Tent" bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>}
                                 />
                             </Block>
                         }
                />
                <Section upperContainerDirection="column"
                         title="MANY SIZE OPTIONS"
                         subtitle="There are 8 size options for you to meet your needs in any occasions."
                         subtitleButton={
                             <Button marginTop="12px" height="48px" font="MinXLabel16" text="Buy Now" bundle="primary" endEnhancer={() => <ChevronRight size={24}/>} onClick={() => goBuyingPage()}/>
                         }
                         content={
                             <TentSizeDisplay/>
                         }
                />
                <Section title="STRONG STRUCTURE"
                         content={
                             <Block className="text-center" display="grid" gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridColumnGap="16px" gridRowGap="16px">
                                 <Block className="section-round-corner" position="relative" display="flex" flexDirection="column" alignItems="center" height={["510px", "571px"]} padding={["40px 18px", "40px 18px 12px"]}
                                        backgroundColor="MinXBackground" $style={{gap: "16px"}}>
                                     <Block font={["MinXHeading28", "MinXHeading36"]} color="MinXPrimaryText">Built-in stability</Block>
                                     <Block maxWidth={["250px", "346px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                         The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade.
                                     </Block>
                                     <Block display="flex" flex={1} position="relative" width="100%" padding="0 4px">
                                         <Image src="/images/canopy-tent/built-in/connecting-poles.webp" alt="Connecting Poles" layout="fill" objectFit="contain"/>
                                     </Block>
                                     <Block position="relative" display="inline-flex" width="100%" height="74px" justifyContent="space-between" $style={{gap: "8px"}}>
                                         <Image src="/images/canopy-tent/built-in/footpads.webp" alt="Footpads" layout="intrinsic" width="100%" height="74px" objectFit="contain"/>
                                         <Image src="/images/canopy-tent/built-in/nuts-and-bolts.webp" alt="Nuts and Bolts" layout="intrinsic" width="100%" height="74px" objectFit="contain"/>
                                         <Image src="/images/canopy-tent/built-in/bracket-connectors.webp" alt="Bracket Connectors" layout="intrinsic" width="100%" height="74px" objectFit="contain"/>
                                         <Image src="/images/canopy-tent/built-in/pole-dimensions.webp" alt="Pole Dimensions" layout="intrinsic" width="100%" height="74px" objectFit="contain"/>
                                     </Block>
                                 </Block>
                                 <Block className="section-round-corner" position="relative" display="flex" flexDirection="column" alignItems="center" height={["510px", "571px"]} backgroundColor="MinXBackground"
                                        $style={{border: "1px solid #F7F7F7"}}>
                                     <Block display="flex" flexDirection="column" marginBottom="16px" padding="40px 18px 0" $style={{gap: "16px"}}>
                                         <Block font={["MinXHeading28", "MinXHeading36"]} color="MinXPrimaryText">Strong Support</Block>
                                         <Block maxWidth={["250px", "346px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                             The CPAI-84 certified material is resistant of UV, water, fire, and wind, providing a safe shade.
                                         </Block>
                                     </Block>
                                     <Block flex={1} width="100%">
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
                                                           <Button shape="circle" buttonClassName="cursor react-carousel-arrow left" bundle="gray" onClick={onClickHandler}>
                                                               <ArrowLeft size={28} color={"white"}/>
                                                           </Button>
                                                       </Block>
                                                   )
                                               }
                                               renderArrowNext={(onClickHandler, hasNext, label) =>
                                                   hasNext && (
                                                       <Block position="absolute" width="17.5%" height={["320px", "509px"]} top={0} right={0}>
                                                           <Button shape="circle" buttonClassName="cursor react-carousel-arrow right" bundle="gray" onClick={onClickHandler}>
                                                               <ArrowRight size={28} color={"white"}/>
                                                           </Button>
                                                       </Block>
                                                   )
                                               }
                                               renderItem={(item, props) => {
                                                   return (
                                                       <div>
                                                           <Block className="react-carousel" position="relative" height={["320px", "509px"]} marginRight="10px" marginBottom="32px" marginLeft="10px" overflow="hidden">
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
                <Block className="section-full-width" backgroundColor="#F7F7F7">
                    <Benefit.V2 as="section"/>
                </Block>
                <Block className="section-full-width" backgroundColor="#F7F7F7" paddingRight={["16px", null, "20px"]} paddingLeft={["16px", null, "20px"]} display="flex" justifyContent="center"
                       marginTop={["-60px", "-80px", "-120px"]}>
                    <Block width="100%" maxWidth={process.env.maxWidth + "px"} font="MinXParagraph14" color="MinXSecondaryText" paddingTop="24px" paddingBottom="24px" $style={{borderBottom: "1px solid #D9D9D9"}}>
                        <div>1. Although the tent has passed wind test in the speed of 50 mph, we highly recommend you to not use the product in high wind.</div>
                        <div>2. The pole diameter and thickness are measurements from Westshade Y7 aluminum frame canopy tent.</div>
                        <div>3. Westshade uses 900D fabric for roof top on custom printing canopy tents. The fabric of stock color tents is 500D.</div>
                        <div>4. Westshade provides 10 years warranty for Y7 aluminum frame.</div>
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Canopy_Tent);
