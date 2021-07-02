import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  Box,
  Button,
  Breadcrumbs,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

const SectionSocialGroup = dynamic(() =>
  import("../../components/section_social_group")
);

function handleClick(event) {
  event.preventDefault();
}

export default function Privacy() {
  const router = useRouter();

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="shipping">
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Typography color="textPrimary">Privacy Policy</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginBottom: "0" }}>
        <Container maxWidth="md">
          <div style={{ textAlign: "left" }}>
            <h3 className="section-title">Privacy Policy</h3>
            <p className="section-content" style={{ marginBottom: "32px" }}>
              Protecting your private information is our priority. This
              statement of Privacy applies to westshade.com and WestShade and
              governs data collection and usage. For the purpose of this privacy
              policy, unless otherwise noted, all references to WestShade
              include westshade.com and Yimu International, Inc. The WestShade
              websire is a online retail site. By using the WestSahde website,
              you consent to the data practices described in this statement.
            </p>
            <div className="section-subtitle">
              Collection of your Personal Information
            </div>
            <p className="section-content">
              In order to better provide you with products and services offered
              on our site, WestShade may collect personally identifiable
              information, such as your:
            </p>
            <ul
              className="section-content"
              style={{ marginLeft: "10px", marginBottom: "24px" }}
            >
              <li>First and Last Name</li>
              <li>Mailing Address</li>
              <li>E-mail Address</li>
              <li>Phone Number</li>
            </ul>
            <p className="section-content">
              If you purchase WestShade’s products and services, we collect
              billing and credit card information. This information is used to
              complete the purchase transaction.
              <br />
              <br />
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
            </p>
            <div className="section-subtitle">
              Use of your Personal Information
            </div>
            <p className="section-content">
              WestShade collects and uses your personal information to operate
              its website(s) and deliver the services you have requested.
              <br />
              <br />
              WestShade may also use your personally identifiable information to
              inform you of other products or services available from WestShade
              and its affiliates.
            </p>
            <div className="section-subtitle">
              Sharing Information With Third Parties
            </div>
            <p className="section-content">
              WestShade does not sell, rent or lease its customer lists to third
              parties.
              <br />
              <br />
              WestShade may share with trusted partners to help perform
              statistical analysis, send you email or postal mail, provide
              customer support, or arrange for deliveries. All such third
              parties are prohibited from using your personal information except
              to provide these services to WestShade, and they are required to
              maintain the confidentiality of your information.
              <br />
              <br />
              WestShade may disclose your personal information, without notice,
              if required to do so by law or in the good faith belief that such
              action is necessary to: (a)conform to the edicts of the law or
              comply with legal process served on WestShade or the Site;
              (b)protect and defend the rights or property of WestShade; and/or
              (c)act under exigent circumstances to protect the personal safety
              of users of WestShade, or the public.
            </p>
            <div className="section-subtitle">Tracking User Behavior</div>
            <p className="section-content">
              WestShade may keep track of the websites and pages our users visit
              within WestShaed, in order to determine what WestShade services
              are the most popular. This data is used to deliver customized
              content and advertising within WestShade to customers whose
              behavior indicates that they are interested in a particular
              subject area.
            </p>
            <div className="section-subtitle">
              Automatically Collected Information
            </div>
            <p className="section-content">
              Information about your computer hardware and software may be
              automatically collected by WestShade. This information can
              include: your IP address, browser type, domain names, access times
              and referring website address. This information is used for the
              operation of the service, to maintain quality of the service, and
              to provide general statistics regarding use of the WestShade
              website.
            </p>
            <div className="section-subtitle">
              Security of your Personal Information
            </div>
            <p className="section-content">
              WestShade secures your personal information from unauthorized
              access, use, or disclosure. WestShade uses the following methods
              for this purpose:
            </p>
            <ul
              className="section-content"
              style={{ marginLeft: "10px", marginBottom: "12px" }}
            >
              <li>SSL Protocol</li>
            </ul>
            <p className="section-content">
              When personal information (such as a credit card number) is
              transmitted to other websites, it is protected through the use of
              encryption, such as the Secure Sockets Layer(SSL) protocol.
              <br />
              <br />
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
            </p>
            <div className="section-subtitle">Right to Deletion</div>
            <p className="section-content">
              Subject to certain exceptions set out below, on receipt of a
              verifiable request from you, we will:
            </p>
            <ul
              className="section-content"
              style={{ marginLeft: "10px", marginBottom: "12px" }}
            >
              <li>Delete your personal information from our records.</li>
              <li>
                Direct any service providers to delete your personal information
                from their records.
              </li>
            </ul>
            <p className="section-content">
              Please note that we may not be able to comply with requests to
              delete your personal information if it is necessary to:
            </p>
            <ul
              className="section-content"
              style={{ marginLeft: "10px", marginBottom: "12px" }}
            >
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
            <div className="section-subtitle">Children Under Thirteen</div>
            <p className="section-content">
              WestShade does not knowingly collect personally identifiable
              information from children under the age of thirteen. If you are
              under the age of thirteen, you must ask your parent or guardian
              for permission to use this website.
            </p>
            <div className="section-subtitle">E-mail Communications</div>
            <p className="section-content">
              From time to time, WestShade may contact you via email for the
              purpose of providing announcements, promotional offers, alerts,
              confirmations, surveys, and/or other general communication.
              <br />
              <br />
              If you would like to stop receiving marketing or promotional
              communications via email from WestShade, you may opt out of such
              communications by support@westshade.com.
            </p>
            <div className="section-subtitle">Changes to this Statement</div>
            <p className="section-content">
              WestShade reserves the right to change this Privacy Policy from
              time to time. We will notify you about significant changes in the
              way we treat personal information by sending a notice to the
              primary email address specified in your account, by placing a
              prominent notice on our site, and/or by updating any privacy
              information on this page. Your continued use of the site and/or
              services available through this site after such modifications will
              constitute your: (a) acknowledgment of the modified Privacy
              Policy; and (b) agreement to abide and be bound by that Policy.
            </p>
            <div className="section-subtitle">Contact Information</div>
            <p className="section-content">
              WestShade welcomes your questions or comments regarding this
              Statement of Privacy. If you believe that WestShade has not
              adhered to this Statement, please contact WestShade at:
              <br />
              <br />
              WestShade
              <br />
              <br />
              Email Address: support@westshade.com
              <br />
              <br />
              Telephone number: 949-522-8111
              <br />
              <br />
              Effective as of October 05, 2020
            </p>
          </div>
        </Container>
      </Box>
    </div>
  );
}
