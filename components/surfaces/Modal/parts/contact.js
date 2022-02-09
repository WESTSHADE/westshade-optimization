import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Notification} from "baseui/notification";

import useCopyToClipboard from "../../../../hooks/useCopyToClipboard";

export default function Content({phone}) {
    const [copied, copyEmail, reset] = useCopyToClipboard("support@westshade.com");

    return (
        <Block className="text-center" width="100%" maxWidth="720px" margin="auto" paddingTop={["32px", null, "40px"]} paddingBottom={["32px", null, "96px"]} color="MinXPrimaryText">
            <Block as="h1" marginBottom="32px" font={["MinXHeading16", "MinXHeading16", "MinXHeading20"]} $style={{fontWeight: "500 !important"}}>Have questions? Ask an expert.</Block>
            <Block display={["none", null, "block"]} maxWidth="334px" margin="auto auto 64px" font="MinXParagraph14">
                We are here to help you from <span style={{fontWeight: "700"}}>8:30 AM</span> - <span style={{fontWeight: "700"}}>5:30 PM</span> PST, <span style={{fontWeight: "700"}}>Monday to Friday</span> (except holidays and
                weekends).
            </Block>
            <Block display="grid" gridTemplateColumns="repeat(3, 1fr)" gridColumnGap={["16px", null, "30px"]} gridRowGap="24px">
                <Block position="relative">
                    <Image src="/images/contact-us/call-us.webp" alt="call us" layout="fixed" width="40px" height="40px" objectFit="contain"/>
                    <Block display={["none", null, "flex"]} marginTop="16px" marginBottom="4px" flexDirection={["column", null, "column-reverse"]} $style={{gap: "4px"}}>
                        <Block as="p" font="MinXHeading14">{phone}</Block>
                        <Block as="p" font="MinXParagraph14" $style={{textTransform: "uppercase"}}>Call us</Block>
                    </Block>
                    <Block display={["none", null, "block"]}>
                        <Button onClick={() => {
                        }}
                                startEnhancer={() =>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M15.4999 10.8833L11.1083 10.375L9.00825 12.475C6.64992 11.275 4.71659 9.35 3.51659 6.98333L5.62492 4.875L5.11659 0.5H0.524919C0.0415854 8.98333 7.01659 15.9583 15.4999 15.475V10.8833Z"
                                              fill="#FAFAFA"/>
                                    </svg>
                                }
                                shape={SHAPE.pill}
                                $as="a"
                                href={"tel:+1-" + phone}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            height: "24px",
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
                    </Block>
                    <Block display={["block", null, "none"]} font="MinXParagraph14">
                        <Button onClick={() => {
                        }}
                                shape={SHAPE.pill}
                                $as="a"
                                href={"tel:+1-" + phone}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            width: "100%",
                                            height: "24px",
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            fontSize: "inherit",
                                            color: "#ffffff !important",
                                            backgroundColor: "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                    },
                                }}
                        >
                            Call us
                        </Button>
                    </Block>
                </Block>
                <Block position="relative">
                    <Image src="/images/contact-us/email-us.webp" alt="email us" layout="fixed" width="40px" height="40px" objectFit="contain"/>
                    <Block display={["none", null, "flex"]} marginTop="16px" marginBottom="4px" flexDirection={["column", null, "column-reverse"]} $style={{gap: "4px"}}>
                        <Block as="p" font="MinXHeading14">support@westshade.com</Block>
                        <Block as="p" font="MinXParagraph14" $style={{textTransform: "uppercase"}}>Email us</Block>
                    </Block>
                    <Block display={["none", null, "block"]}>
                        <Button onClick={copyEmail}
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
                                            height: "24px",
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
                    </Block>
                    <Block display={["block", null, "none"]} font="MinXParagraph14">
                        <Button onClick={copyEmail}
                                shape={SHAPE.pill}
                                disabled={copied}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            width: "100%",
                                            height: "24px",
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            fontSize: "inherit",
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
                    </Block>
                </Block>
                <Block position="relative">
                    <Image src="/images/contact-us/online-chat.webp" alt="chat with us" layout="fixed" width="40px" height="40px" objectFit="contain"/>
                    <Block display={["none", null, "flex"]} marginTop="16px" marginBottom="4px" flexDirection={["column", null, "column-reverse"]} $style={{gap: "4px"}}>
                        <Block as="p" font="MinXHeading14">Talk to a shade specialist</Block>
                        <Block as="p" font="MinXParagraph14" $style={{textTransform: "uppercase"}}>Online chat</Block>
                    </Block>
                    <Block display={["none", null, "block"]}>
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
                                        height: "24px",
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
                            Chat
                        </Button>
                    </Block>
                    <Block display={["block", null, "none"]} font="MinXParagraph14">
                        <Button onClick={() => document.querySelector(".mobile-chat-container").click()}
                                shape={SHAPE.pill}
                                overrides={{
                                    BaseButton: {
                                        style: ($theme) => ({
                                            width: "100%",
                                            height: "24px",
                                            paddingTop: "4.5px",
                                            paddingBottom: "4.5px",
                                            fontSize: "inherit",
                                            backgroundColor: "#23A4AD",
                                            ":hover": {backgroundColor: "#5FBDBE"}
                                        })
                                    },
                                }}
                        >
                            Chat
                        </Button>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}
