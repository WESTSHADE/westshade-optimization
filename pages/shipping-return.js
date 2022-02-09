import React, {useEffect, useState, createRef} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";

import {Modal} from "Components/surfaces";
import {Section} from "Components/Sections";
import {UrlFn} from "Utils/tools";

const urlFn = new UrlFn();

function Shipping_Return({router}) {
    const [tabsRefs, setTabsRefs] = useState([]);
    const [tabLeft, setTabLeft] = useState(0);
    const [displayTabs, setDisplayTabs] = useState(false);

    const [activeTabKey, setActiveTabKey] = useState("0");

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setTabsRefs((tabsRefs) => Array(2).fill(null).map((_, i) => tabsRefs[i] || createRef()))

        let tabsIndex = router.query.hasOwnProperty('tab') ? router.query.tab : urlFn.getParam("tab");
        if (tabsIndex) {
            setActiveTabKey(tabsIndex + "")
        }
    }, []);

    useEffect(() => {
        if (tabsRefs.length > 0) {
            if (!displayTabs) {
                setDisplayTabs(true);
            } else {
                setTabLeft((tabsRefs[activeTabKey].current.clientWidth - 24) / 2);
            }
        }
    }, [tabsRefs, displayTabs, activeTabKey]);

    return (
        <React.Fragment>
            <Head>
                <title>Shipping and Return Policy - FAQs | WESTSHADE</title>
                <meta name="description" content="Shipping and return policy about Westshade&apos;s canopy, umbrella and accessories."/>
            </Head>
            <Block display="grid" gridTemplateColumns="100%" gridRowGap={["32px", "32px", "40px"]}>
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <Block className="text-center" height={["184px", "200px", "216px"]} display="grid" gridTemplateRows="repeat(3, min-content)" gridRowGap="12px" alignContent="center" backgroundColor="#F7F7F7">
                                 <Block font="MinXSubtitle14" color="MinXPrimaryText">CUSTOMER SERVICE</Block>
                                 <Block marginBottom={["8px", "8px", "16px"]} font={["MinXTitle24", "MinXTitle32"]} color="MinXPrimaryText">DELIVERY & RETURN</Block>
                                 {displayTabs ? (
                                     <Block width="100%" font="MinXLabel20">
                                         <Tabs activeKey={activeTabKey} fill={FILL.fixed} onChange={({activeKey}) => setActiveTabKey(activeKey + "")}
                                               overrides={{
                                                   Root: {
                                                       style: {width: "100%", maxWidth: "420px", marginRight: "auto", marginLeft: "auto"}
                                                   },
                                                   TabBorder: {props: {hidden: true}},
                                                   TabHighlight: {
                                                       props: {
                                                           className: "tab-highlight-horizon"
                                                       },
                                                       style: {left: tabLeft + "px"}
                                                   },
                                               }}
                                         >
                                             <Tab title="Delivery" tabRef={tabsRefs[0]}
                                                  overrides={{
                                                      Tab: {
                                                          props: {
                                                              className: "canopy-tent-tab"
                                                          },
                                                          style: ({$isActive}) => ({color: $isActive ? "#262626" : "#BFBFBF"}),
                                                      },
                                                      TabPanel: {props: {hidden: true}}
                                                  }}
                                             />
                                             <Tab title="Return" tabRef={tabsRefs[1]}
                                                  overrides={{
                                                      Tab: {
                                                          props: {
                                                              className: "canopy-tent-tab"
                                                          },
                                                          style: ({$isActive}) => ({color: $isActive ? "#262626" : "#BFBFBF"}),
                                                      },
                                                      TabPanel: {props: {hidden: true}}
                                                  }}
                                             />
                                         </Tabs>
                                     </Block>
                                 ) : null}
                             </Block>
                         }
                />
                <Section upperContainerProps={{hidden: true}}
                         content={
                             <Block width="100%" maxWidth="600px" marginRight="auto" marginLeft="auto">
                                 {activeTabKey === "0" ? (
                                     <>
                                         <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Basic Shipping Information</Block>
                                         <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                             <ul className="bullet-warranty">
                                                 <li>We ship the products on the same day of purchase if the order is placed before 5:30 PST. Orders that are placed past that time will be shipped out the next following business day.
                                                     Holidays may delay the shipping time by a day or two.
                                                 </li>
                                                 <li>Delivery takes <strong>3-7 business days</strong> (excluding weekends and holidays) depends on the location. To find out exactly how long it will take, <span
                                                     style={{color: "#23A4AD", cursor: 'pointer'}}
                                                     onClick={() => setIsModalOpen(true)}>click here</span> to
                                                     find out.
                                                 </li>
                                                 <li>All Westshade orders are shipped (by default) via FedEx Ground shipments service.</li>
                                                 <li>We provide free shipping in the US and free handling if your order is above $149. For customers located in Alaska, Puerto Rico, and Hawaii, please contact us for further order estimates.
                                                     For
                                                     orders
                                                     under $149, the shipping costs vary depending on weight, delivery location, and more.
                                                 </li>
                                             </ul>
                                         </Block>
                                         {/*<Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Tracking</Block>*/}
                                         {/*<Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">*/}
                                         {/*    <ul className="bullet-warranty">*/}
                                         {/*        <li>You’ll be emailed the tracking number once your package has been shipped.</li>*/}
                                         {/*        <li>You can also track your order by going to ‘My Orders’ - ‘Track Order’ in ‘My Account’.</li>*/}
                                         {/*        <li>We provide free shipping in the US and free handling if your order is above $149. For customers located in Alaska, Puerto Rico, and Hawaii, please contact us for further order*/}
                                         {/*            estimates.*/}
                                         {/*        </li>*/}
                                         {/*    </ul>*/}
                                         {/*</Block>*/}
                                         <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Delivery</Block>
                                         <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                             <ul className="bullet-warranty">
                                                 <li>If you’re ordering a tent, the top roof and frame will arrive in separate packages. Each package has its own tracking number. Thus, you will receive multiple tracking numbers.</li>
                                                 <li>If you’re ordering a custom printing tent, it will take a few days longer.</li>
                                                 <li>A signature may be required on receipt of your order.</li>
                                                 <li>If you’re not in, your order may be left in the front door.</li>
                                             </ul>
                                         </Block>
                                         <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">A few more things</Block>
                                         <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                             <ul className="bullet-warranty">
                                                 <li>Customers that requests multiple delivery addresses must place separate orders for each shipping address. Multiple individual orders can be placed online or with our customer team.</li>
                                                 <li>All in-stock purchases that are processed before 3PM PST will be shipped out on the same day. All in-stock purchases that are processed later than 3PM PST will be shipped out the next
                                                     business
                                                     day.
                                                 </li>
                                                 <li>We reserve the right to put orders on hold should we suspect fraud during the transaction.</li>
                                             </ul>
                                         </Block>
                                     </>
                                 ) : activeTabKey === "1" ? (
                                     <>
                                         <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Return Policy</Block>
                                         <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                             At Westshade, we are committed to ensuring that our customers receive the full value and quality of every purchase. If for any reason you are not satisfied with your purchase, we accept
                                             merchandise
                                             returns
                                             within 30 days of purchase. Please note that Westshade does not accept returns for any custom printed products, unless the custom printed product has a fault under our manufacturer’s warranty.
                                             All product
                                             returns will be automatically subjected to a 15% restocking fee except for merchandise received with a manufacturing defect. In addition, customers will be charged for all return shipping labels.
                                         </Block>
                                         <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">How To Return</Block>
                                         <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                             To create a return, head to ‘My Account’, then ‘My Orders’ and follow the instructions.
                                         </Block>
                                     </>
                                 ) : null}
                             </Block>
                         }
                />
            </Block>
            <Modal type="alertdialog" isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Block position="relative" width="80vw" maxWidth="600px" height="auto">
                    <Image src="/images/fedex-ground-shipment.webp" alt="fedex ground shipment" layout="responsive" objectFit="contain" width={1273} height={1475}/>
                </Block>
            </Modal>
        </React.Fragment>
    );
}

export default withRouter(Shipping_Return);
