import React from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import {Button, SHAPE} from "baseui/button";
import {Select} from "baseui/select";

const data = {
    display: [
        {picUrl: "images/canopy-tent/spec/y5.png", alt: "Y5 Spec", title: "Y5 Economic", subtitle: "Powder-coated steel", buyUrl: {pathname: '/products/canopy-tent/buy', query: {series: "y5"}}},
        {picUrl: "images/canopy-tent/spec/y6.png", alt: "Y6 Spec", title: "Y6 Commercial", subtitle: "Aluminum", buyUrl: {pathname: '/products/canopy-tent/buy', query: {series: "y6"}}},
        {picUrl: "images/canopy-tent/spec/y7.png", alt: "Y7 Spec", title: "Y7 Heavy Duty", subtitle: "Heavy duty aluminum", buyUrl: {pathname: '/products/canopy-tent/buy', query: {series: "y7"}}}
    ],
    size: [
        ["10'x10'", "10'x15'", "10'x20'"],
        ["10'x10'", "10'x15'", "10'x20'"],
        ["10'x10'", "10'x15'", "10'x20'", "13'x13'", "13'x20'", "13'x26'", "16'x16'", "20'x20'"],
    ],
    color: [
        ["#000000", "#F4C84E", "#FFFFFF", "#991F34", "#275D3D", "#1A4A8B"],
        ["#000000", "#F4C84E", "#FFFFFF", "#991F34", "#275D3D", "#1A4A8B"],
        ["#000000", "#F4C84E", "#FFFFFF", "#991F34", "#275D3D", "#1A4A8B"],
    ],
    frame_specifications: [
        [
            {label: "Frame Material", content: "Powder-coated steel"},
            {label: "Outer Leg Shape", content: "Hexagonal"},
            {label: "Bracket Connectors", content: "Nylon"},
            {label: "Height Adjustment", content: "Push button"},
            {label: "Nuts and Bolts", content: "Zinc coated steel"},
            {label: "Plastic parts", content: "Nylon"},
            {label: "Footplate", content: "Triangular zinc coated steel"},
        ],
        [
            {label: "Frame Material", content: "6063-T5 Aluminum"},
            {label: "Outer Leg Shape", content: "Hexagonal"},
            {label: "Bracket Connectors", content: "6063-T5 Aluminum"},
            {label: "Height Adjustment", content: "Push button"},
            {label: "Nuts and Bolts", content: "Stainless steel"},
            {label: "Plastic parts", content: "Nylon"},
            {label: "Footplate", content: "4' x 4' zinc coated steel"},
        ],
        [
            {label: "Frame Material", content: "6063-T5 Aluminum"},
            {label: "Outer Leg Shape", content: "Hexagonal"},
            {label: "Bracket Connectors", content: "6063-T5 Aluminum"},
            {label: "Height Adjustment", content: "Push button"},
            {label: "Nuts and Bolts", content: "Stainless steel"},
            {label: "Plastic parts", content: "Nylon"},
            {label: "Footplate", content: "4' x 4' zinc coated steel"},
        ],
    ],
    frame_measurements: [
        [
            {label: "Outer Leg Diameter", content: "1.75 inches (45mm)"},
            {label: "Outer Leg Thickness", content: "0.05inches (1.2mm)"},
            {label: "Truss bar height ", content: "25mm"},
            {label: "Truss bar width", content: "12.5mm"},
            {label: "Truss bar depth", content: "1.2mm"},
        ],
        [
            {label: "Outer Leg Diameter", content: "1.75 inches (45mm)"},
            {label: "Outer Leg Thickness", content: "0.05inches (1.2mm)"},
            {label: "Truss bar height ", content: "26mm"},
            {label: "Truss bar width", content: "13mm"},
            {label: "Truss bar depth", content: "1mm"},
            {label: "Truss bar structure", content: "Built-in reinforcing rib"},
        ],
        [
            {label: "Outer Leg Diameter", content: "1.75 inches (45mm)"},
            {label: "Outer Leg Thickness", content: "0.05inches (1.2mm)"},
            {label: "Truss bar height ", content: "35mm"},
            {label: "Truss bar width", content: "13mm"},
            {label: "Truss bar depth", content: "1.8mm"},
            {label: "Truss bar structure", content: "Built-in reinforcing rib"},

        ]
    ],
    roof_and_sidewalls_specifications: [
        [
            {label: "Fabric", content: "500D Polyester with PVC coating 320gsm"},
            {label: "Function", content: "Waterproof, CPAI-84 certified fire retardant, UV protection"},
            {label: "Reinforcement", content: "All stress points"},
            {label: "Roof connected wall", content: "2 inch (5cm) velcro"},
            {label: "Wall connector", content: "#8 resin zipper"},
            {label: "Roof tension", content: "Spring"},
        ],
        [
            {label: "Fabric", content: "500D Polyester with PVC coating 320gsm"},
            {label: "Function", content: "Waterproof, CPAI-84 certified fire retardant, UV protection"},
            {label: "Reinforcement", content: "All stress points"},
            {label: "Roof connected wall", content: "2 inch (5cm) velcro"},
            {label: "Wall connector", content: "#8 resin zipper"},
            {label: "Roof tension", content: "Spring"},
        ],
        [
            {label: "Fabric", content: "500D Polyester with PVC coating 320gsm"},
            {label: "Function", content: "Waterproof, CPAI-84 certified fire retardant, UV protection"},
            {label: "Reinforcement", content: "All stress points"},
            {label: "Roof connected wall", content: "2 inch (5cm) velcro"},
            {label: "Wall connector", content: "#8 resin zipper"},
            {label: "Roof tension", content: "Spring"},
        ],
    ],
    height_measurements: [
        [
            {label: "Peak height ", content: `10'10" (3.43m)`},
            {label: "Height adjustment ", content: `6'3" (190cm)\n6'7" (200cm)\n6'10" (208cm)`},
        ],
        [
            {label: "Peak height ", content: "10'10\" (3.28m)"},
            {label: "Height adjustment ", content: "6'3\" (190cm)\n6'7\" (200cm)\n6'10\" (208cm)"},
        ],
        [
            {label: "Peak height ", content: "10'10\" (3.28m)"},
            {label: "Height adjustment ", content: "6'3\" (190cm)\n6'7\" (200cm)\n6'10\" (208cm)"},
        ],
    ],
    package_measurements: [
        [
            {label: "Height", content: "65 inches (165cm)"},
            {label: "Width", content: "11 inches (28cm)"},
            {label: "Depth", content: "11 inches (28cm)"},
            {label: "Weight", content: "78.8 lb (35.8kg)"},
        ],
        [
            {label: "Height", content: "65 inches (165cm)"},
            {label: "Width", content: "10 inches (27cm)"},
            {label: "Depth", content: "11 inches (29cm)"},
            {label: "Weight", content: "71.8 lb (32.6kg)"},
        ],
        [
            {label: "Height", content: "65 inches (165cm)"},
            {label: "Width", content: "13 inches (34cm)"},
            {label: "Depth", content: "13 inches (34cm)"},
            {label: "Weight", content: "71.8 lb (32.6kg)"},
        ],
    ],
    warranty: [
        [
            {label: "Frame", content: "1 year"},
            {label: "Roof", content: "1 year"},
        ],
        [
            {label: "Frame", content: "5 years"},
            {label: "Roof", content: "1 year"},
        ],
        [
            {label: "Frame", content: "10 years"},
            {label: "Roof", content: "1 year"},
        ],
    ],
};

