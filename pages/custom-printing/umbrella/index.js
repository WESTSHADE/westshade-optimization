import React, {useEffect, useRef, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {AspectRatioBox} from 'baseui/aspect-ratio-box';
import {ArrowDown} from 'baseui/icon'

import Button from "Components/button-n";
import {Benefit, FreeMockupForm, Section} from "Components/sections"
import {Modal} from "Components/surfaces";

import Utils from "Utils/utils";

const utils = new Utils();

const SectionCard = ({router, src, alt, title, content, destination, onClick, buttonText = "Buy"}) => {
    return (
        <Block display={["grid", null, "flex"]} flexDirection={["column", null, "row-reverse"]} alignItems={[null, null, "center"]} justifyContent={[null, null, "space-between"]} gridTemplateColumns={["1fr", null, "unset"]}
               gridRowGap={["20px", "24px", "unset"]} padding={["32px 16px", "48px 64px", "20px 0 0"]} $style={{boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.05)"}}
        >
            <AspectRatioBox position="relative" width={["256px", "320px", "380px"]} margin="auto"><Image src={src} alt={alt} layout="fill" priority/></AspectRatioBox>
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["12px", null, "16px"]} flex={1} paddingLeft={[null, null, "40px"]}>
                <Block font={["MinXTitle20", "MinXTitle28", "MinXTitle32"]} color="MinXPrimaryText">{title}</Block>
                <Block maxWidth="400px" font={["MinXParagraph14", "MinXParagraph16", "MinXParagraph20"]} color="MinXPrimaryText">{content}</Block>
                <Button type="outline" width={["72px", null, "121px"]} height={["32px", null, "48px"]} font="MinXLabel14" text={buttonText} bundle="primary" onClick={onClick ? onClick : () => router.push(destination)}/>
            </Block>
        </Block>
    )
};

function Custom_Printing_Umbrella({router, size, phone}) {
    const ref = useRef(null);
    const refBanner = useRef(null);

    console.log(phone)

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const [showGetQuote, setShowGetQuote] = useState(false);

    const [quoteError, setQuoteError] = useState(false);
    const [quote, setQuote] = useState({
        product: "",
        quantity: 1,
        nameLast: "",
        nameFirst: "",
        email: "",
        phone: "",
        request: ""
    });

    const goBuyingSection = () => {
        if (window) window.scrollTo({top: ref.current.offsetTop - 60, behavior: 'smooth'});
    };

    const handleEnquiry = () => {
        setShowGetQuote(!showGetQuote);

        if (showGetQuote) {
            setQuoteError(false);
            setQuote({
                product: "",
                quantity: 1,
                nameLast: "",
                nameFirst: "",
                email: "",
                phone: "",
                request: ""
            });
        }
    }

    const handleEnquiryDetail = (key, value) => {
        setQuoteError(false);
        setQuote({...quote, [key]: value});
    };

    const handleSendQuote = () => {
        if (!quote.nameFirst || !quote.nameLast || !quote.email || !quote.phone || !quote.request) {
            setQuoteError(true);
        } else {
            utils.contact({
                form_id: "2",
                status: "active",
                1: "New Entry: " + quote.product + " Enquiry",
                2: "",
                3: quote.quantity,
                4.3: quote.nameFirst,
                4.6: quote.nameLast,
                5: quote.email,
                6: quote.phone,
                8: quote.request,
            }).then(() => handleEnquiry());
        }
    };

    useEffect(() => {
        if (refBanner && refBanner.current) {
            setCircleAD(refBanner.current.clientHeight);
            setCircleBD(refBanner.current.clientWidth / 2);
        }
    }, [size]);

    return (
        <React.Fragment>
            <Head>
                <title>Custom Printing Umbrella - WESTSHADE</title>
                <meta name="description"
                      content="Customize umbrella with your preference. Print your own artwork on any umbrella. Designed for your specially.  Provides free mockup service. Give us your idea and we will give you the tent you want."/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom="0px">
                <Block ref={refBanner} className="banner-display text-center" display="grid" gridRowGap={["8px", "16px", "20px"]} justifyItems="center" padding={["32px 30px", "40px 30px", "64px 30px"]}
                       overrides={{
                           Block: {
                               style: {
                                   ":after": {background: "linear-gradient(95.25deg, rgba(120, 121, 241, 0.85) 0%, rgba(211, 212, 255, 0) 52.6%, rgba(120, 121, 241, 0.85) 100%), #BFC0FF;"}
                               }
                           },
                       }}
                >
                    <Block font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}>Customize It Your Way</Block>
                    <Block maxWidth={["260px", "420px", "580px", "640px"]} font={["MinXSubtitle16", "MinXSubtitle24", 'MinXSubtitle28']} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}>
                        You can print your own artwork on any umbrellas
                    </Block>
                    <Button type="outline" height={["36px", "48px", "56px"]} marginBottom={["8px", "12px", "20px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Pick an umbrella below" bundle="white" $style={{zIndex: 1}}
                            startEnhancer={() => <ArrowDown size={36}/>} onClick={() => goBuyingSection()}
                    />
                    <Block width="100%" display="grid" justifyContent={[null, null, "space-around"]} gridTemplateAreas={[`"a c" "d d"`, null, "unset"]} gridTemplateColumns={[null, null, "152px 171px 338px"]} gridColumnGap="20px"
                           gridRowGap={["40px", null, "unset"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt" $style={{zIndex: 1}}
                    >
                        <Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["a", null, "unset"]}>
                            <Block position="relative" width="100%" height={["81px", "142px", "166px"]}>
                                <Image src="/images/custom-printing/umbrella/icon-bali.webp" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom" priority={true}/>
                            </Block>
                            Kapri
                        </Block>
                        {/*<Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["a", "a", "unset"]}>*/}
                        {/*    <Block position="relative" width="100%" height={["81px", "142px", "166px"]}>*/}
                        {/*        <Image src="/images/custom-printing/umbrella/icon-bali.webp" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom"/>*/}
                        {/*    </Block>*/}
                        {/*    Bali*/}
                        {/*</Block>*/}
                        {/*<Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["b", "b", "unset"]}>*/}
                        {/*    <Block position="relative" width="100%" height={["86px", "136px", "159px"]}>*/}
                        {/*        <Image src="/images/custom-printing/umbrella/icon-marco.webp" alt="marco" layout="fill" objectFit="contain" objectPosition="bottom"/>*/}
                        {/*    </Block>*/}
                        {/*    Marco*/}
                        {/*</Block>*/}
                        <Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["c", null, "unset"]}>
                            <Block position="relative" width="100%" height={["91px", "148px", "175px"]}>
                                <Image src="/images/custom-printing/umbrella/icon-santorini.webp" alt="santorini" layout="fill" objectFit="contain" objectPosition="bottom" priority={true}/>
                            </Block>
                            Santorini
                        </Block>
                        <Block display="grid" gridTemplateColumns="auto" gridRowGap="12px" alignSelf="end" gridArea={["d", null, "unset"]}>
                            <Block position="relative" width="100%" height={["109px", "180px", "212px"]}>
                                <Image src="/images/custom-printing/umbrella/icon-catalina.webp" alt="catalina" layout="fill" objectFit="contain" objectPosition="bottom" priority={true}/>
                            </Block>
                            Catalina
                        </Block>
                    </Block>
                    <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#F02B9B", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                    <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#7E49F2", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
                </Block>
                <Section title={<>DESIGNED FOR<br/>YOUR SPECIALLY</>}
                         subtitle="Westshade provides free mockup service. Give us your idea and we will give you the tent you want."
                         content={
                             <Image src="/images/custom-printing/umbrella/custom-printing-banner.webp" alt="custom printing display" layout="responsive" width={1920} height={610} priority={true}/>
                         }
                />
                <Block ref={ref}>
                    <Section title={"UMBRELLA SERIES"}
                             subtitle={"Westshade provides 4 series of umbrellas to fulfill your unique needs."}
                             content={
                                 <Block display="grid" gridRowGap={["16px", "16px", "20px"]}>
                                     {/*<SectionCard router={router} title={"Bali Tilt Umbrella"} content={"Bali umbrella is made of steel, and it comes in one size (9’) and six premade colors."}*/}
                                     {/*             src={"/images/custom-printing/umbrella/bali.webp"} alt={"bali"}*/}
                                     {/*             destination={"/products/tilt-umbrellas/bali-crank-lift-patio-umbrella"}*/}
                                     {/*/>*/}
                                     {/*<SectionCard router={router} title={"Marco Push-Up Umbrella"} content={"Marco umbrella is made of aluminum, and it comes in one size (6.5’) and six premade colors."}*/}
                                     {/*             src={"/images/custom-printing/umbrella/marco.webp"} alt={"marco"}*/}
                                     {/*             destination={"/products/market-umbrellas/marco-umbrella"}*/}
                                     {/*/>*/}
                                     <SectionCard router={router} title={"Kapri Tilt Umbrella"} content={"Kapri umbrella is made of aluminum, and it comes in 4 sizes with height adjustment."}
                                                  src={"/images/custom-printing/umbrella/kapri.webp"} alt={"kapri"}
                                                  buttonText="Enquiry" destination={"/"}
                                                  onClick={() => {
                                                      handleEnquiryDetail("product", "Kapri Tilt Umbrella");
                                                      handleEnquiry();
                                                  }}
                                     />
                                     <SectionCard router={router} title={"Santorini Pulley Umbrella"} content={"Santorini umbrella is made of aluminum or fiberglass, and it comes in five sizes and six premade colors."}
                                                  src={"/images/custom-printing/umbrella/santorini.webp"} alt={"santorini"}
                                                  buttonText="Enquiry" destination={"/products/market-umbrellas/santorini-umbrella"}
                                                  onClick={() => {
                                                      handleEnquiryDetail("product", "Santorini Pulley Umbrella");
                                                      handleEnquiry();
                                                  }}
                                     />
                                     <SectionCard router={router} title={"Catalina Oversized Umbrella"} content={"Catalina umbrella is made of aluminum, and it comes in four sizes and white color."}
                                                  src={"/images/custom-printing/umbrella/catalina.webp"} alt={"catalina"}
                                                  buttonText="Enquiry" destination={"/products/cantilever-umbrellas/catalina-umbrella"}
                                                  onClick={() => {
                                                      handleEnquiryDetail("product", "Catalina Oversized Umbrella");
                                                      handleEnquiry();
                                                  }}
                                     />
                                 </Block>
                             }
                    />
                </Block>
                <Section upperContainerDirection="column"
                         title="Get a free mockup"
                         subtitle="Not sure about what it will look like? Just fill out the form and our graphic team will make a free mockup for you."
                         subtitleStyles={{maxWidth: "unset !important"}}
                         content={<FreeMockupForm/>}
                         containerClassName="m-wrap-side-full"
                         upperContainerProps={{marginBottom: ["32px", "32px", "40px"], padding: ["0 16px", "0 32px",]}}
                />
                <Benefit containerClassName="m-body-section-wrap"/>
            </Block>
            <Modal type="dialog" isOpen={showGetQuote} onClose={() => handleEnquiry()}>
                <Block display="grid" gridTemplateRows="auto" gridTemplateColumns={["1fr", null, "repeat(2, 1fr)"]} gridColumnGap="32px" gridRowGap="32px" margin={["32px auto", null, "30px 32px"]}>
                    <Block className="text-center" display="flex" justifyContent="center" alignItems="center">
                        <Block maxWidth="320px" display="grid" gridRowGap="24px" justifyItems="center">
                            <Block font="MinXLabel20" color="MinXPrimaryText">At Westshade, We Offer Limitless Design Solution.</Block>
                            <Image src={"/images/tent-spec/customer-service.svg"} alt="customer service" layout="fixed" width={120} height={120}/>
                            <Block font="MinXParagraph16" color="MinXPrimaryText">Call us for custom print consultation</Block>
                            <Button shape="square" height="36px" font="MinXParagraph16" text={phone} color="white" bundle="black" onClick={() => window.open(`tel:+1-` + phone, '_self')}/>
                        </Block>
                    </Block>
                    <Block>
                        <FormControl label={() => "Product*"}>
                            <Input value={quote["product"]} clearOnEscape required
                                   overrides={{
                                       Root: {props: {className: "container-input-enquiry"}},
                                       InputContainer: {props: {className: "container-inner-input-enquiry"}},
                                       Input: {props: {className: "input-enquiry"}}
                                   }}
                            />
                        </FormControl>
                        <Block display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap="24px">
                            <Block>
                                <FormControl label={() => "Last Name*"}>
                                    <Input value={quote["nameLast"]} clearOnEscape error={!quote["nameLast"] && quoteError} required
                                           overrides={{
                                               Root: {
                                                   props: {className: "container-input-enquiry"},
                                                   style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                               },
                                               InputContainer: {props: {className: "container-inner-input-enquiry"}},
                                               Input: {props: {className: "input-enquiry"}}
                                           }}
                                           onChange={(event) => handleEnquiryDetail("nameLast", event.target.value)}
                                    />
                                </FormControl>
                            </Block>
                            <Block>
                                <FormControl label={() => "First Name*"}>
                                    <Input value={quote["nameFirst"]} clearOnEscape error={!quote["nameFirst"] && quoteError} required
                                           overrides={{
                                               Root: {
                                                   props: {className: "container-input-enquiry"},
                                                   style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                               },
                                               InputContainer: {props: {className: "container-inner-input-enquiry"}},
                                               Input: {props: {className: "input-enquiry"}}
                                           }}
                                           onChange={(event) => handleEnquiryDetail("nameFirst", event.target.value)}
                                    />
                                </FormControl>
                            </Block>
                        </Block>
                        <FormControl label={() => "Email*"}>
                            <Input value={quote["email"]} clearOnEscape error={!quote["email"] && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {className: "container-input-enquiry"},
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {props: {className: "container-inner-input-enquiry"}},
                                       Input: {props: {className: "input-enquiry"}}
                                   }}
                                   onChange={(event) => handleEnquiryDetail("email", event.target.value)}
                            />
                        </FormControl>
                        <FormControl label={() => "Phone*"}>
                            <Input value={quote["phone"]} clearOnEscape error={!quote["phone"] && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {className: "container-input-enquiry"},
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {props: {className: "container-inner-input-enquiry"}},
                                       Input: {props: {className: "input-enquiry"}}
                                   }}
                                   onChange={(event) => handleEnquiryDetail("phone", event.target.value)}
                            />
                        </FormControl>
                        <FormControl label={() => "Describe What You’re Looking For*"}>
                            <Input value={quote["request"]} clearOnEscape error={!quote["request"] && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {className: "container-input-enquiry"},
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {props: {className: "container-inner-input-enquiry"},},
                                       Input: {props: {className: "input-enquiry"}}
                                   }}
                                   onChange={(event) => handleEnquiryDetail("request", event.target.value)}
                            />
                        </FormControl>
                        <Button shape="square" height="32px" font="MinXParagraph16" text='Submit' color="MinXPrimaryText" buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)"
                                onClick={() => handleSendQuote()}/>
                    </Block>
                </Block>
            </Modal>
        </React.Fragment>
    )
}

export default withRouter(Custom_Printing_Umbrella);
