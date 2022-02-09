import React, {useEffect, useRef, useState} from "react"

import Image from "next/image"

import {Block} from "baseui/block"
import {DeleteAlt} from 'baseui/icon'

import Button from "../../Button/V1"
// import RoofDetail from "./InputDetails"

const Canvas = ({selected, customized, ...props}) => {
    const parentRef = useRef(null);
    const canvasRef = useRef(null);

    const draw = (canvas) => {
        const ctx = canvas.getContext('2d');

        let th = canvas.width / 2, rh = canvas.width / 6;

        ctx.fillStyle = customized ? "#F5FCFC" : selected ? "#EBF4F5" : "#FFF";
        ctx.strokeStyle = customized ? "#23A4AD" : "#D0D9D9";

        ctx.lineWidth = 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.beginPath();
        ctx.moveTo(0, th);
        ctx.quadraticCurveTo(th * 4 / 7, th * 5 / 8, canvas.width / 2, 1);
        ctx.quadraticCurveTo(canvas.width - (th * 4 / 7), th * 5 / 8, canvas.width, th);
        ctx.lineTo(0, th);
        ctx.rect(1, th, canvas.width - 2, rh - 2);
        ctx.closePath();

        ctx.fill();
        ctx.stroke();
    }

    useEffect(() => {
        if (parentRef.current && parentRef.current.offsetWidth) {
            const canvas = canvasRef.current;

            canvas.width = parentRef.current.offsetWidth;
            canvas.height = parentRef.current.offsetWidth / 1.5;

            //Our draw come here
            draw(canvas);
        }
    });

    return (
        <Block ref={parentRef} {...props}>
            <canvas ref={canvasRef}/>
        </Block>
    );
}

