import React, {useEffect, useRef, useState} from "react";
import clsx from "clsx";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";

import styles from "./button.module.scss";

const options = {
    "primary": {
        style: {
            color: "#23A4AD"
        },
        hover: {
            color: "#43878C"
        },
        active: {
            color: "#23A4AD"
        },
        focus: {
            color: "#23A4AD"
        },
    },
    "white": {
        style: {
            color: "white"
        },
        hover: {
            color: "white"
        },
        active: {
            color: "white"
        },
        focus: {
            color: "white"
        },
    },
    "black": {
        style: {
            color: "#262626"
        },
        hover: {
            color: "#262626"
        },
        active: {
            color: "#262626"
        },
        focus: {
            color: "#262626"
        },
    },
    "gray": {
        style: {
            color: "#F2F2F2"
        },
        hover: {
            color: "#F2F2F2"
        },
        active: {
            color: "#F2F2F2"
        },
        focus: {
            color: "#F2F2F2"
        },
    },
}

const mButton = ({
                     type = "solid", bundle, shape, disabled, onClick, text, as, display = "block", width, height, font, color,
                     buttonClassName, buttonStyle, buttonHoverStyle, buttonActiveStyle, buttonFocusStyle, buttonDisabledStyle,
                     buttonBackgroundColor, buttonHoverBackgroundColor, buttonActiveBackgroundColor, buttonFocusBackgroundColor, buttonDisabledBackgroundColor,
                     iconStyle, startEnhancer, endEnhancer, ...props
                 }) => {

    const [defaultStyle, setDefaultStyle] = useState({
        style: {
            color: "white",
            backgroundColor: "#23A4AD",
            borderColor: "#23A4AD"
        },
        hover: {
            backgroundColor: "#43878C",
            borderColor: "#43878C"
        },
        active: {
            backgroundColor: "#23A4AD",
            borderColor: "#23A4AD"
        },
        focus: {
            backgroundColor: "#23A4AD",
            borderColor: "#23A4AD"
        },
        disabled: {
            backgroundColor: "#23A4AD",
            borderColor: "#23A4AD",
        },
    });

    const [bHeight, setBHeight] = useState(0);

    const buttonRaf = useRef(null);

    useEffect(() => {
        let ss = {}, colorSet = options[bundle];

        ss = Object.assign({}, defaultStyle);

        if (colorSet) {
            ss.style = {
                color: colorSet.style.color,
                backgroundColor: colorSet.style.color,
                borderColor: colorSet.style.color
            };
            ss.hover = {
                color: colorSet.hover.color,
                backgroundColor: colorSet.hover.color,
                borderColor: colorSet.hover.color
            };
            ss.active = {
                color: colorSet.active.color,
                backgroundColor: colorSet.active.color,
                borderColor: colorSet.active.color
            };
            ss.focus = {
                color: colorSet.focus.color,
                backgroundColor: colorSet.focus.color,
                borderColor: colorSet.focus.color
            };
            ss.disabled = {
                color: colorSet.style.color,
                backgroundColor: colorSet.style.color,
                borderColor: colorSet.style.color,
            };
        }

        if (color) {
            ss.style.color = "inherit";
            ss.hover.color = "inherit";
            ss.active.color = "inherit";
            ss.focus.color = "inherit";
            ss.disabled.color = "inherit";
        }

        if (type === "solid") {
            if (buttonBackgroundColor) {
                ss.style.backgroundColor = buttonBackgroundColor;
                ss.style.borderColor = buttonBackgroundColor;
            }
            if (buttonHoverBackgroundColor) {
                ss.hover.backgroundColor = buttonHoverBackgroundColor;
                ss.hover.borderColor = buttonHoverBackgroundColor;
            }
            if (buttonActiveBackgroundColor) {
                ss.active.backgroundColor = buttonActiveBackgroundColor;
                ss.active.borderColor = buttonActiveBackgroundColor;
            }
            if (buttonFocusBackgroundColor) {
                ss.focus.backgroundColor = buttonFocusBackgroundColor;
                ss.focus.borderColor = buttonFocusBackgroundColor;
            }
            if (buttonDisabledBackgroundColor) {
                ss.disabled.backgroundColor = buttonDisabledBackgroundColor;
                ss.disabled.borderColor = buttonDisabledBackgroundColor;
            }
        } else if (type === "outline") {
            if (buttonBackgroundColor) ss.style.borderColor = buttonBackgroundColor;
            if (buttonHoverBackgroundColor) ss.hover.borderColor = buttonHoverBackgroundColor;
            if (buttonActiveBackgroundColor) ss.active.borderColor = buttonActiveBackgroundColor;
            if (buttonFocusBackgroundColor) ss.focus.borderColor = buttonFocusBackgroundColor;
            if (buttonDisabledBackgroundColor) ss.disabled.borderColor = buttonDisabledBackgroundColor;
        }

        setDefaultStyle({...defaultStyle, ...ss});
    }, []);

    useEffect(() => {
        if (buttonRaf.current) setBHeight(buttonRaf.current.clientHeight);
    }, [buttonRaf.current]);

    return (
        <Block ref={buttonRaf} display={display} width={width} height={height} font={font} color={color}  {...props}>
            <Button as={as} shape={shape === "round" ? SHAPE.round : shape === "circle" ? SHAPE.circle : shape === "square" ? SHAPE.square : SHAPE.pill}
                    overrides={{
                        BaseButton: {
                            props: {
                                className: clsx([styles["button-base"], styles[type], styles[shape], buttonClassName])
                            },
                            style: {
                                paddingRight: bHeight + "px", paddingLeft: bHeight + "px", ...defaultStyle.style, ...buttonStyle,
                                ":hover": {...defaultStyle.hover, ...buttonHoverStyle},
                                ":active": {...defaultStyle.active, ...buttonActiveStyle},
                                ":focus": {...defaultStyle.focus, ...buttonFocusStyle},
                                ":disabled": {...defaultStyle.disabled, ...buttonDisabledStyle},
                            }
                        },
                        StartEnhancer: {
                            style: {...iconStyle}
                        },
                        EndEnhancer: {
                            style: {...iconStyle}
                        }
                    }}
                    startEnhancer={startEnhancer}
                    endEnhancer={endEnhancer}
                    onClick={onClick}
                    disabled={disabled}
            >
                {type === "rainbow" ? <div className={styles["button-inner"]} style={{backgroundColor: buttonBackgroundColor}}>{text}</div> : text}
                {props.children}
            </Button>
        </Block>
    )
}

export default mButton;
