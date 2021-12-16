import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Block} from "baseui/block";
import {Accordion, Panel} from "baseui/accordion";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";
import {Input} from "baseui/input";
import {FileUploader} from "baseui/file-uploader";
import {Textarea} from "baseui/textarea";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";

import Utils from "../../../../utils/utils";
import MButton from "../../../button-n";
import { useStyletron } from "styletron-react";
import {Modal} from "../../../surfaces";

const utils = new Utils();

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
const TAB_VALUES = ["COLOR", "IMAGE"];

export default function RoofDetail({requirement, setRequirement, part, side, cancelAction,selectedListTemp, setSelectedRoofListTemp, selectedRoofSlide, selectedSlidePart, applyToFullSide, setApplyToFullSide}) {
    const toCustomize = requirement[part][side];
    const [activeTabKey, setActiveTabKey] = useState(TAB_VALUES.indexOf(inputState?.background.type || "COLOR"));
    const [isSaving, setIsSaving] = useState(false);
    const [inputState, setInputState] = useState({
        background: {
            type: toCustomize.background?.type || "COLOR",
            value: toCustomize.background?.value || ""
        },
        logo: {
            file: toCustomize.logo?.file || "",
            filename: toCustomize.logo?.filename || ""
        },
        text: {
            content: toCustomize.text?.content || "",
            font: toCustomize.text?.font || "",
            color: toCustomize.text?.color || "",
        },
        printInstruction: toCustomize.printInstruction || "",
        applyToFullSide: toCustomize.applyToFullSide || false
    })
    const [css] = useStyletron();

    const saveEntries = () => {
        setIsSaving(true)
        handleUpload()
        .then((res) => {
            console.log(res)
            setRequirement(part,side,inputState,inputState.applyToFullSide);
            setIsSaving(false)
            cancelAction();
        })
    }


    const handleFile = (files, key) => {
        console.log(files, key);
        let fileExt = files[0].name.substring(files[0].name.lastIndexOf('.') + 1, files[0].name.length) || files[0].name;
        let fileName =  key + "-" + side + "-" + new Date().valueOf() + "-" + files[0].name.split(' ').join('-');
        console.log(fileName)
        if(key==="logo"){
            setInputState({...inputState, logo:{file:files[0], filename: fileName}})
        }
        else if (key === "background") {
            setInputState({...inputState, background:{ type: "IMAGE", value: {file: files[0], filename:fileName}}})
        }
    }

    const handleUpload = () => {
        let promises = []
        if(inputState.background.type === "IMAGE" && inputState.background.value.length != 0){
            const backgroundUpload = async () => {
                try{
                    const res = await utils.imageUploadV2(inputState.background.value.file, inputState.background.value.filename);
                    return {status: res.status, url: res.url}
                }
                catch (error){
                    console.log(error);
                    return {status: 400, error}
                }
            }
            promises.push(backgroundUpload())
        }

        if(inputState.logo.file && inputState.logo.filename) {
            const logoUpload = async () => {
                try{
                    const res = await utils.imageUploadV2(inputState.logo.file, inputState.logo.filename);
                    return {status: res.status, url: res.url}
                }
                catch(error) {
                    return {status: 400, error}
                }
            }
            promises.push(logoUpload());
        }
        return Promise.all(promises)
    }


    useEffect(() => {
        const thirdPartyButton = document.querySelector("#mobile-chat-container");
        thirdPartyButton.style.transform = "translateY(-80px)"
        return () => thirdPartyButton.style.transform = "translateY(0px)"
    }, [])

    return (
        <>
        <Block width="100%"  maxWidth="448px"  display="flex" flexDirection="column" marginRight="auto" marginLeft="auto" paddingTop={["32px", "40px"]}>
            <Block
                font="MinXLabel28" color="MinXPrimaryText" className={css({textTransform: "capitalize"})}>{side.toLowerCase()} {part}</Block>
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
                        <Tabs activeKey={activeTabKey} fill={FILL.fixed} onChange={() => setActiveTabKey(!activeTabKey)}
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
                                         <Image src="/images/icon/icon_pantone.png" layout="responsive" width={60} height={60} quality={100}/>
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
                                           value={inputState.background.type === "COLOR" ? inputState.background.value : ""}
                                           onChange={(e) => setInputState({...inputState, background: {type: "COLOR", value: e.target.value}})}
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
                                    <a target="_blank" href="https://www.pantone-colours.com/" rel="noopener noreferrer">
                                        Go to &quot;Pantone Color Finder&quot;
                                    </a>
                                </Block>
                            </Tab>
                            <Tab title="Image"
                                 artwork={() => (
                                     <Block position="relative" width="20px" height="20px">
                                         <Image src="/images/icon/icon_picture.png" layout="responsive" width={60} height={60} quality={100}/>
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
                                    onDropAccepted={(e) => handleFile(e, "background")}
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
                            onDropAccepted={(e) => handleFile(e,"logo")}
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
                                       value={inputState.text.content}
                                       onChange={(e) => setInputState({...inputState, text:{...inputState.text, content: e.target.value}})}
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
                                       value={inputState.text.font}
                                       onChange={(e) => setInputState({...inputState, text:{...inputState.text, font: e.target.value}})}
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
                                       value={inputState.text.color}
                                       onChange={(e) => setInputState({...inputState, text:{...inputState.text, color: e.target.value}})}
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
                                  value={inputState.printInstruction}
                                  onChange={(e) => setInputState({...inputState, printInstruction:e.target.value})}
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
            <Checkbox checked={inputState.applyToFullSide} labelPlacement={LABEL_PLACEMENT.right}
                      onChange={(e) => setInputState({...inputState, applyToFullSide: !inputState.applyToFullSide})}
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
        <Block position="absolute" bottom="0" left="0" width="100%" display="flex" alignItems="center" justifyContent="space-between" backgroundColor="#ffffff" padding="22px 16px">
            <Block font={["MinXParagraph12","MinXParagraph14","MinXParagraph14"]} color="MinXPrimaryText">
            After submitting the order, we’ll email you a free mockup based on your request.
            </Block>
            <Block display="flex" alignItems="center">
                <Block margin={["0 4px","0 8px"]}>
                    <MButton
                        height="auto"
                        width="85px"
                        onClick={cancelAction}
                        disabled={isSaving}
                        buttonStyle={{ 
                            backgroundColor: "transparent !important", 
                            color: "#23A4AD !important", 
                            fontFamily:"Roboto !important",
                            fontSize: "14px !important",
                            fontWeight: "500 !important",
                            width: "100% !important",
                            border:"2px solid #BFBFBF !important",
                            padding: "12px 0 !important",
                            margin: "0 8px",
                            transition: "all .15s ease-in-out",
                        }}
                        text="Cancel"
                    />
                </Block>
                <Block margin={["0 4px","0 8px"]}>
                    <MButton
                        height="auto"
                        width="85px"
                        onClick={saveEntries}
                        isLoading={isSaving}
                        buttonStyle={{ 
                            fontFamily:"Roboto !important",
                            fontSize: "14px !important",
                            fontWeight: "500 !important",
                            width: "100% !important",
                            padding: "12px 0 !important",
                            margin: "0 8px",
                            transition: "all .15s ease-in-out",
                        }}
                        text="Save"
                    />
                </Block>
            </Block>
        </Block>
        <Modal type="alertdialog" isOpen={isSaving} onClose={() => {}} content="loading" description="I'm saving the printing details"/>
        </>
    )
}
