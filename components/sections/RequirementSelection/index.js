import { Block } from "baseui/block"
import Image from "next/image"
import { useState } from "react"
import { useStyletron } from "styletron-react"
import MButton from "../../button-n"
import RoofDetail from "./InputDetails"

const RequirementSelection = ({activeSide = "FRONT", activeTentImage, setSide, requirement, setRequirement}) => {
    const [peakDetailIsOpen, setPeakDetailsIsOpen] = useState(false);
    const [valanceDetailIsOpen, setValanceDetailsIsOpen] = useState(false);
    const [imageAngle, setImageAngle] = useState(0);
    const [css] = useStyletron();
    
    const clearDetails = (type) => {
        setRequirement(type,activeSide,{});
    }

    return (
        <>
            <Block width="100%">
                <Block width="100%" display="flex" alignItems="center" justifyContent="space-between">
                    <Block font="MinXSubtitle20" color="MinXTitle">
                        Please select the sides you’d like to print and tell us your printing requirements.
                    </Block>
                </Block>
                <Block marginTop="40px" width="100%">
                    <Block maxWidth={["350px","350px","487px"]} width="100%" margin="0 auto" position="relative" display="flex" justifyContent="center">
                        <Block width="100%">
                            <Image src={activeTentImage || "/images/product/y5-economic-canopy-tent/frame/Y5-10X10-BK.png"} alt="custom tent" width={487} height={320} layout="responsive" objectFit="contain"/>
                            <Block marginTop="4px" display="grid" placeItems="center" width="100%">
                                <MButton 
                                    text="Change angle"
                                    startEnhancer={() => <i><Image src="/images/icon/icon-3d.png" width={16} height={16} alt="icon" /></i>}
                                    color="#808080"
                                    buttonStyle={{ 
                                        borderRadius: "8px !important", 
                                        backgroundColor: "#f2f2f2 !important", 
                                        fontFamily:"Roboto !important",
                                        fontWeight:"500 !important",
                                        transition: "all .15s ease-in",
                                        ":hover": {boxShadow: "rgba(0, 0, 0, 0.15) 0px 2px 2.6px"},
                                    }}
                                    onClick={() => setImageAngle(1)}
                                />
                            </Block>
                        </Block>
                        <Block position="absolute" right={["-5px","-104px","-154px"]} top={["-32px","-20px","0"]}>
                            <Block position="relative" width={["100px", "140px", "180px"]} height={["100px", "140px", "180px"]} marginBottom={["16px", "24px", "48px"]}>
                                <Block position="absolute" bottom={["-10px","-10px"]} right={0} left={0} width={["40px", "50px", "70px"]} marginRight="auto" marginLeft="auto">
                                    <div className="triangle-curved2 bottom" style={{borderBottomColor: Object.keys(requirement.peak.FRONT).length !== 0 ? "#23A4AD" : activeSide === "FRONT" ? "#CDECEC" : "#F0F0F0"}}/>
                                    <Block width={["40px", "50px", "70px"]} height={["5px", "6px", "11px"]} marginTop={["6px","12px"]}marginBottom={["6px","12px"]}
                                        backgroundColor={Object.keys(requirement.valance.FRONT).length !== 0 ? "#23A4AD" : activeSide === "FRONT" ? "#CDECEC" : "#F0F0F0"}
                                    />
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">FRONT</Block>
                                </Block>
                                <Block position="absolute" top={["-10px","0"]} right={0} left={0} width={["40px", "50px", "70px"]} marginRight="auto" marginLeft="auto">
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">BACK</Block>
                                    <Block width={["40px", "50px", "70px"]} height={["5px", "6px", "11px"]} marginTop={["6px","12px"]} marginBottom={["6px","12px"]}
                                        backgroundColor={Object.keys(requirement.valance.BACK).length !== 0 ? "#23A4AD" : activeSide === "BACK" ? "#CDECEC" : "#F0F0F0"}
                                    />
                                    <div className="triangle-curved2" style={{borderTopColor: Object.keys(requirement.peak.BACK).length !== 0 ? "#23A4AD" : activeSide === "BACK" ? "#CDECEC" : "#F0F0F0"}}/>
                                </Block>
                                <Block position="absolute" top={["42.5%","46.5%"]} left={0} width={["40px", "50px", "70px"]} $style={{transform: "rotate(-90deg) translateX(50%)"}}>
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">LEFT</Block>
                                    <Block width={["40px", "50px", "70px"]} height={["5px", "6px", "11px"]} marginTop={["6px","12px"]} marginBottom={["6px","12px"]}
                                        backgroundColor={Object.keys(requirement.valance.LEFT).length !== 0 ? "#23A4AD" : activeSide === "LEFT" ? "#CDECEC" : "#F0F0F0"}
                                    />
                                    <div className="triangle-curved2" style={{borderTopColor: Object.keys(requirement.peak.LEFT).length !== 0 ? "#23A4AD" : activeSide === "LEFT" ? "#CDECEC" : "#F0F0F0"}}/>
                                </Block>
                                <Block position="absolute" top={["42.5%","46.5%"]} right={0} width={["40px", "50px", "70px"]} $style={{transform: "rotate(90deg) translateX(-50%)"}}>
                                    <Block font="MinXParagraph14" color="MinXSecondaryText">RIGHT</Block>
                                    <Block width={["40px", "50px", "70px"]} height={["5px", "6px", "11px"]} marginTop={["6px","12px"]} marginBottom={["6px","12px"]}
                                        backgroundColor={Object.keys(requirement.valance.RIGHT).length !== 0 ? "#23A4AD" : activeSide === "RIGHT" ? "#CDECEC" : "#F0F0F0"}
                                    />
                                    <div className="triangle-curved2" style={{borderTopColor: Object.keys(requirement.peak.RIGHT).length !== 0 ? "#23A4AD" : activeSide === "RIGHT" ? "#CDECEC" : "#F0F0F0"}}/>
                                </Block>
                            </Block>
                        </Block>
                    </Block>
                    <Block maxWidth="664px" margin="0 auto" display="flex" flexWrap="wrap" justifyContent={["space-between","center"]} marginTop="51px" >
                        <Block width={["44%","45%","141px","141px"]} margin={["0 6px 16px","0 10px 16px"]}>
                            <MButton
                                height="auto"
                                onClick={() => setSide({activeSide:"FRONT"})}
                                buttonStyle={{ 
                                    backgroundColor: "transparent !important", 
                                    color: "#262626 !important", 
                                    fontFamily:"Roboto !important",
                                    fontSize: "14px !important",
                                    fontWeight: "400 !important",
                                    width: "100% !important",
                                    border: activeSide === "FRONT" ? "2px solid #23A4AD !important" : "2px solid #bfbfbf !important",
                                    padding: "17px 0 !important",
                                    boxShadow: activeSide === "FRONT" ? "0px 0px 2px 6px rgba(36,164,173,0.2) !important" : "none",
                                    transition: "all .15s ease-in-out"
                                }}
                                text="Print Front"
                            />
                        </Block>
                        <Block width={["44%","45%","141px","141px"]} margin={["0 6px 16px","0 10px 16px"]}>
                            <MButton
                                height="auto"
                                onClick={() => setSide({activeSide:"BACK"})}
                                buttonStyle={{ 
                                    backgroundColor: "transparent !important", 
                                    color: "#262626 !important", 
                                    fontFamily:"Roboto !important",
                                    fontSize: "14px !important",
                                    fontWeight: "400 !important",
                                    width: "100% !important",
                                    border: activeSide === "BACK" ? "2px solid #23A4AD !important" : "2px solid #bfbfbf !important",
                                    padding: "17px 0 !important",
                                    boxShadow: activeSide === "BACK" ? "0px 0px 2px 6px rgba(36,164,173,0.2) !important" : "none",
                                    transition: "all .15s ease-in-out"
                                }}
                                text="Print Back"
                            />
                        </Block>
                        <Block width={["44%","45%","141px","141px"]} margin={["0 6px 16px","0 10px 16px"]}>
                            <MButton
                                height="auto"
                                onClick={() => setSide({activeSide:"LEFT"})}
                                buttonStyle={{ 
                                    backgroundColor: "transparent !important", 
                                    color: "#262626 !important", 
                                    fontFamily:"Roboto !important",
                                    fontSize: "14px !important",
                                    fontWeight: "400 !important",
                                    width: "100% !important",
                                    border: activeSide === "LEFT" ? "2px solid #23A4AD !important" : "2px solid #bfbfbf !important",
                                    padding: "17px 0 !important",
                                    boxShadow: activeSide === "LEFT" ? "0px 0px 2px 6px rgba(36,164,173,0.2) !important" : "none",
                                    transition: "all .15s ease-in-out"
                                
                                }}
                                text="Print Left"
                            />
                        </Block>
                        <Block width={["44%","45%","141px","141px"]} margin={["0 6px 16px","0 10px 16px"]}>
                            <MButton
                                height="auto"
                                onClick={() => setSide({activeSide:"RIGHT"})}
                                buttonStyle={{ 
                                    backgroundColor: "transparent !important", 
                                    color: "#262626 !important", 
                                    fontFamily:"Roboto !important",
                                    fontSize: "14px !important",
                                    fontWeight: "400 !important",
                                    width: "100% !important",
                                    border: activeSide === "RIGHT" ? "2px solid #23A4AD !important" : "2px solid #bfbfbf !important",
                                    padding: "17px 0 !important",
                                    boxShadow: activeSide === "RIGHT" ? "0px 0px 2px 6px rgba(36,164,173,0.2) !important" : "none",
                                    transition: "all .15s ease-in-out"
                                }}
                                text="Print Right"
                            />
                        </Block>
                    </Block>
                    <Block maxWidth="664px" margin="42px auto 0" display="flex" flexWrap="wrap" justifyContent="space-between">
                        <Block width={["100%","45%","45%"]} marginBottom="16px" display="flex" justifyContent="space-between" alignItems="center">
                            <Block display="flex" alignItems="center">
                                <Image src={`/images/icon/icon-peak-${activeSide.toLocaleUpperCase() || "front"}.png`} width={60} height={60} layout="fixed" objectFit="contain" />
                                <Block display="flex" flexDirection="column" marginLeft="8px">
                                    <Block font="MinXParagraph14" color="#000000">Peak</Block>
                                    <Block marginTop="8px" font="MinXParagraph12" color="#808080">{activeSide || "Front"}</Block>
                                </Block>
                            </Block>
                            <Block width="90px" display="flex" justifyContent="space-between" alignItems="center">
                                <MButton 
                                    onClick={() => setPeakDetailsIsOpen(true)} 
                                    type="dashed" 
                                    width="100%" 
                                    height="32px" 
                                    font="MinXLabel14" 
                                    text={Object.keys(requirement.peak[activeSide]).length > 0 ? "Edit" : "+Print"}  
                                    buttonStyle={{backgroundColor:Object.keys(requirement.peak[activeSide]).length > 0 ? "#8C8C8C !important" : "transparent !important"}}
                                    color={Object.keys(requirement.peak[activeSide]).length > 0 ? "#fafafa" : "#8c8c8c"}
                                />
                                {
                                    Object.keys(requirement.peak[activeSide]).length > 0 &&
                                    <Block 
                                        as="button" 
                                        marginLeft="8px"
                                        title="clear details"
                                        onClick={()=>clearDetails("peak")}
                                        $style={{
                                            borderTopWidth: "0",
                                            borderBottomWidth: "0",
                                            borderLeftWidth: "0",
                                            borderRightWidth: "0",
                                            backgroundColor: "transparent",
                                            padding: "0",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <i>
                                            <Image src="/images/icon/icon-delete.png" alt="erase" width={24} height={24} layout="fixed"/>
                                        </i>
                                    </Block>
                                }
                            </Block>
                        </Block>
                        <Block width={["100%","45%","45%"]} marginBottom="16px" display="flex" justifyContent="space-between" alignItems="center">
                            <Block display="flex" alignItems="center">
                                <Image src={`/images/icon/icon-valance-${activeSide.toLocaleUpperCase() || "front"}.png`} width={60} height={60} layout="fixed" objectFit="contain" />
                                <Block display="flex" flexDirection="column" marginLeft="8px">
                                    <Block font="MinXParagraph14" color="#000000">Peak</Block>
                                    <Block marginTop="8px" font="MinXParagraph12" color="#808080">{activeSide || "Front"}</Block>
                                </Block>
                            </Block>
                            <Block width="90px" display="flex" justifyContent="space-between" alignItems="center">
                                <MButton 
                                    onClick={() => setValanceDetailsIsOpen(true)} 
                                    type="dashed" 
                                    width="100%"
                                    height="32px" 
                                    font="MinXLabel14" 
                                    text={Object.keys(requirement.valance[activeSide]).length > 0 ? "Edit" : "+Print"} 
                                    buttonStyle={{backgroundColor:Object.keys(requirement.valance[activeSide]).length > 0 ? "#8C8C8C !important" : "transparent !important"}}
                                    color={Object.keys(requirement.valance[activeSide]).length > 0 ? "#fafafa" : "#8c8c8c"}
                                />
                                {
                                    Object.keys(requirement.valance[activeSide]).length > 0 &&
                                    <Block 
                                        as="button" 
                                        marginLeft="8px"
                                        title="clear details"
                                        onClick={()=>clearDetails("valance")}
                                        $style={{
                                            borderTopWidth: "0",
                                            borderBottomWidth: "0",
                                            borderLeftWidth: "0",
                                            borderRightWidth: "0",
                                            backgroundColor: "transparent",
                                            padding: "0",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <i>
                                            <Image src="/images/icon/icon-delete.png" alt="erase" width={24} height={24} layout="fixed"/>
                                        </i>
                                    </Block>
                                }
                            </Block>
                        </Block>
                    </Block>
                </Block>
                <Block className={css({zIndex: peakDetailIsOpen || valanceDetailIsOpen ? "100" : "unset"})} position="fixed" top="0" left="0" width={peakDetailIsOpen || valanceDetailIsOpen ? "100vw" : "0"} height={peakDetailIsOpen || valanceDetailIsOpen ? "100vh" : "0"} overflow="hidden">
                    <Block width="100%" height="100%" backgroundColor="MinXBackground" position="relative" overflow="scrollY">

                        {
                            (peakDetailIsOpen && !valanceDetailIsOpen )&&
                            <RoofDetail 
                                cancelAction={() => setPeakDetailsIsOpen(false)}
                                requirement={requirement} 
                                setRequirement={setRequirement} 
                                side={activeSide} 
                                part="peak"
                            />
                        }
                        {
                            (valanceDetailIsOpen && !peakDetailIsOpen )&&
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
