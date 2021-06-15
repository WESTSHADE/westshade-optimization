import Link from "next/link";
import styles from "./section.module.css";

import { Box, Container } from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Section_Easy_Set_Up() {
  return (
    <Box className="section-container">
      <h3
        className="section-title"
        style={{ fontSize: "2.125rem", lineHeight: "2.25rem" }}
      >
        Easy set up. Even easier to disassemble.
      </h3>
      <p
        className="section-content"
        style={{ marginBottom: "20px", paddingBottom: "12px" }}
      >
        Our patio canopy tents tents are designed to fold up and expand quickly
        and easily.
        <br />
        The tent can be fully assembled by 2 people in 45 seconds.
      </p>
      <Container maxWidth="md">
        <img
          className="section-image"
          style={{ padding: "8px" }}
          src="/set-up@1x.png"
        />
      </Container>
      <p
        className="section-content"
        style={{ marginTop: "22px", marginBottom: "30px" }}
      >
        Follow us on social media to stay up to date with our canopy tent news
        and special offers!
      </p>
      <div className={styles["social-group-container"]}>
        <Link href="https://www.facebook.com/Westshadeus/">
          <div
            className={`${styles["social-container"]} ${styles["facebook"]}`}
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
          </div>
        </Link>
        <Link href="https://www.youtube.com/c/Westshade/featured">
          <div className={`${styles["social-container"]} ${styles["youtube"]}`}>
            <FontAwesomeIcon icon={faYoutube} size="2x" color="white" />
          </div>
        </Link>
        <Link href="https://www.instagram.com/westshadeus/">
          <div
            className={`${styles["social-container"]} ${styles["instagram"]}`}
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
          </div>
        </Link>
        <Link href="https://twitter.com/westshadeus">
          <div className={`${styles["social-container"]} ${styles["twitter"]}`}>
            <FontAwesomeIcon icon={faTwitter} size="2x" color="white" />
          </div>
        </Link>
      </div>
    </Box>
  );
}
