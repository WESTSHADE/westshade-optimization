import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <div className={styles["container"]}>
      <div className={styles["top"]}>
        <p
          className={`${
            styles["sign-up-for-new-our-first-order-D0vwai"]
          } ${"roboto-normal-white-10px"}`}
        >
          Sign up for newsletter and get 10% off your first order
        </p>
        <div
          className={`${
            styles["x19495228111-D0vwai"]
          } ${"roboto-normal-white-8px"}`}
        >
          1.949.522.8111
        </div>
        <div
          className={`${
            styles["login-register-D0vwai"]
          } ${"roboto-normal-white-8px"}`}
        >
          Login/Register
        </div>
      </div>
      <div className={styles["main"]}>
        <div
          className={`${
            styles["westshade-9JQqQB"]
          } ${"roboto-normal-white-12px"}`}
        >
          Westshade
        </div>
        <div className={styles["frame-1-9JQqQB"]}>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Canopy Tent
          </div>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Custom Printing
          </div>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Medical Tent
          </div>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Market Umbrella
          </div>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Tilt Umbrella
          </div>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Cantilever Umbrella
          </div>
          <div
            className={`${
              styles["menu-text-xX2nsx"]
            } ${"roboto-normal-white-10px"}`}
          >
            Accessories
          </div>
        </div>
      </div>
      <img className={styles["group-3-0xy0vn"]} src="/group-3@1x.svg" />
    </div>
  );
}
