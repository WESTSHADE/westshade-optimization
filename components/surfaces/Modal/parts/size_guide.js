import React from "react";

import {Block} from "baseui/block";
import Image from "next/image";

import data, {newSizeGuide} from "Assets/constants/size-guides"

export default function content({product}) {
    if (product === "canopy") {
        return (
            <>
                <Block className="size-guide-table" width="100%" display="grid" placeItems="center" padding={["0px", "24px 30px", "24px 100px"]}>
                    <Block className="b-t-1 b-l-1 b-r-1 b-b-1" maxWidth="473px" display="flex" alignItems="stretch">
                        <Block backgroundColor="#f0f0f0" width="77px" display="flex" flexDirection="column">
                            <Block className="b-r-1 b-b-1" height="91px" width="100%"/>
                            <Block className="b-b-1 b-r-1" width="100%" padding="24px 0" height="162px" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    10’ x 10’
                                </Block>
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    10’ x 15’
                                </Block>
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    10’ x 20’
                                </Block>
                            </Block>
                            <Block className="b-b-1 b-r-1" width="100%" padding="24px 0" height="162px" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    13’ x 13’
                                </Block>
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    13’ x 20’
                                </Block>
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    13’ x 26’
                                </Block>
                            </Block>
                            <Block className="b-r-1" width="100%" padding="24px 0" height="111px" display="flex" flexDirection="column" justifyContent="space-between" alignItems="center">
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    16’ x 16’
                                </Block>
                                <Block font="MinXParagraph12" color="#8c8c8c">
                                    20’ x 20’
                                </Block>
                            </Block>
                        </Block>
                        <Block width="198px">
                            <Block className="b-b-1 b-r-1" height="60px" backgroundColor="#f0f0f0" width="100%" padding="8px 0 14px" display="flex" flexDirection="column" alignItems="center">
                                <Block font="MinXLabel14" color="MinXTitle">{data.overAllHeight.label}</Block>
                                <Block font="MinXParagraph12" color="#8c8c8c" marginTop="4px">{data.overAllHeight.description}</Block>
                            </Block>
                            <Block className="b-b-1" height="30px" backgroundColor="#f0f0f0" width="100%" display="flex" alignItems="center">
                                <Block className="b-r-1" height="100%" display="grid" placeItems="center" font="MinXParagraph12" color="#8c8c8c" width="33.33%">
                                    Y5
                                </Block>
                                <Block className="b-r-1" height="100%" display="grid" placeItems="center" font="MinXParagraph12" color="#8c8c8c" width="33.33%">
                                    Y6
                                </Block>
                                <Block className="b-r-1" height="100%" display="grid" placeItems="center" font="MinXParagraph12" color="#8c8c8c" width="33.33%">
                                    Y7
                                </Block>
                            </Block>
                            <Block className="b-r-1 b-b-1" width="100%" height="162px" display="flex" alignItems="center" justifyContent="center">
                                <Block height="100%" className="b-r-1" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y5.small}
                                </Block>
                                <Block height="100%" className="b-r-1" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y6.small}
                                </Block>
                                <Block height="100%" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y7.small}
                                </Block>
                            </Block>
                            <Block className="b-r-1 b-b-1" width="100%" height="162px" display="flex" alignItems="center" justifyContent="center">
                                <Block className="b-r-1" height="100%" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y5.medium}
                                </Block>
                                <Block className="b-r-1" height="100%" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y6.medium}
                                </Block>
                                <Block height="100%" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y7.medium}
                                </Block>
                            </Block>
                            <Block className="b-r-1" width="100%" height="111px" display="flex" alignItems="center" justifyContent="center">
                                <Block height="100%" className="b-r-1" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y5.large}
                                </Block>
                                <Block height="100%" className="b-r-1" font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y6.large}
                                </Block>
                                <Block font="MinXParagraph14" color="MinXTitle" width="69px" display="grid" placeItems="center">
                                    {newSizeGuide.overAllHeight.y7.large}
                                </Block>
                            </Block>
                        </Block>
                        <Block width="198px">
                            <Block className="b-b-1" height="60px" backgroundColor="#f0f0f0" width="100%" padding="8px 0 14px" display="flex" flexDirection="column" alignItems="center">
                                <Block font="MinXLabel14" color="MinXTitle">{data.clearanceHeight.label}</Block>
                                <Block font="MinXParagraph12" color="#8c8c8c" marginTop="4px">{data.clearanceHeight.description}</Block>
                            </Block>
                            <Block className="b-b-1" height="30px" backgroundColor="#f0f0f0" width="100%" display="flex" alignItems="center">
                                <Block className="b-r-1" height="100%" display="grid" placeItems="center" font="MinXParagraph12" color="#8c8c8c" width="33.33%">
                                    Y5
                                </Block>
                                <Block className="b-r-1" height="100%" display="grid" placeItems="center" font="MinXParagraph12" color="#8c8c8c" width="33.33%">
                                    Y6
                                </Block>
                                <Block height="100%" display="grid" placeItems="center" font="MinXParagraph12" color="#8c8c8c" width="33.33%">
                                    Y7
                                </Block>
                            </Block>
                            <Block className="b-b-1" width="100%" height="162px" display="flex" alignItems="center" justifyContent="center">
                                <Block height="100%" className="b-r-1" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y5.small}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                                <Block height="100%" className="b-r-1" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y6.small}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                                <Block height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y7.small}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                            </Block>
                            <Block className="b-b-1" width="100%" height="162px" display="flex" alignItems="center" justifyContent="center">
                                <Block className="b-r-1" height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y5.medium}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                                <Block className="b-r-1" height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y6.medium}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                                <Block height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y7.medium}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                            </Block>
                            <Block width="100%" height="111px" display="flex" alignItems="center" justifyContent="center">
                                <Block className="b-r-1" height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y5.large}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                                <Block className="b-r-1" height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y6.large}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                                <Block height="100%" font="MinXParagraph14" dangerouslySetInnerHTML={{__html: newSizeGuide.clearanceHeight.y7.large}} color="MinXTitle" width="69px" display="grid" placeItems="center"/>
                            </Block>
                        </Block>
                    </Block>
                </Block>
            </>
        )
    } else if (product === "umbrella") {
        return (
            <>
                <Block display="grid" gridTemplateColumns="120px max-content" marginTop={["48px", null, "24px"]} marginRight="24px" marginLeft="24px" overflow="hidden">
                    <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center">
                        <div/>
                        <Block font="MinXLabel14" color="MinXPrimaryText">Marco</Block>
                        <Block font="MinXLabel14" color="MinXPrimaryText">Bali</Block>
                        <Block font="MinXLabel14" color="MinXPrimaryText">Kapri</Block>
                        <Block font="MinXLabel14" color="MinXPrimaryText">Santorini</Block>
                        <Block font="MinXLabel14" color="MinXPrimaryText">Catalina</Block>
                    </Block>
                    <Block className="hideScrollBar" width={["calc(100vw - 140px - 48px)", "calc(100vw - 140px - 48px)", "auto"]} display="grid" gridTemplateColumns="repeat(7, 70px)" gridColumnGap="24px"
                           overflow={["scrollX", "scrollX", "hidden"]}
                    >
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">6.5'</Block>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">7.5'</Block>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">9'</Block>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">10'</Block>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">11.5'</Block>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">13'</Block>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                        <Block display="grid" gridTemplateRows="repeat(6, 48px)" alignItems="center" justifyItems="center">
                            <Block font="MinXParagraph14" color="MinXSecondaryText">16.4'</Block>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/unrelated.webp" alt="unrelated" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                            <Image src="/images/umbrella/related.webp" alt="related" width="22px" height="22px" layout="fixed" objectFit="contain"/>
                        </Block>
                    </Block>
                </Block>
            </>
        )
    }
}
