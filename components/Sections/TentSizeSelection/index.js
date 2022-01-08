import React, {useState} from "react";

import Image from "next/image";

import {Block} from "baseui/block"
import {RadioGroup, Radio, ALIGN} from "baseui/radio";

import Button from "../../button-n"
import {Modal} from "../../surfaces";

const TentSizeSelection = ({tentSizes, frame, sizeValue, setSize, error}) => {
    const [showSizeGuide, setShowSizeGuide] = useState(false);

    return (
        <>
            <Block display="grid" gridRowGap="8px" width="100%" maxWidth={process.env.maxWidth + "px"} margin="auto" padding={["16px", null, null, "24px 20px"]}>
                <Block font="MinXParagraph16" color="MinXTitle" $style={{fontWeight: 500}}>Please select the size of the tent.</Block>
                <Block display="flex" justifyContent="space-between" alignItems="center" font="MinXParagraph16" color="MinXSecondaryText">
                    <Block>{tentSizes[frame].length} sizes available</Block>
                    <Button type="solid" height="32px" text='Size Guide' color="MinXSecondaryText" buttonBackgroundColor="rgb(242, 242, 242)" buttonHoverBackgroundColor="rgb(242, 242, 242)" onClick={() => setShowSizeGuide(true)}/>
                </Block>
                <Block paddingTop="20px">
                    <RadioGroup value={sizeValue} onChange={e => setSize({size: e.currentTarget.value})} align={ALIGN.horizontal} name="sizes"
                                overrides={{
                                    RadioGroupRoot: {
                                        style: {
                                            display: "grid",
                                            gridTemplateColumns: "repeat(3, 1fr)",
                                            gridColumnGap: "16px",
                                            gridRowGap: "16px",
                                            '@media (min-width: 672px)': {gridTemplateColumns: "repeat(4, 1fr)", gridColumnGap: "20px", gridRowGap: "20px"},
                                        }
                                    },
                                    RadioMarkInner: {style: {display: "none"}},
                                    RadioMarkOuter: {style: {display: "none"}},
                                }}
                    >
                        {tentSizes.Y7.map((size) => (
                            <Radio key={size.size} value={size.size} image={size.image} label={size.label}
                                   overrides={{
                                       Root: {
                                           style: ({$checked}) => ({
                                               width: "100%",
                                               minWidth: "104px",
                                               aspectRatio: 1,
                                               marginTop: 0,
                                               marginRight: 0,
                                               marginBottom: 0,
                                               padding: $checked ? "0" : "2px",
                                               borderTopLeftRadius: "16px",
                                               borderTopRightRadius: "16px",
                                               borderBottomLeftRadius: "16px",
                                               borderBottomRightRadius: "16px",
                                               borderTopWidth: $checked ? "3px" : "1px",
                                               borderBottomWidth: $checked ? "3px" : "1px",
                                               borderLeftWidth: $checked ? "3px" : "1px",
                                               borderRightWidth: $checked ? "3px" : "1px",
                                               borderBottomStyle: "solid",
                                               borderTopStyle: "solid",
                                               borderRightStyle: "solid",
                                               borderLeftStyle: "solid",
                                               borderColor: $checked ? "#23A4AD" : "#D9D9D9",
                                               backgroundColor: "#FAFAFA"
                                           })
                                       },
                                       Label: {
                                           component: () =>
                                               <Block width="100%" height="100%" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                                                   <Block width="50%">
                                                       <Image src={size.image} width={155} height={140} alt={size.label} layout="responsive" objectFit="contain"/>
                                                   </Block>
                                                   <Block marginTop="10%" font="MinXParagraph14">{size.label}</Block>
                                               </Block>
                                       }
                                   }}
                            />
                        ))}
                    </RadioGroup>
                </Block>
            </Block>
            <Modal type="dialog" isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} content="size"/>
        </>
    )
}

export default TentSizeSelection;
