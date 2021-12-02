import React from "react";
import clsx from "clsx";

import {useRouter} from "next/router";

import {Block} from "baseui/block";
import {Drawer, SIZE, ANCHOR} from "baseui/drawer";
import {Accordion, Panel} from "baseui/accordion";
import {StatefulMenu} from "baseui/menu";

import MENU from "../../../assets/menu.json";

import styles from "./parts.module.scss";
import {Button, KIND} from "baseui/button";

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
            <Accordion overrides={{Root: {props: {className: styles["drawer-menu-container"]}}}}>
                {MENU.map(({title, list = [], dropMenu = false, link = "/", linkText = "Learn more >"}, indexA) => (
                    <Panel key={indexA} title={title}
                           overrides={{
                               PanelContainer: {
                                   props: {
                                       className: styles["panel-container"]
                                   }
                               },
                               Header: {
                                   props: {
                                       className: clsx([styles["menu-title"], !dropMenu ? styles["toggle-hidden"] : null])
                                   }
                               },
                               Content: {
                                   props: {
                                       className: styles["menu-content"]
                                   }
                               },
                           }}
                           onClick={(e) => {
                               if (!dropMenu || list.length === 0) {
                                   e.preventDefault();
                                   handleGoPage(link).then(() => onClose());
                               }
                           }}
                    >
                        {dropMenu && list.length > 0 ? list.map((itemList, indexB) => (
                            <StatefulMenu key={indexB} items={itemList}
                                          onItemSelect={(e) => {
                                              e.event.preventDefault();
                                              handleGoPage(e.item.href).then(() => onClose())
                                          }}
                            />)
                        ) : null}
                        {dropMenu ? (
                            <Block padding="12px 0 24px 53px" font="MinXLabel14">
                                <Button kind={KIND.minimal}
                                        overrides={{
                                            BaseButton: {
                                                props: {className: styles["button-more"]}
                                            },
                                        }}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleGoPage(link).then(() => onClose());
                                        }}
                                >
                                    {linkText}
                                </Button>
                            </Block>
                        ) : null}
                    </Panel>
                ))}
            </Accordion>
        </Drawer>
    )
}

export default Menu;
