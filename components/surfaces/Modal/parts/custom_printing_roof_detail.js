import React, {useState} from "react";

import Image from "next/image";

import {Block} from "baseui/block";
import {Accordion, Panel} from "baseui/accordion";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";
import {Input} from "baseui/input";
import {FileUploader} from "baseui/file-uploader";
import {Textarea} from "baseui/textarea";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";

import Utils from "Utils/utils";

const utils = new Utils();

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export default function RoofDetail({selectedListTemp, setSelectedRoofListTemp, selectedRoofSlide, selectedSlidePart, applyToFullSide, setApplyToFullSide}) {
    const [activeTabKey, setActiveTabKey] = useState("0");

    if (!selectedListTemp) return null;

    function inputValue(key) {
        return selectedRoofSlide !== null ?
            selectedSlidePart === 0 ?
                selectedListTemp[selectedRoofSlide].peak[key] ? selectedListTemp[selectedRoofSlide].peak[key] : "" :
                selectedSlidePart === 1 ?
                    selectedListTemp[selectedRoofSlide].valance[key] ? selectedListTemp[selectedRoofSlide].valance[key] : "" :
                    "" : ""
    }

    function inputOnChange(e, key) {
        let temp = JSON.parse(JSON.stringify(selectedListTemp));

        let peak = temp[selectedRoofSlide].peak;
        let valance = temp[selectedRoofSlide].valance;

        temp.map((item, index) => {
            if (applyToFullSide[selectedSlidePart]) {
                if (selectedSlidePart === 0) {
                    item.peak = peak;
                    item.peak[key] = e.target.value;
                } else if (selectedSlidePart === 1) {
                    item.peak = valance;
                    item.valance[key] = e.target.value;
                }
            } else {
                if (selectedSlidePart === 0) {
                    if (index === selectedRoofSlide) item.peak[key] = e.target.value;
                } else if (selectedSlidePart === 1) {
                    if (index === selectedRoofSlide) item.valance[key] = e.target.value;
                }
            }
        })
        setSelectedRoofListTemp(temp);
    }

    async function uploadOnChange(file, key) {
        let temp = JSON.parse(JSON.stringify(selectedListTemp));

        let peak = temp[selectedRoofSlide].peak;
        let valance = temp[selectedRoofSlide].valance;

        let fileName = new Date().toISOString().slice(0, 10) + "-" + file.name;

        let result = await utils.imageUpload(file, fileName);

        temp.map((item, index) => {
            if (applyToFullSide[selectedSlidePart]) {
                if (selectedSlidePart === 0) {
                    item.peak = peak;
                    item.peak[key] = "https://westshade.s3.us-west-2.amazonaws.com/custom-printing-attachments/" + fileName;
                } else if (selectedSlidePart === 1) {
                    item.peak = valance;
                    item.valance[key] = "https://westshade.s3.us-west-2.amazonaws.com/custom-printing-attachments/" + fileName;
                }
            } else {
                if (selectedSlidePart === 0) {
                    if (index === selectedRoofSlide) item.peak[key] = "https://westshade.s3.us-west-2.amazonaws.com/custom-printing-attachments/" + fileName;
                } else if (selectedSlidePart === 1) {
                    if (index === selectedRoofSlide) item.valance[key] = "https://westshade.s3.us-west-2.amazonaws.com/custom-printing-attachments/" + fileName;
                }
            }
        })

        setSelectedRoofListTemp(temp);
    }

    return (
        <Block width="100%" maxWidth="448px" display="flex" flexDirection="column" marginRight="auto" marginLeft="auto" paddingTop={["32px", "40px"]}>
            <Block
                font="MinXLabel28">{selectedRoofSlide === 0 ? "Left " : selectedRoofSlide === 1 ? "Right " : selectedRoofSlide === 2 ? "Front " : selectedRoofSlide === 3 ? "Back " : ""}{selectedSlidePart === 0 ? "peak" : "valance"}</Block>
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
                                         <Image src="/images/icon/icon_pantone.png" layout="responsive" width={60} height={60}/>
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
                                    <Input placeholder="e.g. 7408 C"
                                           value={inputValue("backgroundColor")}
                                           onChange={(e) => inputOnChange(e, "backgroundColor")}
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
                                        Go to &quot;Pantone Color Finder&quot;
                                    </a>
                                </Block>
                            </Tab>
                            <Tab title="Image"
                                 artwork={() => (
                                     <Block position="relative" width="20px" height="20px">
                                         <Image src="/images/icon/icon_picture.png" layout="responsive" width={60} height={60}/>
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
                                    onDropAccepted={async (acceptedOrRejected, event) => {
                                        // let base64 = await toBase64(acceptedOrRejected[0])
                                        // uploadOnChange(base64, "backgroundImage");
                                        await uploadOnChange(acceptedOrRejected[0], "backgroundImage");
                                    }}
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
                            onDropAccepted={async (acceptedOrRejected, event) => {
                                // let base64 = await toBase64(acceptedOrRejected[0])
                                // uploadOnChange(base64, "logo");
                                await uploadOnChange(acceptedOrRejected[0], "logo");
                            }}
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
                                <Input placeholder="The text you want to print"
                                       value={inputValue("content")}
                                       onChange={(e) => inputOnChange(e, "content")}
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
                                <Input placeholder="e.g. Roboto"
                                       value={inputValue("fontFamily")}
                                       onChange={(e) => inputOnChange(e, "fontFamily")}
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
                                <Input placeholder="e.g. #3C3C3C"
                                       value={inputValue("fontColor")}
                                       onChange={(e) => inputOnChange(e, "fontColor")}
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
                                  value={inputValue("instruction")}
                                  onChange={(e) => inputOnChange(e, "instruction")}
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
            <Checkbox checked={applyToFullSide[selectedSlidePart]} labelPlacement={LABEL_PLACEMENT.right}
                      onChange={(e) => {
                          let temp = JSON.parse(JSON.stringify(applyToFullSide));
                          temp[selectedSlidePart] = !temp[selectedSlidePart];
                          setApplyToFullSide(temp);
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
                Apply it to all four sides
            </Checkbox>
        </Block>
    )
}
