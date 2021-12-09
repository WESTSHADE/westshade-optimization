import { useStyletron } from "baseui";
import { Block } from "baseui/block"
import { RadioGroup, Radio, ALIGN } from "baseui/radio";
import Image from "next/image";
import { useState } from "react";
import {Modal} from "../../surfaces";
import MButton from "../../button-n"

const tentSizes = {
    Y7: [
        {size: "10x10", label: "10'x10'",image: "/images/icon/icon-10x10.png"},
        {size: "10x15", label: "10'x15'",image: "/images/icon/icon-10x15.png"},
        {size: "10x20", label: "10'x20'",image: "/images/icon/icon-10x20.png"},
        {size: "13x13", label: "13'x13'",image: "/images/icon/icon-13x13.png"},
        {size: "13x20", label: "13'x20'",image: "/images/icon/icon-13x20.png"},
        {size: "13x26", label: "13'x26'",image: "/images/icon/icon-13x26.png"},
        {size: "16x16", label: "16'x16'",image: "/images/icon/icon-16x16.png"},
        {size: "20x20", label: "20'x20'",image: "/images/icon/icon-20x20.png"},
    ],
    Y6: [
        {size: "10x10", label: "10'x10'",image: "/images/icon/icon-10x10.png"},
        {size: "10x15", label: "10'x15'",image: "/images/icon/icon-10x15.png"},
        {size: "10x20", label: "10'x20'",image: "/images/icon/icon-10x20.png"},
    ],
    Y5: [
        {size: "10x10", label: "10'x10'",image: "/images/icon/icon-10x10.png"},
        {size: "10x15", label: "10'x15'",image: "/images/icon/icon-10x15.png"},
        {size: "10x20", label: "10'x20'",image: "/images/icon/icon-10x20.png"},
    ]
}

const TentSizeCard = ({image, label,value,active, onClick}) => {
    const [css] = useStyletron();
    return(
        <Block
        onClick={onClick}
        display="flex"
        flexDirection="column"
        alignItems="center"
        padding="24px 38px"
        marginBottom="32px"
        maxWidth="230px"
        width="100%"
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
            transition: "all .3s ease-in-out"
        })}
    >
        <Block width="100%">
            <Image src={image} width={155} height={140} alt={label} layout="responsive" objectFit="contain" />
        </Block>
        <Block marginTop="8px" font="MinXParagraph14">
            <MButton onClick={onClick} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily:"Roboto !important", fontSize: "14px"}} text={label} />
        </Block>
    </Block>
    )
}


const index = ({ frame, sizeValue, setSize, error}) => {
    const [css] = useStyletron();
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    return (
        <>
        <Block width="100%">
            <Block width="100%" display="flex" alignItems="center" justifyContent="space-between">
                <Block display="flex" flexDirection="column" justifyContent="center">
                    <Block font="MinXSubtitle20" color="MinXTitle">
                        Please select the size of the tent.
                    </Block>
                    <Block font="MinXParagraph16" color="#808080">
                        {tentSizes[frame].length} sizes available
                    </Block>
                </Block>
                <MButton onClick={() => setShowSizeGuide(true)} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily:"Roboto !important"}} text=" size guide"/>
            </Block>
            <Block width="100%" marginTop="38px" padding={["0 16px","0 16px","0 32px","0 54px"]}>
                <RadioGroup
                    value={sizeValue}
                    onChange={e => setSize(e.currentTarget.value)}
                    align={ALIGN.horizontal}
                    name="sizes"
                    overrides={{
                        RadioGroupRoot: {
                            style: {
                                display: "flex",
                                justifyContent: "space-between",
                                flexWrap: "wrap"
                            }
                        },
                        RadioMarkInner: {
                            style: {
                                display: "none"
                            }
                        },
                        RadioMarkOuter: {
                            style: {
                                display: "none"
                            }
                        },
                    }}
                >
                    {
                        tentSizes[frame].map((size) => (
                            <Radio
                                value={size.size}
                                image={size.image}
                                label={size.label}
                                overrides={{
                                    Root: {
                                        style: {width: "24%", display: "grid", placeItems: "center"}
                                    }
                                }}
                            >
                                <TentSizeCard 
                                    value={size.size}
                                    image={size.image}
                                    label={size.label}
                                    active={size.size == sizeValue}
                                    onClick={() => setSize({size: size.size})}
                                />
                            </Radio>
                        ))
                    }
                </RadioGroup>
            </Block>
        </Block>
        <Modal type="alertdialog" isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} content="size"/>
        </>
    )
}

export default index
