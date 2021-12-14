import React from "react";

import {withRouter} from "next/router";
import Image from "next/image";

import {Block} from "baseui/block";
import ChevronLeft from 'baseui/icon/chevron-left'

import Button from "Components/button-n";

function Custom404({router}) {
    return (
        <React.Fragment>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block display="flex" flex={1} flexDirection="column" alignItems="center" marginBottom={["40px", "70px", "100px"]} paddingTop={["70px", "70px", "140px"]}>
                    <Block display="flex" flexDirection={["column", null, "row-reverse"]} alignItems="center" justifyContent='space-between' width="100%">
                        <Block position="relative" flex={['unset', null, 1]} justifyContent="center"
                               width={["180px", "200px"]} height={["180px", "210px"]} marginBottom={["40px", "70px", "0px"]}
                        >
                            <Image src="/images/404/404.webp" alt="404" layout="fill" objectFit="contain" quality={100}/>
                        </Block>
                        <Block display="flex" flexDirection="column" alignSelf={["flex-start", null, "center"]}>
                            <Block marginBottom="24px" font={["MinXHeading24", "MinXHeading36", "MinXHeading48"]} color="MinXPrimaryText">Oops! Page not found</Block>
                            <Button height="48px" font={["MinXLabel14", "MinXLabel16"]} text="Back to Homepage" bundle="primary" startEnhancer={() => <ChevronLeft size={24}/>} onClick={() => router.push("/")}/>
                        </Block>
                    </Block>
                </Block>
                <Block display="flex" flex={1} flexDirection="column" paddingBottom={["70px", "70px", "140px"]}>
                    <Block marginBottom={["20px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Were you looking for...</Block>
                    <Block display="grid" gridTemplateColumns={["repeat(2, 1fr)", "repeat(3, 1fr)", "repeat(3, 272px)"]} gridColumnGap={["16px", "32px", "unset"]}
                           gridRowGap="20px" justifyContent={[null, null, "space-around"]}>
                        <Block backgroundColor="#F7F7F7" paddingTop="16px" paddingRight="16px" paddingBottom="16px" paddingLeft="16px"
                               overrides={{
                                   Block: {
                                       style: {
                                           borderRadius: "16px", textAlign: "center", ":hover": {cursor: 'pointer'}
                                       }
                                   },
                               }}
                               onClick={() => router.push("/custom-printing")}
                        >
                            <Block position="relative" height={["100px", "127px"]}>
                                <Image src="/images/404/custom_printing.webp" alt="Custom Printing" layout="fill" objectFit="contain" quality={100}/>
                            </Block>
                            <Block font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText" $style={{fontWeight: "400 !important"}}>Custom Printing</Block>
                        </Block>
                        <Block backgroundColor="#F7F7F7" paddingTop="16px" paddingRight="16px" paddingBottom="16px" paddingLeft="16px"
                               overrides={{
                                   Block: {
                                       style: {
                                           borderRadius: "16px", textAlign: "center", ":hover": {cursor: 'pointer'}
                                       }
                                   },
                               }}
                               onClick={() => router.push("/canopy-tent")}
                        >
                            <Block position="relative" height={["100px", "127px"]}>
                                <Image src="/images/404/tent.webp" alt="Tent" layout="fill" objectFit="contain" quality={100}/>
                            </Block>
                            <Block font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText" $style={{fontWeight: "400 !important"}}>Canopy tent</Block>
                        </Block>
                        <Block backgroundColor="#F7F7F7" paddingTop="16px" paddingRight="16px" paddingBottom="16px" paddingLeft="16px"
                               overrides={{
                                   Block: {
                                       style: {
                                           borderRadius: "16px", textAlign: "center", ":hover": {cursor: 'pointer'}
                                       }
                                   },
                               }}
                               onClick={() => router.push("/umbrella")}
                        >
                            <Block position="relative" height={["100px", "127px"]}>
                                <Image src="/images/404/umbrella.webp" alt="Umbrella" layout="fill" objectFit="contain" quality={100}/>
                            </Block>
                            <Block font={["MinXLabel14", "MinXLabel16"]} color="MinXPrimaryText" $style={{fontWeight: "400 !important"}}>Umbrella</Block>
                        </Block>
                    </Block>
                </Block>
            </Block>
        </React.Fragment>
    )
}

export default withRouter(Custom404);
