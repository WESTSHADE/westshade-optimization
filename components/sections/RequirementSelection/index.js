import React, {useEffect, useRef, useState} from "react"

import Image from "next/image"

import {Block} from "baseui/block"

import Button from "../../button-n"
import RoofDetail from "./InputDetails"

const Canvas = ({selected, customized, ...props}) => {
    const parentRef = useRef(null);
    const canvasRef = useRef(null)

    const draw = (canvas) => {
        const ctx = canvas.getContext('2d');

        let th = canvas.width / 2, rh = canvas.width / 6;

        ctx.fillStyle = customized ? "#F5FCFC" : selected ? "#EBF4F5" : "#FFF";
        ctx.strokeStyle = customized ? "#23A4AD" : "#D0D9D9";

        ctx.lineWidth = 2;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.moveTo(0, th);
        ctx.quadraticCurveTo(th * 5 / 7, th * 5 / 7, canvas.width / 2, 1);
        ctx.quadraticCurveTo(canvas.width - (th * 5 / 7), th * 5 / 7, canvas.width, th);
        ctx.lineTo(0, th);
        ctx.rect(1, th, canvas.width - 2, rh - 2);

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

const RequirementSelection = ({activeSide, activeTentImage, tentFrame, tentSize, setSide, requirement, setRequirement, error = true}) => {
    const [peakDetailIsOpen, setPeakDetailsIsOpen] = useState(false);
    const [valanceDetailIsOpen, setValanceDetailsIsOpen] = useState(false);
    const [frontAngle, setFrontAngle] = useState(true);
    const [mainImage, setMainImage] = useState(activeTentImage.src)

    const label = {
        FRONT: "A",
        RIGHT: "B",
        BACK: "C",
        LEFT: "D",
    };

    const clearDetails = (type) => {
        setRequirement(type, activeSide, {});
    }

    // useEffect(() => {
    //     if (tentSize && tentFrame) {
    //         let basePath = "/images/custom-printed-canopy-tent/tents"
    //         let imagePath = `${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-${tentSize.toLowerCase()}${frontAngle ? "" : "-FLIPPED"}.webp`
    //         setMainImage(`${basePath}/${imagePath}`)
    //     }
    // }, [frontAngle])

    return (
        <>
            <Block width="100%">
                <Block width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Block font={["MinXTitle14", "MinXTitle16", "MinXTitle14", "MinXTitle16"]} color="MinXTitle">
                        Please select the wall you’d like to print.
                    </Block>
                </Block>
                <Block marginTop="40px" width="100%">
                    <Block maxWidth={["350px", "350px", "487px"]} width="100%" margin="0 auto" position="relative" display="flex" justifyContent="center">
                        <Block width="100%" display="flex" flexDirection="column" alignItems="center">
                            <Block position="relative" width={["220px", "320px"]} height={["220px", "320px"]}>
                                <Image src={mainImage || activeTentImage} alt="custom tent" width={220} height={220} layout="responsive" objectFit="contain"/>
                                {
                                    Object.keys(requirement.peak["FRONT"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-PEAK${tentSize.split("x")[1]}-${label["FRONT"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.valance["FRONT"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-VALANCE${tentSize.split("x")[1]}-${label["FRONT"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.peak["RIGHT"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-PEAK${tentSize.split("x")[1]}-${label["RIGHT"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.valance["RIGHT"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-VALANCE${tentSize.split("x")[1]}-${label["RIGHT"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.peak["LEFT"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-PEAK${tentSize.split("x")[1]}-${label["LEFT"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.valance["LEFT"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-VALANCE${tentSize.split("x")[1]}-${label["LEFT"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.peak["BACK"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-PEAK${tentSize.split("x")[1]}-${label["BACK"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                                {
                                    Object.keys(requirement.valance["BACK"]).length !== 0 &&
                                    <Block position="absolute" top="0" left="0" width="100%" height="100%">
                                        <Image width={220} height={220} layout="responsive"
                                               src={`images/custom-printed-canopy-tent/tents/${tentFrame}-${tentSize}/${frontAngle ? "1-front-view-dc" : "2-back-view-ab"}/${tentFrame}-VALANCE${tentSize.split("x")[1]}-${label["BACK"]}${!frontAngle ? "-FLIPPED" : ""}.webp`}/>
                                    </Block>
                                }
                            </Block>
                            <Block marginTop="4px" display="grid" placeItems="center" width="100%">
                                <Button
                                    height="32px"
                                    text="Flip"
                                    startEnhancer={() => <i><Image src="/images/icon/icon-angle.png" width={16} height={16} alt="icon" layout="fixed"/></i>}
                                    color="#808080"
                                    buttonStyle={{
                                        backgroundColor: "#f2f2f2 !important",
                                        fontFamily: "Roboto !important",
                                        fontWeight: "500 !important",
                                        ":hover": {boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 2.6px"},
                                    }}
                                    onClick={() => setFrontAngle(!frontAngle)}
                                />
                            </Block>
                        </Block>
                    </Block>
                    <Block maxWidth="664px" margin="51px auto 0" padding="6px"
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
                                        <Block key={side} position="absolute" bottom={0} left="50%" display="flex" flexDirection="column" width="fit-content" paddingTop={["2px", null, null, "4px"]}
                                               $style={{transform: "translate(-50%, 0) rotate(-" + index * 90 + "deg)", transformOrigin: "50% 0"}}
                                        >
                                            <Canvas width={["60px", null, null, "90px"]} $style={{aspectRatio: "1.5"}}/>
                                            <Button shape="circle" width="52px" height="52px" marginTop={["3px", null, null, "17px"]} marginRight="auto" marginLeft="auto" font="MinXLabel20"
                                                    buttonStyle={{
                                                        backgroundColor: activeSide === side ? "#23A4AD" : "transparent !important",
                                                        color: activeSide === side ? "white" : "#262626 !important",
                                                        borderTopWidth: "2px",
                                                        borderRightWidth: "2px",
                                                        borderBottomWidth: "2px",
                                                        borderLeftWidth: "2px",
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
                            <Block display={activeSide ? "grid" : "none"} gridTemplateColumns="1fr 1fr" gridColumnGap={["16px", null, null, "24px"]}>
                                <Button type="outline" bundle="gray" width="100%" height="82px" font="MinXParagraph14"
                                        buttonStyle={{
                                            paddingTop: "16px !important",
                                            paddingRight: "16px !important",
                                            paddingBottom: "16px !important",
                                            paddingLeft: "16px !important",
                                            borderColor: activeSide ? Object.keys(requirement.peak[activeSide]).length > 0 ? "#23A4AD !important" : "#D9D9D9 !important" : "#D9D9D9 !important",
                                            backgroundColor: "#F0F0F0 !important",
                                            borderTopLeftRadius: "16px !important",
                                            borderTopRightRadius: "16px !important",
                                            borderBottomLeftRadius: "16px !important",
                                            borderBottomRightRadius: "16px !important",
                                        }}
                                        color={activeSide ? Object.keys(requirement.peak[activeSide]).length > 0 ? "#FAFAFA" : "#8C8C8C" : "#8C8C8C"}
                                        onClick={() => setPeakDetailsIsOpen(true)}
                                >
                                    <Block display="block" alignItems="center">
                                        <Image src="/images/icon/icon-peak.png" width={40} height={20} layout="fixed" objectFit="contain"/>
                                        <Block marginTop="8px" font="MinXParagraph14" color="MinXPrimaryText" $style={{textTransform: "capitalize"}}>Peak</Block>
                                    </Block>
                                </Button>
                                {/*{Object.keys(requirement.peak[activeSide]).length > 0 &&*/}
                                {/*    <Block as="button" marginLeft="8px" title="clear details"*/}
                                {/*           onClick={() => clearDetails("peak")}*/}
                                {/*           $style={{*/}
                                {/*               borderTopWidth: "0",*/}
                                {/*               borderBottomWidth: "0",*/}
                                {/*               borderLeftWidth: "0",*/}
                                {/*               borderRightWidth: "0",*/}
                                {/*               backgroundColor: "transparent",*/}
                                {/*               padding: "0",*/}
                                {/*               cursor: "pointer"*/}
                                {/*           }}*/}
                                {/*    >*/}
                                {/*        <i>*/}
                                {/*            <Image src="/images/icon/icon-delete.png" alt="erase" width={24} height={24} layout="fixed"/>*/}
                                {/*        </i>*/}
                                {/*    </Block>*/}
                                {/*}*/}
                                <Button type="outline" width="100%" height="82px" font="MinXParagraph14"
                                        buttonStyle={{
                                            paddingTop: "16px !important",
                                            paddingRight: "16px !important",
                                            paddingBottom: "16px !important",
                                            paddingLeft: "16px !important",
                                            borderColor: activeSide ? Object.keys(requirement.valance[activeSide]).length > 0 ? "#23A4AD !important" : "#D9D9D9 !important" : "#D9D9D9 !important",
                                            backgroundColor: "#F0F0F0 !important",
                                            borderTopLeftRadius: "16px !important",
                                            borderTopRightRadius: "16px !important",
                                            borderBottomLeftRadius: "16px !important",
                                            borderBottomRightRadius: "16px !important",
                                        }}
                                        color={activeSide ? Object.keys(requirement.valance[activeSide]).length > 0 ? "#FAFAFA" : "#8C8C8C" : "#8C8C8C"}
                                        onClick={() => setValanceDetailsIsOpen(true)}
                                >
                                    <Block display="block" alignItems="center">
                                        <Image src="/images/icon/icon-valance.png" width={40} height={12} layout="fixed" objectFit="contain"/>
                                        <Block marginTop="8px" font="MinXParagraph14" color="MinXPrimaryText" $style={{textTransform: "capitalize"}}>Valance</Block>
                                    </Block>
                                </Button>
                                {/*{Object.keys(requirement.valance[activeSide]).length > 0 &&*/}
                                {/*    <Block as="button" marginLeft="8px" title="clear details"*/}
                                {/*           onClick={() => clearDetails("valance")}*/}
                                {/*           $style={{*/}
                                {/*               borderTopWidth: "0",*/}
                                {/*               borderBottomWidth: "0",*/}
                                {/*               borderLeftWidth: "0",*/}
                                {/*               borderRightWidth: "0",*/}
                                {/*               backgroundColor: "transparent",*/}
                                {/*               padding: "0",*/}
                                {/*               cursor: "pointer"*/}
                                {/*           }}*/}
                                {/*    >*/}
                                {/*        <i>*/}
                                {/*            <Image src="/images/icon/icon-delete.png" alt="erase" width={24} height={24} layout="fixed"/>*/}
                                {/*        </i>*/}
                                {/*    </Block>*/}
                                {/*}*/}
                            </Block>
                        </Block>
                    </Block>
                    {error && <Block maxWidth="664px" margin="0 auto" font="MinXParagraph14" color="#EB512A">Please select the sides you’d like to print and tell us your printing requirements.</Block>}
                </Block>
                <Block position="fixed" top="0" left="0" width={peakDetailIsOpen || valanceDetailIsOpen ? "100vw" : "0"} height={peakDetailIsOpen || valanceDetailIsOpen ? "100vh" : "0"} overflow="hidden"
                       $style={{zIndex: peakDetailIsOpen || valanceDetailIsOpen ? "100" : "unset"}}
                >
                    <Block width="100%" height="100%" backgroundColor="MinXBackground" position="relative" overflow="scrollY" padding="0 16px">
                        {
                            (peakDetailIsOpen && !valanceDetailIsOpen) &&
                            <RoofDetail
                                cancelAction={() => setPeakDetailsIsOpen(false)}
                                requirement={requirement}
                                setRequirement={setRequirement}
                                side={activeSide}
                                part="peak"
                            />
                        }
                        {
                            (valanceDetailIsOpen && !peakDetailIsOpen) &&
                            <RoofDetail
                                cancelAction={() => setValanceDetailsIsOpen(false)}
                                requirement={requirement}
                                setRequirement={setRequirement}
                                side={activeSide}
                                part="valance"
                            />
                        }
                    </Block>
                </Block>
            </Block>
        </>
    )
}

export default RequirementSelection;
