import React from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {Select} from "baseui/select";

import DataSpec from "../../../assets/spec-canopy-tent.json";

function Canopy_Tent_Spec({router}) {
    const [columnValue, setColumnValue] = React.useState([DataSpec.selection[0], DataSpec.selection[1]]);

    const valueSelect = (params, index) => {
        let value = JSON.parse(JSON.stringify(columnValue));
        value[index] = params.value[0];
        setColumnValue(value)
    }

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
                {/*小屏选择对比*/}
                <Block display={["block", "none"]}>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginLeft="auto"
                               overrides={{
                                   Block: {
                                       style: {textAlign: "center"}
                                   },
                               }}
                        >
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
                                   props: {className: "spec-sticky-bar"}
                               },
                           }}
                    >
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginLeft="auto"
                               overrides={{
                                   Block: {
                                       style: {textAlign: "center"}
                                   },
                               }}
                        >
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
                                        <Block width="64px" height="24px" font="MinXLabel14" marginRight="auto" marginLeft="auto">
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
                    <Block height="28px"/>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Size</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft="16px">
                                        {DataSpec.size[value.index].map((l, i) => {
                                            return (
                                                <Block key={i} marginBottom="12px" font="MinXLabel14" color="MinXPrimaryText"
                                                       overrides={{
                                                           Block: {
                                                               style: {fontWeight: "400"}
                                                           },
                                                       }}
                                                >{l}</Block>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Color</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} display="grid" justifyContent="center" width="80px" gridTemplateColumns="repeat(3, 33%)" gridRowGap="8px"
                                           marginRight="auto" marginLeft="auto">
                                        {DataSpec.color[value.index].map((l, i) => {
                                            return (
                                                <Block key={i} width="16px" height="16px" backgroundColor={l} marginRight="auto" marginBottom="16px" marginLeft="auto"
                                                       overrides={{
                                                           Block: {
                                                               style: {border: "1px solid #E5E5E5", borderRadius: "50%"}
                                                           },
                                                       }}
                                                />
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Frame Specifications</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft="16px">
                                        {DataSpec.frame_specifications[value.index].map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Frame Measurements</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft="16px">
                                        {DataSpec.frame_measurements[value.index].map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Roof and Sidewalls Specifications</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {DataSpec.roof_and_sidewalls_specifications[value.index].map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Height Measurements</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {DataSpec.height_measurements[value.index].map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText" $style={{whiteSpace: "pre-wrap"}}>
                                                        {l.content}
                                                    </Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Package Measurements (10’x10’ canopy tent)</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {DataSpec.package_measurements[value.index].map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Warranty</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {DataSpec.warranty[value.index].map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                </Block>
                {/*大屏并列对比*/}
                <Block display={["none", "block"]}>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block width={"100%"} display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]}
                               gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginLeft="auto"
                               overrides={{
                                   Block: {
                                       style: {textAlign: "center"}
                                   },
                               }}
                        >
                            {DataSpec.display.map((item, index) => {
                                return (
                                    <Block key={index} paddingTop={["16px", "24px"]}>
                                        <Block position="relative" width={["100px", "100px", "140px"]} height={["100px", "100px", "140px"]}
                                               marginRight="auto" marginBottom={["16px", "24px", "40px"]} marginLeft="auto"
                                        >
                                            <Image src={item.picUrl} alt={item.alt} layout="fill" objectFit="contain" quality={100}/>
                                        </Block>
                                        <Block marginBottom="4px" font="MinXLabel12" color="MinXSecondaryText">{item.subtitle}</Block>
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto"
                           overrides={{
                               Block: {
                                   props: {className: "spec-sticky-bar"}
                               },
                           }}
                    >
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]}
                               gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginLeft="auto"
                               overrides={{
                                   Block: {
                                       style: {textAlign: "center"}
                                   },
                               }}
                        >
                            {DataSpec.display.map((item, index) => {
                                return (
                                    <Block key={index} paddingTop="4px" paddingBottom="4px">
                                        <Block marginBottom="8px" font="MinXHeading14" color="MinXPrimaryText">{item.title}</Block>
                                        <Block width="64px" height="24px" font="MinXLabel14" marginRight="auto" marginBottom="4px" marginLeft="auto">
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
                                                    onClick={() => router.push(item.buyUrl)}
                                            >
                                                Buy
                                            </Button>
                                        </Block>
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block height={["28px", "44px", "60px"]}/>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Size</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.size.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <Block key={i} marginBottom="12px" font="MinXLabel14" color="MinXPrimaryText"
                                                       overrides={{
                                                           Block: {
                                                               style: {fontWeight: "400"}
                                                           },
                                                       }}
                                                >{l}</Block>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Color</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.color.map((item, index) => {
                                return (
                                    <Block key={index} display="grid" justifyContent="center" width="80px"
                                           gridTemplateColumns="repeat(3, 33%)" gridRowGap="8px"
                                           marginRight="auto" marginLeft="auto">
                                        {item.map((l, i) => {
                                            return (
                                                <Block key={i} width="16px" height="16px" backgroundColor={l} marginRight="auto" marginBottom="16px" marginLeft="auto"
                                                       overrides={{
                                                           Block: {
                                                               style: {border: "1px solid #E5E5E5", borderRadius: "50%"}
                                                           },
                                                       }}
                                                />
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Frame Specifications</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.frame_specifications.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Frame Measurements</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.frame_measurements.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Roof and Sidewalls Specifications</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.roof_and_sidewalls_specifications.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Height Measurements</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.height_measurements.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText"
                                                           overrides={{
                                                               Block: {
                                                                   style: {whiteSpace: "pre-wrap"}
                                                               },
                                                           }}
                                                    >
                                                        {l.content}
                                                    </Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Package Measurements (10’x10’ canopy tent)</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.package_measurements.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block minHeight="40px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                    <Block display="flex" flexDirection="column" width={["100%", "448px", "756px"]} marginRight="auto" marginLeft="auto">
                        <Block marginBottom={["23px", "32px"]} font="MinXHeading14" color="MinXPrimaryText">Warranty</Block>
                        <Block width={"100%"} display="grid" justifyContent="center"
                               gridTemplateColumns={["repeat(2, 50%)", "repeat(3, 120px)", "repeat(3, 213px)"]} gridColumnGap={["16px", "32px"]}
                               marginRight="auto" marginBottom={["32px", "48px", "64px"]} marginLeft="auto"
                        >
                            {DataSpec.warranty.map((item, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {item.map((l, i) => {
                                            return (
                                                <div key={i}>
                                                    <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                    <Block marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
                                                </div>
                                            )
                                        })}
                                    </Block>
                                )
                            })}
                        </Block>
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    );
}

export default withRouter(Canopy_Tent_Spec);
