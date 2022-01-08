import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Select} from "baseui/select";

import Button from "Components/button-n";
import Compare from "Components/Compare";
import {Section} from "Components/Sections";

import DataSpec from "Assets/spec-umbrella.json";

function Umbrella_Spec({router, size}) {
    const {query} = router;

    const [columnValue, setColumnValue] = useState([]);

    let tempColumnValue = [];

    const valueSelect = (params, index) => {
        let value = JSON.parse(JSON.stringify(columnValue));
        value[index] = params.value[0];
        setColumnValue(value)
    }

    useEffect(() => {
        if (!size.width) return;

        if (size.width > 479) {
            if (tempColumnValue.length > 0) {
                setColumnValue([tempColumnValue[0], tempColumnValue[1], tempColumnValue[2]])
            } else {
                if (query.primary) {
                    setColumnValue([DataSpec.selection[parseInt(query.primary)], DataSpec.selection[(parseInt(query.primary) + 1) % 5], DataSpec.selection[(parseInt(query.primary) + 2) % 5]])
                } else {
                    setColumnValue([DataSpec.selection[0], DataSpec.selection[1], DataSpec.selection[2]])
                }
            }
        } else {
            if (tempColumnValue.length > 0) {
                setColumnValue([tempColumnValue[0], tempColumnValue[1]])
            } else {
                if (query.primary) {
                    setColumnValue([DataSpec.selection[parseInt(query.primary)], DataSpec.selection[(parseInt(query.primary) + 1) % 5]])
                } else {
                    setColumnValue([DataSpec.selection[0], DataSpec.selection[1]])
                }
            }
        }
    }, [size.width]);

    useEffect(() => {
        if (tempColumnValue.length === 0 && columnValue.length > 0) tempColumnValue = JSON.parse(JSON.stringify(columnValue));

        if (columnValue.length > 0) columnValue.map((v, index) => tempColumnValue[index] = v);
    }, [columnValue]);

    return (
        <React.Fragment>
            <Block className="spec-sticky-bar" display="grid" gridColumnGap="16px" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} marginBottom="20px" padding={["20px 16px", "", "20px 32px"]}>
                {columnValue.map((value, indexC) => DataSpec["display"].map((cell, cellIndex) => {
                    if (value.index === cellIndex) {
                        return (
                            <Block key={indexC} display="grid" gridRowGap="8px" justifyItems="center">
                                <Image src={DataSpec["display"][value.index].picUrl} alt={DataSpec["display"][value.index].alt} width={100} height={100} layout="fixed" objectFit="contain"/>
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
                                <Button height="24px" font="MinXLabel14" text="Buy" bundle="primary" onClick={() => router.push(DataSpec.display[value.index].buyUrl)}/>
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

export default withRouter(Umbrella_Spec);
