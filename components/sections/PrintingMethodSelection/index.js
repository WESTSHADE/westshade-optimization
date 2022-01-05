import React, {useState} from "react"
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image"

import {Block} from "baseui/block"

import Button from "../../button-n"
import {Modal} from "../../surfaces"

const PrintingMethodCard = ({method, active, onClick}) => {
    const createCopy = (copy) => {
        return {__html: copy}
    }

    return (
        <>
            <Block className="cursor text-center" height="inherit" padding={[active ? "14px" : "16px", null, active ? "22px 30px" : "24px 32px"]} backgroundColor="#FAFAFA"
                   display="flex" flexDirection="column" justifyContent="space-between"
                   $style={{
                       borderTopLeftRadius: "16px",
                       borderTopRightRadius: "16px",
                       borderBottomLeftRadius: "16px",
                       borderBottomRightRadius: "16px",
                       borderBottomStyle: "solid",
                       borderTopStyle: "solid",
                       borderRightStyle: "solid",
                       borderLeftStyle: "solid",
                       borderTopWidth: active ? "3px" : "1px",
                       borderBottomWidth: active ? "3px" : "1px",
                       borderLeftWidth: active ? "3px" : "1px",
                       borderRightWidth: active ? "3px" : "1px",
                       borderColor: active ? "#23A4AD" : "#D9D9D9",
                       transition: "all .15s ease-in-out"
                   }}
                   onClick={onClick}
            >
                <Block>
                    <Block width="100%" paddingBottom={["8px", null, "16px"]} font="MinXParagraph20" color="MinXTitle" $style={{fontWeight: 500, borderBottom: "1px solid #D9D9D9"}}>{method.label}</Block>
                    <Block display="grid" gridRowGap={["10px", null, "24px"]} padding={["8px 0", null, "16px 0"]}>
                        <Block>
                            <Block font="MinXParagraph14" color="MinXSecondaryText">Color Fastness</Block>
                            <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading17"]}><Block as="span" marginRight="4px" color="MinXButton">{method.fastness}</Block>years*</Block>
                        </Block>
                        <Block>
                            <Block font="MinXParagraph14" color="MinXSecondaryText">Thickness</Block>
                            <Block width="70px" margin="8px auto">
                                <Image src={method.thicknessImage} height={22} width={78} layout="responsive" objectFit="contain"/>
                            </Block>
                            <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading17"]} $style={{textTransform: "capitalize"}}>{method.thickness}</Block>
                        </Block>
                        <Block>
                            <Block font="MinXParagraph16" color="MinXSecondaryText">Fabric</Block>
                            <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading17"]} dangerouslySetInnerHTML={createCopy(method.fabric)}/>
                        </Block>
                    </Block>
                </Block>
                <Block>
                    <Block position="relative" width="100%" height={["140px", null, "180px"]} $style={{borderRadius: "16px", overflow: "hidden"}}>
                        <Image src={method.image} width={1191} height={810} alt={method.label} layout="fill" objectFit="cover"/>
                    </Block>
                    {method?.fabricPrinted && <Block marginTop="2px" font="MinXParagraph12" color="MinXTitle">This sample is printed on {method.fabricPrinted} fabric.</Block>}
                </Block>
                <Button type="outline" width="100%" height="48px" marginTop="16px" font="MinXParagraph14" color="MinXPrimaryText" text="Select" buttonStyle={{borderColor: "#BFBFBF"}} onClick={onClick}/>
            </Block>
        </>
    )
}

const PrintingMethodSelection = ({printingMethods, printingMethodValue, setMethod}) => {
    const [showPrintingTechnology, setShowPrintingTechnology] = useState(false);

    return (
        <>
            <Block display="grid" gridRowGap="8px" width="100%" maxWidth={process.env.maxWidth + "px"} margin="auto" padding={["16px", null, null, "24px 20px"]}>
                <Block font="MinXParagraph16" color="MinXTitle" $style={{fontWeight: 500}}>Please select the printing method.</Block>
                <Block display="flex" justifyContent="space-between" alignItems="center" font="MinXParagraph16" color="MinXSecondaryText">
                    <Block>{printingMethods.length} methods available</Block>
                    <Button type="solid" height="32px" text='Compare' color="MinXSecondaryText" buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)" onClick={() => setShowPrintingTechnology(true)}/>
                </Block>
                <Block display="flex" paddingTop="20px">
                    <Block display={["none", null, "block"]} flex={1}>
                        <Block display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap={["20px", null, "40px"]}>
                            {printingMethods.map((method) =>
                                <PrintingMethodCard key={method.value} method={method} active={printingMethodValue === method.value} onClick={() => setMethod({pMethod: method.value})}/>
                            )}
                        </Block>
                    </Block>
                    <Block display={["block", null, "none"]} width="100vw" marginRight={["-16px", null, null, "-20px"]} marginLeft={["-16px", null, null, "-20px"]}>
                        <Carousel className="custom-printing-canopy-tent-frame-carousel" autoPlay={false} showStatus={false} showThumbs={false} showArrows={false} emulateTouch width="100vw">
                            {printingMethods.map((method) => (
                                <Block key={method.value} height="100%" margin={["0 16px", null, null, "0 20px"]} paddingTop="24px">
                                    <PrintingMethodCard method={method} active={printingMethodValue === method.value} onClick={() => setMethod({pMethod: method.value})}/>
                                </Block>
                            ))}
                        </Carousel>
                    </Block>
                </Block>
            </Block>
            <Block className="text-center" marginTop="16px" font="MinXParagraph12" color="#8C8C8C" bottom="0" left="0">*Color fastness depends on usage and weather condition.</Block>
            <Modal type="alertdialog" isOpen={showPrintingTechnology} onClose={() => setShowPrintingTechnology(false)} content="technique" dialogStyles={{transform: "translateY(0) !important"}}/>
        </>
    )
}

export default PrintingMethodSelection
