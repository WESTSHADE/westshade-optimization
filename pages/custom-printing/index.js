import React, {useEffect, useRef, useState} from "react";
import ReactPlayer from "react-player";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {ChevronDown, ChevronLeft, ChevronRight} from "baseui/icon";
import {AspectRatioBox, AspectRatioBoxBody} from "baseui/aspect-ratio-box";

import ThemeProvider from "Components/ThemeProvider";
import {CustomPrinting as Hero} from "Components/Hero/CustomPrinting";
import {Benefit, FreeMockupForm, Section, SectionTitle, PrintingTechnologyComparison, PrintingTechnologySample} from "Components/Sections";
import Button from "Components/Button"

const tentParts = [{
    name: "Peak",
    label: "TENT ROOF",
    image: "/images/custom-promotion/roof-peak.webp"
}, {
    name: "Valance",
    label: "TENT ROOF",
    image: "/images/custom-promotion/roof-valance.webp"
}, {
    name: "Side Wall",
    label: "TENT ACCESSORY",
    image: "/images/custom-promotion/side-wall.webp"
}];

const customPrints = [{
    image: "/images/custom-promotion/custom-printed-umbrella.webp",
    name: "Custom Printed Umbrellas",
    availability: "5 ranges available"
}, {
    image: "/images/custom-promotion/custom-printed-table-cover.webp",
    name: "Custom Printed Table Covers",
    availability: "2 types available"
}];

const canopyFeatures = [{
    order: "01",
    title: "50+ UPF",
    content: "Westshade canopies provide up to 98% UV block and 50+ UPF. Our unique polyester fabric allows warm air to escape, keeping you cool on hot and sunny days."
}, {
    order: "02",
    title: "Water resistant",
    content: "Our waterproof pop tents are designed to offer the ideal coverage and protection needed for all your events."
}, {
    order: "03",
    title: "Fire retardant",
    content: "Our canopies are certified under the California State Fire Marshal. Each fire retardant canopy is specially treated and complies with all NFPA 701 and CPAI-84."
}];

const mockupProcess = [{
    order: "01",
    title: "Pick the product",
    content: "Decide on the size and range of the product that you want and our customer service team will be more than happy to help you!"
}, {
    order: "02",
    title: "Upload your artwork",
    content: "You can upload through our website or give us a call! If you don't have an artwork, don't worry! Our designers are here to help you every step of the way!"
}, {
    order: "03",
    title: "Confirm the design",
    content: "We will send you a mockup and make sure you are happy with it. The production will begin after your confirmation of the design."
}, {
    order: "04",
    title: "Delivery",
    content: "The production and delivery process takes about 5-10 business days. If you have any questions regarding your order please call us."
}];

const testimonies = [{
    rating: 5,
    owner: "Tom McLeod",
    message: "Everything arrived quickly. The quality exceeded expectations. I love how Westshade customer service went above and beyond with helping me place my order. It was a great purchase and met the needs of our organization entirely. I highly recommend them! "
}, {
    rating: 5,
    owner: "Samantha Vogel",
    message: "We absolutely love how the pop-up tents and the graphics turned out. Our first night though there was some unexpected wind that occurred but our tent was strong enough to withstand the wind! We also bought some sandbags as well just in case weather conditions get worse."
}, {
    rating: 5,
    owner: "Jessica Chao",
    message: "The logo on our 10x10 tents looks fantastic. How easy it is to put up is incredible. The roller bag and weights were great additions. Very pleased with the investment."
}];

