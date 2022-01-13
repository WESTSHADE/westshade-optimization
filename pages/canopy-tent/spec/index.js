import React, {useMemo, useState} from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Select} from "baseui/select";
import {AspectRatioBox, AspectRatioBoxBody} from 'baseui/aspect-ratio-box';

import Button from "Components/Button";
import Compare from "Components/Compare";
import {Section} from "Components/Sections";

import DataSpec from "Assets/spec-canopy-tent.json";

function Canopy_Tent_Spec({router, size}) {
    const [tempColumnValue, setTempColumnValue] = useState([DataSpec.selection[0], DataSpec.selection[1], DataSpec.selection[2]]);

    const valueSelect = (params, index) => {
        let value = JSON.parse(JSON.stringify(tempColumnValue));
        value[index] = params.value[0];
        setTempColumnValue(value)
    }

    const columnValue = useMemo(() => size.width ? size.width > 479 ? [DataSpec.selection[0], DataSpec.selection[1], DataSpec.selection[2]] : tempColumnValue.length > 0 ? [tempColumnValue[0], tempColumnValue[1]] : [DataSpec.selection[0], DataSpec.selection[1]] : [], [size.width, tempColumnValue]);

    return (
        <React.Fragment>
            <Block className="spec-sticky-bar" display="grid" gridColumnGap="16px" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} marginBottom="20px" padding={["20px 16px", null, "20px 32px"]}>
                {columnValue.map((value, indexC) => DataSpec["display"].map((cell, cellIndex) => {
                    if (value.index === cellIndex) {
                        return (
                            <Block key={indexC} display="grid" gridRowGap="8px" justifyItems="center">
                                <AspectRatioBox width="100px" height="100px">
                                    <AspectRatioBoxBody as={Image} src={DataSpec["display"][value.index].picUrl} alt={DataSpec["display"][value.index].alt} layout="fill" objectFit="contain" priority/>
                                </AspectRatioBox>
                                <Block font="MinXLabel12" color="MinXSecondaryText">{DataSpec["display"][value.index].subtitle}</Block>
                                <Block display={["block", "none"]}>
                                    <Select backspaceRemoves={false} clearable={false} options={DataSpec["selection"]} value={[value]} searchable={false}
                                            labelKey="label" valueKey="index"
                                            onChange={params => valueSelect(params, indexC)}
                                            overrides={{
                                                ControlContainer: {
                                                    props: {
                                                        className: "select-control-container"
                                                    }
                                                },
                                                ValueContainer: {
                                                    props: {
                                                        className: "select-value-container"
                                                    }
                                                },
                                            }}
                                    />
                                </Block>
                                <Button.V1 height="24px" font="MinXLabel14" text="Buy" bundle="primary" onClick={() => router.push(DataSpec.display[value.index].buyUrl)}/>
                            </Block>
                        )
                    }
                }))}
            </Block>
            <Section upperContainerProps={{hidden: true}}
                     content={
                         <Compare data={DataSpec} selection={columnValue}/>
                     }
            />
        </React.Fragment>
    );
}

export default withRouter(Canopy_Tent_Spec);