const RequirementSelection = ({steps, prevClick, nextClick, activeSide, activeTentImage, tentFrame, tentSize, setSide, requirement, setRequirement, clearRequirement, error = true}) => {

    // const [peakDetailIsOpen, setPeakDetailsIsOpen] = useState(false);
    // const [valanceDetailIsOpen, setValanceDetailsIsOpen] = useState(false);
    const [frontAngle, setFrontAngle] = useState(true);

    const label = {
        FRONT: "A",
        RIGHT: "B",
        BACK: "C",
        LEFT: "D",
    };

    const clearDetails = () => clearRequirement(activeSide);

    const saveEntries = (parts) => {
        const defaultParts = ["peak", "valance"];

        let inputState = [];

        parts.map((part, index) => {
            let state = {
                text: {
                    content: "custom print"
                }
            };

            if (part === defaultParts[index]) {
                inputState[index] = state;
            } else {
                inputState[index] = {};
            }
        })

        setRequirement(defaultParts, activeSide, inputState, inputState.applyToFullSide);
    }

    return (
        <>
            <Block display="grid" gridTemplateColumns={["1fr", null, null, "repeat(2, 1fr)"]} gridTemplateRows={["repeat(2, max-content)", null, null, "1fr"]} height="100%" alignItems="flex-start">
                {/*Image Section*/}
                <Block position="relative" height="100%" padding={["0 16px", null, null, "80px 20px 24px calc(50vw - " + (process.env.maxWidth / 2 - 20) + "px)"]} backgroundColor="#F7F7F7">
                    <Block position="relative" display="grid" gridTemplateColumns="1fr" gridRowGap="8px" justifyItems="center" width="100%" maxWidth="410px" margin="auto">
                        <Block position="relative" width="100%">
                            <Image src={frontAngle ? activeTentImage : `${activeTentImage.split(".")[0]}-FLIPPED.webp`} alt="custom tent" width={1024} height={1024} layout="responsive" objectFit="contain"/>
                            {Object.keys(label).map((side, index) => {
                                    return (
                                        <Block key={index}>
                                            {/*{Object.keys(label)[index] === activeSide && Object.keys(requirement.peak[side]).length === 0 && Object.keys(requirement.valance[side]).length === 0 &&*/}
                                            {/*    <>*/}
                                            {/*        <Block key={side + "PEAK-Select"} position="absolute" top="0" left="0" width="100%" height="100%">*/}
                                            {/*            <Image src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/1-selected/PEAK-${label[Object.keys(label)[frontAngle ? index : (index + 2) % 4]]}.webp`}*/}
                                            {/*                   alt="selected peak" width={1024} height={1024} layout="responsive"*/}
                                            {/*            />*/}
                                            {/*        </Block>*/}
                                            {/*        <Block key={side + "VALANCE-Select"} position="absolute" top="0" left="0" width="100%" height="100%">*/}
                                            {/*            <Image src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/1-selected/VALANCE-${label[Object.keys(label)[frontAngle ? index : (index + 2) % 4]]}.webp`}*/}
                                            {/*                   alt="selected valance" width={1024} height={1024} layout="responsive"*/}
                                            {/*            />*/}
                                            {/*        </Block>*/}
                                            {/*    </>*/}
                                            {/*}*/}
                                            {/*Peak Images*/}
                                            {Object.keys(requirement.peak[side]).length !== 0 &&
                                                <Block key={side + "PEAK"} position="absolute" top="0" left="0" width="100%" height="100%">
                                                    <Image src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "2-front-view-ab" : "3-back-view-cd"}/PEAK-${label[side]}.webp`}
                                                           alt="peak" width={1024} height={1024} layout="responsive"
                                                    />
                                                </Block>}
                                            {/*Valance Images*/}
                                            {Object.keys(requirement.valance[side]).length !== 0 &&
                                                <Block key={side + "VALANCE"} position="absolute" top="0" left="0" width="100%" height="100%">
                                                    <Image src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "2-front-view-ab" : "3-back-view-cd"}/VALANCE-${label[side]}.webp`}
                                                           alt="valance" width={1024} height={1024} layout="responsive"
                                                    />
                                                </Block>}
                                        </Block>)
                                }
                            )}
                        </Block>
                        <Button type="outline" bundle="gray" position={["absolute", null, null, "relative"]} bottom={["8px", null, null, 0]} right={0} height="32px" font="MinXParagraph14" color="#808080"
                                startEnhancer={() => <Image src="/images/icon/icon-angle.png" width={16} height={16} alt="icon angle" layout="fixed"/>}
                                buttonStyle={{
                                    paddingTop: "8px !important",
                                    paddingRight: "12px !important",
                                    paddingBottom: "8px !important",
                                    paddingLeft: "12px !important",
                                    borderColor: "#F0F0F0 !important",
                                    backgroundColor: "#FFF !important",
                                    borderTopLeftRadius: "8px !important",
                                    borderTopRightRadius: "8px !important",
                                    borderBottomLeftRadius: "8px !important",
                                    borderBottomRightRadius: "8px !important",
                                    fontWeight: "500 !important",
                                }}
                                text="Flip"
                                onClick={() => setFrontAngle(!frontAngle)}
                        />
                    </Block>
                </Block>
                {/*Selection Section*/}
                <Block position="relative" height="100%" padding={["16px", null, null, "20px calc(50vw - " + (process.env.maxWidth / 2 - 20) + "px) 24px 20px"]}>
                    <Block display={["none", null, null, "flex"]} alignItems="center" justifyContent="flex-end" marginBottom="16px" paddingRight={["16px", null, null, "20px"]} font="MinXParagraph16" color="MinXSecondaryText"
                           $style={{gap: "16px"}}>
                        <Button type="outline" bundle="primary" width="108px" height="36px" text="Previous" onClick={() => prevClick()} disabled={steps.currentStep === 0}
                                buttonStyle={{
                                    color: steps.currentStep === 0 ? "#BFBFBF !important" : "#23A4AD !important",
                                    borderColor: "#BFBFBF !important",
                                }}
                        />
                        <Button bundle="primary" width="108px" height="36px" text="Next" onClick={() => nextClick()}/>
                    </Block>
                    <Block maxWidth="364px" margin="auto" padding="6px"
                        // maxWidth="355px"
                           $style={{
                               borderTopLeftRadius: "16px",
                               borderTopRightRadius: "16px",
                               borderBottomLeftRadius: "16px",
                               borderBottomRightRadius: "16px",
                               borderTopWidth: "1px",
                               borderBottomWidth: "1px",
                               borderLeftWidth: "1px",
                               borderRightWidth: "1px",
                               borderTopStyle: "solid",
                               borderBottomStyle: "solid",
                               borderLeftStyle: "solid",
                               borderRightStyle: "solid",
                               borderColor: error ? "#EB512A" : "transparent",
                           }}
                    >
                        <Block className="text-center" display="grid" gridTemplateColumns="1fr" gridRowGap={["16px", null, null, "24px"]}>
                            <Block font={["MinXTitle14", "MinXTitle14", "MinXTitle14", "MinXTitle16"]} color="MinXTitle" $style={{fontWeight: "400 !important"}}>Please select the wall you’d like to print.</Block>
                            <Block position="relative" width={["200px", null, null, "272px"]} height={["200px", null, null, "272px"]} margin="auto">
                                {Object.keys(label).map((side, index) => {
                                    return (
                                        <Block key={side} position="absolute" bottom={0} left="50%" display="flex" flexDirection="column" width="fit-content" paddingTop="2px"
                                               $style={{transform: "translate(-50%, 0) rotate(-" + index * 90 + "deg)", transformOrigin: "50% 0"}}
                                        >
                                            <Canvas width={["60px", null, null, "90px"]} selected={activeSide === side} customized={Object.keys(requirement.peak[side]).length > 0 || Object.keys(requirement.valance[side]).length > 0}
                                                    $style={{aspectRatio: "1.5"}}
                                            />
                                            <Button shape="circle" width="52px" height="52px" marginTop={["3px", null, null, "19px"]} marginRight="auto" marginLeft="auto" font="MinXLabel20"
                                                    buttonStyle={{
                                                        backgroundColor: activeSide === side ? "#23A4AD" : "#F0F0F0 !important",
                                                        color: activeSide === side ? "white" : "#262626 !important",
                                                        borderTopWidth: "1px",
                                                        borderRightWidth: "1px",
                                                        borderBottomWidth: "1px",
                                                        borderLeftWidth: "1px",
                                                        borderTopStyle: "solid",
                                                        borderRightStyle: "solid",
                                                        borderBottomStyle: "solid",
                                                        borderLeftStyle: "solid",
                                                        borderColor: "#BFBFBF",
                                                        paddingRight: "0 !important",
                                                        paddingLeft: "0 !important",
                                                        transform: "rotate(" + index * 90 + "deg)"
                                                    }}
                                                    buttonHoverStyle={{
                                                        backgroundColor: activeSide === side ? "#23A4AD" : "transparent !important",
                                                        color: activeSide === side ? "white" : "#262626 !important",
                                                    }}
                                                    text={label[side]}
                                                    onClick={() => setSide({activeSide: side})}
                                            />
                                        </Block>
                                    );
                                })}
                            </Block>
                            <Block display={activeSide ? "block" : "none"} font={["MinXTitle14", "MinXTitle14", "MinXTitle14", "MinXTitle16"]} color="MinXTitle" $style={{fontWeight: "400 !important"}}>Please select the type of wall.</Block>
                            <Block display={activeSide ? "grid" : "none"} gridTemplateColumns="1fr 1fr 1fr" gridColumnGap={["16px", null, null, "24px"]}>
                                <Block position="relative">
                                    <Button type="outline" bundle="gray" width="100%" height="82px" font="MinXParagraph14"
                                            buttonStyle={{
                                                paddingTop: "16px !important",
                                                paddingRight: "16px !important",
                                                paddingBottom: "16px !important",
                                                paddingLeft: "16px !important",
                                                borderColor: activeSide ? Object.keys(requirement.peak[activeSide]).length > 0 && Object.keys(requirement.valance[activeSide]).length === 0 ? "#23A4AD !important" : "#D9D9D9 !important" : "#D9D9D9 !important",
                                                backgroundColor: "#F0F0F0 !important",
                                                borderTopLeftRadius: "16px !important",
                                                borderTopRightRadius: "16px !important",
                                                borderBottomLeftRadius: "16px !important",
                                                borderBottomRightRadius: "16px !important",
                                            }}
                                            buttonActiveStyle={{
                                                backgroundColor: "#D9D9D9 !important",
                                            }}
                                            color={activeSide ? Object.keys(requirement.peak[activeSide]).length > 0 && Object.keys(requirement.valance[activeSide]).length === 0 ? "#FAFAFA" : "#8C8C8C" : "#8C8C8C"}
                                            onClick={() => saveEntries(["peak", ""])}
                                    >
                                        <Block display="block" alignItems="center">
                                            <Image src="/images/icon/icon-peak.png" alt="icon peak" width={40} height={20} layout="fixed" objectFit="contain"/>
                                            <Block marginTop="8px" font="MinXParagraph14" color="MinXPrimaryText" $style={{textTransform: "capitalize"}}>Peak</Block>
                                        </Block>
                                    </Button>
                                    <Button shape="circle" width="16px" height="16px" position="absolute" top="-4px" right="-4px" font="MinXLabel20"
                                            buttonStyle={{
                                                backgroundColor: "#000 !important",
                                                color: "white",
                                                paddingRight: "0 !important",
                                                paddingLeft: "0 !important",
                                            }}
                                            buttonHoverStyle={{
                                                backgroundColor: "#000 !important",
                                                color: "white",
                                            }}
                                            iconStyle={{
                                                marginRight: 0
                                            }}
                                            startEnhancer={<DeleteAlt color="white" size={32}/>}
                                            onClick={() => clearDetails()}
                                    />
                                </Block>
                                <Block position="relative">
                                    <Button type="outline" width="100%" height="82px" font="MinXParagraph14"
                                            buttonStyle={{
                                                paddingTop: "16px !important",
                                                paddingRight: "16px !important",
                                                paddingBottom: "16px !important",
                                                paddingLeft: "16px !important",
                                                borderColor: activeSide ? Object.keys(requirement.valance[activeSide]).length > 0 && Object.keys(requirement.peak[activeSide]).length === 0 ? "#23A4AD !important" : "#D9D9D9 !important" : "#D9D9D9 !important",
                                                backgroundColor: "#F0F0F0 !important",
                                                borderTopLeftRadius: "16px !important",
                                                borderTopRightRadius: "16px !important",
                                                borderBottomLeftRadius: "16px !important",
                                                borderBottomRightRadius: "16px !important",
                                            }}
                                            buttonActiveStyle={{
                                                backgroundColor: "#D9D9D9 !important",
                                            }}
                                            color={activeSide ? Object.keys(requirement.valance[activeSide]).length > 0 && Object.keys(requirement.peak[activeSide]).length === 0 ? "#FAFAFA" : "#8C8C8C" : "#8C8C8C"}
                                            onClick={() => saveEntries(["", "valance"])}
                                    >
                                        <Block display="block" alignItems="center">
                                            <Image src="/images/icon/icon-valance.png" alt="icon valance" width={40} height={12} layout="fixed" objectFit="contain"/>
                                            <Block marginTop="8px" font="MinXParagraph14" color="MinXPrimaryText" $style={{textTransform: "capitalize"}}>Valance</Block>
                                        </Block>
                                    </Button>
                                    <Button shape="circle" width="16px" height="16px" position="absolute" top="-4px" right="-4px" font="MinXLabel20"
                                            buttonStyle={{
                                                backgroundColor: "#000 !important",
                                                color: "white",
                                                paddingRight: "0 !important",
                                                paddingLeft: "0 !important",
                                            }}
                                            buttonHoverStyle={{
                                                backgroundColor: "#000 !important",
                                                color: "white",
                                            }}
                                            iconStyle={{
                                                marginRight: 0
                                            }}
                                            startEnhancer={<DeleteAlt color="white" size={32}/>}
                                            onClick={() => clearDetails()}
                                    />
                                </Block>
                                <Block position="relative">
                                    <Button type="outline" width="100%" height="82px" font="MinXParagraph14"
                                            buttonStyle={{
                                                paddingTop: "16px !important",
                                                paddingRight: "16px !important",
                                                paddingBottom: "16px !important",
                                                paddingLeft: "16px !important",
                                                borderColor: activeSide ? Object.keys(requirement.peak[activeSide]).length > 0 && Object.keys(requirement.valance[activeSide]).length > 0 ? "#23A4AD !important" : "#D9D9D9 !important" : "#D9D9D9 !important",
                                                backgroundColor: "#F0F0F0 !important",
                                                borderTopLeftRadius: "16px !important",
                                                borderTopRightRadius: "16px !important",
                                                borderBottomLeftRadius: "16px !important",
                                                borderBottomRightRadius: "16px !important",
                                            }}
                                            buttonActiveStyle={{
                                                backgroundColor: "#D9D9D9 !important",
                                            }}
                                            color={activeSide ? Object.keys(requirement.peak[activeSide]).length > 0 && Object.keys(requirement.valance[activeSide]).length > 0 ? "#FAFAFA" : "#8C8C8C" : "#8C8C8C"}
                                            onClick={() => saveEntries(["peak", "valance"])}
                                    >
                                        <Block display="block" alignItems="center">
                                            <Block display="flex" flexDirection="column" alignItems="center">
                                                <Image src="/images/icon/icon-peak.png" alt="icon peak" width={40} height={20} layout="fixed" objectFit="contain"/>
                                                <Image src="/images/icon/icon-valance.png" alt="icon valance" width={40} height={12} layout="fixed" objectFit="contain"/>
                                            </Block>
                                            <Block marginTop="2px" font="MinXParagraph14" color="MinXPrimaryText" $style={{textTransform: "capitalize"}}>Peak && Valance</Block>
                                        </Block>
                                    </Button>
                                    <Button shape="circle" width="16px" height="16px" position="absolute" top="-4px" right="-4px" font="MinXLabel20"
                                            buttonStyle={{
                                                backgroundColor: "#000 !important",
                                                color: "white",
                                                paddingRight: "0 !important",
                                                paddingLeft: "0 !important",
                                            }}
                                            buttonHoverStyle={{
                                                backgroundColor: "#000 !important",
                                                color: "white",
                                            }}
                                            iconStyle={{
                                                marginRight: 0
                                            }}
                                            startEnhancer={<DeleteAlt color="white" size={32}/>}
                                            onClick={() => clearDetails()}
                                    />
                                </Block>
                            </Block>
                            {/*<Block display={activeSide ? (Object.keys(requirement.peak[activeSide]).length > 0 || Object.keys(requirement.valance[activeSide]).length > 0) ? "block" : "none" : "none"} margin="56px auto auto">*/}
                            {/*    <Button type="outline" width="120px" height="48px" font="MinXParagraph14"*/}
                            {/*            buttonStyle={{*/}
                            {/*                paddingRight: "24px !important",*/}
                            {/*                paddingLeft: "24px !important",*/}
                            {/*                borderColor: "#D9D9D9 !important",*/}
                            {/*                backgroundColor: "transparent !important",*/}
                            {/*                borderTopLeftRadius: "60px !important",*/}
                            {/*                borderTopRightRadius: "60px !important",*/}
                            {/*                borderBottomLeftRadius: "60px !important",*/}
                            {/*                borderBottomRightRadius: "60px !important",*/}
                            {/*            }}*/}
                            {/*            buttonActiveStyle={{*/}
                            {/*                backgroundColor: "#D9D9D9 !important",*/}
                            {/*            }}*/}
                            {/*            startEnhancer={() => <Image src="/images/icon/icon-delete.png" alt="delete" width={22} height={22} layout="fixed"/>}*/}
                            {/*            text="Reset"*/}
                            {/*            color="#262626"*/}
                            {/*            onClick={() => clearDetails()}*/}
                            {/*    />*/}
                            {/*</Block>*/}
                        </Block>
                    </Block>
                    {error && <Block maxWidth="355px" margin="auto" paddingTop="2px" font="MinXParagraph14" color="#EB512A">Please select the sides you’d like to print and tell us your printing requirements.</Block>}
                </Block>
            </Block>
            {/*<Block position="fixed" top="0" left="0" width={peakDetailIsOpen || valanceDetailIsOpen ? "100vw" : "0"} height={peakDetailIsOpen || valanceDetailIsOpen ? "100vh" : "0"} overflow="hidden"*/}
            {/*       $style={{zIndex: peakDetailIsOpen || valanceDetailIsOpen ? "100" : "unset"}}*/}
            {/*>*/}
            {/*    <Block position="relative" width="100%" height="100%" backgroundColor="white" overflow="scrollY">*/}
            {/*        {(peakDetailIsOpen && !valanceDetailIsOpen) &&*/}
            {/*            <RoofDetail part="peak" requirement={requirement} side={activeSide} setRequirement={setRequirement} cancelAction={() => setPeakDetailsIsOpen(false)}/>*/}
            {/*        }*/}
            {/*        {(valanceDetailIsOpen && !peakDetailIsOpen) &&*/}
            {/*            <RoofDetail part="valance" requirement={requirement} side={activeSide} setRequirement={setRequirement} cancelAction={() => setValanceDetailsIsOpen(false)}/>*/}
            {/*        }*/}
            {/*    </Block>*/}
            {/*</Block>*/}
        </>
    )
}

export default RequirementSelection;