function Custom_Printing() {
    const ptComparisonRef = useRef(null);
    const mockupRef = useRef(null);

    const [showComparison, setShowComparison] = useState(false);
    const [ptComparisonStyle, setPtComparisonStyle] = useState({visibility: "hidden", opacity: 0});

    const goToFreeMockup = () => {
        if (window) window.scrollTo({top: mockupRef.current.offsetTop, behavior: 'smooth'});
    };

    useEffect(() => {
        if (ptComparisonRef.current) {
            if (showComparison) {
                setTimeout(() => setPtComparisonStyle({visibility: "visible", opacity: 1}), 120);
            } else {
                setPtComparisonStyle({visibility: "hidden", opacity: 0});
            }
        }
    }, [showComparison, ptComparisonRef]);

    return (
        <ThemeProvider.V2>
            <Head>
                <title>Custom Printing - WESTSHADE</title>
                <meta name="description" content="Print your canopy and make it unique! All occasions. Choose from Dye Sublimation and UV Printing."/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["32px", null, "96px"]} paddingTop={["16px", null, "32px"]}>
                <Hero.V1/>
                <Section upperContainerProps={{hidden: true}}
                         containerProps={{maxWidth: ["467px", null, "840px"]}}
                         content={
                             <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "840px"]} margin="auto">
                                 <SectionTitle.V2 category="printing technology" title="high fidelity & resolution"
                                                  content="Westshade only prints high-fidelity and high-resolution pieces. You can find the one meet your needs and budgets from two printing technologies - Dye Sublimation or UV Printing."/>
                                 <Block className="text-center">
                                     <Block font={["MinXTitle20", "MinXTitle20", "MinXTitle32"]} $style={{fontWeight: "500 !important", lineHeight: "1 !important"}}>Check out real samples below</Block>
                                     <PrintingTechnologySample/>
                                 </Block>
                                 <Block display="grid" gridRowGap={["24px", null, "32px"]} justifyItems="center">
                                     <Button.V1 bundle="primary" width="287px" height="56px" font="MinXLabel14" text="More comparisons"
                                                iconStyle={{transitionProperty: "all", transitionDuration: "300ms", transform: showComparison ? "rotate(180deg)" : "rotate(0deg)"}}
                                                endEnhancer={() => (<ChevronDown size={24}/>)} onClick={() => setShowComparison(!showComparison)}
                                     />
                                     <Block height={showComparison ? ptComparisonRef.current.clientHeight + "px" : 0} $style={{transitionProperty: "all", transitionDuration: "300ms", ...ptComparisonStyle}}>
                                         <Block ref={ptComparisonRef}>
                                             <PrintingTechnologyComparison/>
                                         </Block>
                                     </Block>
                                 </Block>
                             </Block>
                         }
                />
                <Block className="section-full-width" backgroundColor="#F7F7F7">
                    <Benefit.V2 as="section"/>
                </Block>
                <Section upperContainerProps={{hidden: true}}
                         containerProps={{maxWidth: ["467px", null, "840px"]}}
                         content={
                             <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "840px"]} margin="auto">
                                 <SectionTitle.V2 category="service"
                                                  title={
                                                      <>
                                                          print any <Block as="span" backgroundImage="linear-gradient(90deg, #FFC700 0%, #FF00C7 100%);"
                                                                           $style={{"-webkit-text-fill-color": "transparent", "-webkit-background-clip": "text"}}>colors</Block>
                                                      </>
                                                  }
                                                  content="You can print a variety of colors, styles or any combination. The possibilities are endless! Our professional designers will help bring your ideas to life! Check out the examples in the video below."
                                                  button={<Button.V1 bundle="primary" width="287px" height="56px" font="MinXLabel14" text="GET A FREE MOCKUP" onClick={goToFreeMockup}/>}
                                 />
                                 <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", null, "22px"]}>
                                     <Block width="100%" overflow="hidden" $style={{borderRadius: "16px", aspectRatio: 2}}>
                                         <ReactPlayer width="100%" height="100%" light={process.env.imageBaseUrl + "/images/custom-promotion/video-thumb.webp"} url="https://www.youtube.com/watch?v=ud5m8ET8sE8"
                                                      playIcon={
                                                          <AspectRatioBox aspectRatio={7 / 5} width={["60px", null, "140px"]} margin="auto">
                                                              <AspectRatioBoxBody as={Image} src="/images/icon/icon-play-video.png" alt="icon-play-video" layout="fill" objectFit="contain"/>
                                                          </AspectRatioBox>
                                                      }
                                         />
                                     </Block>
                                     <Block display="grid" gridTemplateColumns="repeat(3, 1fr)" gridColumnGap={["16px", null, "22px"]}>
                                         {tentParts.map((tent) => (
                                             <Block key={tent.name}>
                                                 <AspectRatioBox aspectRatio={265 / 198} width="100%">
                                                     <AspectRatioBoxBody as={Image} src={tent.image} alt={tent.name} layout="fill" objectFit="contain"/>
                                                 </AspectRatioBox>
                                                 <Block padding={["8px", null, "24px"]}>
                                                     <Block as="p" display={["none", null, "block"]} font="MinXLabel14" color="MinXSecondaryText" $style={{lineHeight: 1}}>{tent.label.toUpperCase()}</Block>
                                                     <Block as="h3" marginTop="4px" color="MinXTitle" font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} $style={{lineHeight: 1}}>{tent.name}</Block>
                                                 </Block>
                                             </Block>
                                         ))}
                                     </Block>
                                 </Block>
                             </Block>
                         }
                />
                <Block className="section-full-width" backgroundColor="#F7F7F7">
                    <Section upperContainerProps={{hidden: true}}
                             containerProps={{maxWidth: ["467px", null, "840px"]}}
                             content={
                                 <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "1272px"]} margin="auto" paddingTop={["32px", null, "96px"]} paddingBottom={["32px", null, "96px"]}>
                                     <SectionTitle.V2 category="service"
                                                      title={
                                                          <>
                                                              Print <Block as="span" backgroundImage="linear-gradient(90deg, #FFC700 0%, #FF00C7 100%);"
                                                                           $style={{"-webkit-text-fill-color": "transparent", "-webkit-background-clip": "text"}}>Umbrellas</Block>
                                                          </>
                                                      }
                                                      content="We print great quality on umbrellas and also table covers."
                                                      button={<Button.V1 bundle="primary" width="287px" height="56px" font="MinXLabel14" text="GET A FREE MOCKUP" onClick={goToFreeMockup}/>}
                                     />
                                     <Block display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap={["16px", null, "22px"]}>
                                         {customPrints.map((print) => (
                                             <Block key={print.name}>
                                                 <AspectRatioBox aspectRatio={498 / 381} width="100%" style={{borderRadius: "16px", overflow: "hidden"}}>
                                                     <AspectRatioBoxBody as={Image} src={print.image} alt={print.name} layout="fill" objectFit="contain"/>
                                                 </AspectRatioBox>
                                                 <Block padding={["8px", null, "24px"]}>
                                                     <Block as="h3" color="MinXTitle" font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} $style={{lineHeight: 1}}>{print.name}</Block>
                                                     <Block as="p" marginTop="4px" font="MinXLabel14" color="MinXSecondaryText" $style={{lineHeight: 1}}>{print.availability}</Block>
                                                 </Block>
                                             </Block>
                                         ))}
                                     </Block>
                                 </Block>
                             }
                    />
                </Block>
                <Section upperContainerProps={{hidden: true}}
                         containerProps={{maxWidth: ["467px", null, "840px"]}}
                         content={
                             <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "1272px"]} margin="auto">
                                 <SectionTitle.V2 category="CAUGHT IN THE WILD" title="Reliable For Any Occasion"
                                                  content="The reliability of Westshade lies on our professional design, heavy-duty fabric, and state of the art printing technology. We provide satisfactory service for various kinds of customers. From individual use to corporate business usage. You can always count on us!"
                                 />
                                 <Block>
                                     <Block overflow="hidden" $style={{borderRadius: "16px"}}>
                                         <Carousel showArrows={true} showStatus={false} showThumbs={false} showIndicators={true} emulateTouch width="100%"
                                                   renderArrowPrev={(onClickHandler, hasPrev) =>
                                                       hasPrev && (
                                                           <Block position="absolute" width="17.5%" height="100%" top={0} left={0}>
                                                               <Button.V1 shape="circle" buttonClassName="cursor react-carousel-arrow dark left" bundle="gray" onClick={onClickHandler}>
                                                                   <ChevronLeft size={28}/>
                                                               </Button.V1>
                                                           </Block>
                                                       )
                                                   }
                                                   renderArrowNext={(onClickHandler, hasNext) =>
                                                       hasNext && (
                                                           <Block position="absolute" width="17.5%" height="100%" top={0} right={0}>
                                                               <Button.V1 shape="circle" buttonClassName="cursor react-carousel-arrow dark right" bundle="gray" onClick={onClickHandler}>
                                                                   <ChevronRight size={28}/>
                                                               </Button.V1>
                                                           </Block>
                                                       )
                                                   }
                                         >
                                             <Block width="100%" height={["360px", null, "600px"]}>
                                                 <Image src="/images/custom-promotion/slide1.webp" alt="slide1" layout="fill" objectFit="cover" objectPosition="center"/>
                                             </Block>
                                             <Block width="100%" height={["360px", null, "600px"]}>
                                                 <Image src="/images/custom-promotion/slide2.webp" alt="slide2" layout="fill" objectFit="cover" objectPosition="center"/>
                                             </Block>
                                             <Block width="100%" height={["360px", null, "600px"]}>
                                                 <Image src="/images/custom-promotion/slide3.webp" alt="slide3" layout="fill" objectFit="cover" objectPosition="center"/>
                                             </Block>
                                         </Carousel>
                                     </Block>
                                     <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]} gridColumnGap={["16px", null, "20px"]} marginTop={[null, null, "24px"]}>
                                         {canopyFeatures.map((feature) => (
                                             <Block key={feature.title} display="flex" flexDirection="column" padding="24px" $style={{gap: "8px"}}>
                                                 <Block as="h5" font={["MinXLabel14", "MinXLabel14", "MinXLabel28"]} color={["#33DED2", null, "MinXPrimaryText"]}
                                                        $style={{fontWeight: "500 !important", "@media (min-width: 672px)": {fontWeight: "300 !important"}}}
                                                 >
                                                     <Block as="span" display={[null, null, "none"]}>{`Feature `}</Block>{`${feature.order}.`}
                                                 </Block>
                                                 <Block as="h3" font="MinXLabel20" color="MinXTitle">{feature.title}</Block>
                                                 <Block as="p" font="MinXParagraph16" color="MinXSecondaryText">{feature.content}</Block>
                                             </Block>
                                         ))}
                                     </Block>
                                 </Block>
                             </Block>
                         }
                />
                <Block className="section-full-width" backgroundColor="#F7F7F7">
                    <Section upperContainerProps={{hidden: true}}
                             containerProps={{maxWidth: ["467px", null, "840px"]}}
                             content={
                                 <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "1272px"]} margin="auto" paddingTop={["32px", null, "96px"]} paddingBottom={["32px", null, "96px"]}>
                                     <SectionTitle.V2 category="Process" title="Steps to custom"/>
                                     <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridColumnGap="20px">
                                         {mockupProcess.map((process) => (
                                             <Block key={process.title} display="flex" flexDirection="column" padding="24px" $style={{gap: "8px"}}>
                                                 <Block as="h5" font="MinXLabel32" color="#FFC247" $style={{fontWeight: "400 !important"}}>{`${process.order}.`}</Block>
                                                 <Block as="h3" color="MinXTitle" font="MinXLabel20">{process.title}</Block>
                                                 <Block as="p" font="MinXParagraph16" color="MinXSecondaryText">{process.content}</Block>
                                             </Block>
                                         ))}
                                     </Block>
                                 </Block>
                             }
                    />
                </Block>
                <Section upperContainerProps={{hidden: true}}
                         containerProps={{maxWidth: ["467px", null, "840px"]}}
                         content={
                             <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "1272px"]} margin="auto">
                                 <SectionTitle.V2 category="testimony" title="What Customers Say"/>
                                 <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(3, 1fr)"]} gridColumnGap={["16px", null, "20px"]}>
                                     {testimonies.map((testimony, idx) => (
                                         <Block key={idx} className="text-center">
                                             <Block display="flex" alignItems="center" justifyContent="center" marginBottom={["24px", null, "30px"]} $style={{gap: "4px"}}>
                                                 {Array(testimony.rating).fill(null).map((_, idx) => (
                                                     <AspectRatioBox key={idx} aspectRatio={1} width="34px">
                                                         <AspectRatioBoxBody as={Image} src="/images/icon/icon-star.png" alt="icon-star" layout="fill" objectFit="contain"/>
                                                     </AspectRatioBox>
                                                 ))}
                                             </Block>
                                             <Block as="h3" marginBottom="16px" color="MinXTitle" font="MinXLabel16">{testimony.owner}</Block>
                                             <Block as="p" font="MinXParagraph16" color="MinXSecondaryText">{testimony.message}</Block>
                                         </Block>
                                     ))}
                                 </Block>
                             </Block>
                         }
                />
                <Block ref={mockupRef} className="section-full-width" backgroundColor="#F7F7F7">
                    <Section upperContainerProps={{hidden: true}}
                             containerProps={{maxWidth: ["467px", null, "840px"]}}
                             content={
                                 <Block display="grid" gridRowGap={["32px", null, "64px"]} maxWidth={["467px", null, "1272px"]} margin="auto" paddingTop={["32px", null, "96px"]} paddingBottom={["32px", null, "96px"]}>
                                     <SectionTitle.V2 category="contact info" title="Interested?"
                                                      content="If you are interested and would like to use our custom printing services or just interested in our product, please be sure to leave your contact information with us on the form below. We will get to you as soon as possible!"/>
                                     <FreeMockupForm/>
                                 </Block>
                             }
                    />
                </Block>
            </Block>
        </ThemeProvider.V2>
    );
}

export default Custom_Printing;
