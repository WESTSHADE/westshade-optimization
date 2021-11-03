import React, {useEffect, useState} from "react";

import {Box, Container, Grid, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

const Accordion = withStyles({
    root: {
        borderTop: "1px solid rgba(0, 0, 0, .125)",
        borderBottom: "1px solid rgba(0, 0, 0, .125)",
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "auto",
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        // backgroundColor: "rgba(0, 0, 0, .03)",
        // borderBottom: "1px solid rgba(0, 0, 0, .125)",
        marginBottom: -1,
        minHeight: 56,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

function Custom_Printing_Process() {
    const [display, setDisplay] = useState(false);
    const [expanded, setExpanded] = useState("");

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => setTimeout(() => setDisplay(true), 250), []);

    return (
        <React.Fragment>
            <Box className="page contact-us" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <Box className="section-container" style={{marginBottom: "0"}}>
                            <Container maxWidth="md">
                                <Grid container>
                                    <div>
                                        <h3 className="section-title" style={{fontSize: "1.725rem"}}>
                                            GET TO KNOW OUR CUSTOM PRINTING PROCESS
                                        </h3>
                                        <div style={{textAlign: "left"}}>
                                            <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                    <Typography>Start the conversation with a quote request.</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>We work where it’s easiest for you. After answering just a few quick questions, we can make sure your request is directed to the best person to help bring your project to
                                                        life.</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion square expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
                                                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                                    <Typography>We’ll help guide you to the perfect solution.</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>Our team consists of skilled event experts, artists and customer representatives. We’ll learn about your specific use case and guide you into a tailored solution.</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion square expanded={expanded === "panel3"} onChange={handleChange("panel3")}>
                                                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                                    <Typography>We’ll show you how awesome it’ll look.</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>
                                                        Once we figure out your product fit, our team of professional artists will craft a document to help you visually see what the finished product will look like at no cost. If you don’t
                                                        like the first version, we’ll
                                                        keep working with you until you approve it.
                                                    </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion square expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
                                                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                                                    <Typography>We’ll build it and ship it.</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>All within 7-days your custom product is printed, cut, hand-sewn, assembled, quality checked and shipped out our door and on its way to you. That is all printing
                                                        process. </Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                </Grid>
                            </Container>
                        </Box>
                        <Box className="section-container" style={{marginBottom: "0"}}>
                            <Container maxWidth="md">
                                <Grid container>
                                    <div>
                                        <h3 className="section-title" style={{fontSize: "1.725rem"}}>
                                            FREQUENTLY ASKED QUESTIONS
                                        </h3>
                                        <div style={{textAlign: "left"}}>
                                            <Accordion expanded={expanded === "panel5"} onChange={handleChange("panel5")}>
                                                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                                    <Typography>Q: Do you offer design services?</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>A: Yes, Our talented and attentive art & design team is happy to help you as much or as little as you’d like in the overall design of your project.</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion square expanded={expanded === "panel6"} onChange={handleChange("panel6")}>
                                                <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                                                    <Typography>Q: Will I receive a proof before print production begins? </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>A: Yes. You will need to approve a digital proof for all custom-printed products prior to print production.</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion square expanded={expanded === "panel7"} onChange={handleChange("panel7")}>
                                                <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                                                    <Typography>Q: Can I change my artwork once it has been approved and is in production?</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>A: Can I change my artwork once it has been approved and is in production?</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion square expanded={expanded === "panel8"} onChange={handleChange("panel8")}>
                                                <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
                                                    <Typography>Q: Can I cancel my order?</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>A: No. In order to get products into our client’s hands quickly, we begin production as soon as you give us approval. There are no cancellations or returns on any
                                                        custom-printed products.</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>
                                    </div>
                                </Grid>
                            </Container>
                        </Box>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Custom_Printing_Process;
