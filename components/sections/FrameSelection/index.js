import {useStyletron} from "baseui"
import {Block} from "baseui/block"
import Image from "next/image"
import {useState} from "react"
import MButton from "../../button-n"
import {Modal} from "../../surfaces"


const FrameTypeCard = ({frame, active, onClick}) => {

    return (
        <>
            <Block
                onClick={onClick}
                width="100%"
                height="100%"
                padding="20px"
                backgroundColor="MinXTableHeader"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                $style={{
                    cursor: "pointer",
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
                    transition: "all .3s ease-in-out"
                }}
            >
                <Block width="100%">
                    <Image src={frame.image} width={210} height={210} alt={frame.label} layout="responsive" objectFit="contain"/>
                </Block>
                <Block marginTop="32px">
                    <Block font="MinXSubtitle20">
                        {frame.label}
                    </Block>
                    <Block font="MinXParagraph16" marginTop="16px">
                        {frame.description}
                    </Block>
                    <Block font="MinXSubtitle20" marginTop="16px">
                        + $ {frame.price}
                    </Block>
                </Block>
                <Block marginTop="40px">
                    <MButton
                        height="auto"
                        onClick={onClick}
                        buttonStyle={{
                            backgroundColor: "transparent !important",
                            color: "#262626 !important",
                            fontFamily: "Roboto !important",
                            fontSize: "14px !important",
                            fontWeight: "500 !important",
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
                        text={`Select ${frame.value}`}
                    />
                </Block>
            </Block>
        </>
    )
}

const FrameSelection = ({frameTypes, frameValue, setFrame}) => {
    const [showFrameCompare, setShowFrameCompare] = useState(false);
    const [css] = useStyletron();
    return (
        <>
            <Block width="100%" display="flex" alignItems="center" justifyContent="space-between" flexWrap={["wrap", "nowrap", "nowrap"]}>
                <Block width={["100%", "auto", "auto"]} marginBottom={["16px", "16px", "0"]} display="flex" flexDirection="column">
                    <Block font="MinXSubtitle20" color="MinXTitle">
                        Please select the frame of the tent.
                    </Block>
                    <Block color="#808080" font="MinXParagraph16">
                        {frameTypes.length} frames available
                    </Block>
                </Block>
                <MButton height="32px" onClick={() => setShowFrameCompare(true)} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily: "Roboto !important", fontSize: "14px"}} text="Compare frames"/>
            </Block>
            <Block width="100%" display="flex" flexWrap={"wrap"} justifyContent="space-between" alignItems="stretch" marginTop="38px">
                {
                    frameTypes.map((frame) => {
                        console.log(frame);
                        return (

                            <Block key={frame.value} margin={["0 16px 24px", "0 5px 24px", "0 10px"]} maxWidth={["100%", "260px", "300px"]} width={["100%", "30%", "30%"]}>
                                <FrameTypeCard
                                    frame={frame}
                                    onClick={() => setFrame({frame: frame.value})}
                                    active={frameValue === frame.value}
                                />
                            </Block>
                        )
                    })
                }
            </Block>
            <Modal type="alertdialog" isOpen={showFrameCompare} onClose={() => setShowFrameCompare(false)} content="frame"/>
        </>
    )
}

export default FrameSelection
