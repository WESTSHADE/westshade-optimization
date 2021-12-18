import React, {useEffect, useRef, useState} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";

import Button from "Components/button-n";
import {Benefit, FreeMockupForm, Section} from "Components/sections"

const SectionCard = ({router, src, alt, title, content, destination}) => {
    return (
        <Block minHeight={"280px"} display={["grid", null, "flex"]} flexDirection={["column", null, "row-reverse"]} alignItems={[null, null, "center"]} justifyContent={[null, null, "space-between"]}
               gridTemplateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "unset"]} gridRowGap={["20px", "24px", "unset"]} marginBottom={["16px", "16px", "20px"]} paddingTop={["32px", "48px", "20px"]} paddingRight={["16px", "24px", "0px"]}
               paddingBottom={["32px", "48px", "0px"]}
               paddingLeft={["16px", "24px", "40px"]}
               overrides={{
                   Block: {
                       style: {
                           boxShadow: "0px 16px 40px rgba(0, 0, 0, 0.05)",
                           ":last-child": {marginBottom: "60px"}
                       },
                   },
               }}
        >
            <Block position="relative" width="100%" maxWidth={["256px", "320px", "380px"]} marginRight={["auto", "auto", "0px"]} marginBottom={["12px", "24px", "0px"]} marginLeft="auto">
                <Image src={src} alt={alt} layout="responsive" width={1685} height={1053} quality={100}/>
            </Block>
            <Block>
                <Block marginBottom={["12px", "12px", "16px"]} font={["MinXTitle20", "MinXTitle28", "MinXTitle32"]} color="MinXPrimaryText">{title}</Block>
                <Block maxWidth="400px" marginBottom={["12px", "12px", "16px"]} font={["MinXParagraph14", "MinXParagraph16", "MinXParagraph20"]} color="MinXPrimaryText">{content}</Block>
                <Button type="outline" width="72px" height="32px" font="MinXLabel14" color="MinXPrimaryText" text="Buy" bundle="black" onClick={() => router.push(destination)}/>
            </Block>
        </Block>
    )
}

