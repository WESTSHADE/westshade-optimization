import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {Select} from "baseui/select";
import {StyledTable, StyledBody, StyledRow, StyledCell,} from 'baseui/table';

import {StringFn} from "../../../utils/tools"

import DataSpec from "../../../assets/spec-umbrella.json";

const stringFn = new StringFn();

function Canopy_Tent_Spec({router, size}) {
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
        if (tempColumnValue.length === 0 && columnValue.length > 0) {
            tempColumnValue = JSON.parse(JSON.stringify(columnValue));
        }

        if (columnValue.length > 0) {
            columnValue.map((v, index) => tempColumnValue[index] = v);
        }
    }, [columnValue]);

    return (
        <React.Fragment>
            <Block position="relative" paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px" marginRight="auto" marginLeft="auto" className="text-center">
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingTop="16px">
                                    <Block position="relative" width="100px" height="100px" marginRight="auto" marginBottom="16px" marginLeft="auto">
                                        <Image src={DataSpec.display[value.index].picUrl} alt={DataSpec.display[value.index].alt} layout="fill" objectFit="contain" quality={100}/>
                                    </Block>
                                    <Block marginBottom="4px" font="MinXLabel12" color="MinXSecondaryText">{DataSpec.display[value.index].subtitle}</Block>
                                </Block>
                            )
                        })}
                    </Block>
                </Block>
                <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto"
                       overrides={{
                           Block: {
                               props: {
                                   className: "spec-sticky-bar"
                               }
                           },
                       }}
                >
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginLeft="auto" className="text-center">
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingTop="4px" paddingBottom="4px">
                                    <Select backspaceRemoves={false} clearable={false} options={DataSpec.selection} value={[value]} searchable={false}
                                            labelKey="label" valueKey="index"
                                            onChange={params => valueSelect(params, index)}
                                            overrides={{
                                                Root: {
                                                    style: {marginBottom: "8px"}
                                                },
                                                ControlContainer: {
                                                    style: {height: "28px", backgroundColor: "#F7F7F7"}
                                                },
                                                ValueContainer: {
                                                    style: {
                                                        display: "flex",
                                                        alignItems: "baseline",
                                                        paddingTop: "0px",
                                                        paddingBottom: "0px",
                                                        fontSize: "12px",
                                                        lineHeight: "26px"
                                                    }
                                                },
                                            }}
                                    />
                                    <Block width={"max-content"} minWidth="64px" height="24px" font="MinXLabel14" marginRight="auto" marginLeft="auto">
                                        <Button shape={SHAPE.pill}
                                                overrides={{
                                                    BaseButton: {
                                                        style: ({$theme}) => ({
                                                            width: "100%",
                                                            height: "100%",
                                                            paddingTop: 0,
                                                            paddingRight: 0,
                                                            paddingBottom: 0,
                                                            paddingLeft: 0,
                                                            fontSize: "inherit",
                                                            fontWeight: "inherit",
                                                            lineHeight: "inherit",
                                                            backgroundColor: $theme.colors.MinXButton,
                                                            whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            ":hover": {backgroundColor: $theme.colors.MinXButtonHover},
                                                            ":active": {backgroundColor: $theme.colors.MinXButtonActive},
                                                        }),
                                                    },
                                                }}
                                                onClick={() => router.push(DataSpec.display[value.index].buyUrl)}
                                        >
                                            Buy
                                        </Button>
                                    </Block>
                                </Block>
                            )
                        })}
                    </Block>
                </Block>
                <StyledTable style={{marginBottom: "28px", border: "none", overflow: "hidden"}}>
                    <StyledBody style={{display: "grid", gridRowGap: "24px", overflowX: "scroll"}}>
                        {Object.keys(DataSpec).map((key, indexA) => {
                            if (indexA < 2) return;
                            return (
                                <>
                                    <Block marginTop="40px" font="MinXHeading14" color="MinXPrimaryText" $style={{textTransform: "capitalize"}}>{stringFn.replaceUnderscore(key)}</Block>
                                    {DataSpec[key].map((row, indexB) =>
                                        <StyledRow key={indexB} style={{alignItems: "baseline", gap: "16px"}}>
                                            {columnValue.map((value, indexC) => row.map((cell, cellIndex) => {
                                                    if (value.index === cellIndex) {
                                                        return (
                                                            <StyledCell key={indexC}>
                                                                <Block paddingLeft="12%">
                                                                    {cell.label ? <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{cell.label}</Block> : null}
                                                                    {key !== "color" ? (
                                                                        <Block display="grid" gridRowGap="8px" font="MinXParagraph14" color="MinXPrimaryText" $style={{whiteSpace: "pre-wrap"}}>
                                                                            {typeof cell.content === "object" ? cell.content.map((item, indexD) => <Block key={indexD}>{item}</Block>) : cell.content}
                                                                        </Block>
                                                                    ) : (
                                                                        <Block display="grid" justifyContent="center" width="80px" gridTemplateColumns="repeat(3, 1fr)" gridRowGap="8px" marginRight="auto" marginLeft="auto">
                                                                            {cell.content.map((item, indexD) => {
                                                                                return (
                                                                                    <Block key={indexD} width="16px" height="16px" backgroundColor={item} marginRight="auto" marginLeft="auto"
                                                                                           overrides={{
                                                                                               Block: {
                                                                                                   style: {border: "1px solid #E5E5E5", borderRadius: "50%"}
                                                                                               },
                                                                                           }}
                                                                                    />
                                                                                )
                                                                            })}
                                                                        </Block>
                                                                    )}
                                                                </Block>
                                                            </StyledCell>
                                                        )
                                                    }
                                                })
                                            )}
                                        </StyledRow>
                                    )}
                                </>
                            )
                        })}
                    </StyledBody>
                </StyledTable>
            </Block>
        </React.Fragment>
    );
}

export default withRouter(Canopy_Tent_Spec);
