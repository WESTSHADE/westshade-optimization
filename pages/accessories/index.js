import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";

import {Section} from "Components/Sections";
import Utils from "Utils/utils";

const utils = new Utils();

const Product = ({name, product, showDesc = true, onClick}) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (product) {
            let urlPic;
            if (product.hasOwnProperty("images") && product.images.length > 0) {
                urlPic = product.images[0].src || "";
            } else if (product.hasOwnProperty("image")) {
                urlPic = product.image.src || "";
            }
            setUrl(urlPic);
        }
    }, [product]);

    return (
        <Block className='cursor' display="grid" gridTemplateColumns="1fr" gridTemplateRows="auto 1fr" gridRowGap={["12px", "16px"]} width="100%" marginRight="auto" marginLeft="auto" paddingRight={["0", "16px"]} paddingLeft={["0", "16px"]}
               onClick={() => onClick(product.id === 26553 ? {pathname: "/products/accessories/26516", query: {type: "half"}} :
                   product.id === 26523 ? {pathname: "/products/accessories/26516", query: {type: "full"}} :
                       product.id === 26804 ? {pathname: "/products/accessories/26516", query: {type: "rollup"}} :
                           product.id === 26774 ? {pathname: "/products/accessories/26516", query: {type: "pvc"}} :
                               product.id === 26744 ? {pathname: "/products/accessories/26516", query: {type: "mesh"}} :
                                   "/products/accessories/" + product.id)}
        >
            <Block position="relative" width="inherit" margin="auto" $style={{aspectRatio: 1}}>
                {url ? (
                    <Image src={url} alt={product.name} layout="fill" objectFit="contain" loader={({src, width}) => src} unoptimized/>
                ) : (
                    <Image src="/images/product/default-product.webp" alt={product.name} layout="fill" objectFit="contain"/>
                )}
            </Block>
            <Block className="text-left" display="grid" gridTemplateRows="1fr auto" gridRowGap={["12px", "16px"]}>
                <Block display="grid" gridTemplateRows="1fr auto" gridRowGap={["12px", "16px"]} font={["MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">
                    <Block>{name ? name : product.name}</Block>
                    {showDesc ? (
                        <Block className="text-ellipsis" height={product.short_description ? "96px" : "unset"} font={["MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText" overflow="hidden"
                               dangerouslySetInnerHTML={{__html: product.short_description}}
                        />
                    ) : null}
                </Block>
                <Block display="flex" flexDirection="row" justifyContent="space-between" font="MinXParagraph16" color="MinXButton">
                    <Block font="MinXParagraph16" color="MinXPrimaryText">
                        {product.type !== "simple" ? "From " : ""}
                        {product.onSale ? (
                            <Block display="flex" flexDirection="row" justifyContent="flex-start">
                                {product.sale_price === 0 ? <Block marginRight="10px" color="#F07C7C">Free</Block> :
                                    <NumberFormat thousandSeparator={true} prefix={"$"} value={product.sale_price} displayType={"text"} style={{color: "#F07C7C", marginRight: 10}}/>}
                                <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price ? product.regular_price : product.price} displayType={"text"} style={{textDecoration: "line-through"}}/>
                            </Block>
                        ) : (
                            <NumberFormat thousandSeparator={true} prefix={"$"} value={product.regular_price ? product.regular_price : product.price} displayType={"text"}/>
                        )}
                    </Block>
                    <Block font="MinXParagraph16" color="inherit">Buy</Block>
                </Block>
            </Block>
        </Block>
    )
}

function Accessories({router, products}) {
    const goProductPage = (url) => router.push(url);

    return (
        <React.Fragment>
            <Head>
                <title>Accessories - WESTSHADE</title>
                <meta name="description" content="Westshade&apos;s selection of versatile accessories are perfect with Westshade&apos;s canopy and umbrella."/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom={["16px", "16px", "32px"]}>
                <Block className="text-center" position="relative" width="100%" height={["318px", "320px", "352px"]} backgroundColor="#F5FCFC" overflow="hidden" display="flex" alignItems="center" justifyContent="center">
                    <Block position="absolute" width={["353px", "439px", "620px", "1152px"]} height={["353px", "439px", "620px", "1152px"]} display="flex" flexDirection="column" justifyContent="center" alignItems="center"
                           padding="12px 24px"
                           backgroundColor="white"
                           overrides={{
                               Block: {
                                   style: {borderRadius: "50%", aspectRatio: 1},
                               }
                           }}
                    >
                        <Block marginBottom="12px" font="MinXSubtitle14" color="MinXSecondaryText">CANOPY TENT</Block>
                        <Block marginBottom="24px" font={["MinXTitle44", "MinXTitle44"]} color="MinXPrimaryText">ACCESSORY & REPLACEMENT</Block>
                        <Block font="MinXSubtitle20" color="MinXSecondaryText" maxWidth={["280px", "400px", "420px", "615px"]}>
                            Westshade&apos;s selection of versatile accessories allows you to customize and combine individual elements depending on your personal or business needs.
                        </Block>
                    </Block>
                </Block>
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <Block className="text-center">
                                 <Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>
                                 <Block marginBottom={["24px", "40px"]} font="MinXHeading24">SIDE WALL</Block>
                                 <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["32px", "40px", "62px"]}>
                                     {products[0].map((product, index) =>
                                         <Product key={product.id} name={index === 0 ? "Half Wall" : index === 1 ? "Full Wall" : index === 2 ? "Roll-Up Door Wall" : index === 3 ? "PVC Window Wall" : index === 4 ? "Mesh Window Wall" : ""}
                                                  product={product} onClick={goProductPage}
                                         />
                                     )}
                                 </Block>
                             </Block>
                         }
                />
                <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>ACCESSORY</Block>}
                         content={
                             <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "16px", "20px"]} gridRowGap={["32px", "40px", "62px"]}>
                                 {products[1].map(product => <Product key={product.id} product={product} onClick={goProductPage}/>)}
                             </Block>
                         }
                />
                <Section title={<Block><Block marginBottom="10px" font="MinXParagraph14" color="MinXSecondaryText">CANOPY TENT</Block>REPLACEMENT PART</Block>}
                         content={
                             <>
                                 <Block backgroundColor="#F2F2F2" marginBottom="32px" padding="45px 16px">
                                     <Block position="relative" width="100%" maxWidth="800px" marginRight="auto" marginLeft="auto">
                                         <Image src="/images/accessory/replacement-part.webp" alt="replacement part" layout="responsive" objectFit="contain" width={767} height={519}/>
                                     </Block>
                                 </Block>
                                 <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", "24px", "48px"]} gridRowGap={["24px", "32px", "40px"]}>
                                     {products[2].map(product => product.id !== 31855 && product.id !== 58944 ? <Product key={product.id} product={product} showDesc={false} onClick={goProductPage}/> : null)}
                                 </Block>
                             </>
                         }
                />
            </Block>
        </React.Fragment>
    )
}

// Accessories.getInitialProps = async () => {
//     const ids = [26553, 26523, 26804, 26774, 26744];
//     let products = [];
//
//     products[0] = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
//     products[1] = await utils.getProductByCategoryId(167);
//     products[2] = await utils.getProductByCategoryId(483);
//
//     return {
//         products: products,
//         fullPage: true
//     };
// };

export async function getStaticProps() {
    const ids = [26553, 26523, 26804, 26774, 26744];
    let products = [];

    products[0] = await Promise.all(ids.map((id) => utils.getProductByWooId(id)));
    products[1] = await utils.getProductByCategoryId(167);
    products[2] = await utils.getProductByCategoryId(483);

    return {
        props: {
            products: products,
            fullPage: true
        },
        revalidate: 240, // In seconds
    };
}

export default withRouter(Accessories);
