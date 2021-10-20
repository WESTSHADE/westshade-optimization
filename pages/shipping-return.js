import React, {useEffect, useState, createRef} from "react";

import {withRouter} from "next/router";
import Head from "next/head";
import Image from "next/image";

import {Block} from "baseui/block";
import {Tabs, Tab, FILL} from "baseui/tabs-motion";
import {Modal, ModalBody, ROLE, SIZE as ModalSize} from "baseui/modal";

function Shipping_Return() {
    const [tabsRefs, setTabsRefs] = useState([]);
    const [tabActiveKey, setTabActiveKey] = React.useState("0");
    const [displayTabs, setDisplayTabs] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const triggerModal = (status) => setIsModalOpen(status);

    useEffect(() => {
        setTabsRefs((tabsRefs) =>
            Array(2)
                .fill()
                .map((_, i) => tabsRefs[i] || createRef())
        );
    }, []);

    useEffect(() => {
        if (tabsRefs.length > 0) setDisplayTabs(true);
    }, [tabsRefs]);

    return (
        <React.Fragment>
            <Head>
                <title>Shipping and Return Policy - FAQs | WESTSHADE</title>
                <meta name="description" content="View frequently asked questions about our shipping and return policies, estimated delivery, damaged items, and refunds."/>
            </Head>
            <Block display="flex" flexDirection="column" maxWidth="1920px" position="relative" alignItems="center" height={["184px", "200px", "216px"]}
                   marginBottom={["32px", "32px", "40px"]} paddingTop={["32px", "40px"]} paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   backgroundColor="#F7F7F7"
            >
                <Block marginBottom="12px" font="MinXSubtitle14" color="MinXPrimaryText">CUSTOMER SERVICE</Block>
                <Block marginBottom={["20px", "20px", "28px"]} font={["MinXTitle24", "MinXTitle32"]} color="MinXPrimaryText"
                       overrides={{
                           Block: {
                               props: {
                                   style: {textAlign: "center"}
                               }
                           },
                       }}
                >
                    DELIVERY & RETURN
                </Block>
                {displayTabs ? (
                    <Block width="100%" font="MinXLabel20">
                        <Tabs activeKey={tabActiveKey} fill={FILL.fixed} onChange={({activeKey}) => setTabActiveKey(activeKey)}
                              overrides={{
                                  Root: {
                                      style: {width: "100%", maxWidth: "310px", marginRight: "auto", marginLeft: "auto"}
                                  },
                                  TabHighlight: {
                                      style: () => ({
                                          left: tabsRefs[tabActiveKey].current ? `${(tabsRefs[tabActiveKey].current.clientWidth - 24) / 2}px` : 0,
                                          width: "24px",
                                          height: "6px",
                                          backgroundColor: "#23A4AD",
                                          borderRadius: "3px",
                                      })
                                  },
                                  TabBorder: {
                                      style: ({$theme}) => ({display: "none"}),
                                  },
                              }}
                        >
                            <Tab title="Delivery" tabRef={tabsRefs[0]}
                                 overrides={{
                                     Tab: {
                                         style: ({$isActive}) => ({
                                             fontSize: "inherit",
                                             fontWeight: "inherit",
                                             lineHeight: "inherit",
                                             color: $isActive ? "#262626" : "#BFBFBF",
                                             paddingTop: "12px",
                                             paddingBottom: "12px",
                                             background: "transparent",
                                         }),
                                     },
                                     TabPanel: {
                                         style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                     },
                                 }}
                            />
                            <Tab title="Return" tabRef={tabsRefs[1]}
                                 overrides={{
                                     Tab: {
                                         style: ({$isActive}) => ({
                                             fontSize: "inherit",
                                             fontWeight: "inherit",
                                             lineHeight: "inherit",
                                             color: $isActive ? "#262626" : "#BFBFBF",
                                             paddingTop: "12px",
                                             paddingBottom: "12px",
                                             background: "transparent",
                                         }),
                                     },
                                     TabPanel: {
                                         style: {paddingTop: 0, paddingRight: 0, paddingBottom: 0, paddingLeft: 0},
                                     },
                                 }}
                            />
                        </Tabs>
                    </Block>
                ) : null}
            </Block>
            <Block paddingRight={["16px", "16px", "24px"]} paddingLeft={["16px", "16px", "24px"]}
                   overrides={{
                       Block: {
                           props: {
                               className: "container-display"
                           }
                       },
                   }}
            >
                <Block width="100%" maxWidth="600px" marginRight="auto" marginLeft="auto">
                    {tabActiveKey === "0" ? (
                        <>
                            <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Basic Shipping Information</Block>
                            <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                <ul className="bullet-warranty">
                                    <li>Delivery takes <strong>3-7 business days</strong> (excluding weekends and holidays) depends on the location. To find out exactly how long it will take, <span
                                        style={{color: "#23A4AD", cursor: 'pointer'}}
                                        onClick={() => setIsModalOpen(true)}>click here</span> to
                                        find out.
                                    </li>
                                    <li>All Westshade orders are shipped (by default) via FedEx Ground shipments service.</li>
                                    <li>We provide free shipping in the US and free handling if your order is above $149. For customers located in Alaska, Puerto Rico, and Hawaii, please contact us for further order estimates. For orders
                                        under $149, the shipping costs vary depending on weight, delivery location, and more.
                                    </li>
                                </ul>
                            </Block>
                            <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Tracking</Block>
                            <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                <ul className="bullet-warranty">
                                    <li>You’ll be emailed the tracking number once your package has been shipped.</li>
                                    <li>You can also track your order by going to ‘My Orders’ - ‘Track Order’ in ‘My Account’.</li>
                                    <li>We provide free shipping in the US and free handling if your order is above $149. For customers located in Alaska, Puerto Rico, and Hawaii, please contact us for further order estimates.</li>
                                </ul>
                            </Block>
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
                                    <li>All in-stock purchases that are processed before 3PM PST will be shipped out on the same day. All in-stock purchases that are processed later than 3PM PST will be shipped out the next business day.
                                    </li>
                                    <li>We reserve the right to put orders on hold should we suspect fraud during the transaction.</li>
                                </ul>
                            </Block>
                        </>
                    ) : tabActiveKey === "1" ? (
                        <>
                            <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">Return Policy</Block>
                            <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                At Westshade, we are committed to ensuring that our customers receive the full value and quality of every purchase. If for any reason you are not satisfied with your purchase, we accept merchandise returns
                                within 30 days of purchase. Please note that Westshade does not accept returns for any custom printed products, unless the custom printed product has a fault under our manufacturer’s warranty. All product
                                returns will be automatically subjected to a 15% restocking fee except for merchandise received with a manufacturing defect. In addition, customers will be charged for all return shipping labels.
                            </Block>
                            <Block marginBottom={["16px", "24px"]} font="MinXHeading20" color="MinXPrimaryText">How To Return</Block>
                            <Block marginBottom={["32px", "40px"]} font="MinXParagraph14" color="MinXPrimaryText">
                                To create a return, head to ‘My Account’, then ‘My Orders’ and follow the instructions.
                            </Block>
                        </>
                    ) : null}
                </Block>
            </Block>
            <Modal onClose={() => triggerModal(false)} isOpen={isModalOpen} animate size={ModalSize.full} role={ROLE.dialog}
                   overrides={{
                       Root: {
                           style: {
                               zIndex: "99",
                               height: "auto",
                               paddingTop: "24px",
                               overflowY: "hidden",
                           },
                           props: {
                               className: "modalRoot modalRoot-image",
                           },
                       },
                       DialogContainer: {
                           style: {height: "100%",},
                       },
                       Dialog: {
                           style: {
                               height: "fit-content",
                               maxWidth: "600px !important",
                               paddingBottom: "0px !important",
                               borderTopRightRadius: "32px !important",
                               borderBottomRightRadius: "32px !important",
                               borderBottomLeftRadius: "32px !important",
                               borderTopLeftRadius: "32px !important",
                           },
                           props: {
                               className: "modalDialog"
                           },
                       },
                       Close: {
                           style: {top: "29px", right: "29px"},
                       },
                   }}
            >
                <ModalBody style={{backgroundColor: "white", padding: "72px 12px 36px", height: "auto"}} className="modalSelectionContainer">
                    <Block position="relative">
                        <Image src="images/fedex-ground-shipment.jpg" alt="fedex ground shipment" layout="responsive" objectFit="contain" width={1273} height={1475} quality={100}/>
                    </Block>
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}

Shipping_Return.getInitialProps = () => {
    return {
        newFooter: true,
    };
};

export default withRouter(Shipping_Return);
