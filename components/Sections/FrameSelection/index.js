import React, {useEffect, useState} from "react"
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import Image from "next/image"

import {Block} from "baseui/block"

import Button from "../../Button/V1";
import {Modal} from "../../surfaces"

const FrameTypeCard = ({frame, framePrice, active, onClick}) => {
    return (
        <>
            <Block className="cursor text-left" height="inherit" padding={active ? "22px 14px" : "24px 16px"} backgroundColor="#FAFAFA"
                   display="flex" flexDirection="column" justifyContent="space-between"
                   $style={{
                       gap: "8px",
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
                       transition: "all 250ms ease-in-out"
                   }}
                   onClick={onClick}
            >
                <Block display="grid" gridRowGap="24px" justifyItems="center">
                    <Block width="150px" height="150px">
                        <Image src={frame.image} width={800} height={800} alt={frame.label} layout="responsive" objectFit="contain"/>
                    </Block>
                    <Block display="grid" gridRowGap="8px">
                        <Block font="MinXSubtitle20">{frame.label}</Block>
                        <Block font="MinXParagraph16">{frame.description}</Block>
                    </Block>
                </Block>
                <Block display="grid" gridRowGap={["16px", null, "24px"]} width="100%">
                    <Block font="MinXSubtitle20">+ ${framePrice.price || frame.price}</Block>
                    {/*<Button type="outline" color="MinXPrimaryText" width="100%" height="48px" font="MinXParagraph14" text={`Select ${frame.value}`}*/}
                    {/*        buttonStyle={{*/}
                    {/*            borderColor: "#BFBFBF"*/}
                    {/*        }}*/}
                    {/*        onClick={onClick}*/}
                    {/*/>*/}
                </Block>
            </Block>
        </>
    )
}

const FrameSelection = ({steps, prevClick, nextClick, frameTypes, acceptedFrameTypes = [], framePrices, frameValue, setFrame}) => {
    const [showFrameCompare, setShowFrameCompare] = useState(false);
    const [frames, setFrames] = useState([]);

    useEffect(() => {
        let types = frameTypes.filter((item) => {
            if (acceptedFrameTypes.includes(item.value)) return item
        })
        setFrames(types)
    }, [frameTypes, acceptedFrameTypes])

    return (
        <>
            <Block display="grid" gridRowGap="16px" width="100%" maxWidth={process.env.maxWidth + "px"} margin="auto" padding={["16px", null, null, "24px 20px"]}>
                <Block font="MinXParagraph16" color="MinXTitle" $style={{fontWeight: 500}}>Please select the frame of the tent.</Block>
                <Block display="flex" flexDirection={["row", null, null, "column"]} justifyContent="space-between" alignItems="flex-start" font="MinXParagraph16" color="MinXSecondaryText" $style={{gap: "16px"}}>
                    <Block>{frameTypes.length} frames available</Block>
                    <Block display="flex" width={[null, null, null, "100%"]} justifyContent="space-between" alignItems="center">
                        <Button type="solid" height="32px" text='Compare' color="MinXSecondaryText" buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)" onClick={() => setShowFrameCompare(true)}/>
                        <Block display={["none", null, null, "flex"]} alignItems="center" $style={{gap: "16px"}}>
                            <Button type="outline" bundle="primary" width="108px" height="36px" text="Previous" onClick={() => prevClick()} disabled={steps.currentStep === 0}
                                    buttonStyle={{
                                        color: steps.currentStep === 0 ? "#BFBFBF !important" : "#23A4AD !important",
                                        borderColor: "#BFBFBF !important",
                                    }}
                            />
                            <Button bundle="primary" width="108px" height="36px" text="Next" onClick={() => nextClick()}/>
                        </Block>
                    </Block>
                </Block>
                <Block display="flex" paddingTop="20px">
                    <Block display={["none", null, "block"]} flex={1}>
                        <Block display="grid" gridTemplateColumns="repeat(3, 1fr)" gridColumnGap="20px">
                            {frames?.map((frame, idx) =>
                                <FrameTypeCard key={frame.value} frame={frame} framePrice={framePrices[idx]} active={frameValue === frame.value} onClick={() => setFrame({frame: frame.value})}/>
                            )}
                        </Block>
                    </Block>
                    <Block display={["block", null, "none"]} width="100vw" marginRight={["-16px", null, null, "-20px"]} marginLeft={["-16px", null, null, "-20px"]}>
                        <Carousel className="custom-printing-canopy-tent-frame-carousel" autoPlay={false} showStatus={false} showThumbs={false} showArrows={false} emulateTouch width="100vw">
                            {frames?.map((frame, idx) => (
                                <Block key={frame.value} height="100%" margin={["0 16px", null, null, "0 20px"]} paddingTop="24px">
                                    <FrameTypeCard frame={frame} framePrice={framePrices[idx]} active={frameValue === frame.value} onClick={() => setFrame({frame: frame.value})}/>
                                </Block>
                            ))}
                        </Carousel>
                    </Block>
                </Block>
            </Block>
            <Modal type="alertdialog" isOpen={showFrameCompare} onClose={() => setShowFrameCompare(false)} content="frame_canopy"/>
        </>
    )
}

export default FrameSelection
