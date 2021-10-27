import React, {useState} from "react";
import clsx from "clsx";

import {Block} from "baseui/block";
import {Button, KIND, SHAPE} from "baseui/button";
import {Modal, ModalHeader, ModalBody, ModalFooter, SIZE, ROLE} from "baseui/modal";

import styles from "./modal.module.scss";

const modal = (props) => {
    const {startEnhancer, confirmText, isOpen = false, onClose, size = SIZE.full, role = ROLE.dialog, type, header, children, footer} = props;

    return (
        <Modal onClose={onClose} isOpen={isOpen} animate autoFocus size={size} role={role}
               overrides={{
                   Root: {
                       props: {
                           className: type === "dialog" ? clsx(styles["container-root-dialog"], "hideScrollBar") : clsx(styles["container-root"], "hideScrollBar"),
                       },
                   },
                   DialogContainer: {
                       props: {
                           className: styles["container-dialog"],
                       },
                   },
                   Dialog: {
                       props: {
                           className: styles["dialog"],
                       },
                   },
                   Close: {
                       props: {
                           className: styles["close"],
                       },
                   },
               }}
        >
            {header ? (
                <ModalHeader className={styles["container-header"]}>{header}</ModalHeader>
            ) : null}
            <ModalBody className={clsx(styles["container-body"], "hideScrollBar")}>
                {children}
                {/*    <Block flex={[0, 0, 1]} position={"relative"} paddingRight={["16px", "52px", "0"]} paddingLeft={["16px", "52px", "64px"]}></Block>*/}
                {/*    <Block*/}
                {/*        display={"flex"}*/}
                {/*        flexDirection={"column"}*/}
                {/*        width={["100%", "100%", "424px"]}*/}
                {/*        paddingTop={["24px", "24px", "40px"]}*/}
                {/*        paddingRight={["16px", "52px", "64px"]}*/}
                {/*        paddingLeft={["16px", "52px", "0"]}*/}
                {/*        alignItems={"center"}*/}
                {/*        overflow={["unset", "unset", "scroll"]}*/}
                {/*    >*/}
                {/*        <div style={{display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%"}}>*/}
                {/*            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Wall type</div>*/}
                {/*        </div>*/}
                {/*        <div style={{display: "flex", flexDirection: "column", textAlign: "center", alignItems: "center", width: "100%", marginBottom: "64px"}}>*/}
                {/*            <div style={{fontSize: 16, fontWeight: "500", marginBottom: 16}}>Color</div>*/}
                {/*        </div>*/}
                {/*    </Block>*/}
            </ModalBody>
            {footer ? (
                <ModalFooter className={styles["container-footer"]}>
                    {footer}
                    {/*    {startEnhancer()}*/}
                    {/*    <Block display={"flex"} flexDirection={"row"} justifyContent={"flex-end"} flex={1}>*/}
                    {/*        <Button*/}
                    {/*            shape={SHAPE.pill}*/}
                    {/*            overrides={{*/}
                    {/*                BaseButton: {*/}
                    {/*                    props: {*/}
                    {/*                        className: styles["button-cancel"],*/}
                    {/*                    },*/}
                    {/*                },*/}
                    {/*            }}*/}
                    {/*            // onClick={() => setIsOpen(false)}*/}
                    {/*        >*/}
                    {/*            Cancel*/}
                    {/*        </Button>*/}
                    {/*        {confirmText ? (*/}
                    {/*            <Button*/}
                    {/*                shape={SHAPE.pill}*/}
                    {/*                overrides={{*/}
                    {/*                    BaseButton: {*/}
                    {/*                        props: {*/}
                    {/*                            className: styles["button-confirm"],*/}
                    {/*                        },*/}
                    {/*                    },*/}
                    {/*                }}*/}
                    {/*                onClick={() => setPrintIsOpen(true)}*/}
                    {/*            >*/}
                    {/*                {confirmText}*/}
                    {/*            </Button>*/}
                    {/*        ) : null}*/}
                    {/*    </Block>*/}
                </ModalFooter>
            ) : null}
        </Modal>
    );
};

export default modal;
