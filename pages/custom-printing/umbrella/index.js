import React, {useEffect, useRef, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {FormControl} from "baseui/form-control";
import {Input} from "baseui/input";
import {ArrowDown} from 'baseui/icon'

import {Benefit, FormSections, Section} from "../../../components/sections"
import MButton from "../../../components/button-n";
import {Modal} from "../../../components/surfaces";

import Utils from "../../../utils/utils";

const utils = new Utils();

const SectionCard = ({router, src, alt, title, content, destination, onClick, buttonText = "Buy"}) => {
    return (
        <Block display={["grid", "grid", "flex"]} flexDirection={["column", "column", "row-reverse"]} alignItems={["", "", "center"]} justifyContent={["", "", "space-between"]}
               gridTemplateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "unset"]} gridRowGap={["20px", "24px", "unset"]} padding={["32px 16px", "48px 24px", "20px 0px 0px 40px"]}
               overrides={{
                   Block: {
                       style: {
                           boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.05)",
                       },
                   },
               }}
        >
            <Block position="relative" width="100%" maxWidth={["256px", "320px", "380px"]} marginRight={["auto", "auto", "0px"]} marginBottom={["12px", "24px", "0px"]} marginLeft="auto">
                <Image src={src} alt={alt} layout="responsive" width={640} height={640} quality={100}/>
            </Block>
            <Block display="grid" gridTemplateColumns="1fr" gridRowGap={["12px", "12px", "16px"]}>
                <Block font={["MinXTitle20", "MinXTitle28", "MinXTitle32"]} color="MinXPrimaryText">{title}</Block>
                <Block maxWidth="400px" font={["MinXParagraph14", "MinXParagraph16", "MinXParagraph20"]} color="MinXPrimaryText">{content}</Block>
                <MButton type="outline" width="72px" height="32px" font="MinXLabel14" color="MinXPrimaryText" text={buttonText}
                         onClick={onClick ? onClick : () => router.push(destination)}
                />
            </Block>
        </Block>
    )
}

