import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";

import {Section} from "Components/Sections";

import Utils from "Utils/utils";

const utils = new Utils();

function Search({router}) {
    const [showResult, setShowResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);

    useEffect(async () => {
        if (router.query && Object.keys(router.query).length > 0 && router.query.q) {
            let result = await utils.getProductByKeyword(router.query.q) || [];
            console.log(result);

            setSearchResult(result);

            setTimeout(() => setShowResult(true), 500)
        } else {
            router.push({pathname: "/"});
        }
    }, [router.query]);

    return (
        <React.Fragment>
            <Block paddingBottom={["16px", null, "20px"]}>
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <>
                                 {showResult ? (
                                     <>
                                         <Block display="flex" alignItems="center" height="48px" paddingTop={["10px", null, "18px"]}>
                                             <Block font={["MinXHeading14", "MinXHeading14", "MinXHeading32"]} color="MinXPrimaryText" $style={{fontWeight: "500", lineHeight: 1}}>{`${searchResult.length} items found`}</Block>
                                         </Block>
                                         <Block display="grid" gridTemplateColumns={["1fr", null, "repeat(3, 1fr)", "repeat(4, 1fr)"]} gridColumnGap={["16px", null, "20px"]} gridRowGap={["16px", null, "20px"]}>
                                             {searchResult.map((item, index) => {
                                                 let imageUrl = "";
                                                 if (item.hasOwnProperty("images")) {
                                                     if (item.images.length > 0) {
                                                         imageUrl = item.images[0].src;
                                                     } else {
                                                         imageUrl = process.env.imageBaseUrl + "/images/product/default-product.webp";
                                                     }
                                                 } else if (item.hasOwnProperty("image")) {
                                                     imageUrl = item.image.src;
                                                 }

                                                 return (
                                                     <Block key={item.name} display="grid" gridTemplateColumns={["auto 1fr", null, "1fr"]} gridTemplateRows={["auto 1fr"]} gridColumnGap="16px" gridRowGap="28px"
                                                            padding={["8px 8px 8px 0", null, "8px"]}>
                                                         <Block position="relative" width={["92px", null, "190px"]} height={"100%"} margin="auto">
                                                             <Image src={imageUrl} alt={item.name} width={1024} height={1024} layout="responsive" objectFit="contain" loader={({src, width}) => src} unoptimized/>
                                                         </Block>
                                                         <Block>
                                                             <Block display="grid" gridTemplateRows="1fr auto" gridRowGap="8px" marginBottom="8px" color="MinXPrimaryText">
                                                                 <Block font="MinXLabel16" $style={{fontWeight: "500", lineHeight: 1}}>{item.name}</Block>
                                                                 <Block className="text-ellipsis-search" height={item.short_description ? "60px" : "unset"} font="MinXParagraph14" overflow="hidden"
                                                                        dangerouslySetInnerHTML={{__html: item.short_description}}/>
                                                             </Block>
                                                             {item.price && item.price !== "0" ? (
                                                                 <Block font="MinXLabel14" color="MinXPrimaryText" $style={{fontWeight: "500", lineHeight: 1}}>
                                                                     {item.type === "variable" ? `From ` : null} <NumberFormat thousandSeparator={true} prefix={"$"} value={item.price} displayType={"text"}/>
                                                                 </Block>
                                                             ) : null}
                                                         </Block>
                                                     </Block>
                                                 )
                                             })}
                                         </Block>
                                     </>
                                 ) : null}
                             </>
                         }
                />
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Search);
