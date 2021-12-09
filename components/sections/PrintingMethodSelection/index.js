import { useStyletron } from "baseui"
import { Block } from "baseui/block"
import Image from "next/image"
import { useState } from "react"
import MButton from "../../button-n"
import {Modal} from "../../surfaces"

const printingMethods = [
    {
        color: " <span class='highlighted'> More vivid </span> Pantone colors;<br/> <span class='highlighted'> Great </span> opacity and contrast",
        fabric: " <span class='highlighted'> 900D, 360 gsm </span> polyester <br/> with PU coating",
        image: "/images/custom-printed-canopy-tent/pmt-uv-printing.png",
        value: "UV PRINTING",
        label: "UV Printing",
    },
    {
        color: "Vivid Pantone colors Good opacity and contrast",
        fabric: "<span class='highlighted'> 600D, 288 gsm </span> polyester <br/> with PU coating",
        image: "/images/custom-printed-canopy-tent/pmt-dye-sublimation.png",
        value: "DYE SUBLIMATION",
        label: "Dye Sublimation"
    }
]
const PrintingMethodCard = ({method, active, onClick}) => {
    const [css] = useStyletron();

    const createCopy = (copy) => {
        return {__html: copy}
    }

    return(
        <>
            <Block 
                width="100%" 
                padding="24px" 
                backgroundColor="MinXTableHeader"
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
                    transition: "all .15s ease-in-out"
                })}
                >
                <Block width="100%">
                    <Image src={method.image} width={370} height={250} alt={method.label} layout="responsive" objectFit="contain"/>
                </Block>
                <Block marginTop="24px">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block font="MinXParagraph16" color="MinXSecondaryText">
                            COLOR
                        </Block>
                        <Block font="MinXSubtitle20" marginTop="4px" dangerouslySetInnerHTML={createCopy(method.color)}>

                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" alignItems="center" marginTop="24px">
                        <Block font="MinXParagraph16" color="MinXSecondaryText">
                            FABRIC
                        </Block>
                        <Block font="MinXSubtitle20" marginTop="4px" dangerouslySetInnerHTML={createCopy(method.fabric)}>

                        </Block>
                    </Block>
                    <Block marginTop="40px">
                        <MButton
                            height="auto"
                            onClick={onClick}
                            buttonStyle={{ 
                                backgroundColor: "transparent !important", 
                                color: "#808080 !important", 
                                fontFamily:"Roboto !important",
                                fontSize: "14px !important",
                                fontWeight: "400 !important",
                                width: "100% !important",
                                border: "2px solid #bfbfbf",
                                padding: "16px 0 !important"
                            }}
                            text={`Select ${method.label}`}
                        />
                    </Block>
                </Block>
            </Block>
        </>
    )
}

const index = ({printingMethodValue, setMethod}) => {
    const [showPrintingTechnology,setShowPrintingTechnology] = useState(false);

    return (
        <>
            <Block width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <Block font="MinXSubtitle20" color="MinXTitle">
                    Please select prefered printing method.
                </Block>
                <MButton onClick={() => setShowPrintingTechnology(true)} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily:"Roboto !important", fontSize: "14px"}} text="Compare printing methods"/>
            </Block>
            <Block width="100%" display="flex" flexWrap="wrap" justifyContent="center" marginTop="38px">
                {
                    printingMethods.map((method) => (
                        
                        <Block key={method.value} margin={["0 16px","0 16px","0 32px","0 50px"]} maxWidth="418px" width="100%">
                            <PrintingMethodCard 
                                method={method}
                                active={printingMethodValue === method.value}
                                onClick={() => setMethod({pMethod:method.value})}
                            />
                        </Block>
                    ))
                }
            </Block>
            <Modal type="alertdialog" isOpen={showPrintingTechnology} onClose={() => setShowPrintingTechnology(false)} content="technique" dialogStyles={{transform: "translateY(0) !important"}}/>
        </>
    )
}

export default index
