import React, {useEffect, useState} from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {Select} from "baseui/select";

const data = {
    display: [
        {picUrl: "images/umbrella/spec/bali.png", alt: "Bali Umbrella Spec", buyUrl: '/products/tilt-umbrellas/bali-crank-lift-patio-umbrella'},
        {picUrl: "images/umbrella/spec/kapri.png", alt: "Kapri Umbrella Spec", buyUrl: '/'},
        {picUrl: "images/umbrella/spec/santorini.png", alt: "Santorini Umbrella Spec", buyUrl: '/products/market-umbrellas/santorini-umbrella'},
        {picUrl: "images/umbrella/spec/marco.png", alt: "Marco Umbrella Spec", buyUrl: '/products/market-umbrellas/marco-umbrella'},
        {picUrl: "images/umbrella/spec/catalina.png", alt: "Catalina Umbrella Spec", buyUrl: '/products/cantilever-umbrellas/catalina-umbrella'},
    ],
    shape: [
        ["Octagon"],
        ["Octagon"],
        ["Square", "Octagon"],
        ["Square"],
        ["Square"],
    ],
    size: [
        ["9'"],
        ["6.5'", "7.5'", "9'", "10'"],
        ["6.5'", "7.5'", "9'", "10'", "11.5'"],
        ["6.5'"],
        ["10'", "11.5'", "13'", "16.4'"],
    ],
    color: [
        ["#E8634E", "#C83737", "#D6C199", "#4EB3F2"],
        ["#000000", "#585858", "#D6C199", "#A0353A", "#23A4AD", "#DDB95A"],
        ["#000000", "#585858", "#D6C199", "#A0353A", "#23A4AD", "#DDB95A"],
        ["#000000", "#585858", "#D6C199", "#A0353A", "#23A4AD", "#DDB95A"],
        ["#FFFFFF"]
    ],
    lift_system: [
        ["Crank"],
        ["Crank"],
        ["Pulley"],
        ["Push up"],
        ["Crank"],
    ],
    tilt: [
        ["Push button"],
        ["Crank"],
        ["Non-tilt"],
        ["Non-tilt"],
        ["Non-tilt"],
    ],
    frame: [
        [
            {label: "Frame Material", content: "Steel in bronze finish"},
            {label: "Pole", content: `d=1.5", thickness=0.03"`},
            {},
            {label: "Rib", content: <>8 fiberglass ribs<br/>0.75" x 0.5", thickness=0.03"</>},
        ],
        [
            {label: "Frame Material", content: "Aluminum"},
            {label: "Pole - Upper", content: `d=1.38", thickness=0.06"`},
            {label: "Pole - Lower", content: `d=1.5", thickness=0.06"`},
            {label: "Rib", content: <>8 aluminum ribs<br/>0.78" x 0.45", thickness=0.07"</>},
        ],
        [
            {label: "Frame Material", content: "Aluminum"},
            {label: "Pole", content: <>d=1.57", thickness=0.1"<br/>d=2", thickness=0.12" (size=10', 11.5')</>},
            {},
            {label: "Rib", content: <>4 aluminum ribs (size=6.5')<br/>8 aluminum ribs<br/>1" x 0.75", thickness=0.05"</>},
        ],
        [
            {label: "Frame Material", content: "Aluminum"},
            {label: "Pole", content: `d=1.5", thickness=0.08"`},
            {},
            {label: "Rib", content: <>4 aluminum ribs<br/>d=0.75", thickness=0.07"</>},
        ],
        [
            {label: "Frame Material", content: "Aluminum"},
            {label: "Pole", content: `d=3.5", thickness=0.4"`},
            {},
            {label: "Rib", content: <>4 aluminum ellipse shape ribs<br/>2.375" x 1.375"</>},
        ],
    ],
    fabric: [
        [
            {label: "Fabric Material", content: "Polyester (SDP)"},
            {label: "gsm", content: "-"},
            {label: "UV Resistance", content: "200 hours"},
        ],
        [
            {label: "Fabric Material", content: "Acrylic (AGORA)"},
            {label: "gsm", content: "260"},
            {label: "UV Resistance", content: <>UPF 50+<br/>1500+ hours</>},
        ],
        [
            {label: "Fabric Material", content: <>Polyester (SDP)<br/>Acrylic (AGORA)</>},
            {label: "gsm", content: "260"},
            {label: "UV Resistance", content: <>UPF 50+<br/>1500+ hours</>},
        ],
        [
            {label: "Fabric Material", content: <>Polyester (SDP)<br/>Acrylic (AGORA)</>},
            {label: "gsm", content: "260"},
            {label: "UV Resistance", content: <>UPF 50+<br/>1500+ hours</>},
        ],
        [
            {label: "Fabric Material", content: "Heavy duty welded PVC"},
            {label: "gsm", content: "850"},
            {label: "UV Resistance", content: <>UPF 50+<br/>1500+ hours</>},
        ],
    ],
    height_measurements: [
        [
            {label: "Overall height", content: `8.2'`},
            {label: "Clearance height", content: `7'`},
        ],
        [
            {label: "Overall height", content: <>6.9' - 8.2' (size=6.5', 7.5')<br/>7.2' - 8.5' (size=9')<br/>7.2' - 8.9' (size=10')</>},
            {label: "Clearance height", content: `5.9' - 7.2'`},
        ],
        [
            {label: "Overall height", content: <>8.2' (size=7.5')<br/>8.5' (size=6.5', 9')<br/>9' (size=11.5')<br/>10' (size=10')</>},
            {label: "Clearance height", content: `7'`},
        ],
        [
            {label: "Overall height", content: `7.5'`},
            {label: "Clearance height", content: `7.5'`},
        ],
        [
            {label: "Overall height", content: <>11'<br/>11.5’ (size=13’)</>},
            {label: "Clearance height", content: <>7.5'<br/>8.2’ (size=13’)</>},
        ],
    ],
    warranty: [
        [
            {label: "Frame", content: "3 years"},
            {label: "Roof", content: "2 years"},
        ],
        [
            {label: "Frame", content: "3 years"},
            {label: "Roof", content: "5 years"},
        ],
        [
            {label: "Frame", content: "3 years"},
            {label: "Roof", content: <>2 years (SDP)<br/>5 years (AGORA)</>},
        ],
        [
            {label: "Frame", content: "3 years"},
            {label: "Roof", content: <>2 years (SDP)<br/>5 years (AGORA)</>},
        ],
        [
            {label: "Frame", content: "3 years"},
            {label: "Roof", content: "5 years"},
        ],
    ],
};

const selection = [
    {index: 0, label: "Bali"},
    {index: 1, label: "Kapri",},
    {index: 2, label: "Santorini",},
    {index: 3, label: "Marco",},
    {index: 4, label: "Catalina",},
];

function Canopy_Tent_Spec({router, size}) {
    const {query} = router;

    const [columnValue, setColumnValue] = React.useState([]);

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
                    setColumnValue([selection[parseInt(query.primary)], selection[(parseInt(query.primary) + 1) % 5], selection[(parseInt(query.primary) + 2) % 5]])
                } else {
                    setColumnValue([selection[0], selection[1], selection[2]])
                }
            }
        } else {
            if (tempColumnValue.length > 0) {
                setColumnValue([tempColumnValue[0], tempColumnValue[1]])
            } else {
                if (query.primary) {
                    setColumnValue([selection[parseInt(query.primary)], selection[(parseInt(query.primary) + 1) % 5]])
                } else {
                    setColumnValue([selection[0], selection[1]])
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
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
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
                                        <Image src={data.display[value.index].picUrl} alt={data.display[value.index].alt} layout="fill" objectFit="contain" quality={100}/>
                                    </Block>
                                    <Block marginBottom="4px" font="MinXLabel12" color="MinXSecondaryText">{data.display[value.index].subtitle}</Block>
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
                                    <Select backspaceRemoves={false} clearable={false} options={selection} value={[value]} searchable={false}
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
                                                onClick={() => router.push(data.display[value.index].buyUrl)}
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
                    <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Shape</Block>
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.shape[value.index].map((l, i) => {
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
                    <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Shade Size</Block>
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.size[value.index].map((l, i) => {
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
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} display="grid" justifyContent="center" width="80px" gridTemplateColumns="repeat(3, 33%)" gridRowGap="8px"
                                       marginRight="auto" marginLeft="auto">
                                    {data.color[value.index].map((l, i) => {
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
                    <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Lift System</Block>
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.lift_system[value.index].map((l, i) => {
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
                    <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Tilt</Block>
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.tilt[value.index].map((l, i) => {
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
                    <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Frame</Block>
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.frame[value.index].map((l, i) => {
                                        return (
                                            <div key={i}>
                                                <Block minHeight="16px" marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
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
                    <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Fabric</Block>
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.fabric[value.index].map((l, i) => {
                                        return (
                                            <div key={i}>
                                                <Block minHeight="16px" marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
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
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.height_measurements[value.index].map((l, i) => {
                                        return (
                                            <div key={i}>
                                                <Block minHeight="16px" marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{l.label}</Block>
                                                <Block minHeight="80px" marginBottom="24px" font="MinXParagraph14" color="MinXPrimaryText">{l.content}</Block>
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
                    <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap="16px"
                           marginRight="auto" marginBottom="32px" marginLeft="auto"
                    >
                        {columnValue.map((value, index) => {
                            return (
                                <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                    {data.warranty[value.index].map((l, i) => {
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
        </React.Fragment>
    );
}

export default withRouter(Canopy_Tent_Spec);
