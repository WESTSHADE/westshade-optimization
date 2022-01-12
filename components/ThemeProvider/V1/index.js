import {BaseProvider, LightTheme, createTheme} from "baseui";

const breakpoints = {
    small: 480,
    medium: 960,
    large: 1280,
};

const ResponsiveTheme = Object.keys(breakpoints).reduce(
    (acc, key) => {
        acc.mediaQuery[key] = `@media screen and (min-width: ${breakpoints[key]}px)`;
        return acc;
    },
    {breakpoints, mediaQuery: {}}
);

const primitives = {
    primaryFontFamily: "Roboto",
};

const overrides = {
    typography: {
        MinXTitle14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 900, lineHeight: "18px"},
        MinXTitle16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 900, lineHeight: "20px"},
        MinXTitle18: {fontFamily: "Roboto", fontSize: "18px", fontWeight: 900, lineHeight: "22px"},
        MinXTitle20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 900, lineHeight: "28px"},
        MinXTitle24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 900, lineHeight: "32px"},
        MinXTitle26: {fontFamily: "Roboto", fontSize: "26px", fontWeight: 900, lineHeight: "34px"},
        MinXTitle28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 900, lineHeight: "36px"},
        MinXTitle32: {fontFamily: "Roboto", fontSize: "32px", fontWeight: 900, lineHeight: "40px"},
        MinXTitle36: {fontFamily: "Roboto", fontSize: "36px", fontWeight: 900, lineHeight: "42px"},
        MinXTitle40: {fontFamily: "Roboto", fontSize: "40px", fontWeight: 900, lineHeight: "44px"},
        MinXTitle42: {fontFamily: "Roboto", fontSize: "42px", fontWeight: 900, lineHeight: "46px"},
        MinXTitle44: {fontFamily: "Roboto", fontSize: "44px", fontWeight: 900, lineHeight: "52px"},
        MinXTitle48: {fontFamily: "Roboto", fontSize: "48px", fontWeight: 900, lineHeight: "54px"},
        MinXTitle52: {fontFamily: "Roboto", fontSize: "52px", fontWeight: 900, lineHeight: "56px"},
        MinXTitle64: {fontFamily: "Roboto", fontSize: "64px", fontWeight: 900, lineHeight: "80px"},
        MinXTitle74: {fontFamily: "Roboto", fontSize: "74px", fontWeight: 900, lineHeight: "80px"},
        // ========================
        MinXSubtitle10: {fontFamily: "Roboto", fontSize: "10px", fontWeight: 400, lineHeight: "12px"},
        MinXSubtitle12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "14px"},
        MinXSubtitle14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 400, lineHeight: "16px"},
        MinXSubtitle16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXSubtitle18: {fontFamily: "Roboto", fontSize: "18px", fontWeight: 500, lineHeight: "26px"},
        MinXSubtitle20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 500, lineHeight: "28px"},
        MinXSubtitle24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "32px"},
        MinXSubtitle28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 500, lineHeight: "36px"},
        MinXSubtitle46: {fontFamily: "Roboto", fontSize: "46px", fontWeight: 100, lineHeight: "58px"},
        // ========================
        MinXHeading12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "12px"},
        MinXHeading14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXHeading17: {fontFamily: "Roboto", fontSize: "17px", fontWeight: 500, lineHeight: "26px"},
        MinXHeading18: {fontFamily: "Roboto", fontSize: "18px", fontWeight: 500, lineHeight: "18px"},
        MinXHeading19: {fontFamily: "Roboto", fontSize: "19px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 700, lineHeight: "28px"},
        MinXHeading24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "22px"},
        MinXHeading26: {fontFamily: "Roboto", fontSize: "26px", fontWeight: 500, lineHeight: "28px"},
        MinXHeading28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 700, lineHeight: "36px"},
        MinXHeading30: {fontFamily: "Roboto", fontSize: "30px", fontWeight: 700, lineHeight: "38px"},
        MinXHeading32: {fontFamily: "Roboto", fontSize: "32px", fontWeight: 700, lineHeight: "40px"},
        MinXHeading36: {fontFamily: "Roboto", fontSize: "36px", fontWeight: 700, lineHeight: "48px"},
        MinXHeading44: {fontFamily: "Roboto", fontSize: "44px", fontWeight: 700, lineHeight: "52px"},
        MinXHeading48: {fontFamily: "Roboto", fontSize: "48px", fontWeight: 700, lineHeight: "56px"},
        MinXHeading64: {fontFamily: "Roboto", fontSize: "64px", fontWeight: 700, lineHeight: "80px"},
        // ========================
        MinXParagraph12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 400, lineHeight: "16px"},
        MinXParagraph14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 400, lineHeight: "20px"},
        MinXParagraph16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 400, lineHeight: "24px"},
        MinXParagraph20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 400, lineHeight: "28px"},
        MinXParagraph24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 400, lineHeight: "32px"},
        // ========================
        MinXLabel12: {fontFamily: "Roboto", fontSize: "12px", fontWeight: 500, lineHeight: "16px"},
        MinXLabel14: {fontFamily: "Roboto", fontSize: "14px", fontWeight: 500, lineHeight: "22px"},
        MinXLabel16: {fontFamily: "Roboto", fontSize: "16px", fontWeight: 500, lineHeight: "24px"},
        MinXLabel20: {fontFamily: "Roboto", fontSize: "20px", fontWeight: 500, lineHeight: "28px"},
        MinXLabel24: {fontFamily: "Roboto", fontSize: "24px", fontWeight: 500, lineHeight: "32px"},
        MinXLabel26: {fontFamily: "Roboto", fontSize: "26px", fontWeight: 500, lineHeight: "34px"},
        MinXLabel28: {fontFamily: "Roboto", fontSize: "28px", fontWeight: 500, lineHeight: "36px"},
        MinXLabel32: {fontFamily: "Roboto", fontSize: "32px", fontWeight: 500, lineHeight: "40px"},
        MinXLabel40: {fontFamily: "Roboto", fontSize: "40px", fontWeight: 500, lineHeight: "40px"},
        MinXLabel48: {fontFamily: "Roboto", fontSize: "48px", fontWeight: 500, lineHeight: "48px"},
        MinXLabel64: {fontFamily: "Roboto", fontSize: "64px", fontWeight: 500, lineHeight: "64px"},
    },
    colors: {
        Test: "red",
        MinXTitle: "#262626",
        MinXPrimaryText: "#262626",
        MinXPrimaryTextAlt: "white",
        MinXSecondaryText: "#8C8C8C",
        MinXSecondaryTextAlt: "white",
        MinXDisable: "#BFBFBF",
        MinXBorder: "#D9D9D9",
        MinXDividers: "#F0F0F0",
        MinXBackground: "#F7F7F7",
        MinXTableHeader: "#FAFAFA",
        MinXButton: "#23A4AD",
        MinXButtonBackground: "#F5FCFC",
        MinXButtonHover: "#5FBDBE",
        MinXButtonActive: "#43878C",
    },
};

export default function Container({children}) {
    const theme = createTheme(primitives, overrides);
    const customTheme = {...LightTheme, ...theme, ...ResponsiveTheme};

    return (
        <BaseProvider theme={customTheme}>{children}</BaseProvider>
    )
}
