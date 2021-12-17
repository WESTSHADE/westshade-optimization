import React from "react";
import clsx from "clsx";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";

import styles from "./button.module.scss";

const mButton = ({
                     type = "solid",
                     display = "block",
                     width,
                     // width = ["160px"],
                     height = ["40px"],
                     font,
                     color = "white",
                     buttonClassName,
                     buttonStyle,
                     buttonBackgroundColor = "",
                     iconStyle,
                     startEnhancer,
                     endEnhancer,
                     onClick,
                     text,
                     shape = "pill",
                     disabled,
                     isLoading,
                     ...props
                 }) => {
    return (
        <Block display={display} width={width} height={height} font={font} color={color} {...props}>
            <Button shape={shape === "pill" ? SHAPE.pill : shape === "square" ? SHAPE.square : SHAPE.pill}
                    overrides={{
                        BaseButton: {
                            props: {
                                className: clsx([styles["button-base"], styles[type], buttonClassName])
                            },
                            style: {...buttonStyle},
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
                {type === "rainbow" ? (
                    <div className={styles["button-inner"]} style={{backgroundColor: buttonBackgroundColor}}>{text}</div>
                ) : text}
            </Button>
        </Block>
    )
}

export default mButton;
