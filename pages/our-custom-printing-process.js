import React from "react";

import {Block} from "baseui/block";

import Accordion from "../components/accordion";
import {Section} from "../components/sections";

const QA1 = [
    {title: "Start the conversation with a quote request.", content: "We work where it’s easiest for you. After answering just a few quick questions, we can make sure your request is directed to the best person to help bring your project to life."},
    {title: "We’ll help guide you to the perfect solution.", content: "Our team consists of skilled event experts, artists and customer representatives. We’ll learn about your specific use case and guide you into a tailored solution."},
    {
        title: "We’ll show you how awesome it’ll look.",
        content: "Once we figure out your product fit, our team of professional artists will craft a document to help you visually see what the finished product will look like at no cost. If you don’t like the first version, we’ll keep working with you until you approve it."
    },
    {
        title: "We’ll build it and ship it.",
        content: "All within 7-days your custom product is printed, cut, hand-sewn, assembled, quality checked and shipped out our door and on its way to you. That is all printing process."
    },
];

const QA2 = [
    {title: "Q: Do you offer design services?", content: "A: Yes, Our talented and attentive art & design team is happy to help you as much or as little as you’d like in the overall design of your project."},
    {title: "Q: Will I receive a proof before print production begins?", content: "A: Yes. You will need to approve a digital proof for all custom-printed products prior to print production."},
    {title: "Q: Can I change my artwork once it has been approved and is in production?", content: "A: Can I change my artwork once it has been approved and is in production?"},
    {title: "Q: Can I cancel my order?", content: "A: No. In order to get products into our client’s hands quickly, we begin production as soon as you give us approval. There are no cancellations or returns on any custom-printed products."},
];

function Custom_Printing_Process() {
    return (
        <React.Fragment>
            <Section upperContainerProps={{hidden: true}}
                     content={
                         <Block maxWidth="960px" display="grid" gridTemplateColumns="1fr" gridRowGap="48px" marginRight="auto" marginLeft="auto" paddingTop="24px" paddingBottom="24px">
                             <Block>
                                 <Block font="MinXHeading28">GET TO KNOW OUR CUSTOM PRINTING PROCESS</Block>
                                 <Accordion list={QA1}/>
                             </Block>
                             <Block>
                                 <Block font="MinXHeading28">FREQUENTLY ASKED QUESTIONS</Block>
                                 <Accordion list={QA2}/>
                             </Block>
                         </Block>
                     }
            />
        </React.Fragment>
    );
}

export default Custom_Printing_Process;
