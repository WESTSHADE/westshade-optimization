import React from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox} from "baseui/aspect-ratio-box";
import {ArrowLeft, ArrowRight} from "baseui/icon";

import Button from "Components/button-n";
import {CanopyTentV1 as Hero} from "Components/Hero/CustomPrinting";
import {ThemeV1 as ThemeProvider} from "Components/ThemeProvider";
import {Section, Benefit, FreeMockupForm} from "Components/sections"

const ImageSlide = ({url, alt}) => {
    return (
        <AspectRatioBox width="inherit">
            <Image src={url} alt={alt} layout="fill" objectFit="contain"/>
        </AspectRatioBox>
    );
};

function Custom_Printing_Canopy_Tent({router, size}) {
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

    return (
        <ThemeProvider>
            <Head>
                <title>Custom Printing Canopy Tent - WESTSHADE</title>
                <meta name="description" content="Customize your canopy tent. Any style and Multiple size. Unlimited printing style for special events and campaigns. Configure your tents as you wish NOW!"/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]}>
                <Hero size={size}/>
                <Section title="ANY STYLE MULTIPLE SIZE"
                         subtitle="There is no limitation on printing styles and you can configure your tent as you wish. Westshade will meet your special needs."
                         content={
                             <Block position="relative">
                                 <Carousel showStatus={false} showThumbs={false} showArrows={true} showIndicators={false} infiniteLoop={true} centerMode centerSlidePercentage={46}
                                           renderArrowPrev={(onClickHandler, hasPrev, label) =>
                                               hasPrev && (
                                                   <Block position="absolute" width={"17.5%"} height={"100%"} top={0} left={0}>
                                                       <Button shape="circle" buttonClassName="cursor react-carousel-arrow dark left" bundle="gray" onClick={onClickHandler}>
                                                           <ArrowLeft size={28} color={"white"}/>
                                                       </Button>
                                                   </Block>
                                               )
                                           }
                                           renderArrowNext={(onClickHandler, hasNext, label) =>
                                               hasNext && (
                                                   <Block position="absolute" width={"17.5%"} height={"100%"} top={0} right={0}>
                                                       <Button shape="circle" buttonClassName={"cursor react-carousel-arrow dark right"} bundle="gray" onClick={onClickHandler}>
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
                                                       {props.isSelected ? (<Block font={["MinXParagraph12", "MinXParagraph14"]} color="MinXSecondaryText" $style={{zIndex: 1}}>{getSizeDesc(item.key)}</Block>) : <Block height="40px"/>}
                                                   </Block>
                                               );
                                           }}
                                 >
                                     <ImageSlide key={0} url="/images/custom-printing/canopy-tent/any_style1.webp" alt="canopy tent"/>
                                     <ImageSlide key={1} url="/images/custom-printing/canopy-tent/any_style2.webp" alt="canopy tent"/>
                                     <ImageSlide key={2} url="/images/custom-printing/canopy-tent/any_style3.webp" alt="canopy tent"/>
                                     <ImageSlide key={3} url="/images/custom-printing/canopy-tent/any_style4.webp" alt="canopy tent"/>
                                     <ImageSlide key={4} url="/images/custom-printing/canopy-tent/any_style5.webp" alt="canopy tent"/>
                                     <ImageSlide key={5} url="/images/custom-printing/canopy-tent/any_style6.webp" alt="canopy tent"/>
                                 </Carousel>
                             </Block>
                         }
                />
                <Section title={<>DESIGNED FOR<br/>YOUR SPECIAL<br/>EVENTS</>}
                         subtitle={<>Westshade provides free mockup service and we&apos;ll help you to make you special and stand out in important events.</>}
                         content={
                             <Block position="relative" width="100%" height={["187px", "268px", "538px"]}>
                                 <Image src="/images/custom-printing/canopy-tent/event.webp" alt="custom printing event" layout="fill" objectFit="cover" objectPosition="bottom" quality={100}/>
                             </Block>
                         }
                />
                <Section title={<>CUSTOMERS&apos;<br/>SHOW</>}
                         subtitle="Our customers love the tents they created with us. Check them out!"
                         content={
                             <Block display="grid" gridTemplateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["16px", "16px", "20px"]} justifyItems="center">
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="/images/custom-printing/canopy-tent/customer1.webp" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="/images/custom-printing/canopy-tent/customer2.webp" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="/images/custom-printing/canopy-tent/customer3.webp" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="/images/custom-printing/canopy-tent/customer4.webp" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="/images/custom-printing/canopy-tent/customer5.webp" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                                 <Block position="relative" width="100%" height={["154px", "154px", "216px"]}>
                                     <Image src="/images/custom-printing/canopy-tent/customer6.webp" alt="customer photo" layout="fill" objectFit="cover" quality={100}/>
                                 </Block>
                             </Block>
                         }
                />
                <Section upperContainerDirection="column"
                         title="Get a free mockup"
                         subtitle="Not sure about what it will look like? Just fill out the form and our graphic team will make a free mockup for you."
                         content={<FreeMockupForm/>}
                         containerClassName="m-wrap-side-full"
                         upperContainerProps={{marginBottom: ["32px", "32px", "40px"], padding: ["0 16px", "0 32px",]}}
                         subtitleStyles={{maxWidth: "unset !important"}}
                />
                <Benefit containerClassName="m-body-section-wrap"/>
            </Block>
        </ThemeProvider>
    )
}

export default withRouter(Custom_Printing_Canopy_Tent);
