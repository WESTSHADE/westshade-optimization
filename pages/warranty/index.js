import Link from "next/link";
import { useRouter } from "next/router";

import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";

function handleClick(event) {
  event.preventDefault();
}

export default function Warranty() {
  const router = useRouter();

  return (
    <div className="shipping">
      <Box className="section-navbar-container section-container-breadcrumb">
        <Container maxWidth="md">
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick}>
              Home
            </Link>
            <Typography color="textPrimary">Warranty</Typography>
          </Breadcrumbs>
        </Container>
      </Box>
      <Box className="section-container" style={{ marginBottom: "0" }}>
        <Container maxWidth="md">
          <div style={{ textAlign: "left" }}>
            <h3 className="section-title">Warranty Information</h3>
            <p className="section-content" style={{ marginBottom: "32px" }}>
              All products and accessories purchased from Westshade Canopy &
              Umbrellas are covered by manufacture’s default defects only,
              defined as products and other merchandise either defective or
              damaged upon unpackaging of merchandise. Packages are checked
              thoroughly and inspected at facility for final inspection.
            </p>
            <p className="section-content">
              Warranty does not cover products and accessories for:
            </p>
            <ul
              className="section-content"
              style={{ marginLeft: "10px", marginBottom: "24px" }}
            >
              <li>Merchandise Damaged by Improper Usage.</li>
              <li>
                Merchandise caused by Harmful Weather Conditions (Please use
                your canopy for it’s respective weather resistant capability).
              </li>
              <li>
                Merchandise Damaged by Improper Set-Up (Please follow
                instructions carefully provided).
              </li>
              <li>
                Merchandise Damaged caused by Transportation (Please seek out
                third-party shipping service for transit damage claims).
              </li>
            </ul>
            <p className="section-content">
              Please contact our customer support team for consultation or any
              questions you may have regarding our warranty policy.
            </p>
          </div>
        </Container>
      </Box>
      <Box
        className="section-container"
        style={{ marginTop: "0", marginBottom: "0" }}
      >
        <Container maxWidth="md">
          <div style={{ textAlign: "left" }}>
            <h3 className="section-title">Warranty Timeline Coverage</h3>
          </div>
          <Grid container>
            <Grid item>
              <List>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Y5 Frame"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 Year"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Y6 Frame"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"5 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Y7 Frame"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"10 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Y5 Cover Top"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 Year"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Y6 Cover Top"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 Year"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Y7 Cover Top"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"1 Year"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Delicate Standard Umbrella Frame"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"3 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Delicate Standard Umbrella Cover"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"5 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Deluxe Professional Umbrella Frame"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"3 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Deluxe Professional Umbrella Cover"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"5 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Oversized Commercial Market Umbrella Frame"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"3 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Oversized Commercial Market Umbrella Cover"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"5 Years"}
                  />
                </ListItem>
                <ListItem className="section-canopy-tent-listItem" divider>
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"Accessories"}
                  />
                  <ListItemText
                    className="section-canopy-tent-listItem-content"
                    secondary={"3 Months"}
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="section-container">
        <Container maxWidth="md">
          <div style={{ textAlign: "left" }}>
            <h3 className="section-title">Liability Notice</h3>
            <p className="section-content">
              Under no circumstances should a damaged product be used. Damaged
              products should be immediately packed up and removed. In
              purchasing any product from Westshade Canopy, you agree to not
              hold Westshade Canopy, Westshade Canopy representatives &
              Westshade Canopy directors liable for any damage or injury caused
              by Westshade Canopy products. This limitation applies to damage or
              injury caused by both new, functional or damaged products. In
              purchasing from Westshade Canopy, you also agree to not hold
              Westshade Canopy, Westshade Canopy representatives & Westshade
              Canopy directors liable for any loss, damage or injury that may
              arise because of a product arriving faulty, incomplete, incorrect,
              or late.
            </p>
          </div>
        </Container>
      </Box>
    </div>
  );
}
