import React from "react";

import {Block} from "baseui/block";
import {StyledBody, StyledCell, StyledRow, StyledTable} from "baseui/table";

import {StringFn} from "../../utils/tools"

import styles from "./compare.module.scss"

const stringFn = new StringFn();

export default function Compare({data, selection}) {
    return (
        <StyledTable className={styles["table"]}>
            <StyledBody className={styles["body"]}>
                {Object.keys(data).map((key, indexA) => {
                    if (indexA < 2) return;
                    return (
                        <Block key={indexA} display="grid" gridRowGap="24px">
                            <Block className="text-capitalize" font="MinXHeading14" color="MinXPrimaryText">{stringFn.replaceUnderscore(key)}</Block>
                            {data[key].map((row, indexB) =>
                                <StyledRow key={indexB} className={styles["row"]}>
                                    {selection.map((value, indexC) => row.map((cell, indexD) => {
                                            if (value.index === indexD) {
                                                return (
                                                    <StyledCell key={indexC} className={styles["cell"]}>
                                                        {cell.label ? <Block marginBottom="6px" font="MinXLabel12" color="MinXSecondaryText">{cell.label}</Block> : null}
                                                        {key !== "color" ? (
                                                            <Block className={styles["cell-text"]} display="grid" gridRowGap={cell.label ? "8px" : "12px"} font="MinXParagraph14" color="MinXPrimaryText">
                                                                {typeof cell.content === "object" ? cell.content.map((item, indexD) =>
                                                                    <div key={indexD}>{item}</div>
                                                                ) : cell.content}
                                                            </Block>
                                                        ) : (
                                                            <Block display="grid" justifyContent="center" width="80px" gridTemplateColumns="repeat(3, 1fr)" gridRowGap="8px" marginRight="auto" marginLeft="auto">
                                                                {cell.content.map((item, indexD) =>
                                                                    <Block key={indexD} className={styles["cell-dot"]} marginRight="auto" marginLeft="auto" backgroundColor={item}/>
                                                                )}
                                                            </Block>
                                                        )}
                                                    </StyledCell>
                                                )
                                            }
                                        })
                                    )}
                                </StyledRow>
                            )}
                        </Block>
                    )
                })}
            </StyledBody>
        </StyledTable>
    )
};
