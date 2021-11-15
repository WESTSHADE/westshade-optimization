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

import {Section} from "../../../components/sections"
import MButton from "../../../components/button-n";

const ImageSlide = ({url, alt}) => {
    return (
        <div className="react-player">
            <img src={url} alt={alt} width="100%" height="100%" style={{objectFit: "contain"}}/>
        </div>
    );
};

function Custom_Printing_Canopy_Tent({router, size}) {
    const refBanner = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const goBuyingPage = () => router.push({pathname: "/custom-printing-canopy-tent"});

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
                <meta name="description" content="Customize your canopy tent. Any style and Multiple size. Unlimited printing style for special events and campaigns. Configure your tents as you wish NOW!"/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <Block position="relative">
                    <Block ref={refBanner} height={["368px", "437px", "582px"]} display="grid" gridTemplateRows="repeat(2, min-content)" gridRowGap={["8px", "16px", "20px"]} justifyItems="center"
                           marginBottom="100px" padding={["32px 30px", "40px 30px", "64px 30px"]}
                           overrides={{
                               Block: {
                                   props: {
                                       className: "banner-display text-center"
                                   },
                                   style: {
                                       ":after": {background: "linear-gradient(95.25deg, rgba(241, 120, 182, 0.85) 0%, rgba(252, 221, 236, 0) 52.6%, rgba(241, 120, 182, 0.85) 100%), #FFEAF5;"}
                                   }
                               },
                           }}
                    >
                        <Block font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}>Customize It Your Way</Block>
                        <MButton type="outline" height={["36px", "48px", "56px"]} marginBottom={["32px", "48px", "60px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Create My Tent"
                                 buttonStyle={{borderColor: "white"}} $style={{zIndex: 1}} onClick={() => goBuyingPage()}
                        />
                        <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#5D5FEF", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                        <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#EF5DA8", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
                    </Block>
                    <Block position="absolute" width={["240px", "320px", "420px"]} height={["240px", "320px", "420px"]} marginRight="auto" marginLeft="auto" right={0} bottom={0} left={0}>
                        <Image src="images/custom-printing/canopy-tent/canopy-tent.png" alt="canopy tent" layout="fill" objectFit="contain" quality={100}/>
                    </Block>
                </Block>
                <Section title="ANY STYLE MULTIPLE SIZE"
                         subtitle="There is no limitation on printing styles and you can configure your tent as you wish. Westshade will meet your special needs."
                         content={
                             <Block position="relative">
                                 <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} infiniteLoop={true} centerMode centerSlidePercentage={46}
                                           renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                               hasPrev && (
                                                   <Block position="absolute" width={"17.5%"} height={"100%"} top={0} left={0}>
                                                       <Button shape={SHAPE.circle} kind={KIND.secondary} onClick={onClickHandler}
                                                               overrides={{
                                                                   BaseButton: {
                                                                       props: {
                                                                           className: "cursor react-carousel-arrow dark left",
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
                                                       <Button shape={SHAPE.circle} kind={KIND.secondary} onClick={onClickHandler}
                                                               overrides={{
                                                                   BaseButton: {
                                                                       props: {
                                                                           className: "cursor react-carousel-arrow dark right",
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
                         }
                />
                <Section title={<>DESIGNED FOR<br/>YOUR SPECIAL<br/>EVENTS</>}
                         subtitle="Westshade provides free mockup service and we’ll help you to make you special and stand out in important events."
                         content={
                             <Block position="relative" width="100%" height={["187px", "268px", "538px"]}>
                                 <Image src="images/custom-printing/canopy-tent/event.jpg" alt="custom printing event" layout="fill" objectFit="cover" objectPosition="bottom" quality={100}/>
                             </Block>
                         }
                />
                <Section title={<>CUSTOMERS'<br/>SHOW</>}
                         subtitle="Our customers love the tents they created with us. Check them out!"
                         content={
                             <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["16px", "16px", "20px"]} justifyItems="center">
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="images/custom-printing/canopy-tent/customer1.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="images/custom-printing/canopy-tent/customer2.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="images/custom-printing/canopy-tent/customer3.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="images/custom-printing/canopy-tent/customer4.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="images/custom-printing/canopy-tent/customer5.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="images/custom-printing/canopy-tent/customer6.jpg" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                             </Block>
                         }
                />
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Custom_Printing_Canopy_Tent);
