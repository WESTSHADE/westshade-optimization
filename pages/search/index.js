import React, {useEffect, useState} from "react";
import NumberFormat from "react-number-format";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";

import {Section} from "Components/Sections";

import Utils from "Utils/utils";
import Button from "../../components/Button";

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

                                                 console.log(item)

                                                 return (
                                                     <Block key={item.name} display="grid" gridTemplateColumns={["auto 1fr", null, "1fr"]} gridTemplateRows={["auto 1fr"]} gridColumnGap="16px" gridRowGap="28px"
                                                            padding={["8px 8px 8px 0", null, "8px"]}
                                                            overrides={{
                                                                Block: {
                                                                    style: {
                                                                        '@media (max-width: 672px)': {borderBottom: "1px solid #F0F0F0"},
                                                                    }
                                                                }
                                                            }}
                                                     >
                                                         <Block position="relative" width={["92px", null, "190px"]} height={"100%"} margin="auto">
                                                             <Image src={imageUrl} alt={item.name} width={1024} height={1024} layout="responsive" objectFit="contain" loader={({src, width}) => src} unoptimized/>
                                                         </Block>
                                                         <Block>
                                                             <Block display="grid" gridTemplateRows="max-content max-content" gridRowGap="8px" marginBottom="8px" color="MinXPrimaryText">
                                                                 <Block font="MinXLabel16" $style={{fontWeight: "500", lineHeight: 1}}>{item.name}</Block>
                                                                 <Block className="text-ellipsis-search"
                                                                     // height={item.short_description ? "60px" : "unset"}
                                                                        height="60px"
                                                                        font="MinXParagraph14" overflow="hidden"
                                                                        dangerouslySetInnerHTML={{__html: item.short_description}}/>
                                                             </Block>
                                                             {item.price && item.price !== "0" ? (
                                                                 <Block font="MinXLabel14" color="MinXPrimaryText" $style={{fontWeight: "500", lineHeight: 1}}>
                                                                     {item.type === "variable" ? `From ` : null} <NumberFormat thousandSeparator={true} prefix={"$"} value={item.price} displayType={"text"}/>
                                                                 </Block>
                                                             ) : null}
                                                             {item.type === "variable" ? (
                                                                 <Block display="grid" gridRowGap={["8px", null, "16px"]} marginTop={["8px", null, "24px"]}>
                                                                     {item.attributes.findIndex(att => att.id === 4) > -1 ? (
                                                                         <Block font="MinXLabel14" color="MinXSecondaryText"
                                                                                $style={{fontWeight: "500", lineHeight: 1}}>{`${item.attributes[item.attributes.findIndex(att => att.id === 4)].options.length} sizes available`}</Block>
                                                                     ) : null}
                                                                     {item.attributes.findIndex(att => att.id === 3) > -1 ? (
                                                                         <Block display="flex" $style={{gap: "8px"}}>
                                                                             {item.attributes[item.attributes.findIndex(att => att.id === 3)].options.map(i => {
                                                                                 return <Block key={i} width="12px" height="12px" backgroundColor={i}
                                                                                               $style={{border: i.toLowerCase() === "white" ? "0.5px solid #D9D9D9" : "none", borderRadius: "50%"}}/>
                                                                             })}
                                                                         </Block>
                                                                     ) : null}

                                                                 </Block>
                                                             ) : null}
                                                         </Block>
                                                     </Block>
                                                 )
                                             })}
                                             <Block display="flex" flexDirection={["row-reverse", null, "column"]} backgroundColor="#F7F7F7" color="MinXPrimaryText" overflow="hidden" $style={{borderRadius: "8px"}}>
                                                 <Block position="relative" flex={[3, null, "unset"]} width="100%" height={["100%", null, "190px"]} minHeight="92px" overflow="hidden">
                                                     <Image src="/images/custom-printed-canopy-tent/pmt-original.png" alt="custom printed tent" layout="fill" objectFit="cover"/>
                                                 </Block>
                                                 <Block display="grid" flex={[4, null, "unset"]} gridRowGap="8px" padding={["16px", null, "32px 16px"]} color="MinXPrimaryText">
                                                     <Block font="MinXLabel16" $style={{fontWeight: "500 !important", lineHeight: "1 !important"}}>Custom printed tent</Block>
                                                     <Block font="MinXParagraph14">Only shows up when users search tent.</Block>
                                                     <Button.V1 type="text" text="Learn more >" font="MinXLabel14" color="#43878C" buttonStyle={{lineHeight: "1 !important"}} onClick={() => router.push("/custom-printing/canopy-tent")}/>
                                                 </Block>
                                             </Block>
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
