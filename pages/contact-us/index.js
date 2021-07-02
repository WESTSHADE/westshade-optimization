import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

function handleClick(event) {
  event.preventDefault();
}

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

export default function Contact_Us() {
  const router = useRouter();

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="contact-us">
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Typography color="textPrimary">Contact Us</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginBottom: "0" }}>
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={12} md={6}>
              <div style={{ textAlign: "left" }}>
                <div className="section-subtitle">INFORMATION QUESTIONS</div>
                <h3 className="section-title" style={{ fontSize: "1.725rem" }}>
                  FREQUENTLY ASKED QUESTIONS
                </h3>
                <div>
                  <Accordion
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <Typography>
                        Where can I use my WestShade pop-up canopy?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Our canopies stand securely on grass, dirt, or pavement
                        without ropes or poles. In windy conditions, However, we
                        recommend using our Weight Bags to anchor and prevent
                        your canopy from tipping over.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    square
                    expanded={expanded === "panel2"}
                    onChange={handleChange("panel2")}
                  >
                    <AccordionSummary
                      aria-controls="panel2d-content"
                      id="panel2d-header"
                    >
                      <Typography>
                        Can I buy a replacement canopy covering?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Yes, we offer many replacement cover options. Please
                        call customer service at 949-522-8111 or contact us
                        online.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    square
                    expanded={expanded === "panel3"}
                    onChange={handleChange("panel3")}
                  >
                    <AccordionSummary
                      aria-controls="panel3d-content"
                      id="panel3d-header"
                    >
                      <Typography>
                        Do you have any accessories available?
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Yes, our full line of accessories includes sidewalls,
                        half sidewalls, sidewalls with roll up doors, sidewalls
                        with windows and sand bags.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    square
                    expanded={expanded === "panel4"}
                    onChange={handleChange("panel4")}
                  >
                    <AccordionSummary
                      aria-controls="panel4d-content"
                      id="panel4d-header"
                    >
                      <Typography>
                        What fire ratings do your fabric items have？
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Our fabric meets CPAI-84, NFPA-71 and the California
                        Administrative Code Title 19 fire resistant
                        requirements.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    expanded={expanded === "panel5"}
                    onChange={handleChange("panel5")}
                  >
                    <AccordionSummary
                      aria-controls="panel5d-content"
                      id="panel5d-header"
                    >
                      <Typography>What are your shipping costs? </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        We provide free shipping and handling costs for any
                        orders over $149 within the U.S., with the exception of
                        AK, HI and PR.
                        <br />
                        <br />
                        Shipping costs for customers located in those 3 states
                        will be provided after further order estimates.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}
