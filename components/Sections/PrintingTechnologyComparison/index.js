import React from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';

import styles from "./section.module.scss";

const printingSpecs = {
    display: [{
        name: "UV Printing",
        image: "/images/custom-promotion/uv-printing.webp",
    }, {
        name: "Dye Sublimation",
        image: "/images/custom-promotion/dye-sublimation.webp",
    }],
    color: [{
        title: "COLOR",
        content: "<span>More vivid</span> Pantone colors;<br/> <span>Great<span/> opacity and contrast"
    }, {
        title: "Color",
        content: "Vivid Pantone colors;<br/>Good opacity and contrast"
    }],
    colorDurability: [{
        title: "COLOR DURABILITY",
        content: "<span> 4-5 </span> years*"
    }, {
        title: "COLOR DURABILITY",
        content: "<span> 2-3 </span> years*"
    }],
    fabric: [{
        title: "FABRIC",
        content: "<span> 900D, 360 gsm </span> polyester<br/>with PU coating"
    }, {
        title: "FABRIC",
        content: "<span> 600D, 288 gsm </span> polyester <br/> with PU coating"
    }],
    printingProcess: [{
        title: "PROCESS",
        content: "<span>Directly print</span> artwork the fabric",
    }, {
        title: "PROCESS",
        content: "<span>Heat press</span> artwork on transfer paper onto fabric",
    }],
    ink: [{
        title: "INK",
        content: "Imported from <span> Japan </span>; "
    }, {
        title: "INK",
        content: "Imported from <span> Korea </span>; "
    }],
    application: [{
        title: "APPLICATION",
        content: "Excellent for whole tent printing"
    }, {
        title: "APPLICATION",
        content: "Excellent for logo printing"
    }],
    cost: [{
        title: "COST",
        content: "$$$"
    }, {
        title: "COST",
        content: "$$"
    }]
};

const Section = (prop) => {
    return (
        <Block className="text-center" {...prop}>
            <Block className={styles["container"]}>
                {Object.keys(printingSpecs).map((key, idx) => {
                    if (idx === 0) {
                        return (
                            <Block key={key} className={styles["cell-contain"]} padding={["16px", null, "24px"]}>
                                {printingSpecs[key].map((item, index) => (
                                    <Block key={index} flex={1}>
                                        <AspectRatioBox aspectRatio={1} width="100px" margin="auto"><AspectRatioBoxBody as={Image} src={item.image} alt={item.name} layout="fill" objectFit="contain"/></AspectRatioBox>
                                        <Block as="h3" font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} paddingTop="16px">{item.name}</Block>
                                    </Block>
                                ))}
                            </Block>
                        )
                    } else {
                        return (
                            <Block key={key} className={styles["cell-contain"]} padding={["16px", null, "24px"]} backgroundColor={idx % 2 === 1 ? "#F7F7F7" : "white"}>
                                {printingSpecs[key].map((item, index) => (
                                    <Block key={index} className={styles["cell"]}>
                                        <Block as="h3" font={["MinXHeading12", "MinXHeading12", "MinXHeading14"]} color="MinXSecondaryText">{item.title}</Block>
                                        <Block font="MinXParagraph16" color="MinXPrimaryText" dangerouslySetInnerHTML={{__html: item.content}}/>
                                    </Block>
                                ))}
                            </Block>
                        )
                    }
                })}
            </Block>
            <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">
                *Color durability depends on usage and weather condition.
            </Block>
        </Block>
    );
}

export default Section;
