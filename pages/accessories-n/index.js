import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";

import Head from "next/head";
import {withRouter} from "next/router";

import {Block} from "baseui/block";
import Image from "next/image";
import Link from "next/link";

import {Section} from "../../components/sections";

import Utils from "../../utils/utils";

const utils = new Utils();

const setImage = (images) => {
    if (!images || images.length === 0) return;
    return images[0].src.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");
};

const Product = ({name, product}) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        let urlPic;
        if (product.hasOwnProperty("images")) {
            urlPic = setImage(product.images) || "";
        } else if (product.hasOwnProperty("image")) {
            urlPic = setImage([product.image]) || "";
        }
        setUrl(urlPic);
    }, []);

    return (
        <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows={["136px 1fr", "218px 1fr", "232px 1fr", "355px 1fr"]} gridRowGap={["12px", "16px"]}
               width={["136px", "218px", "232px", "355px"]} marginRight="auto" marginLeft="auto"
        >
            <Block position="relative" width="100%" marginRight="auto" marginLeft="auto">
                {url ? (
                    <img src={url} alt={product.name} width="100%" height="100%" style={{objectFit: "contain"}}/>
                ) : (
                    <Image src="/images/default-product.jpg" alt={product.name} layout="fill" objectFit="contain" quality={100}/>
                )}
            </Block>
            <Block display="grid" gridTemplateRows="1fr auto" gridRowGap={["12px", "16px"]}>
                <Block display="grid" gridTemplateRows="1fr auto" gridRowGap={["12px", "16px"]} font={["MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">
                    <Block>{name ? name : product.name}</Block>
                    <Block height="96px" font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText" overflow="hidden"
                           overrides={{
                               Block: {
                                   props: {className: "text-ellipsis"},
                               }
                           }}
                        // dangerouslySetInnerHTML={{__html: product.description}}
                           dangerouslySetInnerHTML={{__html: product.short_description}}
                    />
                </Block>
                <Block display="flex" flexDirection="row" justifyContent="space-between" font="MinXParagraph16" color="MinXButton">
                    {product.onSale ? (
                        <Block display="flex" flexDirection="row" justifyContent="flex-start" color="MinXPrimaryText">
                            {product.sale_price === 0 ? <Block marginRight="10px" color="#F07C7C">Free</Block> :
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={product.sale_price} displayType={"text"} style={{color: "#F07C7C", marginRight: 10}}/>}
                            {product.regular_price ? (
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price} displayType={"text"} style={{textDecoration: "line-through"}}/>
                            ) : (
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={product.price} displayType={"text"} style={{textDecoration: "line-through"}}/>
                            )}
                        </Block>
                    ) : (
                        <Block font="MinXParagraph16" color="MinXPrimaryText">
                            {product.regular_price ? (
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price} displayType={"text"}/>
                            ) : (
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={product.price} displayType={"text"}/>
                            )}
                        </Block>
                    )}
                    <Link color="inherit" onClick={(event) => event.preventDefault()}
                          href={product.id === 26553 ? {pathname: "/products/accessories/", query: {id: "26516", type: "half"}} :
                              product.id === 26523 ? {pathname: "/products/accessories/", query: {id: "26516", type: "full"}} :
                                  product.id === 26804 ? {pathname: "/products/accessories/", query: {id: "26516", type: "rollup"}} :
                                      product.id === 26774 ? {pathname: "/products/accessories/", query: {id: "26516", type: "pvc"}} :
                                          product.id === 26744 ? {pathname: "/products/accessories/", query: {id: "26516", type: "mesh"}} :
                                              "/products/accessories?id=" + product.id}
                    >Buy</Link>
                </Block>
            </Block>
        </Block>
    )
}

