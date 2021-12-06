import React, {useState} from "react";

import Head from "next/head"
import Image from "next/image";

import {useStyletron} from "baseui";
import {Card, StyledBody} from "baseui/card";
import {Block} from "baseui/block"
import {Button, KIND, SHAPE} from "baseui/button";
import {Notification} from "baseui/notification";
import {FormControl} from "baseui/form-control";

import Accordion from "../components/accordion";
import {CustomCheckbox, CustomCheckboxLabel, CustomInput, CustomLabel, CustomSubmitButton, CustomTextarea} from "../components/forms/parts";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import Utils from "../utils/utils";

const utils = new Utils();

const QA = [
    {
        title: "Where can I use my WestShade pop-up canopy?",
        content: "Our canopies stand securely on grass, dirt, or pavement without ropes or poles. In windy conditions, However, we recommend using our Weight Bags to anchor and prevent your canopy from tipping over."
    },
    {title: "Can I buy a replacement canopy covering?", content: "Yes, we offer many replacement cover options. Please call customer service at 877-702-1872 or contact us online."},
    {title: "Do you have any accessories available?", content: "Yes, our full line of accessories includes sidewalls, half sidewalls, sidewalls with roll up doors, sidewalls with windows and sand bags."},
    {title: "What fire ratings do your fabric items have?", content: " Our fabric meets CPAI-84, NFPA-71 and the California Administrative Code Title 19 fire resistant requirements."},
    {
        title: "What are your shipping costs?",
        content: <>We provide free shipping and handling costs for any orders over $149 within the U.S., with the exception of AK, HI and PR.<br/><br/>Shipping costs for customers located in those 3 states will be provided after further order
            estimates.</>
    },
];

const CustomCard = ({children}) => {
    const [css] = useStyletron();

    return (
        <Block width={["100%", "100%", "180px", "180px"]}>
            <Card
                overrides={{
                    Root: {style: {backgroundColor: "transparent", outline: "transparent", borderTopWidth: "0", borderBottomWidth: "0", borderLeftWidth: "0", borderRightWidth: "0", width: "100%"}},
                    Contents: {style: {marginTop: "0px", marginBottom: "0px", marginLeft: "0px", marginRight: "0px"}}
                }}
            >
                <StyledBody className={css({display: "flex", flexDirection: "column", alignItems: "center"})}>
                    {children}
                </StyledBody>
            </Card>
        </Block>
    )
}


