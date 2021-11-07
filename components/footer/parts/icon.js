import React from "react";

import {Button, KIND, SHAPE} from "baseui/button";

import styles from "./parts.module.scss";

import Facebook from "./facebook.svg";
import Twitter from "./twitter.svg";
import Instagram from "./instagram.svg";
import Youtube from "./youtube.svg";
import Pinterest from "./pinterest.svg";

const Icon = ({social, link}) => {
    return (
        <Button kind={KIND.minimal} shape={SHAPE.circle}
                overrides={{
                    BaseButton: {
                        props: {
                            className: styles["icon"]
                        },
                    },
                }}
                onClick={() => (document.location.href = link ? link : "/")}
        >
            {social === "facebook" ? (
                <Facebook/>
            ) : social === "twitter" ? (
                <Twitter/>
            ) : social === "instagram" ? (
                <Instagram/>
            ) : social === "youtube" ? (
                <Youtube/>
            ) : social === "pinterest" ? (
                <Pinterest/>
            ) : null}
        </Button>
    );
};

export default Icon;