function Accessories({router, size, products}) {
    return (
        <React.Fragment>
            <Head>
                <title>Accessories - WESTSHADE</title>
                {/*    <meta name="description"*/}
                {/*          content="Industry Leading Dependable Canopies & Umbrellas Welcome to the #1 dependable canopy manufacturer in the U.S! We are your exclusive supplier of indoor."/>*/}
            </Head>
            <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>SIDE WALL</Block>}
                     subtitle={"All sidewalls can be personalized with your logo or marketing messages to promote your products through our custom printing service."}
                     subtitleMoreText={"Learn about Custom Printing >"}
                     subtitleMoreDestination={"/custom-printing"}
                     content={
                         <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["32px", "40px", "62px"]}>
                             {products[0].map((product, index) =>
                                 <Product key={index} name={index === 0 ? "Half Wall" : index === 1 ? "Full Wall" : index === 2 ? "Roll-Up Door Wall" : index === 3 ? "PVC Window Wall" : index === 4 ? "Mesh Window Wall" : ""}
                                          product={product}
                                 />
                             )}
                         </Block>
                     }
            />
            <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>ACCESSORY</Block>}
                     content={
                         <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["32px", "40px", "62px"]}>
                             {products[1].map((product, index) => <Product key={index} product={product}/>)}
                         </Block>
                     }
            />
            <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>REPLACEMENT PART</Block>}
                     content={
                         <>
                             <Block position="relative" width="100%" marginBottom="32px">
                                 <Image src="/images/accessory/replacement-part.png" alt="replacement part" layout="responsive" objectFit="contain" width={1152} height={632} quality={100}/>
                             </Block>
                             <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "24px", "48px"]} gridRowGap={["24px", "32px", "40px"]} marginBottom="32px">
                                 {products[2].map((product, index) => {
                                     let urlPic;
                                     if (product.hasOwnProperty("images")) {
                                         urlPic = setImage(product.images) || "";
                                     } else if (product.hasOwnProperty("image")) {
                                         urlPic = setImage([product.image]) || "";
                                     }

                                     return (
                                         <Block key={index} display="grid" gridTemplateRows="auto auto auto" gridRowGap={["25px", "16px"]}>
                                             <Block display="flex" flexDirection="row" alignItems="center">
                                                 <Block font="MinXTitle24">{index + 1}</Block>
                                                 <Block height="100%" marginRight="8px" marginLeft="8px" overrides={{Block: {style: {borderLeft: "2px solid #23A4AD"}}}}/>
                                                 <Block font="MinXLabel14">{product.name}</Block>
                                             </Block>
                                             <Block position="relative" width={["136px", "133px", "135px"]} height={["136px", "133px", "135px"]} marginRight="auto" marginLeft="auto">
                                                 {urlPic ? (
                                                     <img src={urlPic} alt={product.name} width="100%" height="100%" style={{objectFit: "contain"}}/>
                                                 ) : (
                                                     <Image src="/images/default-product.jpg" alt={product.name} layout="fill" objectFit="contain" quality={100}/>
                                                 )}
                                             </Block>
                                             <Block display="flex" flexDirection="row" justifyContent="space-between" font="MinXParagraph16" color="MinXButton">
                                                 {product.onSale ? (
                                                     <Block display="flex" flexDirection="row" justifyContent="flex-start" color="MinXPrimaryText">
                                                         {product.sale_price === 0 ? <Block marginRight="10px" color="#F07C7C">Free</Block> :
                                                             <NumberFormat thousandSeparator={true} prefix={"$"} value={product.sale_price} displayType={"text"} style={{color: "#F07C7C", marginRight: 10}}/>}
                                                         {product.regular_price ? (
                                                             <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price} displayType={"text"} style={{textDecoration: "line-through"}}/>
                                                         ) : (
                                                             <NumberFormat thousandSeparator={true} prefix={"$"} value={product.price} displayType={"text"} style={{textDecoration: "line-through"}}/>
                                                         )}
                                                     </Block>
                                                 ) : (
                                                     <Block font="MinXParagraph16" color="MinXPrimaryText">
                                                         {product.regular_price ? (
                                                             <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price} displayType={"text"}/>
                                                         ) : (
                                                             <NumberFormat thousandSeparator={true} prefix={"$"} value={product.price} displayType={"text"}/>
                                                         )}
                                                     </Block>
                                                 )}
                                                 <Link color="inherit" onClick={(event) => event.preventDefault()}
                                                       href={product.id === 26553 ? {pathname: "/products/accessories/", query: {id: "26516", type: "half"}} :
                                                           product.id === 26523 ? {pathname: "/products/accessories/", query: {id: "26516", type: "full"}} :
                                                               product.id === 26804 ? {pathname: "/products/accessories/", query: {id: "26516", type: "rollup"}} :
                                                                   product.id === 26774 ? {pathname: "/products/accessories/", query: {id: "26516", type: "pvc"}} :
                                                                       product.id === 26744 ? {pathname: "/products/accessories/", query: {id: "26516", type: "mesh"}} :
                                                                           "/products/accessories?id=" + product.id}
                                                 >Buy</Link>
                                             </Block>
                                         </Block>
                                     )
                                 })}
                             </Block>
                         </>
                     }
            />
        </React.Fragment>
    )
}

Accessories.getInitialProps = async () => {
    const ids = [26553, 26523, 26804, 26774, 26744];
    let products = [];

    products[0] = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
    products[1] = await utils.getProductByCategoryId(167);
    products[2] = await utils.getProductByCategoryId(483);

    return {
        products: products,
    };
};

export default withRouter(Accessories);
