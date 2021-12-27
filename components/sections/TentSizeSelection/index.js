import {useStyletron} from "baseui";
import {Block} from "baseui/block"
import {RadioGroup, Radio, ALIGN} from "baseui/radio";
import Image from "next/image";
import {useState} from "react";
import {Modal} from "../../surfaces";
import MButton from "../../button-n"


const TentSizeCard = ({image, label, value, active, onClick}) => {
    const [css] = useStyletron();
    return (
        <Block
            onClick={onClick}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            width="100%"
            marginBottom="32px"
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
            <Block width="50%">
                <Image src={image} width={155} height={140} alt={label} layout="responsive" objectFit="contain"/>
            </Block>
            <Block width="100%" marginTop="10%" font="MinXParagraph14" $style={{textAlign: "center"}}>
                {label}
            </Block>
        </Block>
    )
}


const TentSizeSelection = ({tentSizes, frame, sizeValue, setSize, error}) => {
    const [css] = useStyletron();
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    return (
        <>
            <Block width="100%">
                <Block width="100%" display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap">
                    <Block width="100%" display="flex" flexDirection="column" justifyContent="center">
                        <Block font="MinXSubtitle20" color="MinXTitle">
                            Please select the size of the tent.
                        </Block>
                        <Block marginTop="2px" padding="6px 0" width="100%" display="flex" justifyContent="space-between" alignItems="center">
                            <Block font="MinXParagraph16" color="#808080">
                                {tentSizes[frame].length} sizes available
                            </Block>
                            <MButton height="32px" onClick={() => setShowSizeGuide(true)} buttonStyle={{backgroundColor: "#F2F2F2 !important", color: "#808080 !important", fontFamily: "Roboto !important"}} text="Size Guide"/>
                        </Block>
                    </Block>
                </Block>
                <Block width="100%" marginTop="16px">
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
                                    flexWrap: "wrap",
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
                            tentSizes.Y7.map((size) => (
                                <Radio
                                    key={size.size}
                                    value={size.size}
                                    image={size.image}
                                    label={size.label}
                                    overrides={{
                                        Root: {
                                            style: {
                                                width: "104px",
                                                height: "104px",
                                                '@media (min-width: 480px)': {width: "158px", height: "158px"},
                                                '@media (min-width: 960px)': {width: "239px", height: "239px"},
                                                '@media (min-width: 1310px)': {width: "302px", height: "302px"},
                                            }
                                        },
                                        Label: {
                                            component: () => (<Block padding="0" width="100%" height="100%">
                                                <TentSizeCard
                                                    value={size.size}
                                                    image={size.image}
                                                    label={size.label}
                                                    active={size.size == sizeValue}
                                                    onClick={() => setSize({size: size.size})}
                                                />
                                            </Block>)
                                        }
                                    }}
                                    className={css({
                                        border: "1px solid coral",
                                        "@media screen and (min-width: 768px)": {
                                            opacity: 0
                                        }
                                    })}
                                >
                                </Radio>
                            ))
                        }
                        <Block
                            aria-hidden="true"
                            $style={{
                                width: "104px",
                                
                                '@media (min-width: 480px)': {width: "158px"},
                                '@media (min-width: 960px)': {width: "239px"},
                                '@media (min-width: 1310px)': {width: "302px"},
                            }}
                            className={css({
                                userSelect: "none",
                                opacity: 0,
                                visibility: "hidden"
                            })}
                        >
                        </Block>
                        <Block
                            aria-hidden="true"
                            $style={{
                                width: "104px",
                                
                                '@media (min-width: 480px)': {width: "158px"},
                                '@media (min-width: 960px)': {width: "239px"},
                                '@media (min-width: 1310px)': {width: "302px"},
                            }}
                            className={css({
                                userSelect: "none",
                                opacity: 0,
                                visibility: "hidden"
                            })}
                        >
                        </Block>
                        <Block
                            aria-hidden="true"
                            $style={{
                                width: "104px",
                                
                                '@media (min-width: 480px)': {width: "158px"},
                                '@media (min-width: 960px)': {width: "239px"},
                                '@media (min-width: 1310px)': {width: "302px"},
                            }}
                            className={css({
                                userSelect: "none",
                                opacity: 0,
                                visibility: "hidden"
                            })}
                        >
                        </Block>
                        <Block
                            aria-hidden="true"
                            $style={{
                                width: "104px",
                                
                                '@media (min-width: 480px)': {width: "158px"},
                                '@media (min-width: 960px)': {width: "239px"},
                                '@media (min-width: 1310px)': {width: "302px"},
                            }}
                            className={css({
                                userSelect: "none",
                                opacity: 0,
                                visibility: "hidden"
                            })}
                        >
                        </Block>
                    </RadioGroup>
                </Block>
            </Block>
            <Modal type="alertdialog" isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} content="size"/>
        </>
    )
}

export default TentSizeSelection;
