import React from "react";

import {Block} from "baseui/block";

import Accordion from "Components/accordion";
import {Section} from "Components/sections";

import QA from "Assets/q&a.json";

export default function Custom_Printing_Process() {
    return (
        <React.Fragment>
            <Section upperContainerProps={{hidden: true}} lowerContainerProps={{marginBottom: ["32px", "40px"], paddingTop: ["32px", "40px"]}}
                     content={
                         <Block maxWidth="960px" display="grid" gridRowGap="48px" margin="auto">
                             <Block>
                                 <Block font="MinXHeading28">GET TO KNOW OUR CUSTOM PRINTING PROCESS</Block>
                                 <Accordion list={QA.custom_printing_process}/>
                             </Block>
                             <Block>
                                 <Block font="MinXHeading28">FREQUENTLY ASKED QUESTIONS</Block>
                                 <Accordion list={QA.frequently}/>
                             </Block>
                         </Block>
                     }
            />
        </React.Fragment>
    );
};
