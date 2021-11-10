import React, {useState} from "react";

import {useRouter} from 'next/router'
import Image from "next/image";

import {Block} from "baseui/block";
import {ListItem, ListItemLabel} from "baseui/list";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";
import {PLACEMENT, StatefulTooltip, TRIGGER_TYPE} from "baseui/tooltip";
import {Accordion, Panel} from "baseui/accordion";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";
import {Input} from "baseui/input";
import {FileUploader} from "baseui/file-uploader";
import {Textarea} from "baseui/textarea";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";

import MButton from "../../../button-n";
import {Modal} from "../../index";

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

const CPSubtitle = ({color, side}) => {
    return (
        <span className="cs-block-container">
            <span className="cs-block" style={{backgroundColor: color}}/>
            <span className="cs-subtitle">{side === 0 ? "Left" : side === 1 ? "Right" : side === 2 ? "Front" : side === 3 ? "Back" : ""}</span>
        </span>
    )
}

export default function roof_detail({selectedListTempTemp}) {
    const [selectedRoofSlide, setSelectedRoofSlide] = useState(null);
    const [selectedSlidePart, setSelectedSlidePart] = useState(0);

    if (!selectedListTempTemp) return null;

    return (
        <Block width="100%" maxWidth="448px" display="flex" flexDirection="column" marginRight="auto" marginLeft="auto" paddingTop={["32px", "40px"]}>
            <Block font="MinXLabel28">{selectedSide === 0 ? "Left " : selectedSide === 1 ? "Right " : selectedSide === 2 ? "Front " : selectedSide === 3 ? "Back " : ""}{selectedSidePart === 0 ? "peak" : "valance"}</Block>
            <Block width="100%" maxWidth="660px" marginRight="auto" marginLeft="auto" paddingTop="44px" font="MinXHeading14" color="MinXPrimaryText">
                <Accordion overrides={{
                    PanelContainer: {
                        style: {
                            borderBottomWidth: 0
                        }
                    },
                    Header: {
                        style: {
                            minHeight: "48px",
                            paddingTop: "12px", paddingRight: "0px", paddingBottom: "12px", paddingLeft: "0px",
                            fontSize: "inherit", fontWeight: "inherit", fontFamily: "inherit", color: "inherit", backgroundColor: "transparent"
                        }
                    },
                    Content: {
                        style: {
                            paddingTop: "28px", paddingRight: "0px", paddingBottom: "28px", paddingLeft: "0px",
                            fontSize: "inherit", fontWeight: "400", fontFamily: "inherit", color: "inherit",
                            backgroundColor: "translate"
                        }
                    },
                }}>
                    <Panel title="Background">
                        <Tabs activeKey={activeTabKey} fill={FILL.fixed} onChange={({activeKey}) => setActiveTabKey(activeKey + "")}
                              overrides={{
                                  TabList: {
                                      style: {
                                          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridColumnGap: "16px", marginBottom: "16px"
                                      }
                                  },
                                  TabBorder: {props: {hidden: true}},
                                  TabHighlight: {props: {hidden: true}},
                              }}
                        >
                            <Tab title="Color"
                                 artwork={() => (
                                     <Block position="relative" width="20px" height="20px">
                                         <Image src="images/icon/icon_pantone.png" layout="responsive" width={60} height={60} quality={100}/>
                                     </Block>
                                 )}
                                 overrides={{
                                     Tab: {
                                         props: {
                                             className: "custom-printing-canopy-tent-tab"
                                         },
                                         style: ({$isActive}) => ({borderColor: $isActive ? "#23A4AD" : "#D0D9D9"}),
                                     },
                                     TabPanel: {style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0}}
                                 }}
                            >
                                <Block display="flex" alignItems="center" marginBottom="8px">
                                    <Block minWidth="100px" marginRight="20px">Pantone Color</Block>
                                    <Input value={""} placeholder="e.g. 7408 C"
                                           onChange={(e) => {
                                           }}
                                           overrides={{
                                               Root: {
                                                   style: {
                                                       borderTopRightRadius: "8px",
                                                       borderTopLeftRadius: "8px",
                                                       borderBottomRightRadius: "8px",
                                                       borderBottomLeftRadius: "8px",
                                                   },
                                               },
                                               Input: {
                                                   style: {
                                                       fontSize: "14px",
                                                       lineHeight: "22px",
                                                       "::placeholder": {color: "#BFBFBF"},
                                                   }
                                               },
                                           }}
                                    />
                                </Block>
                                <Block font="MinXParagraph12" color="rgba(0,0,0,0.45)" $style={{textAlign: "right", textDecoration: "underline", textTransform: "capitalize"}}>
                                    <a target="_blank" href="https://www.pantone.com/color-finder" rel="noopener noreferrer">
                                        Go to "Pantone Color Finder"
                                    </a>
                                </Block>
                            </Tab>
                            <Tab title="Image"
                                 artwork={() => (
                                     <Block position="relative" width="20px" height="20px">
                                         <Image src="images/icon/icon_picture.png" layout="responsive" width={60} height={60} quality={100}/>
                                     </Block>
                                 )}
                                 overrides={{
                                     Tab: {
                                         props: {
                                             className: "custom-printing-canopy-tent-tab"
                                         },
                                         style: ({$isActive}) => ({borderColor: $isActive ? "#23A4AD" : "#D0D9D9"}),
                                     },
                                     TabPanel: {style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0}}
                                 }}
                            >
                                <FileUploader
                                    overrides={{
                                        FileDragAndDrop: {
                                            style: {
                                                flexDirection: "column-reverse"
                                            }
                                        },
                                        ButtonComponent: {
                                            props: {
                                                overrides: {
                                                    BaseButton: {
                                                        style: {
                                                            marginBottom: "12px"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </Tab>
                        </Tabs>
                    </Panel>
                    <Panel title="Logo">
                        <FileUploader
                            overrides={{
                                FileDragAndDrop: {
                                    style: {
                                        flexDirection: "column-reverse"
                                    }
                                },
                                ButtonComponent: {
                                    props: {
                                        overrides: {
                                            BaseButton: {
                                                style: {
                                                    marginBottom: "12px"
                                                }
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </Panel>
                    <Panel title="Text">
                        <Block display="grid" gridTemplateColumns="1fr" gridRowGap="16px">
                            <Block display="flex" alignItems="center">
                                <Block minWidth="60px" marginRight="20px">Content</Block>
                                <Input value={""} placeholder="The text you want to print"
                                       onChange={(e) => {
                                       }}
                                       overrides={{
                                           Root: {
                                               style: {
                                                   borderTopRightRadius: "8px",
                                                   borderTopLeftRadius: "8px",
                                                   borderBottomRightRadius: "8px",
                                                   borderBottomLeftRadius: "8px",
                                               },
                                           },
                                           Input: {
                                               style: {
                                                   fontSize: "14px",
                                                   lineHeight: "22px",
                                                   "::placeholder": {color: "#BFBFBF"},
                                               }
                                           },
                                       }}
                                />
                            </Block>
                            <Block display="flex" alignItems="center">
                                <Block minWidth="60px" marginRight="20px">Font</Block>
                                <Input value={""} placeholder="e.g. Roboto"
                                       onChange={(e) => {
                                       }}
                                       overrides={{
                                           Root: {
                                               style: {
                                                   borderTopRightRadius: "8px",
                                                   borderTopLeftRadius: "8px",
                                                   borderBottomRightRadius: "8px",
                                                   borderBottomLeftRadius: "8px",
                                               },
                                           },
                                           Input: {
                                               style: {
                                                   fontSize: "14px",
                                                   lineHeight: "22px",
                                                   "::placeholder": {color: "#BFBFBF"},
                                               }
                                           },
                                       }}
                                />
                            </Block>
                            <Block display="flex" alignItems="center">
                                <Block minWidth="60px" marginRight="20px">Color</Block>
                                <Input value={""} placeholder="e.g. #3C3C3C"
                                       onChange={(e) => {
                                       }}
                                       overrides={{
                                           Root: {
                                               style: {
                                                   borderTopRightRadius: "8px",
                                                   borderTopLeftRadius: "8px",
                                                   borderBottomRightRadius: "8px",
                                                   borderBottomLeftRadius: "8px",
                                               },
                                           },
                                           Input: {
                                               style: {
                                                   fontSize: "14px",
                                                   lineHeight: "22px",
                                                   "::placeholder": {color: "#BFBFBF"},
                                               }
                                           },
                                       }}
                                />
                            </Block>
                        </Block>
                    </Panel>
                    <Panel title="Print Instruction">
                        <Textarea placeholder="Tell us how do you want to get these text and image printed."
                                  value={selectedSide !== null ?
                                      selectedSidePart === 0 ?
                                          roofColorSelectedListTempTemp[selectedSide].peek.instruction ?
                                              roofColorSelectedListTempTemp[selectedSide].peek.instruction : "" :
                                          roofColorSelectedListTempTemp[selectedSide].valance.instruction ?
                                              roofColorSelectedListTempTemp[selectedSide].valance.instruction : "" :
                                      ""}
                                  onChange={(e) => {
                                      let temp = JSON.parse(JSON.stringify(roofColorSelectedListTempTemp));
                                      if (selectedSidePart === 0) {
                                          temp[selectedSide].peek.instruction = e.target.value;
                                      } else if (selectedSidePart === 1) {
                                          temp[selectedSide].valance.instruction = e.target.value;
                                      }
                                      setRoofColorSelectedListTempTemp(temp);
                                  }}
                                  clearOnEscape
                                  overrides={{
                                      Root: {
                                          style: {
                                              overflow: "hidden",
                                              borderTopRightRadius: "8px",
                                              borderTopLeftRadius: "8px",
                                              borderBottomRightRadius: "8px",
                                              borderBottomLeftRadius: "8px",
                                          }
                                      },
                                  }}
                        />
                    </Panel>
                </Accordion>
            </Block>
            <Checkbox checked={applyToWholeSide[selectedSidePart]} labelPlacement={LABEL_PLACEMENT.right}
                      onChange={(e) => {
                          let temp = JSON.parse(JSON.stringify(applyToWholeSide));
                          temp[selectedSidePart] = !temp[selectedSidePart];
                          setApplyToWholeSide(temp);
                      }}
                      overrides={{
                          Root: {
                              style: {
                                  marginTop: "16px"
                              }
                          },
                          Checkmark: {
                              props: {
                                  className: "checkbox-whole-side"
                              }
                          },
                          Label: {
                              style: ({$theme}) => ({fontSize: "12px", fontWeight: 400}),
                          },
                      }}
            >
                Apply it to the whole side
            </Checkbox>
        </Block>
    )
}