function Custom_Printing_Umbrella({router, size}) {
    const ref = useRef(null);
    const refBanner = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const [showGetQuote, setShowGetQuote] = useState(false);

    const [quoteProduct, setQuoteProduct] = useState("");
    const [quoteQuantity, setQuoteQuantity] = useState(1);
    const [quoteNameLast, setQuoteNameLast] = useState("");
    const [quoteNameFirst, setQuoteNameFirst] = useState("");
    const [quoteEmail, setQuoteEmail] = useState("");
    const [quotePhone, setQuotePhone] = useState("");
    const [quoteRequest, setQuoteRequest] = useState("");
    const [quoteError, setQuoteError] = useState(false);

    const goBuyingSection = () => {
        if (window) window.scrollTo({top: size.width > 959 ? ref.current.offsetTop - 120 : ref.current.offsetTop - 72, behavior: 'smooth'});
    };

    const handleEnquiry = () => {
        setShowGetQuote(!showGetQuote);

        if (showGetQuote) {
            setQuoteError(false);
            setQuoteNameLast("");
            setQuoteNameFirst("");
            setQuoteEmail("");
            setQuotePhone("");
            setQuoteRequest("");
        }
    }


    const handleSendQuote = async () => {
        if (!quoteProduct || !quoteNameLast || !quoteNameFirst || !quoteEmail || !quotePhone || !quoteRequest) {
            setQuoteError(true);
        } else {
            let result = await utils.contact({
                form_id: "2",
                status: "active",
                1: "New Entry: " + quoteProduct + " Enquiry",
                2: "",
                3: quoteQuantity,
                4.3: quoteNameFirst,
                4.6: quoteNameLast,
                5: quoteEmail,
                6: quotePhone,
                8: quoteRequest,
            });
            handleEnquiry();
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
                <Block ref={refBanner} display="grid" gridRowGap={["8px", "16px", "20px"]} justifyItems="center" padding={["32px 30px", "40px 30px", "64px 30px"]}
                       overrides={{
                           Block: {
                               props: {
                                   className: "banner-display text-center"
                               },
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
                    <MButton type="outline" height={["36px", "48px", "56px"]} marginBottom={["8px", "12px", "20px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Pick an umbrella below"
                             buttonStyle={{borderColor: "white"}} $style={{zIndex: 1}}
                             startEnhancer={() => <ArrowDown size={36}/>} onClick={() => goBuyingSection()}
                    />
                    <Block width="100%" display="grid" justifyContent={["", "", "space-around"]}
                           gridTemplateAreas={[`"a c" "d d"`, `"a c" "d d"`, "unset"]} gridTemplateColumns={["", "", "152px 171px 338px"]} gridColumnGap="20px" gridRowGap={["40px", "40px", "unset"]}
                           $style={{zIndex: 1}}
                    >
                        <Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["a", "a", "unset"]}>
                            <Block position="relative" width="100%" height={["81px", "142px", "166px"]} marginRight="auto" marginLeft="auto">
                                <Image src="/images/custom-printing/umbrella/icon-bali.webp" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom" quality={100} priority={true}/>
                            </Block>
                            <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Kapri</Block>
                        </Block>
                        {/*<Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["a", "a", "unset"]}>*/}
                        {/*    <Block position="relative" width="100%" height={["81px", "142px", "166px"]} marginRight="auto" marginLeft="auto">*/}
                        {/*        <Image src="/images/custom-printing/umbrella/icon-bali.webp" alt="bali" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>*/}
                        {/*    </Block>*/}
                        {/*    <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Bali</Block>*/}
                        {/*</Block>*/}
                        {/*<Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["b", "b", "unset"]}>*/}
                        {/*    <Block position="relative" width="100%" height={["86px", "136px", "159px"]} marginRight="auto" marginLeft="auto">*/}
                        {/*        <Image src="/images/custom-printing/umbrella/icon-marco.webp" alt="marco" layout="fill" objectFit="contain" objectPosition="bottom" quality={100}/>*/}
                        {/*    </Block>*/}
                        {/*    <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Marco</Block>*/}
                        {/*</Block>*/}
                        <Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["c", "c", "unset"]}>
                            <Block position="relative" width="100%" height={["91px", "148px", "175px"]} marginRight="auto" marginLeft="auto">
                                <Image src="/images/custom-printing/umbrella/icon-santorini.webp" alt="santorini" layout="fill" objectFit="contain" objectPosition="bottom" quality={100} priority={true}/>
                            </Block>
                            <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Santorini</Block>
                        </Block>
                        <Block display="grid" gridTemplateColumns="repeat(1, auto)" gridRowGap="12px" alignSelf={"end"} gridArea={["d", "d", "unset"]}>
                            <Block position="relative" width="100%" height={["109px", "180px", "212px"]} marginRight="auto" marginLeft="auto">
                                <Image src="/images/custom-printing/umbrella/icon-catalina.webp" alt="catalina" layout="fill" objectFit="contain" objectPosition="bottom" quality={100} priority={true}/>
                            </Block>
                            <Block marginRight="auto" marginLeft="auto" font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryTextAlt">Catalina</Block>
                        </Block>
                    </Block>
                    <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#F02B9B", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                    <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#7E49F2", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
                </Block>
                <Section title={<>DESIGNED FOR<br/>YOUR SPECIALLY</>}
                         subtitle="Westshade provides free mockup service. Give us your idea and we will give you the tent you want."
                         content={
                             <Block position="relative" width="100%" marginBottom={["12px", "24px", "32px"]}>
                                 <Image src="/images/custom-printing/umbrella/custom-printing-banner.webp" alt="custom printing display" layout="responsive" width={1920} height={610} quality={100} priority={true}/>
                             </Block>
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
                                                      setQuoteProduct("Kapri Tilt Umbrella");
                                                      handleEnquiry()
                                                  }}
                                     />
                                     <SectionCard router={router} title={"Santorini Pulley Umbrella"} content={"Santorini umbrella is made of aluminum or fiberglass, and it comes in five sizes and six premade colors."}
                                                  src={"/images/custom-printing/umbrella/santorini.webp"} alt={"santorini"}
                                                  buttonText="Enquiry" destination={"/products/market-umbrellas/santorini-umbrella"}
                                                  onClick={() => {
                                                      setQuoteProduct("Santorini Pulley Umbrella");
                                                      handleEnquiry()
                                                  }}
                                     />
                                     <SectionCard router={router} title={"Catalina Oversized Umbrella"} content={"Catalina umbrella is made of aluminum, and it comes in four sizes and white color."}
                                                  src={"/images/custom-printing/umbrella/catalina.webp"} alt={"catalina"}
                                                  buttonText="Enquiry" destination={"/products/cantilever-umbrellas/catalina-umbrella"}
                                                  onClick={() => {
                                                      setQuoteProduct("Catalina Oversized Umbrella");
                                                      handleEnquiry()
                                                  }}
                                     />
                                 </Block>
                             }
                    />
                </Block>
                <Section upperContainerDirection="column"
                         title="Get a free mockup"
                         subtitle="Not sure about what it will look like? Just fill out the form and our graphic team will make a free mockup for you."
                         content={<FormSections/>}
                         containerClassName="m-wrap-side-full"
                         upperContainerProps={{marginBottom: ["32px", "32px", "40px"], padding: ["0 16px", "0 32px",]}}
                         subtitleStyles={{maxWidth: "unset !important"}}
                />
                <Benefit containerClassName="m-body-section-wrap"/>
            </Block>
            <Modal type="dialog" isOpen={showGetQuote} onClose={() => handleEnquiry()}>
                <Block marginTop={["64px", "64px", "30px"]} marginRight={["auto", "auto", "32px"]} marginLeft={["auto", "auto", "32px"]}
                       display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap="32px" gridRowGap="16px"
                >
                    <Block display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                           overrides={{
                               Block: {
                                   style: {textAlign: "center"}
                               }
                           }}
                    >
                        <Block font="MinXLabel20" color="MinXPrimaryText">At Westshade, We Offer Limitless Design Solution.</Block>
                        <Block position="relative" width="120px" height="120px" marginTop="24px" marginBottom="24px">
                            <Image src={"/images/tent-spec/customer-service.svg"} layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        <Block font="MinXParagraph16" color="MinXPrimaryText">Call us for custom print consultation</Block>
                        <MButton type="solid" height="auto" marginTop="24px" marginRight="auto" marginBottom="24px" marginLeft="auto" font="MinXParagraph16" text='(877)702-1872' color="white"
                                 buttonStyle={{
                                     backgroundColor: "rgba(0, 0, 0, 0.87) !important",
                                     paddingTop: "6px !important", paddingRight: "24px !important", paddingBottom: "6px !important", paddingLeft: "24px !important",
                                     borderTopRightRadius: "4px !important", borderBottomRightRadius: "4px !important", borderBottomLeftRadius: "4px !important", borderTopLeftRadius: "4px !important",
                                 }}
                                 onClick={() => window.open(`tel:877-702-1872`, '_self')}
                        />
                    </Block>
                    <Block>
                        <FormControl label={() => "Product*"}>
                            <Input value={quoteProduct} clearOnEscape error={!quoteProduct && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           }
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuoteProduct(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <Block display="grid" gridTemplateColumns="1fr 1fr" gridColumnGap="24px">
                            <Block>
                                <FormControl label={() => "Last Name*"}>
                                    <Input value={quoteNameLast} clearOnEscape error={!quoteNameLast && quoteError} required
                                           overrides={{
                                               Root: {
                                                   props: {
                                                       className: "container-input-enquiry"
                                                   },
                                                   style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                               },
                                               InputContainer: {
                                                   props: {
                                                       className: "container-inner-input-enquiry"
                                                   }
                                               },
                                               Input: {
                                                   props: {
                                                       className: "input-enquiry"
                                                   },
                                               },
                                           }}
                                           onChange={(event) => {
                                               setQuoteError(false);
                                               setQuoteNameLast(event.target.value);
                                           }}
                                    />
                                </FormControl>
                            </Block>
                            <Block>
                                <FormControl label={() => "First Name*"}>
                                    <Input value={quoteNameFirst} clearOnEscape error={!quoteNameFirst && quoteError} required
                                           overrides={{
                                               Root: {
                                                   props: {
                                                       className: "container-input-enquiry"
                                                   },
                                                   style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                               },
                                               InputContainer: {
                                                   props: {
                                                       className: "container-inner-input-enquiry"
                                                   }
                                               },
                                               Input: {
                                                   props: {
                                                       className: "input-enquiry"
                                                   },
                                               },
                                           }}
                                           onChange={(event) => {
                                               setQuoteError(false);
                                               setQuoteNameFirst(event.target.value);
                                           }}
                                    />
                                </FormControl>
                            </Block>
                        </Block>
                        <FormControl label={() => "Email*"}>
                            <Input value={quoteEmail} clearOnEscape error={!quoteEmail && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           }
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuoteEmail(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <FormControl label={() => "Phone*"}>
                            <Input value={quotePhone} clearOnEscape error={!quotePhone && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           }
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuotePhone(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <FormControl label={() => "Describe What You’re Looking For*"}>
                            <Input value={quoteRequest} clearOnEscape error={!quoteRequest && quoteError} required
                                   overrides={{
                                       Root: {
                                           props: {
                                               className: "container-input-enquiry"
                                           },
                                           style: ({$error}) => $error ? {borderBottomColor: "rgb(241, 153, 142) !important"} : null
                                       },
                                       InputContainer: {
                                           props: {
                                               className: "container-inner-input-enquiry"
                                           },
                                       },
                                       Input: {
                                           props: {
                                               className: "input-enquiry"
                                           },
                                       },
                                   }}
                                   onChange={(event) => {
                                       setQuoteError(false);
                                       setQuoteRequest(event.target.value);
                                   }}
                            />
                        </FormControl>
                        <MButton type="solid" height="auto" marginTop="24px" marginRight="auto" marginBottom="24px" marginLeft="auto" font="MinXParagraph16" text='Submit' color="MinXPrimaryText"
                                 buttonStyle={{
                                     backgroundColor: "#e0e0e0 !important",
                                     paddingTop: "6px !important", paddingRight: "24px !important", paddingBottom: "6px !important", paddingLeft: "24px !important",
                                     borderTopRightRadius: "4px !important", borderBottomRightRadius: "4px !important", borderBottomLeftRadius: "4px !important", borderTopLeftRadius: "4px !important",
                                 }}
                                 onClick={() => handleSendQuote()}
                        />
                    </Block>
                </Block>
            </Modal>
        </React.Fragment>
    )
}

export default withRouter(Custom_Printing_Umbrella);
