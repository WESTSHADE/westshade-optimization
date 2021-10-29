import React from "react";
import clsx from "clsx";

import {ALIGN, Radio, RadioGroup} from "baseui/radio";

import styles from "./selection.module.scss";

const id_attribute_canopyColor = 3;
const id_attribute_canopySize = 4;
const id_attribute_wallType = 11;
const id_attribute_wallSize = 14;
const id_attribute_roofColor = 21;
const id_attribute_roofSize = 31;
const id_attribute_frameSeries = 34;
const id_attribute_poleMaterial = 43;
const id_attribute_printing_tech = 44;
const id_attribute_qty_peak = 45;
const id_attribute_qty_valance = 46;

function Selection({id, name, value, onChange, attributes = [], children}) {
    return (
        <RadioGroup name={name} align={ALIGN.horizontal} value={value} onChange={onChange}
                    overrides={{
                        RadioGroupRoot: {
                            props: {
                                className: clsx(styles["container-radio-group"], id === id_attribute_frameSeries ? styles["attr-frame"] : id === id_attribute_canopyColor ? styles["attr-color"] : null)
                            },
                        },
                        Root: {
                            props: {
                                className: clsx(styles["container-radio"], id === id_attribute_canopyColor ? styles["attr-color"] : id === id_attribute_wallType ? styles["attr-wall-type"] : null)
                            },
                            style: ({$checked}) => ({
                                padding: id === id_attribute_canopyColor ? $checked ? "4px" : "6px" : $checked ? "14px 0" : "16px 0",
                                border: id === id_attribute_canopyColor ? $checked ? "3px solid #23A4AD" : "1px solid transparent" : $checked ? "3px solid #23A4AD" : "1px solid #D9D9D9",
                            }),
                        },
                        RadioMarkOuter: {
                            props: {
                                className: styles["radio-mark-outer"]
                            },
                        },
                        Label: {
                            props: {
                                className: styles["radio"]
                            },
                            style: ({$checked}) => ({fontWeight: $checked ? "bold" : 400}),
                        },
                    }}
        >
            {attributes.length > 0 ? attributes.map(({options}) => options.map((option, index) => (
                <Radio key={index} value={option.toLowerCase()}>{option}</Radio>
            ))) : children ? children : null}
        </RadioGroup>
    )
}

export default Selection;
