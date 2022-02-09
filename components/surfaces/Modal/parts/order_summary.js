import React from "react";
import NumberFormat from "react-number-format";
import clsx from "clsx";

import {Block} from "baseui/block";

import {TableBuilder, TableBuilderColumn} from "baseui/table-semantic";

import ShippingNote from "../../../Sections/ShippingNote";

import styles from "./parts.module.scss";

export default function content({dataTable}) {
    const {productComponent, selectedVariant, totalSalePrice, totalRegularPrice, totalCount} = dataTable;

    let rowDate = [];

    selectedVariant.map((variant, index) => {
        if (!variant) return
        console.log(selectedVariant)

        let cell = {
            name: productComponent[index]?.name,
            quantity: 1,
            regular_price: variant.regular_price,
            sale_price: variant.sale_price,
            price: variant.price,
            on_sale: variant.on_sale,
        };
        
        if (index === 3 || index === 4) {
            variant.attributes.map(attr => {
                if (attr.id === 14 && attr.option === "13ft") {
                    cell.quantity = 2;
                }
            })
        }

        rowDate.push(cell);
    });

    const NameCell = ({value}) => <Block className={styles["cell"]} font="MinXLabel14">{value}</Block>;

    const QuantityCell = ({value}) => <Block className={clsx([styles["cell"], "text-center"])} font="MinXLabel14">{value * totalCount}</Block>;

    const PriceCell = ({priceRegular, priceSale, onSale}) => {
        return (
            <Block font="MinXLabel14" className={clsx([styles["cell"], styles["cell-price"], "text-right"])}>
                {onSale ?
                    <Block color="#F07C7C">{(priceSale === "" || priceSale === "0" || priceSale === 0 || !priceSale) ? "Free" : <NumberFormat thousandSeparator={true} prefix={"$"} value={priceSale} displayType={"text"}/>}</Block> : null}
                <NumberFormat thousandSeparator={true} prefix={"$"} value={priceRegular} displayType={"text"} style={onSale ? {textDecoration: "line-through"} : {}}/>
            </Block>
        )
    };

    return (
        <Block width={["100%", "", "702px"]} margin={["46px auto 34px", "", "16px auto 12px"]} paddingRight={["0px", "0px", "64px"]} paddingLeft={["0px", "0px", "64px"]}>
            <Block className={styles["summary-inner-container"]} height={["520px", "520px", "368px"]} marginBottom={["16px", "16px", "32px"]} backgroundColor="white">
                <TableBuilder data={rowDate} overrides={{Root: {style: {height: "calc(100% - 44px)"}}}}>
                    <TableBuilderColumn header="Item">{(row) => <NameCell value={row.name}/>}</TableBuilderColumn>
                    <TableBuilderColumn header="Quantity" numeric overrides={{TableHeadCell: {props: {className: "text-center"}}}}>{(row) => <QuantityCell value={row.quantity}/>}</TableBuilderColumn>
                    <TableBuilderColumn header="Price" overrides={{TableHeadCell: {props: {className: "text-right"}}}}>
                        {(row) => {
                            return <PriceCell priceRegular={row.on_sale ? row.regular_price : row.price} priceSale={row.sale_price} onSale={row.on_sale}/>
                        }}
                    </TableBuilderColumn>
                </TableBuilder>
                <Block display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" padding="12px 20px" font="MinXLabel14" className={styles["cell"]} $style={{borderTop: "1px solid #d9d9d9"}}>
                    <div>Total:</div>
                    <NumberFormat thousandSeparator={true} prefix={"$"} value={totalSalePrice ? totalSalePrice : totalRegularPrice} displayType={"text"} style={{fontSize: 16, fontWeight: "bold"}}/>
                </Block>
            </Block>
            <ShippingNote.V1/>
        </Block>
    )
}
