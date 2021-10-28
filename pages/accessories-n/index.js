import React, {useEffect, useRef, useState} from "react";
import NumberFormat from "react-number-format";

import Head from "next/head";
import {withRouter} from "next/router";

import {Block} from "baseui/block";
import Image from "next/image";
import Link from "next/link";

import {Section} from "../../components/sections";

import Utils from "../../utils/utils";

const utils = new Utils();

const Product = ({name, product, titleHeight, setTitleHeight}) => {
    const [url, setUrl] = useState("");

    console.log(product);

    const setImage = (images) => {
        if (!images || images.length === 0) return;
        return images[0].src.replace(/^http:\/\/54\.212\.246\.17/i, "https://checkout.westshade.com");
    };

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
        <Block display="grid" gridTemplateColumns="1fr" gridTemplateRows={["136px auto auto", "218px auto auto", "232px auto auto", "355px auto auto"]} gridRowGap={["12px", "16px"]}
               width={["136px", "218px", "232px", "355px"]} marginRight="auto" marginLeft="auto"
        >
            <Block position="relative" width="100%" height="100%" marginRight="auto" marginLeft="auto">
                {url ? (
                    <img src={url} alt={product.name} width="100%" height="100%" style={{objectFit: "contain"}}/>
                ) : (
                    <Image src="/images/default-product.jpg" alt={product.name} layout="fill" objectFit="contain" quality={100}/>
                )}
            </Block>
            <Block width="100%" font={["MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">
                <Block ref={(r) => r && r.clientHeight > titleHeight ? setTitleHeight(r.clientHeight) : null} marginBottom="16px" minHeight={titleHeight + "px"}>
                    {name ? name : product.name}
                </Block>
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
    )
}

function Accessories({router, size, products}) {
    const [section1TitleHeight, setSection1TitleHeight] = useState(0);
    const [section2TitleHeight, setSection2TitleHeight] = useState(0);

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
                             {products[0].map((product, index) => {
                                 return (
                                     <Product key={index} name={index === 0 ? "Half Wall" : index === 1 ? "Full Wall" : index === 2 ? "Roll-Up Door Wall" : index === 3 ? "PVC Window Wall" : index === 4 ? "Mesh Window Wall" : ""}
                                              product={product} titleHeight={section1TitleHeight} setTitleHeight={setSection1TitleHeight}
                                     />
                                 )
                             })}
                         </Block>
                     }
            />
            <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>ACCESSORY</Block>}
                     content={
                         <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["32px", "40px", "62px"]}>
                             {products[1].map((product, index) => {
                                 return (
                                     <Product key={index} product={product} titleHeight={section2TitleHeight} setTitleHeight={setSection2TitleHeight}/>
                                 )
                             })}
                         </Block>
                     }
            />
            <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>REPLACEMENT PART</Block>}
            />
        </React.Fragment>
    )
}

Accessories.getInitialProps = async (context) => {
    const {query} = context;
    const ids = [26553, 26523, 26804, 26774, 26744];
    let products = [];

    products[0] = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
    products[1] = await utils.getProductByCategoryId(167);

    return {
        products: products,
    };
};

export default withRouter(Accessories);
