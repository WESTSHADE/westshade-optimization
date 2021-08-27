import React, {useEffect, useState} from "react";

import Link from "next/link";
import Head from "next/head";

import {Box, Breadcrumbs, Container, Typography,} from "@material-ui/core";

import CBreadcrumbs from "../components/breadcrumbs";
import CContainer from "../components/container";

function Privacy() {
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        setTimeout(function () {
            setDisplay(true);
        }, 250);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <title>Privacy Policy - WESTSHADE</title>
                <meta name="description"
                      content="Privacy Policy Protecting your private information is our priority. This statement of Privacy applies to westshade.com and WestShade and governs data."/>
            </Head>
            <Box className="page" fontSize={14} lineHeight={1.43}>
                {display ? (
                    <>
                        <CBreadcrumbs>
                            <Container maxWidth="md">
                                <Breadcrumbs classes={{li: "root-breadcrumbs-text"}}>
                                    <Link color="inherit" href="/" onClick={(event) => event.preventDefault()}>
                                        Home
                                    </Link>
                                    <Typography variant="inherit" color="textPrimary"> Privacy Policy </Typography>
                                </Breadcrumbs>
                            </Container>
                        </CBreadcrumbs>
                        <CContainer>
                            <Container maxWidth="md">
                                <Typography variant="subtitle1" classes={{subtitle1: "information-subtitle"}} align="left" paragraph={true}>
                                    <strong> Privacy Policy </strong>
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    Protecting your private information is our priority. This
                                    statement of Privacy applies to westshade.com and WestShade and
                                    governs data collection and usage. For the purpose of this privacy
                                    policy, unless otherwise noted, all references to WestShade
                                    include westshade.com and Yimu International, Inc. The WestShade
                                    website is a online retail site. By using the WestShade website,
                                    you consent to the data practices described in this statement.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Collection of your Personal Information
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    In order to better provide you with products and services offered
                                    on our site, WestShade may collect personally identifiable
                                    information, such as your:
                                </Typography>
                                <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left" paragraph={true}>
                                    <ul>
                                        <li>First and Last Name</li>
                                        <li>Mailing Address</li>
                                        <li>E-mail Address</li>
                                        <li>Phone Number</li>
                                    </ul>
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    If you purchase WestShade’s products and services, we collect
                                    billing and credit card information. This information is used to
                                    complete the purchase transaction.
                                    <br/>
                                    <br/>
                                    We do not collect any personal information about you unless you
                                    voluntarily provide it to us. However, you may be required to
                                    provide certain personal information to us when you elect to use
                                    certain products or services available on the Site. These may
                                    include: (a)registering for an account on our Site; (b)entering a
                                    sweepstakes or consent sponsored by us or one of our partners;
                                    (c)signing up for special offers from selected third parties;
                                    (d)sending us an email message; (e)submitting your credit card or
                                    other payment information when ordering and purchasing products
                                    and services on our Site. To wit, we will use your information
                                    for, but not limited to, communicating with you in relation to
                                    services and/or products you have requested from us. We also may
                                    gather additional personal or non-personal information in the
                                    future.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Use of your Personal Information
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade collects and uses your personal information to operate
                                    its website(s) and deliver the services you have requested.
                                    <br/>
                                    <br/>
                                    WestShade may also use your personally identifiable information to
                                    inform you of other products or services available from WestShade
                                    and its affiliates.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Sharing Information With Third Parties
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade does not sell, rent or lease its customer lists to third
                                    parties.
                                    <br/>
                                    <br/>
                                    WestShade may share with trusted partners to help perform
                                    statistical analysis, send you email or postal mail, provide
                                    customer support, or arrange for deliveries. All such third
                                    parties are prohibited from using your personal information except
                                    to provide these services to WestShade, and they are required to
                                    maintain the confidentiality of your information.
                                    <br/>
                                    <br/>
                                    WestShade may disclose your personal information, without notice,
                                    if required to do so by law or in the good faith belief that such
                                    action is necessary to: (a)conform to the edicts of the law or
                                    comply with legal process served on WestShade or the Site;
                                    (b)protect and defend the rights or property of WestShade; and/or
                                    (c)act under exigent circumstances to protect the personal safety
                                    of users of WestShade, or the public.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Tracking User Behavior
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade may keep track of the websites and pages our users visit
                                    within WestShade, in order to determine what WestShade services
                                    are the most popular. This data is used to deliver customized
                                    content and advertising within WestShade to customers whose
                                    behavior indicates that they are interested in a particular
                                    subject area.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Automatically Collected Information
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    Information about your computer hardware and software may be
                                    automatically collected by WestShade. This information can
                                    include: your IP address, browser type, domain names, access times
                                    and referring website address. This information is used for the
                                    operation of the service, to maintain quality of the service, and
                                    to provide general statistics regarding use of the WestShade
                                    website.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Security of your Personal Information
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade secures your personal information from unauthorized
                                    access, use, or disclosure. WestShade uses the following methods
                                    for this purpose:
                                </Typography>
                                <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left" paragraph={true}>
                                    <ul>
                                        <li>SSL Protocol</li>
                                    </ul>
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    When personal information (such as a credit card number) is
                                    transmitted to other websites, it is protected through the use of
                                    encryption, such as the Secure Sockets Layer(SSL) protocol.
                                    <br/>
                                    <br/>
                                    We strive to take appropriate security measures to protect against
                                    unauthorized access to or alteration of your personal information.
                                    Unfortunately, no data transmission over the Internet or any
                                    wireless network can be guaranteed to be 100% secure. As a result,
                                    while we strive to protect your personal information, you
                                    acknowledge that: (a) there are security and privacy limitation
                                    inherent to the Internet which are beyond our control; and (b)
                                    security, integrity, and privacy of any and all information and
                                    data exchanged between you and us through this Site cannot be
                                    guaranteed.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Right to Deletion
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    Subject to certain exceptions set out below, on receipt of a
                                    verifiable request from you, we will:
                                </Typography>
                                <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left" paragraph={true}>
                                    <ul>
                                        <li>Delete your personal information from our records.</li>
                                        <li>
                                            Direct any service providers to delete your personal information
                                            from their records.
                                        </li>
                                    </ul>
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    Please note that we may not be able to comply with requests to
                                    delete your personal information if it is necessary to:
                                </Typography>
                                <Typography component="span" classes={{root: "gird-item-content"}} display="block" align="left" paragraph={true}>
                                    <ul>
                                        <li>
                                            Complete the transaction for which the personal information was
                                            collected, fulfill the terms of a written warranty pr product
                                            recall conducted in accordance with federal law, provide a good
                                            or service requested by you, or reasonably anticipated within
                                            the context of our ongoing business relationship with you, or
                                            otherwise perform a contract between you and us;
                                        </li>
                                        <li>
                                            Detect security incidents, protect against malicious, deceptive,
                                            fraudulent, or illegal activity; or prosecute those responsible
                                            for that activity;
                                        </li>
                                        <li>
                                            Debug to identify and repair errors that impair existing
                                            intended functionality;
                                        </li>
                                        <li>
                                            Exercise free speech, ensure the right of another consumer to
                                            exercise his or her right of free speech, or exercise another
                                            right provided for by law;
                                        </li>
                                        <li>
                                            Comply with the California Electronic Communications Privacy
                                            Act;
                                        </li>
                                        <li>
                                            Engage in public or peer-reviewed scientific, historical, or
                                            statistical research in the public interest that adheres to all
                                            other applicable ethics and privacy laws, when our deletion of
                                            the information is likely to render impossible or seriously
                                            impair the achievement of such research, provided we have
                                            obtained your informed consent;
                                        </li>
                                        <li>
                                            Enable solely internal uses that are reasonably aligned with
                                            your expectations based on your relationship with us;
                                        </li>
                                        <li>Comply with an existing legal obligation;</li>
                                        <li>
                                            Otherwise use your personal information, internally, in a lawful
                                            manner that is compatible with the context in which you provided
                                            the information.
                                        </li>
                                    </ul>
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Children Under Thirteen
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade does not knowingly collect personally identifiable
                                    information from children under the age of thirteen. If you are
                                    under the age of thirteen, you must ask your parent or guardian
                                    for permission to use this website.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    E-mail Communications
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    From time to time, WestShade may contact you via email for the
                                    purpose of providing announcements, promotional offers, alerts,
                                    confirmations, surveys, and/or other general communication.
                                    <br/>
                                    <br/>
                                    If you would like to stop receiving marketing or promotional
                                    communications via email from WestShade, you may opt out of such
                                    communications by support@westshade.com.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Changes to this Statement
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade reserves the right to change this Privacy Policy from
                                    time to time. We will notify you about significant changes in the
                                    way we treat personal information by sending a notice to the
                                    primary email address specified in your account, by placing a
                                    prominent notice on our site, and/or by updating any privacy
                                    information on this page. Your continued use of the site and/or
                                    services available through this site after such modifications will
                                    constitute your: (a) acknowledgment of the modified Privacy
                                    Policy; and (b) agreement to abide and be bound by that Policy.
                                </Typography>
                                <Typography component="h6" align="left" paragraph={true}>
                                    Contact Information
                                </Typography>
                                <Typography color="textSecondary" align="left" paragraph={true}>
                                    WestShade welcomes your questions or comments regarding this
                                    Statement of Privacy. If you believe that WestShade has not
                                    adhered to this Statement, please contact WestShade at:
                                    <br/>
                                    <br/>
                                    WestShade
                                    <br/>
                                    <br/>
                                    Email Address: support@westshade.com
                                    <br/>
                                    <br/>
                                    Telephone number: 949-522-8111
                                    <br/>
                                    <br/>
                                    Effective as of October 05, 2020
                                </Typography>
                            </Container>
                        </CContainer>
                    </>
                ) : null}
            </Box>
        </React.Fragment>
    );
}

export default Privacy;
