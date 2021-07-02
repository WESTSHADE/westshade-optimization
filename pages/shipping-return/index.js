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

export default function Shipping_Return() {
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
            <Typography color="textPrimary">Shipping</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginBottom: "0" }}>
        <Container maxWidth="md">
          <div style={{ textAlign: "left" }}>
            <h3 className="section-title">Shipping</h3>
            <p className="section-content" style={{ marginBottom: "32px" }}>
              All Westshade orders are shipped with FedEx. After orders have
              been processed and shipped, customers will receive a confirmation
              email with a order confirmation number and a copy of the invoice.
              Tracking number and information will be automatically emailed
              after product is processed for shipping. All other shipping
              information can be found by logging into your account here
              at&nbsp;
              <Link color="inherit" href="/my-account" onClick={handleClick}>
                https://www.westshade.com/my-account
              </Link>
              . For further questions or concerns, please contact our customer
              service team.
            </p>
            <p className="section-content">Additional Shipping Information:</p>
            <ul className="section-content" style={{ marginLeft: "10px" }}>
              <li>
                We provide free shipping and handling costs for any orders over
                $149 within the U.S. Shipping costs for customers located in
                Alaska, Puerto Rico, and Hawaii will need further order
                estimates.
              </li>
              <li>
                All FedEx Deliveries are 5 days a week (Monday through Friday)
                excluding weekends and holidays.
              </li>
              <li>
                Customers that requests multiple delivery addresses must place
                separate orders for each shipping address. Multiple individual
                orders can be placed online or by placing orders with our
                customer team.
              </li>
              <li>
                All in-stock purchases that are processed before 3PM PST will be
                shipped out on the same day. All in-stock purchases that are
                processed later than 3PM PST will be shipped out the next
                business day.
              </li>
              <li>
                We reserve the right to put orders on hold should we suspect
                fraud during the transaction.
              </li>
            </ul>
          </div>
        </Container>
      </Box>
      <Box
        className="section-container"
        style={{ marginTop: "0", marginBottom: "0" }}
      >
        <Container maxWidth="md">
          <Grid container>
            <Grid item xs={6} sm={3}>
              <List>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    primary={"Shipping Method"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Ground"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"2nd Day"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Standard Overnight"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Priority Overnight"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"First Overnight"}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={6} sm={3}>
              <List>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    primary={"Estimated Delivery"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"2-5 business days once shipped"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"2 business days once shipped"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 business day once shipped"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 business day once shipped"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 business day once shipped"}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginTop: "0" }}>
        <Container maxWidth="md">
          <div className="section-image-container">
            <img
              className="section-image"
              style={{ maxHeight: "unset" }}
              src="/fedex-ground-shipment.png"
            />
          </div>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <div style={{ textAlign: "left", marginBottom: "24px" }}>
            <h3 className="section-title">Return Policy</h3>
            <p className="section-content">
              At Westshade, we are committed to ensuring that our customers
              receive the full value and quality of every purchase. If for any
              reason you are not satisfied with your purchase, we accept
              merchandise returns within 30 days of purchase. Please note that
              Westshade does not accept returns for any custom printed products,
              unless the custom printed product has a fault under our
              manufacturer’s warranty. All product returns will be automatically
              subjected to a 15% restocking fee except for merchandise received
              with a manufacturing defect. In addition, customers will be
              charged for all return shipping labels.
            </p>
          </div>
          <div style={{ textAlign: "left" }}>
            <h3 className="section-title">Contact Information</h3>
            <p className="section-content">
              Customers are encourage to contact our customer support team for
              consultation before deciding to return purchasable products from
              Westshade. We can be reached by calling&nbsp;
              <strong>949-522-8111</strong>, or by emailing us at&nbsp;
              <strong>support@westshade.com</strong>&nbsp;so we may further
              assist you and provide specific return shipping instructions.
            </p>
          </div>
        </Container>
      </Box>
    </div>
  );
}
