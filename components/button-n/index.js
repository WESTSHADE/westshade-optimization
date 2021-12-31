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
            color: "rgba(255, 255, 255, 0.2)"
        },
        hover: {
            color: "rgba(255, 255, 255, 0.3)"
        },
        active: {
            color: "rgba(255, 255, 255, 0.2)"
        },
        focus: {
            color: "rgba(255, 255, 255, 0.2)"
        },
    },
}

const MButton = ({
                     type = "solid", bundle, shape, disabled, isLoading, onClick, text, as, display = "block", width, height, font, color,
                     buttonClassName, buttonStyle, buttonHoverStyle, buttonActiveStyle, buttonFocusStyle, buttonDisabledStyle,
                     buttonBackgroundColor, buttonHoverBackgroundColor, buttonActiveBackgroundColor, buttonFocusBackgroundColor, buttonDisabledBackgroundColor,
                     iconStyle, startEnhancer, endEnhancer, ...props
                 }) => {

    const [defaultStyle, setDefaultStyle] = useState({
        style: {
            color: "transparent",
            backgroundColor: "transparent",
            borderColor: "transparent"
        },
        hover: {
            // backgroundColor: "#43878C",
            // borderColor: "#43878C"
        },
        active: {
            // backgroundColor: "#23A4AD",
            // borderColor: "#23A4AD"
        },
        focus: {
            // backgroundColor: "#23A4AD",
            // borderColor: "#23A4AD"
        },
        disabled: {
            // backgroundColor: "#23A4AD",
            // borderColor: "#23A4AD",
        },
    });

    const [bHeight, setBHeight] = useState(0);

    const buttonRaf = useRef(null);

    useEffect(() => {
        let ss = {}, colorSet = options[bundle];

        ss = Object.assign({}, defaultStyle);

        if (type === "solid") {
            if (colorSet) {
                ss.style = {
                    backgroundColor: colorSet.style.color,
                };
                ss.hover = {
                    backgroundColor: colorSet.hover.color,
                };
                ss.active = {
                    backgroundColor: colorSet.active.color,
                };
                ss.focus = {
                    backgroundColor: colorSet.focus.color,
                };
                ss.disabled = {
                    backgroundColor: colorSet.style.color,
                };
            }
        } else if (type === "outline") {
            if (colorSet) {
                ss.style = {
                    color: colorSet.style.color,
                    borderColor: colorSet.style.color,
                };
                ss.hover = {
                    color: colorSet.hover.color,
                    borderColor: colorSet.hover.color,
                };
                ss.active = {
                    color: colorSet.active.color,
                    borderColor: colorSet.active.color,
                };
                ss.focus = {
                    color: colorSet.focus.color,
                    borderColor: colorSet.focus.color,
                };
                ss.disabled = {
                    color: colorSet.style.color,
                    borderColor: colorSet.style.color,
                };
            }
        } else if (type === "text") {
            if (colorSet) {
                ss.style = {
                    color: colorSet.style.color,
                };
                ss.hover = {
                    color: colorSet.hover.color,
                };
                ss.active = {
                    color: colorSet.active.color,
                };
                ss.focus = {
                    color: colorSet.focus.color,
                };
                ss.disabled = {
                    color: colorSet.style.color,
                };
            }
        }

        if (color) {
            ss.style.color = "inherit";
            ss.hover.color = "inherit";
            ss.active.color = "inherit";
            ss.focus.color = "inherit";
            ss.style.color = "inherit";
        }

        if (buttonBackgroundColor) ss.style.backgroundColor = buttonBackgroundColor;
        if (buttonHoverBackgroundColor) ss.hover.backgroundColor = buttonHoverBackgroundColor;
        if (buttonActiveBackgroundColor) ss.active.backgroundColor = buttonActiveBackgroundColor;
        if (buttonFocusBackgroundColor) ss.focus.backgroundColor = buttonFocusBackgroundColor;
        if (buttonDisabledBackgroundColor) ss.disabled.backgroundColor = buttonDisabledBackgroundColor;

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
                    isLoading={isLoading}
            >
                {type === "rainbow" ?
                    <Block className={styles["button-inner"]}
                           style={{
                               backgroundColor: buttonBackgroundColor,
                               ":hover": {...defaultStyle.hover, ...buttonHoverStyle},
                               ":active": {...defaultStyle.active, ...buttonActiveStyle},
                               ":focus": {...defaultStyle.focus, ...buttonFocusStyle},
                               ":disabled": {...defaultStyle.disabled, ...buttonDisabledStyle},
                           }}
                    >{text}</Block> : text}
                {props.children}
            </Button>
        </Block>
    )
}

export default MButton;
