import React from "react";

import {useRouter} from "next/router";
import Link from "next/link";

import {Block} from "baseui/block";
import {Drawer, SIZE, ANCHOR} from "baseui/drawer";
import {Accordion, Panel} from "baseui/accordion";
import {StatefulMenu} from "baseui/menu";

import styles from "./parts.module.scss";
import clsx from "clsx";

const Menu = ({isOpen, onClose}) => {
    const router = useRouter();

    const handleGoPage = (href) => router.push(href)

    return (
        <Drawer anchor={ANCHOR.left} size={SIZE.full} isOpen={isOpen} onClose={onClose}
                overrides={{
                    Root: {
                        props: {
                            className: styles["drawer-container"]
                        }
                    },
                    Close: {
                        props: {
                            className: styles["close"]
                        }
                    }
                }}
        >
            <Accordion overrides={{
                Root: {
                    props: {
                        className: styles["drawer-menu-container"]
                    }
                },
                PanelContainer: {
                    props: {
                        className: styles["panel-container"]
                    }
                },
                Header: {
                    props: {
                        className: clsx(styles["menu-title"], styles["toggle-hidden"])
                    }
                },
                Content: {
                    props: {
                        className: styles["menu-content"]
                    }
                },
            }}>
                <Panel title="CANOPY TENT"
                       onClick={(e) => {
                           e.preventDefault();
                           handleGoPage("/canopy-tent").then(() => onClose());
                       }}
                />
                {/*<Panel title="CANOPY TENT"*/}
                {/*       overrides={{*/}
                {/*           PanelContainer: {*/}
                {/*               props: {*/}
                {/*                   className: styles["panel-container"]*/}
                {/*               }*/}
                {/*           },*/}
                {/*           Header: {*/}
                {/*               props: {*/}
                {/*                   className: styles["menu-title"]*/}
                {/*               }*/}
                {/*           },*/}
                {/*           Content: {*/}
                {/*               props: {*/}
                {/*                   className: styles["menu-content"]*/}
                {/*               }*/}
                {/*           },*/}
                {/*       }}*/}
                {/*>*/}
                {/*    <StatefulMenu items={{*/}
                {/*        SQUARE: [*/}
                {/*            {id: '10’ x 10’', href: '/custom-printed-package/f1010cpp'},*/}
                {/*            {id: '13’ x 13’', href: '/custom-printed-package/f1313cpp'},*/}
                {/*            {id: '16’ x 16’', href: '/custom-printed-package/f1616cpp'},*/}
                {/*            {id: '20’ x 20’', href: '/custom-printed-package/f2020cpp'},*/}
                {/*        ],*/}
                {/*        RECTANGULAR: [*/}
                {/*            {id: '10’ x 15’', href: '/custom-printed-package/f1015cpp'},*/}
                {/*            {id: '10’ x 20’', href: '/custom-printed-package/f1020cpp'},*/}
                {/*            {id: '13’ x 20’', href: '/custom-printed-package/f1320cpp'},*/}
                {/*            {id: '13’ x 26’', href: '/custom-printed-package/f1326cpp'},*/}
                {/*        ],*/}
                {/*    }}*/}
                {/*                  onItemSelect={(e) => handleGoPage(e.item.href).then(() => onClose())}*/}
                {/*                  overrides={{*/}
                {/*                      OptgroupHeader: {*/}
                {/*                          props: {*/}
                {/*                              className: styles["submenu-title"]*/}
                {/*                          }*/}
                {/*                      },*/}
                {/*                      Option: {*/}
                {/*                          props: {*/}
                {/*                              getItemLabel: item => item.id*/}
                {/*                          },*/}
                {/*                      },*/}
                {/*                  }}*/}
                {/*    />*/}
                {/*    <Block padding="24px 0 32px 53px" backgroundColor="white" font="MinXLabel14">*/}
                {/*        <Link href={"/canopy-tent"}>{"Learn more >"}</Link>*/}
                {/*    </Block>*/}
                {/*</Panel>*/}
                <Panel title="UMBRELLA"
                       onClick={(e) => {
                           e.preventDefault();
                           handleGoPage("/umbrella").then(() => onClose());
                       }}
                />
                <Panel title="CUSTOM PRINTING"
                       onClick={(e) => {
                           e.preventDefault();
                           handleGoPage("/custom-printing").then(() => onClose());
                       }}
                />
                <Panel title="ACCESSORIES"
                       onClick={(e) => {
                           e.preventDefault();
                           handleGoPage("/accessories").then(() => onClose());
                       }}
                />
                {/*<Panel title="ACCESSORIES"*/}
                {/*       overrides={{*/}
                {/*           PanelContainer: {*/}
                {/*               props: {*/}
                {/*                   className: styles["panel-container"]*/}
                {/*               }*/}
                {/*           },*/}
                {/*           Header: {*/}
                {/*               props: {*/}
                {/*                   className: styles["menu-title"]*/}
                {/*               }*/}
                {/*           },*/}
                {/*           Content: {*/}
                {/*               props: {*/}
                {/*                   className: styles["menu-content"]*/}
                {/*               }*/}
                {/*           },*/}
                {/*       }}*/}
                {/*>*/}
                {/*    <StatefulMenu items={{*/}
                {/*        ACCESSORIES: [*/}
                {/*            {label: 'Tent Accessories', href: '/'},*/}
                {/*            {label: 'Umbrella Accessories', href: '/'},*/}
                {/*        ],*/}
                {/*        OTHER: [*/}
                {/*            {label: 'Heater', href: '/products/accessories/?id=20491'},*/}
                {/*            {label: 'Led Light', href: '/products/accessories/?id=20510'},*/}
                {/*            {label: 'Table cover', href: '/custom-print/table-cover/buy'},*/}
                {/*        ],*/}
                {/*    }}*/}
                {/*                  onItemSelect={(e) => handleGoPage(e.item.href).then(() => onClose())}*/}
                {/*                  overrides={{*/}
                {/*                      OptgroupHeader: {*/}
                {/*                          props: {*/}
                {/*                              className: styles["submenu-title"]*/}
                {/*                          }*/}
                {/*                      },*/}
                {/*                      Option: {*/}
                {/*                          props: {*/}
                {/*                              getItemLabel: item => item.id*/}
                {/*                          },*/}
                {/*                      },*/}
                {/*                  }}*/}
                {/*    />*/}
                {/*    <Block padding="24px 0 32px 53px" backgroundColor="white" font="MinXLabel14">*/}
                {/*        <Link href={"/accessories"}>{"Learn more >"}</Link>*/}
                {/*    </Block>*/}
                {/*</Panel>*/}
            </Accordion>
        </Drawer>
    )
}

export default Menu;
