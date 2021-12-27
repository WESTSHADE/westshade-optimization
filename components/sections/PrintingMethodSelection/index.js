import {useStyletron} from "baseui"
import {Block} from "baseui/block"
import Image from "next/image"
import {useState} from "react"
import MButton from "../../button-n"
import {Modal} from "../../surfaces"

const PrintingMethodCard = ({method, active, onClick}) => {
    const [css] = useStyletron();
    const [hovered, setHovered] = useState(false)

    const createCopy = (copy) => {
        return {__html: copy}
    }

    return (
        <>
            <Block
                onClick={onClick}
                width="100%"
                padding="24px"
                backgroundColor="MinXTableHeader"
                position="relative"
                className={css({
                    backgroundColor: "#FAFAFA",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    borderBottomLeftRadius: "16px",
                    borderBottomRightRadius: "16px",
                    borderBottomStyle: "solid",
                    borderTopStyle: "solid",
                    borderRightStyle: "solid",
                    borderLeftStyle: "solid",
                    borderTopWidth: "3px",
                    borderBottomWidth: "3px",
                    borderLeftWidth: "3px",
                    borderRightWidth: "3px",
                    borderColor: active ? "#23A4AD" : "transparent",
                    cursor: "pointer",
                    transition: "all .15s ease-in-out"
                })}
            >
                    {
                        method?.fabricPrinted &&
                        <Block font="MinXParagraph12" color="MinXTitle">
                            This sample is printed on {method.fabricPrinted} fabric.
                        </Block>
                    }
                <Block width="100%" position="relative">
                    <Block onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} minWidth="163px" position="absolute" bottom="30px" left="50%" $style={{zIndex: "5", transform: "translateX(-50%)"}}>
                        <MButton
                            buttonClassName={css({
                                background: "rgba(255, 255, 255, 0.6) !important",
                                backdropFilter: "blur(6px) !important",
                                transition: "all .3s ease-in",
                                padding: "9px 18px !important",
                                ':hover': {background: "rgba(255, 255, 255, 0.85) !important"}
                            })}
                            width="100%"
                            color="MinXTitle"
                            font="MinXParagraph14"
                            startEnhancer={() => <Block as="i" display="grid" placeItems="center"><Image src="/images/icon/icon-pointer.png" alt="hover" width={14} height={17} layout="fixed"/></Block>}
                            text="See original image"
                        />
                    </Block>
                    <Block marginTop="16px" width="100%" $style={{borderRadius: "16px", overflow: "hidden",}}>
                        <Image src={method.image} width={370} height={250} alt={method.label} layout="responsive" objectFit="contain"/>
                    </Block>
                    <Block
                        position="absolute"
                        top="0"
                        left="0"
                        width="100%"
                        height="100%"
                        $style={{zIndex: "4", borderRadius: "16px", overflow: "hidden", opacity: hovered ? "1" : "0", transition: "all .3s ease-in-out"}}
                    >
                        <Image src={method.originalImage} width={370} height={250} alt="original image" layout="responsive" objectFit="contain"/>
                    </Block>
                </Block>
                <Block marginTop="24px">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block font="MinXParagraph16" color="MinXSecondaryText">
                            Color
                        </Block>
                        <Block className={css({textAlign: "center"})} font="MinXSubtitle20" marginTop="4px" dangerouslySetInnerHTML={createCopy(method.color)}/>
                    </Block>
                    <Block display="flex" flexDirection="column" alignItems="center" marginTop="24px">
                        <Block font="MinXParagraph16" color="MinXSecondaryText">
                            Fastness
                        </Block>
                        <Block className={css({textAlign: "center"})} font="MinXHeading16" marginTop="4px" display="flex"> 
                            <Block marginRight="4px" font="MinXHeading16" color="MinXButton">
                                {method.fastness}
                            </Block>
                            years*
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" alignItems="center" marginTop="24px">
                        <Block font="MinXParagraph16" color="MinXSecondaryText">
                            Fabric
                        </Block>
                        <Block className={css({textAlign: "center"})} font="MinXSubtitle20" marginTop="4px" dangerouslySetInnerHTML={createCopy(method.fabric)}/>
                    </Block>
                    <Block marginTop="40px">
                        <MButton
                            height="auto"
                            onClick={onClick}
                            buttonStyle={{
                                backgroundColor: "transparent !important",
                                color: "#808080 !important",
                                fontFamily: "Roboto !important",
                                fontSize: "14px !important",
                                fontWeight: "400 !important",
                                width: "100% !important",
                                borderTopWidth: "2px",
                                borderBottomWidth: "2px",
                                borderLeftWidth: "2px",
                                borderRightWidth: "2px",
                                borderTopStyle: "solid",
                                borderBottomStyle: "solid",
                                borderRightStyle: "solid",
                                borderLeftStyle: "solid",
                                borderColor: "#bfbfbf",
                                paddingTop: "16px !important",
                                paddingBottom: "16px !important",
                            }}
                            text={`Select ${method.label}`}
                        />
                    </Block>
                </Block>
            </Block>
            {
                    method.note &&
                    <Block marginTop="16px" font="MinXParagraph12" color="#8c8c8c" bottom="0" left="0" >
                        {method.note}
                    </Block>
                }
        </>
    )
}

const PrintingMethodSelection = ({printingMethods, printingMethodValue, setMethod}) => {
    const [showPrintingTechnology, setShowPrintingTechnology] = useState(false);

    return (
        <>
            <Block width="100%" display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                <Block width="100%" display="flex" flexDirection="column" justifyContent="center">
                    <Block font="MinXSubtitle20" color="MinXTitle">
                        Please select prefered printing method.
                    </Block>
                    <Block width="100%"  marginTop="2px" padding="6px 0" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                        <Block font="MinXParagraph16" color="#808080">
                            {printingMethods.length} methods available
                        </Block>
                        <MButton height="32px" onClick={() => setShowPrintingTechnology(true)} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily: "Roboto !important", fontSize: "14px"}}
                            text="Compare"/>
                    </Block>
                </Block>
            </Block>
            <Block width="100%"  marginTop="38px" overflow="hidden" marginTop="16px">
                <Block width="100%" display="grid" placeItems="center" overflow="auto">
                    <Block width="100%" display="flex" justifyContent={["flex-start","center"]} alignItems="stretch" $style={{flexWrap:"nowrap"}}>
                        {
                            printingMethods.map((method) => (
                                <Block key={method.value} padding={["0 8px 16px ", "0px 8px 16px", "0 16px", "0 16px"]} maxWidth={["100%", "307px", "518px"]} width="100%">
                                    <PrintingMethodCard
                                        method={method}
                                        active={printingMethodValue === method.value}
                                        onClick={() => setMethod({pMethod: method.value})}
                                    />
                                </Block>
                            ))
                        }
                    </Block>
                </Block>
            </Block>
            <Modal type="alertdialog" isOpen={showPrintingTechnology} onClose={() => setShowPrintingTechnology(false)} content="technique" dialogStyles={{transform: "translateY(0) !important"}}/>
        </>
    )
}

export default PrintingMethodSelection
