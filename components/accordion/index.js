"use strict";

import { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";

import styles from "./accordion.module.css";

export default function Custom_Accordion(props) {
  const { list, square } = props;

  const [expanded, setExpanded] = useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className={styles["container"]}>
      {list.map((item, index) => (
        <Accordion
          key={index}
          classes={{
            root: styles["root-accordion"],
            expanded: styles["root-accordion-expanded"],
          }}
          id={"panel" + index}
          square={square}
          expanded={expanded === "panel" + index}
          onChange={handleChange("panel" + index)}
        >
          <AccordionSummary
            classes={{
              root: styles["root-accordion-summary"],
              content: styles["root-accordion-summary-content"],
            }}
            aria-controls={"panel" + index + "-content"}
            id={"panel" + index + "-summary"}
          >
            <Typography>{item.summary}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              classes={{
                root: styles["root-typography"],
              }}
              align="left"
            >
              {item.details}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