const Contact_Us = () => {
    const [css] = useStyletron();
    const [copied, copyEmail, reset] = useCopyToClipboard("support@westshade.com");
    const [formState, setFormState] = useState({
        interests: [],
        message: "",
        firstname: "",
        lastname: "",
        companyName: "",
        phone: "",
        email: ""
    })
    const [formError, setFormError] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInterest = (interest) => {
        if (!formState.interests.includes(interest)) setFormState({...formState, interests: [...formState.interests, interest]})
        else {
            let idx = formState.interests.indexOf(interest);
            let newInterests = [...formState.interests];
            newInterests.splice(idx, 1);
            setFormState({...formState, interests: newInterests})
        }
    }

    const handleContactForm = async (e) => {
        e.preventDefault();
        setFormLoading(true)
        const {interests, firstname, lastname, message, companyName, email, phone} = formState;
        if (interests.length > 0 || !!firstname || !!lastname || !!message || !!companyName || !!email || !!phone) {
            let result = await utils.contact({
                form_id: "4",
                status: "active",
                10: interests.join(","),
                4: message,
                6.3: firstname,
                6.6: lastname,
                7: companyName,
                8: phone,
                9: email,
                11: "https://westshade.s3.us-west-2.amazonaws.com/contacts/test.jpg"
            });
            setFormLoading(false);
            setFormState({
                interests: [],
                message: "",
                firstname: "",
                lastname: "",
                companyName: "",
                phone: "",
                email: ""
            });
            setFormSubmitted(true);
        } else {
            setFormError(true);
            setFormLoading(false)
        }
    }

    //for auto formatting the phone number
    const handlePhone = (e) => {
        let cleanVal = [...e.target.value.split("-")].join("").replace(/\D/g, '');
        let cleanValLength = cleanVal.length;
        if (cleanValLength <= 10) {
            if (cleanValLength >= 7) {
                cleanVal = `${cleanVal.slice(0, 3)}-${cleanVal.slice(3, 6)}-${cleanVal.slice(6)}`;
            } else if (cleanValLength > 3 && cleanValLength <= 6) {
                cleanVal = `${cleanVal.slice(0, 3)}-${cleanVal.slice(3, 6)}`;
            }
            setFormState({...formState, phone: cleanVal})
        }
    }

    return (
        <>
            <Head>
                <title>Contact Us - WESTSHADE</title>
                <meta name="description" content="Frequently asked question about Westshade&apos;s canopy, umbrella and accessories."/>
            </Head>
            <Block className="text-center" width="100%" display="grid" placeItems="center" backgroundColor="#DFF2EF">
                <Block maxWidth="1183px" padding={["40px 16px", "100px 16px", "100px 32px"]}>
                    <Block as="h1" marginBottom={["16px", "24px", "24px"]} font={["MinXHeading20", "MinXHeading36"]} color="MinXPrimaryText" $style={{fontWeight: "500 !important"}}>Contact us</Block>
                    <Block maxWidth="535px" margin="0 auto" className={css({textAlign: "center"})} color="MinXPrimaryText" font={["MinXParagraph16", "MinXParagraph20"]}>
                        We are here to help you from 8:30 AM - 5:30 PM PST, Monday to Friday (except holidays and weekends).
                    </Block>
                    <Block display="flex" justifyContent="center" flexWrap={[true, false]} marginTop={["24px", "64px"]} className={css({gap: "30px"})}>
                        <CustomCard>
                            <Image src="/images/contact-us/call-us.webp" alt="call us" layout="fixed" width="40px" height="40px" objectFit="contain"/>
                            <Block className={css({textAlign: "center", textTransform: "uppercase"})} color="MinXPrimaryText" as="p" font="MinXParagraph14" marginTop="16px">Call us</Block>
                            <Block marginBottom="5px" className={css({textAlign: "center"})} color="MinXPrimaryText" as="p" font="MinXHeading14">877-702-1872</Block>
                            <Button
                                onClick={() => {
                                }}
                                startEnhancer={() =>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M15.4999 10.8833L11.1083 10.375L9.00825 12.475C6.64992 11.275 4.71659 9.35 3.51659 6.98333L5.62492 4.875L5.11659 0.5H0.524919C0.0415854 8.98333 7.01659 15.9583 15.4999 15.475V10.8833Z" fill="#FAFAFA"/>
                                    </svg>
                                }
                                shape={SHAPE.pill}
                                $as="a"
                                href="tel:877-702-1872"
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            paddingLeft: " 24px",
                                            paddingRight: " 24px",
                                            color: "#ffffff !important",
                                            backgroundColor: "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                    },
                                }}
                            >
                                Call us
                            </Button>
                        </CustomCard>
                        <CustomCard>
                            <Image src="/images/contact-us/email-us.webp" alt="email us" layout="fixed" width="40px" height="40px" objectFit="contain"/>
                            <Block className={css({textAlign: "center", textTransform: "uppercase"})} color="MinXPrimaryText" as="p" font="MinXParagraph14" marginTop="16px">Email us</Block>
                            <Block marginBottom="5px" className={css({textAlign: "center"})} color="MinXPrimaryText" as="p" font="MinXHeading14">support@westshade.com</Block>
                            <Button
                                onClick={copyEmail}
                                startEnhancer={() =>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="16" viewBox="0 0 13 16" fill="#ffffff">
                                        <path
                                            d="M8.99992 0.667969H1.66659C0.933252 0.667969 0.333252 1.26797 0.333252 2.0013V10.668C0.333252 11.0346 0.633252 11.3346 0.999919 11.3346C1.36659 11.3346 1.66659 11.0346 1.66659 10.668V2.66797C1.66659 2.3013 1.96659 2.0013 2.33325 2.0013H8.99992C9.36659 2.0013 9.66659 1.7013 9.66659 1.33464C9.66659 0.967969 9.36659 0.667969 8.99992 0.667969ZM11.6666 3.33464H4.33325C3.59992 3.33464 2.99992 3.93464 2.99992 4.66797V14.0013C2.99992 14.7346 3.59992 15.3346 4.33325 15.3346H11.6666C12.3999 15.3346 12.9999 14.7346 12.9999 14.0013V4.66797C12.9999 3.93464 12.3999 3.33464 11.6666 3.33464ZM10.9999 14.0013H4.99992C4.63325 14.0013 4.33325 13.7013 4.33325 13.3346V5.33464C4.33325 4.96797 4.63325 4.66797 4.99992 4.66797H10.9999C11.3666 4.66797 11.6666 4.96797 11.6666 5.33464V13.3346C11.6666 13.7013 11.3666 14.0013 10.9999 14.0013Z"
                                            fill={copied ? "#23A4AD" : "#ffffff"}/>
                                    </svg>
                                }
                                shape={SHAPE.pill}
                                disabled={copied}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            paddingLeft: " 24px",
                                            paddingRight: " 24px",
                                            color: "#ffffff !important",
                                            backgroundColor: copied ? "#ffffff" : "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                    },
                                }}
                            >

                                {
                                    copied ? (
                                        <Notification
                                            kind={KIND.positive}
                                            autoHideDuration={3000}
                                            overrides={{
                                                Body: {style: {width: 'auto', padding: "0 !important", margin: "0 !important", backgroundColor: "transparent", color: "#23A4AD"}},
                                            }}
                                            onClose={() => reset()}
                                        >
                                            {() => "Copied!"}
                                        </Notification>
                                    ) : "Copy"
                                }
                            </Button>
                        </CustomCard>
                        <CustomCard>
                            <Image src="/images/contact-us/online-chat.webp" alt="chat with us" layout="fixed" width="40px" height="40px" objectFit="contain"/>
                            <Block className={css({textAlign: "center", textTransform: "uppercase"})} color="MinXPrimaryText" as="p" font="MinXParagraph14" marginTop="16px">Online chat</Block>
                            <Block marginBottom="5px" className={css({textAlign: "center"})} color="MinXPrimaryText" as="p" font="MinXHeading14">Talk to a shade specialist</Block>
                            <Button
                                onClick={() => {
                                    document.querySelector(".mobile-chat-container").click();
                                }}
                                startEnhancer={() =>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path
                                            d="M13.4264 4.28751C13.0759 3.45083 12.5659 2.69035 11.9249 2.04845C11.2858 1.40543 10.5266 0.894194 9.69051 0.543764C8.83397 0.183032 7.91366 -0.00187867 6.98426 1.43896e-05H6.95301C6.0077 0.00470188 5.09364 0.192202 4.2327 0.560951C3.40375 0.914974 2.65172 1.42712 2.01864 2.06876C1.38385 2.70922 0.879694 3.46704 0.534269 4.30001C0.175699 5.1662 -0.00598994 6.09536 -0.000105654 7.03282C0.00458184 8.11719 0.263957 9.19376 0.748331 10.1563V12.5313C0.748331 12.9281 1.07021 13.25 1.46552 13.25H3.83739C4.80438 13.7379 5.87146 13.9947 6.95458 14H6.98739C7.92176 14 8.82645 13.8188 9.67957 13.4641C10.5115 13.1178 11.2678 12.6125 11.9061 11.9766C12.5499 11.3375 13.0561 10.5906 13.4108 9.75782C13.778 8.89532 13.9655 7.97813 13.9702 7.03126C13.9733 6.0797 13.7889 5.15626 13.4264 4.28751ZM3.86552 7.75001C3.45302 7.75001 3.11708 7.41407 3.11708 7.00001C3.11708 6.58595 3.45302 6.25001 3.86552 6.25001C4.27802 6.25001 4.61395 6.58595 4.61395 7.00001C4.61395 7.41407 4.27958 7.75001 3.86552 7.75001ZM6.98426 7.75001C6.57176 7.75001 6.23583 7.41407 6.23583 7.00001C6.23583 6.58595 6.57176 6.25001 6.98426 6.25001C7.39676 6.25001 7.7327 6.58595 7.7327 7.00001C7.7327 7.41407 7.39676 7.75001 6.98426 7.75001ZM10.103 7.75001C9.69051 7.75001 9.35457 7.41407 9.35457 7.00001C9.35457 6.58595 9.69051 6.25001 10.103 6.25001C10.5155 6.25001 10.8514 6.58595 10.8514 7.00001C10.8514 7.41407 10.5155 7.75001 10.103 7.75001Z"
                                            fill="white"/>
                                    </svg>
                                }
                                shape={SHAPE.pill}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            paddingLeft: " 24px",
                                            paddingRight: " 24px",
                                            backgroundColor: "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                    },
                                }}
                            >
                                Chat with us
                            </Button>
                        </CustomCard>
                    </Block>
                </Block>
            </Block>
            {/* Contact Form Section */}
            <Block width="100%" backgroundColor="#f7f7f7">
                <Block width="100%" maxWidth="600px" display="flex" flex={1} flexDirection="column" alignItems="center" margin="0 auto" padding={["40px 16px", "100px 16px"]}>
                    <Block marginBottom={["16px", "24px", "24px"]} font={["MinXHeading20", "MinXHeading36"]} color="MinXPrimaryText"><h2 className={css({textAlign: "center", fontWeight: 500})}>Have us contact you</h2></Block>
                    <Block as="form" width="100%" marginTop={["32px", "40px"]} onSubmit={handleContactForm}>
                        <FormControl label={() => <CustomLabel>Interested in</CustomLabel>}
                                     overrides={{
                                         ControlContainer: {style: {marginBottom: "40px"}}
                                     }}
                        >
                            <Block display="grid" gridColumnGap="16px" gridRowGap="16px" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}>
                                <CustomCheckbox checked={formState.interests.includes("custom-print-tent")}
                                                onChange={() => handleInterest("custom-print-tent")}
                                >
                                    <CustomCheckboxLabel active={formState.interests.includes("custom-print-tent")}>Custom printed tent</CustomCheckboxLabel>
                                </CustomCheckbox>
                                <CustomCheckbox checked={formState.interests.includes("canopy-tent")}
                                                onChange={() => handleInterest("canopy-tent")}
                                >
                                    <CustomCheckboxLabel active={formState.interests.includes("canopy-tent")}>Canopy tent</CustomCheckboxLabel>
                                </CustomCheckbox>
                                <CustomCheckbox checked={formState.interests.includes("custom-printed-umbrella")}
                                                onChange={() => handleInterest("custom-printed-umbrella")}
                                >
                                    <CustomCheckboxLabel active={formState.interests.includes("custom-printed-umbrella")}>Custom printed umbrella</CustomCheckboxLabel>
                                </CustomCheckbox>
                                <CustomCheckbox checked={formState.interests.includes("umbrella")}
                                                onChange={() => handleInterest("umbrella")}
                                >
                                    <CustomCheckboxLabel active={formState.interests.includes("umbrella")}>Umbrella</CustomCheckboxLabel>
                                </CustomCheckbox>
                                <CustomCheckbox checked={formState.interests.includes("custom-printed-table-cover")}
                                                onChange={() => handleInterest("custom-printed-table-cover")}
                                >
                                    <CustomCheckboxLabel active={formState.interests.includes("custom-printed-table-cover")}>Custom printed table cover</CustomCheckboxLabel>
                                </CustomCheckbox>
                                <CustomCheckbox checked={formState.interests.includes("other")}
                                                onChange={() => handleInterest("other")}
                                >
                                    <CustomCheckboxLabel active={formState.interests.includes("other")}>Other</CustomCheckboxLabel>
                                </CustomCheckbox>
                            </Block>
                        </FormControl>
                        <FormControl label={() => <CustomLabel>How can we help?</CustomLabel>}
                                     overrides={{
                                         ControlContainer: {style: {marginBottom: "40px"}}
                                     }}
                        >
                            <CustomTextarea id="form-message" customClassname="form-input" required
                                            value={formState.message}
                                            onChange={(e)=> setFormState({...formState, message: e.target.value})}
                            />
                        </FormControl>
                        <FormControl label={() => <CustomLabel>Contact information</CustomLabel>}
                                     overrides={{
                                         ControlContainer: {style: {marginBottom: "40px"}}
                                     }}
                        >
                            <Block display="grid" gridRowGap="16px" gridTemplateColumns="1fr">
                                <Block display="grid" gridColumnGap="16px" gridRowGap="16px" gridTemplateColumns={["1fr", "repeat(2, 1fr)"]}>
                                    <CustomInput
                                        type="text"
                                        value={formState.firstname}
                                        onChange={(e) => setFormState({...formState, firstname: e.target.value})}
                                        error={formError && !!formState.firstname}
                                        required
                                        placeholder="First name"
                                    />
                                    <CustomInput
                                        type="text"
                                        value={formState.lastname}
                                        onChange={(e) => setFormState({...formState, lastname: e.target.value})}
                                        error={formError && !!formState.lastname}
                                        required
                                        placeholder="Last name"
                                    />
                                </Block>
                                <CustomInput
                                    type="text"
                                    value={formState.companyName}
                                    onChange={(e) => setFormState({...formState, companyName: e.target.value})}
                                    error={formError && !!formState.companyName}
                                    placeholder="Company name (optional)"
                                />
                                <CustomInput
                                    type="tel"
                                    value={formState.phone}
                                    onChange={handlePhone}
                                    error={formError && !!formState.phone}
                                    required
                                    placeholder="Phone  (000-000-0000)"
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                />
                                <CustomInput
                                    type="email"
                                    value={formState.email}
                                    onChange={(e) => setFormState({...formState, email: e.target.value})}
                                    error={formError && !!formState.email}
                                    required
                                    placeholder="Email"
                                />
                            </Block>
                        </FormControl>
                        <CustomSubmitButton isLoading={formLoading}>Submit</CustomSubmitButton>
                    </Block>
                </Block>

                {/* form success notification */}
                {
                    formSubmitted &&
                    <Notification
                        onClose={() => setFormSubmitted(false)}
                        autoHideDuration={3000}
                        overrides={{
                            Body: {
                                style: {
                                    position: "fixed",
                                    top: "50%",
                                    left: "50%",
                                    padding: "52px 0 48px",
                                    transform: "translate(-50%, -50%)",
                                    boxShadow: "0px 8px 32px rgba(0, 0, 0, 0.1);",
                                    borderRadius: "16px",
                                    backgroundColor: "#ffffff",
                                    color: "#23A4AD",
                                    width: "auto"
                                }
                            }
                        }}
                    >
                        <Block width={["288px", "288px", "580px"]} backgroundColor="#ffffff" display="flex" flexDirection="column" alignItems="center">
                            <Block width="80px">
                                <Image src="/images/icon/yes.webp" alt="success" layout="responsive" width={80} height={80} objectFit="contain"/>
                            </Block>
                            <Block as="h6" font="MinXHeading24" color="MinXPrimaryText" marginTop="24px">
                                Submitted
                            </Block>
                            <Block as="p" font="MinXParagraph16" color="MinXPrimaryText" marginTop="16px">
                                You will hear from us soon!
                            </Block>
                            <Button
                                onClick={() => setFormSubmitted(false)}
                                shape={SHAPE.pill}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            marginTop: "24px",
                                            paddingTop: "17px",
                                            paddingBottom: "17px",
                                            paddingLeft: " 48px",
                                            paddingRight: " 48px",
                                            color: "#ffffff !important",
                                            backgroundColor: "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                    },
                                }}
                            >
                                Close (3s)
                            </Button>
                        </Block>
                    </Notification>
                }
            </Block>
            {/* End of Contact Form Section */}
            {/* FAQs Section */}
            <Block width="100%" maxWidth="660px" display="grid" gridRowGap={["16px", "24px"]} justifyItems="center" margin="auto" padding={["40px 16px", "100px 16px"]}>
                <Block as="h2" font={["MinXHeading20", "MinXHeading36"]} color="MinXPrimaryText">FAQs</Block>
                <Accordion list={QA}/>
            </Block>
            {/* End of FAQs Section */}
        </>
    )
}

export default Contact_Us;
