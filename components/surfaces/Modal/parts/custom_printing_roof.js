import React, {useState} from "react";

import {useRouter} from 'next/router'

import {Block} from "baseui/block";
import {ListItem, ListItemLabel} from "baseui/list";
import {Button, KIND, SHAPE} from "baseui/button";
import {Delete} from "baseui/icon";

import MButton from "../../../button-n";
import {Modal} from "../../index";
import {PLACEMENT, StatefulTooltip, TRIGGER_TYPE} from "baseui/tooltip";
import {Accordion, Panel} from "baseui/accordion";
import {FILL, Tab, Tabs} from "baseui/tabs-motion";
import Image from "next/image";
import {Input} from "baseui/input";
import {FileUploader} from "baseui/file-uploader";
import {Textarea} from "baseui/textarea";
import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox";

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

export default function roof({selectedList, selectedListTemp, selectedListTempTemp, openDetailModal}) {
    const [selectedRoofSlide, setSelectedRoofSlide] = useState(null);
    const [selectedSlidePart, setSelectedSlidePart] = useState(0);

    if (!selectedList || !selectedListTemp || !selectedListTempTemp) return null;

    return (
        <Block width="100%" height="-webkit-fill-available" display="flex" flexDirection="column" marginRight="auto" marginLeft="auto">
            <Block display="flex" flexDirection="column" alignItems="center" justifyContent="center" padding={["32px 16px", "64px 16px", "80px 16px"]} $style={{textAlign: "center"}}>
                <Block position="relative" width={["282px", "282px", "324px"]} height={["282px", "282px", "324px"]} marginBottom={["32px", "64px", "48px"]}>
                    <Block position="absolute" bottom={0} right={0} left={0} width={["130px", "130px", "150px"]} marginRight="auto" marginLeft="auto">
                        <div className="triangle-curved bottom" style={{borderBottomColor: isEmpty(selectedListTemp[2].peek) ? "#F0F0F0" : "#CDECEC"}}/>
                        <Block width={["130px", "130px", "150px"]} height={["24px", "24px", "28px"]} marginTop="12px" marginBottom="12px"
                               backgroundColor={isEmpty(selectedListTemp[2].valance) ? "#F0F0F0" : "#CDECEC"}
                        />
                        <div font="MinXParagraph14" color="MinXPrimaryText">FRONT</div>
                    </Block>
                    <Block position="absolute" top={0} right={0} left={0} width={["130px", "130px", "150px"]} marginRight="auto" marginLeft="auto">
                        <Block font="MinXParagraph14" color="MinXPrimaryText">BACK</Block>
                        <Block width={["130px", "130px", "150px"]} height={["24px", "24px", "28px"]} marginTop="12px" marginBottom="12px"
                               backgroundColor={isEmpty(selectedListTemp[3].valance) ? "#F0F0F0" : "#CDECEC"}
                        />
                        <div className="triangle-curved" style={{borderTopColor: isEmpty(selectedListTemp[3].peek) ? "#F0F0F0" : "#CDECEC"}}/>
                    </Block>
                    <Block position="absolute" top={["75px", "75px", "85px"]} left={0} width={["130px", "130px", "150px"]} $style={{transform: "rotate(-90deg)"}}>
                        <Block font="MinXParagraph14" color="MinXPrimaryText">LEFT</Block>
                        <Block width={["130px", "130px", "150px"]} height={["24px", "24px", "28px"]} marginTop="12px" marginBottom="12px"
                               backgroundColor={isEmpty(selectedListTemp[0].valance) ? "#F0F0F0" : "#CDECEC"}
                        />
                        <div className="triangle-curved" style={{borderTopColor: isEmpty(selectedListTemp[0].peek) ? "#F0F0F0" : "#CDECEC"}}/>
                    </Block>
                    <Block position="absolute" top={["75px", "75px", "85px"]} right={0} width={["130px", "130px", "150px"]} $style={{transform: "rotate(90deg)"}}>
                        <Block font="MinXParagraph14" color="MinXPrimaryText">RIGHT</Block>
                        <Block width={["130px", "130px", "150px"]} height={["24px", "24px", "28px"]} marginTop="12px" marginBottom="12px"
                               backgroundColor={isEmpty(selectedListTemp[1].valance) ? "#F0F0F0" : "#CDECEC"}
                        />
                        <div className="triangle-curved" style={{borderTopColor: isEmpty(selectedListTemp[1].peek) ? "#F0F0F0" : "#CDECEC"}}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "20px"]} gridRowGap={["16px", "20px"]} width="100%" maxWidth="724px" margin="auto">
                    <MButton type="outline" width="100%" height="48px" font="MinXParagraph16" text='Print Front' color="#262626" buttonClassName={["cs-side-button", selectedRoofSlide === 2 ? "selected" : null]}
                             onClick={() => setSelectedRoofSlide(2)}/>
                    <MButton type="outline" width="100%" height="48px" font="MinXParagraph16" text='Print Back' color="#262626" buttonClassName={["cs-side-button", selectedRoofSlide === 3 ? "selected" : null]}
                             onClick={() => setSelectedRoofSlide(3)}/>
                    <MButton type="outline" width="100%" height="48px" font="MinXParagraph16" text='Print Left' color="#262626" buttonClassName={["cs-side-button", selectedRoofSlide === 0 ? "selected" : null]}
                             onClick={() => setSelectedRoofSlide(0)}/>
                    <MButton type="outline" width="100%" height="48px" font="MinXParagraph16" text='Print Right' color="#262626" buttonClassName={["cs-side-button", selectedRoofSlide === 1 ? "selected" : null]}
                             onClick={() => setSelectedRoofSlide(1)}/>
                </Block>
            </Block>
            <Block width="100%" height="inherit" backgroundColor="#F7F7F7" padding={["24px 16px", "32px 16px", "40px 16px"]}>
                <Block width="100%" maxWidth="550px" margin="auto">
                    {selectedRoofSlide === 0 ? (
                        <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap={["16px", "20px"]} gridRowGap={["16px", "20px"]}>
                            <ListItem artwork={() => <img src="/images/icon/icon-peak-left.png" alt="peak-left"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[0].peek) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(0)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(0)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Peak</ListItemLabel>
                            </ListItem>
                            <ListItem artwork={() => <img src="/images/icon/icon-valance-left.png" alt="valance-left"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[0].valance) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(1)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(1)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Valance</ListItemLabel>
                            </ListItem>
                        </Block>
                    ) : selectedRoofSlide === 1 ? (
                        <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap={["16px", "20px"]} gridRowGap={["16px", "20px"]}>
                            <ListItem artwork={() => <img src="/images/icon/icon-peak-right.png" alt="peak-right"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[1].peek) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(0)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(0)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Peak</ListItemLabel>
                            </ListItem>
                            <ListItem artwork={() => <img src="/images/icon/icon-valance-right.png" alt="valance-right"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[1].valance) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(1)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(1)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Valance</ListItemLabel>
                            </ListItem>
                        </Block>
                    ) : selectedRoofSlide === 2 ? (
                        <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap={["16px", "20px"]} gridRowGap={["16px", "20px"]}>
                            <ListItem artwork={() => <img src="/images/icon/icon-peak-front.png" alt="peak-front"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[2].peek) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(0)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(0)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Peak</ListItemLabel>
                            </ListItem>
                            <ListItem artwork={() => <img src="/images/icon/icon-valance-front.png" alt="valance-front"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[2].valance) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(1)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(1)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Valance</ListItemLabel>
                            </ListItem>
                        </Block>
                    ) : selectedRoofSlide === 3 ? (
                        <Block display="grid" gridTemplateColumns={["1fr", "1fr", "repeat(2, 1fr)"]} gridColumnGap={["16px", "20px"]} gridRowGap={["16px", "20px"]}>
                            <ListItem artwork={() => <img src="/images/icon/icon-peak-back.png" alt="peak-back"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[3].peek) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(0)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(0)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Peak</ListItemLabel>
                            </ListItem>
                            <ListItem artwork={() => <img src="/images/icon/icon-valance-back.png" alt="valance-back"/>}
                                      overrides={{
                                          Root: {props: {className: "cs-listItem-root"}},
                                          Content: {props: {className: "cs-listItem-content"}},
                                          ArtworkContainer: {props: {className: "cs-listItem-artwork"}},
                                      }}
                                      endEnhancer={() => (
                                          <Block display="flex" flexDirection="row" alignItems="center">
                                              {isEmpty(selectedListTemp[3].valance) ? (
                                                  <MButton type="dashed" width="90px" height="32px" font="MinXLabel14" text='+Add' color="#8C8C8C" onClick={() => openDetailModal(1)}/>
                                              ) : (
                                                  <>
                                                      <MButton type="solid" width="90px" height="32px" font="MinXLabel14" text='Edit' color="white"
                                                               onClick={() => openDetailModal(1)}
                                                      />
                                                      <Button kind={KIND.tertiary} shape={SHAPE.circle}
                                                              overrides={{
                                                                  BaseButton: {
                                                                      style: ({$theme}) => ({marginLeft: "17px", width: "20px", height: "20px", backgroundColor: "transparent"}),
                                                                  },
                                                              }}
                                                              onClick={() => {
                                                              }}
                                                      >
                                                          <Delete size={20}/>
                                                      </Button>
                                                  </>
                                              )}
                                          </Block>
                                      )}
                            >
                                <ListItemLabel description={<CPSubtitle color="" side={selectedRoofSlide}/>} overrides={{LabelContent: {props: {className: "cs-title"}}}}>Valance</ListItemLabel>
                            </ListItem>
                        </Block>
                    ) : (
                        <Block font="MinXLabel20">Pick a side above</Block>
                    )}
                </Block>
            </Block>
        </Block>
    )
}