function Custom_Printing_Table_Cover({router, size}) {
    const refBanner = useRef(null);

    const [circleAD, setCircleAD] = useState(0);
    const [circleBD, setCircleBD] = useState(0);

    const goBuyingPage = () => router.push({pathname: "/custom-print/table-cover/buy"});

    useEffect(() => {
        if (refBanner && refBanner.current) {
            setCircleAD(refBanner.current.clientHeight);
            setCircleBD(refBanner.current.clientWidth / 2);
        }
    }, [size]);

    return (
        <React.Fragment>
            <Head>
                <title>Custom Printing Table Cover - WESTSHADE</title>
                <meta name="description" content="Customize your table covers for any occasions. Print your logo, icon and choose any color! Choose fabric from fitted and stretched table covers!"/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["60px", "80px", "120px"]} paddingBottom="0px">
                <Block ref={refBanner} display="grid" gridRowGap={["8px", "16px", "20px"]} justifyItems="center" padding={["32px 30px", "40px 30px", "64px 30px"]}
                       overrides={{
                           Block: {
                               props: {
                                   className: "banner-display text-center"
                               },
                               style: {
                                   ":after": {background: "linear-gradient(95.25deg, rgba(74, 223, 232, 0.85) 0%, rgba(194, 251, 255, 0) 52.6%, rgba(74, 223, 232, 0.85) 100%), #C2FBFF;"}
                               }
                           }
                       }}
                >
                    <Block font={["MinXTitle32", "MinXTitle44", "MinXTitle64"]} color="MinXPrimaryText" $style={{zIndex: 1}}>Customize It Your Way</Block>
                    <Button type="outline" height={["36px", "48px", "56px"]} marginBottom={["32px", "48px", "60px"]} font={["MinXLabel14", "MinXLabel16", "MinXLabel20"]} text="Create My Table Cover" bundle="black" $style={{zIndex: 1}}
                            onClick={() => goBuyingPage()}
                    />
                    <Block position="relative" width="100%" height={["125px", "173px", "180px"]} $style={{zIndex: 1}}>
                        <Image src="/images/custom-printing/table-cover/stretch-table-cover.webp" alt="stretch table cover" layout="fill" objectFit="contain" quality={100} priority={true}/>
                    </Block>
                    <div style={{position: "absolute", top: "-" + circleAD / 2 + "px", right: 0, width: circleAD + "px", height: circleAD + "px", background: "#97F02B", opacity: "0.8", filter: "blur(" + circleAD / 2 + "px)",}}/>
                    <div style={{position: "absolute", bottom: "-" + circleBD / 2 + "px", left: 0, width: circleBD + "px", height: circleBD + "px", background: "#2275F2", opacity: "0.8", filter: "blur(" + circleBD / 2 + "px)",}}/>
                </Block>
                <Section title={<>DESIGNED FOR<br/>YOUR SPECIALLY</>}
                         subtitle="Westshade provides free mockup service. Give us your idea and we will give you the product you want."
                         content={
                             <Block position="relative" width="100%" marginBottom={["12px", "24px", "32px"]}>
                                 <Image src="/images/custom-printing/table-cover/table-covers.webp" alt="custom printing table covers" layout="responsive" width={1440} height={400} quality={100} priority={true}/>
                             </Block>
                         }
                />
                <Section title={<>FIT YOUR NEED<br/>AS WELL AS<br/>YOUR TABLE</>}
                         subtitle="Westshade provides two types of table cover - fitted table cover and stretch table cover."
                         content={
                             <>
                                 <SectionCard router={router} title={"Fitted Table Cover"} content={"The fitted table cover is made of the same fabric as canopy tent and features two zips at the back."}
                                              src={"/images/custom-printing/table-cover/back-zip.webp"} alt={"back zip table cover"}
                                              destination={{pathname: "/custom-print/table-cover/buy", query: {type: "fitted"}, as: "/custom-print/table-cover/buy"}}
                                 />
                                 <SectionCard router={router} title={"Stretch Table Cover"} content={"The stretch table cover is made of a lightweight stretch fabric. It secures itself with pocket at the bottom."}
                                              src={"/images/custom-printing/table-cover/self-secure.webp"} alt={"self secure table cover"}
                                              destination={{pathname: "/custom-print/table-cover/buy", query: {type: "stretch"}, as: "/custom-print/table-cover/buy"}}
                                 />
                             </>
                         }
                />
                <Section title="FABRIC CLOSE LOOK"
                         subtitle="Take a closer look at the two fabric and choose the one that suits your need."
                         content={
                             <Block display="grid" gridColumnGap={["", "16px", "20px"]} gridRowGap={["8px", "12px", "16px"]} gridTemplateAreas={[`"a1" "a2" "a3" "b1" "b2" "b3"`, `"a1 b1" "a2 b2" "a3 b3"`,]}
                                    overrides={{
                                        Block: {
                                            props: {
                                                className: "text-center"
                                            },
                                        },
                                    }}
                             >
                                 <Block maxWidth={["232px", "216px", "376px"]} marginRight="auto" marginLeft="auto" font={["MinXHeading20", "MinXHeading20", "MinXHeading28"]} color={"MinXPrimaryText"} gridArea="a1">
                                     320 gsm, 500D polyester with PVC coating
                                 </Block>
                                 <Block font="MinXParagraph16" color={"MinXPrimaryText"} gridArea="a2">This long-lasting fabric is used for canopy tent.</Block>
                                 <Block position="relative" width="100%" height={["165px", "210px", "250px"]} gridArea="a3" marginBottom={["16px", "0px"]}>
                                     <Image src="/images/custom-printing/table-cover/fabric.webp" alt="fabric" layout="fill" objectFit="cover"/>
                                 </Block>
                                 <Block maxWidth={["232px", "216px", "376px"]} marginRight="auto" marginLeft="auto" font={["MinXHeading20", "MinXHeading20", "MinXHeading28"]} color={"MinXPrimaryText"} gridArea="b1">
                                     229 gsm stretch fabric
                                 </Block>
                                 <Block font="MinXParagraph16" color={"MinXPrimaryText"} gridArea="b2">This stretch fabric is firm fitting and lightweight.</Block>
                                 <Block position="relative" width="100%" height={["165px", "210px", "250px"]} gridArea="b3">
                                     <Image src="/images/custom-printing/table-cover/stretch.gif" alt="fabric" layout="fill" objectFit="cover"/>
                                 </Block>
                             </Block>
                         }
                />
                <Section title="MULTIPLE SIZES"
                         subtitle="Either a table for one person or a table for two, we have a size for you."
                         content={
                             <Block display="grid" gridColumnGap={["", "16px", "20px"]} gridRowGap={["24px", "32px"]} gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)", "repeat(3, 1fr)"]}
                                    overrides={{
                                        Block: {
                                            props: {
                                                className: "text-center"
                                            },
                                        },
                                    }}
                             >
                                 <Block display="flex" flexDirection="column" alignItems="center">
                                     <Block position="relative" width="100%" height={["123px", "207px"]} marginRight="auto" marginBottom={["8px", "8px", "16px"]} marginLeft="auto">
                                         <Image src="/images/custom-printing/table-cover/size-small.webp" alt="size small table cover" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     <Block marginBottom={["12px", "12px", "16px"]} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">Small</Block>
                                     <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">L=4’, W=2’, H=2’4’’</Block>
                                 </Block>
                                 <Block display="flex" flexDirection="column" alignItems="center">
                                     <Block position="relative" width="100%" height={["123px", "207px"]} marginRight="auto" marginBottom={["8px", "8px", "16px"]} marginLeft="auto">
                                         <Image src="/images/custom-printing/table-cover/size-medium.webp" alt="size medium table cover" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     <Block marginBottom={["12px", "12px", "16px"]} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">Medium</Block>
                                     <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">L=6’1’’, W=2’6’’, H=2’4’’</Block>
                                 </Block>
                                 <Block display="flex" flexDirection="column" alignItems="center">
                                     <Block position="relative" width="100%" height={["123px", "207px"]} marginRight="auto" marginBottom={["8px", "8px", "16px"]} marginLeft="auto">
                                         <Image src="/images/custom-printing/table-cover/size-large.webp" alt="size large table cover" layout="fill" objectFit="contain" quality={100}/>
                                     </Block>
                                     <Block marginBottom={["12px", "12px", "16px"]} font={["MinXLabel16", "MinXLabel16", "MinXLabel20"]} color="MinXPrimaryText">Large</Block>
                                     <Block font={["MinXParagraph14", "MinXParagraph14", "MinXParagraph16"]} color="MinXSecondaryText">L=8’, W=2’6’’, H=2’4’’</Block>
                                 </Block>
                             </Block>
                         }
                />
                <Section upperContainerDirection="column"
                         title="Get a free mockup"
                         subtitle="Not sure about what it will look like? Just fill out the form and our graphic team will make a free mockup for you."
                         content={<FreeMockupForm/>}
                         containerClassName="m-wrap-side-full"
                         upperContainerProps={{marginBottom: ["32px", "32px", "40px"], padding: ["0 16px", "0 32px",]}}
                         subtitleStyles={{maxWidth: "unset !important"}}
                />
                <Benefit containerClassName="m-body-section-wrap"/>
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Custom_Printing_Table_Cover);
