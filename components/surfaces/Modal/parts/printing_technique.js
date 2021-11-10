import React from "react";

import {Block} from "baseui/block";

export default function content() {
    return (
        <Block minWidth="750px" maxWidth="960px" marginTop="64px" marginRight="auto" marginLeft="auto" paddingRight="42px" paddingLeft="42px"
               overrides={{
                   Block: {
                       props: {
                           className: "hideScrollBar"
                       },
                       style: {textAlign: "left", overflowX: "scroll"}
                   }
               }}
        >
            <Block mwidth="100%" display="grid" gridTemplateColumns="repeat(2, 1fr)" gridColumnGap="32px" marginRight="auto" marginBottom="24px" marginLeft="auto">
                <Block maxWidth="310px" display="grid" gridTemplateColumns="1fr" gridRowGap="24px">
                    <Block flex={1} font="MinXLabel24">Dye Sublimation Printing</Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">INK</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">Imported from <span style={{color: "#23A4AD"}}>Korea</span></Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">COLOR</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">Vivid Pantone Colors</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">COLOR FASTNESS</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText"><span style={{color: "#23A4AD"}}>2-3 years</span>, depending on usage and weather condition</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">UV RESISTANCE</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">UV resistant</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">FABRIC</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText"><span style={{color: "#23A4AD"}}>600D</span> polyester with PU coating</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">FLAME RETARDANCY</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">CPAI-84</Block>
                    </Block>
                </Block>
                <Block maxWidth="310px" display="grid" gridTemplateColumns="1fr" gridRowGap="24px">
                    <Block flex={1} font="MinXLabel24">UV Printing</Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">INK</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">Imported from <span style={{color: "#23A4AD"}}>Japan</span>; higher density black pigment</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">COLOR</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">Better color reproduction; closer to the real colors</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">COLOR FASTNESS</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText"><span style={{color: "#23A4AD"}}>4-5 years</span>, depending on usage and weather condition</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">UV RESISTANCE</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">Higher UV resistance</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">FABRIC</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText"><span style={{color: "#23A4AD"}}>900D</span> polyester with PU coating</Block>
                    </Block>
                    <Block>
                        <Block font="MinXHeading12" color="MinXSecondaryText">FLAME RETARDANCY</Block>
                        <Block height="40px" marginTop="4px" font="MinXParagraph14" color="MinXPrimaryText">CPAI-84</Block>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}

