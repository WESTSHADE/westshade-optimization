import React from "react";
import clsx from "clsx";

import {ALIGN, Radio, RadioGroup} from "baseui/radio";

import styles from "./selection.module.scss";

const id_attribute_size = 0;
const id_attribute_color = 2;
const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_wallType = 11;
const id_attribute_wallSize = 14;
const id_attribute_umbrellaSize = 15;
const id_attribute_wallPrintedType = 16;
const id_attribute_roofColor = 21;
const id_attribute_roofSize = 31;
const id_attribute_peakType = 32;
const id_attribute_valanceType = 33;
const id_attribute_frameSeries = 34;
const id_attribute_packageNo = 35;
const id_attribute_umbrellaMaterial = 37;
const id_attribute_inflatableCanopySize = 38;
const id_attribute_inflatableCanopyColor = 39;
const id_attribute_inflatableFrameColor = 40;
const id_attribute_printingTechnique = 44;
const id_attribute_tableCoverType = 47;
const id_attribute_umbrellaFrame = 48;

export default function Selection(props) {
    let {data = {}, value, onChange} = props;

    if (data.id === id_attribute_color || data.id === id_attribute_canopyColor) {
        return (
            <RadioGroup value={value} onChange={onChange} name={data.name} align={ALIGN.horizontal}
                        overrides={{
                            RadioGroupRoot: {
                                props: {
                                    className: clsx([styles["container-radio-group"], styles["attr-color"]])
                                },
                            },
                            Root: {
                                props: {
                                    className: clsx([styles["container-radio"], styles["attr-color"]])
                                },
                                style: ({$checked}) => ({
                                    padding: $checked ? "4px" : "6px",
                                    border: $checked ? "3px solid #23A4AD" : "1px solid transparent",
                                }),
                            },
                            RadioMarkOuter: {
                                style: {display: "none"},
                            },
                            RadioMarkInner: {
                                style: {display: "none"},
                            },
                        }}
            >
                {data.options.map((option, i) =>
                    <Radio key={i} value={option.toLowerCase()}
                           overrides={{
                               Label: ({$value}) => {
                                   const color = $value === "yellow" ? "#F4C84E" : $value === "green" ? "#275D3D" : $value === "blue" ? "#1A4A8B" : $value === "red" ? "#991F34" : $value === "blood orange" ? "#BC3823" : $value === "khaki" ? "khaki" : $value === "pacific blue" ? "#1ca9c9" : $value === "sand" ? "#DDC7A3" : $value === "aqua" ? "#27BAB9" : $value === "gray" ? "#5E5D60" : $value;
                                   return (
                                       <div className={styles["dot-color"]} style={{backgroundColor: color, borderColor: $value === "white" ? "#D9D9D9" : "transparent"}}/>
                                   )
                               },
                           }}
                    />
                )}
            </RadioGroup>
        )
    }

    if (data.id === id_attribute_umbrellaMaterial || data.id === id_attribute_umbrellaFrame) {
        return (
            <RadioGroup value={value} onChange={onChange} name={data.name} align={ALIGN.horizontal}
                        overrides={{
                            RadioGroupRoot: {
                                props: {
                                    className: clsx([styles["container-radio-group"], styles["attr-material"]])
                                },
                            },
                            Root: {
                                props: {
                                    className: clsx([styles["container-radio"], styles["attr-material"]])
                                },
                                style: ({$checked}) => ({
                                    padding: $checked ? "14px 30px" : "16px 32px",
                                    border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",
                                }),
                            },
                            RadioMarkOuter: {
                                style: {display: "none"},
                            },
                            RadioMarkInner: {
                                style: {display: "none"},
                            },
                            Label: {
                                props: {
                                    className: styles["radio-label"]
                                },
                                style: ({$checked}) => ({
                                    fontWeight: $checked ? "bold" : "400",
                                }),
                            },
                        }}
            >
                {data.options.map((option, i) => <Radio key={i} value={option.toLowerCase()}>{option}</Radio>)}
            </RadioGroup>
        )
    }

    if (data.id === id_attribute_tableCoverType) {
        return (
            <RadioGroup value={value} onChange={onChange} name={data.name} align={ALIGN.horizontal}
                        overrides={{
                            RadioGroupRoot: {
                                props: {
                                    className: clsx([styles["container-radio-group"], styles["attr-tableCover"]])
                                },
                            },
                            Root: {
                                props: {
                                    className: clsx([styles["container-radio"], styles["attr-tableCover"]])
                                },
                                style: ({$checked}) => ({
                                    padding: $checked ? "14px 30px" : "16px 32px",
                                    border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",
                                }),
                            },
                            RadioMarkOuter: {
                                style: {display: "none"},
                            },
                            RadioMarkInner: {
                                style: {display: "none"},
                            },
                            Label: {
                                props: {
                                    className: styles["radio-label"]
                                },
                                style: ({$checked}) => ({
                                    fontWeight: $checked ? "bold" : "400",
                                }),
                            },
                        }}
            >
                {data.options.map((option, i) => <Radio key={i} value={option.toLowerCase()}>{option + " Table Cover"}</Radio>)}
            </RadioGroup>
        )
    }

    return (
        <RadioGroup value={value} onChange={onChange} name={data.name} align={ALIGN.horizontal}
                    overrides={{
                        RadioGroupRoot: {
                            props: {
                                className: styles["container-radio-group"]
                            },
                        },
                        Root: {
                            props: {
                                className: styles["container-radio"]
                            },
                            style: ({$checked}) => ({
                                padding: $checked ? "14px 0" : "16px 0",
                                border: $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",
                            }),
                        },
                        RadioMarkOuter: {
                            style: {display: "none"},
                        },
                        RadioMarkInner: {
                            style: {display: "none"},
                        },
                        Label: {
                            props: {
                                className: styles["radio-label"]
                            },
                            style: ({$checked}) => ({
                                fontWeight: $checked ? "bold" : "400",
                            }),
                        },
                    }}
        >
            {data.options.map((option, i) => <Radio key={i} value={option.toLowerCase()}>{option}</Radio>)}
        </RadioGroup>
    )
}
