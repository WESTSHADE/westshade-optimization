import React from "react";

import {Block} from "baseui/block";
import Image from "next/image";

export default function content() {
    return (
        <Block display="grid" gridTemplateColumns="140px max-content" marginTop="48px">
            <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px">
                <div/>
                <Block>
                    <Block font="MinXLabel14" color="MinXPrimaryText">Y5 Economic steel</Block>
                    <Block font="MinXParagraph12" color="MinXSecondaryText">Clearance Height 6&apos;8&quot;</Block>
                    <Block font="MinXParagraph12" color="MinXSecondaryText">Overall Height 11&apos;</Block>
                </Block>
                <Block>
                    <Block font="MinXLabel14" color="MinXPrimaryText">Y5 Economic steel</Block>
                    <Block font="MinXParagraph12" color="MinXSecondaryText">Clearance Height 6&apos;8&quot;</Block>
                    <Block font="MinXParagraph12" color="MinXSecondaryText">Overall Height 10&apos;10&quot;</Block>
                </Block>
                <Block>
                    <Block font="MinXLabel14" color="MinXPrimaryText">Y5 Economic steel</Block>
                    <Block font="MinXParagraph12" color="MinXSecondaryText">Clearance Height 6&apos;8&quot;-6&apos;10&quot;</Block>
                    <Block font="MinXParagraph12" color="MinXSecondaryText">Overall Height 10&apos;10&quot;-12&apos;10&quot;</Block>
                </Block>
            </Block>
            <Block width={["calc(100vw - 140px - 48px - 48px)", "calc(100vw - 140px - 48px - 48px)", "auto"]} display="grid" gridTemplateColumns="repeat(8, 70px)" gridColumnGap="24px"
                   overflow={["scrollX", "scrollX", "hidden"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "hideScrollBar"
                           },
                       },
                   }}
            >
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-10x10.png" alt="canopy tent 10x10" layout="responsive" objectFit="contain" width={156} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">10&apos; x 10&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-10x15.png" alt="canopy tent 10x15" layout="responsive" objectFit="contain" width={175} height={144} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">10&apos; x 15&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-13x13.png" alt="canopy tent 13x13" layout="responsive" objectFit="contain" width={160} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">13&apos; x 13&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-10x20.png" alt="canopy tent 10x20" layout="responsive" objectFit="contain" width={199} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">10&apos; x 20&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-16x16.png" alt="canopy tent 16x16" layout="responsive" objectFit="contain" width={192} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">16&apos; x 16&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-13x20.png" alt="canopy tent 13x20" layout="responsive" objectFit="contain" width={187} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">13&apos; x 20&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-13x26.png" alt="canopy tent 13x26" layout="responsive" objectFit="contain" width={206} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">13&apos; x 26&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
                <Block display="grid" gridTemplateRows="78px repeat(3, 60px)" gridRowGap="24px" alignItems="center" justifyItems="center">
                    <Block display="flex" flexDirection="column" alignItems="center">
                        <Block width="50px" height="50px">
                            <Image src="/images/icon/icon-20x20.png" alt="canopy tent 20x20" layout="responsive" objectFit="contain" width={215} height={140} quality={100}/>
                        </Block>
                        <Block font="MinXParagraph14" color="MinXSecondaryText">20&apos; x 20&apos;</Block>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/unrelated.webp" alt="unrelated" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                    <Block width="22px" height="22px">
                        <Image src="/images/umbrella/related.webp" alt="related" layout="responsive" objectFit="contain" width={24} height={24} quality={100}/>
                    </Block>
                </Block>
            </Block>
        </Block>
    )
}