const selection = [
    {index: 0, label: "Y5 Economic"},
    {index: 1, label: "Y6 Commercial",},
    {index: 2, label: "Y7 Heavy Duty",},
];

function Canopy_Tent_Spec({router}) {
    const [columnValue, setColumnValue] = React.useState([selection[0], selection[1]]);

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
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Size</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft="16px">
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
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
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
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Frame Specifications</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft="16px">
                                        {data.frame_specifications[value.index].map((l, i) => {
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
                                        {data.frame_measurements[value.index].map((l, i) => {
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
                                        {data.roof_and_sidewalls_specifications[value.index].map((l, i) => {
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
                                        {data.height_measurements[value.index].map((l, i) => {
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
                    <Block display="flex" flexDirection="column" width="100%" marginRight="auto" marginLeft="auto">
                        <Block marginBottom="23px" font="MinXHeading14" color="MinXPrimaryText">Package Measurements (10’x10’ canopy tent)</Block>
                        <Block width="100%" display="grid" justifyContent="center" gridTemplateColumns="repeat(2, 50%)" gridColumnGap="16px"
                               marginRight="auto" marginBottom="32px" marginLeft="auto"
                        >
                            {columnValue.map((value, index) => {
                                return (
                                    <Block key={index} paddingLeft={["16px", "16px", "50px"]}>
                                        {data.package_measurements[value.index].map((l, i) => {
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
                            {data.display.map((item, index) => {
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
                            {data.display.map((item, index) => {
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
                            {data.size.map((item, index) => {
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
                            {data.color.map((item, index) => {
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
                            {data.frame_specifications.map((item, index) => {
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
                            {data.frame_measurements.map((item, index) => {
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
                            {data.roof_and_sidewalls_specifications.map((item, index) => {
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
                            {data.height_measurements.map((item, index) => {
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
                            {data.package_measurements.map((item, index) => {
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
                            {data.warranty.map((item, index) => {
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
