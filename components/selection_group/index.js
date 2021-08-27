import dynamic from "next/dynamic";
import {
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Select,
    MenuItem,
} from "@material-ui/core";

import styles from "./selections.module.css";

const Selection = dynamic(() => import("../selection"));

const id_attribute_size = "0";
const id_attribute_color = "2";
const id_attribute_canopyColor = "3";
const id_attribute_canopySize = "4";
const id_attribute_wallType = "11";
const id_attribute_wallSize = "14";
const id_attribute_umbrellaSize = "15";
const id_attribute_wallPrintedType = "16";
const id_attribute_roofColor = "21";
const id_attribute_roofSize = "31";
const id_attribute_peakType = "32";
const id_attribute_valanceType = "33";
const id_attribute_frameSeries = "34";
const id_attribute_packageNo = "35";
const id_attribute_umbrellaMaterial = "37";
const id_attribute_inflatableCanopySize = "38";
const id_attribute_inflatableCanopyColor = "39";
const id_attribute_inflatableFrameColor = "40";
const id_attribute_printingTechnique = "44";

export default function Selection_Group(props) {
    const {label, defaultValue, value, onChange, list, id} = props;

    const type = props.type || "select";
    const direction = props.direction || "row";

    if (type === "select") {
        if (
            id === id_attribute_size ||
            id === id_attribute_wallSize ||
            id === id_attribute_umbrellaSize ||
            id === id_attribute_packageNo ||
            id === id_attribute_umbrellaMaterial ||
            id === id_attribute_inflatableCanopySize ||
            id === id_attribute_inflatableCanopyColor ||
            id === id_attribute_inflatableFrameColor ||
            id === id_attribute_printingTechnique
        ) {
            return (
                <FormControl component="fieldset">
                    {label ? (
                        <FormLabel
                            component="legend"
                            classes={{
                                root: styles["root-formLabel"],
                            }}
                        >
                            {label}
                        </FormLabel>
                    ) : null}
                    <Select
                        classes={{
                            selectMenu: styles["root-selectMenu"],
                        }}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                    >
                        {list.map((option, index) => {
                            return (
                                <MenuItem key={index} value={option.toLowerCase()}>
                                    {option}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
            );
        }

        if (id === id_attribute_color || id === id_attribute_frameSeries) {
            return (
                <FormControl component="fieldset" classes={{
                    root: direction === "vertical" ? styles["root-fieldset-vertical"] : null,
                }}>
                    {label ? (
                        <FormLabel
                            component="legend"
                            classes={{
                                root: styles["root-formLabel"],
                            }}
                        >
                            {label}
                        </FormLabel>
                    ) : null}
                    <RadioGroup
                        row={direction === "row"}
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                    >
                        {list.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                classes={{
                                    root: styles["root-radio-label"],
                                    label: direction === "vertical" ? styles["root-select-label-vertical"] : styles["root-radio-label-row"],
                                }}
                                value={option.toLowerCase()}
                                control={<Selection id={id.toString()} direction={direction}/>}
                                label={option}
                                labelPlacement="end"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        }

        return (
            <FormControl component="fieldset">
                {label ? (
                    <FormLabel
                        component="legend"
                        classes={{root: styles["root-formLabel"],}}
                    >
                        {label}
                    </FormLabel>
                ) : null}
                <RadioGroup
                    row
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange}
                >
                    {list.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            classes={{
                                root: styles["root-radio-label"],
                                labelPlacementBottom: styles["label-placement-bottom"],
                            }}
                            value={option.toLowerCase()}
                            control={<Selection id={id.toString()}/>}
                            label={option}
                            labelPlacement="bottom"
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        );
    } else if (type === "radio") {
        if (id === id_attribute_frameSeries || id === id_attribute_wallPrintedType) {
            return (
                <FormControl component="fieldset">
                    {label ? (
                        <FormLabel
                            component="legend"
                            classes={{root: styles["root-formLabel"],}}
                        >
                            {label}
                        </FormLabel>
                    ) : null}
                    <RadioGroup
                        row
                        defaultValue={defaultValue}
                        value={value}
                        onChange={onChange}
                    >
                        {list.map((option, index) => (
                            <FormControlLabel
                                key={index}
                                classes={{
                                    root: styles["root-radio-label"],
                                    labelPlacementBottom: styles["label-placement-bottom"],
                                }}
                                value={option.toLowerCase()}
                                control={<Selection id={id.toString()}/>}
                                label={option.split(" ")[0]}
                                labelPlacement="bottom"
                            />
                        ))}
                    </RadioGroup>
                </FormControl>
            );
        }
    } else {
        return null;
    }
}
