import {createTheme, createThemedUseStyletron, lightThemePrimitives, ThemeProvider} from "baseui";

const breakpoints = {
    small: 320,
    medium: 672,
    large: 1056,
    xlarge: 1312,
};

const themedUseStyletron = createThemedUseStyletron();

const responsiveTheme = Object.keys(breakpoints).reduce(
    (acc, key) => {
        acc.mediaQuery[key] = `@media screen and (min-width: ${breakpoints[key]}px)`;
        return acc;
    },
    {breakpoints, mediaQuery: {}}
);

export default function Container({children}) {
    const [css, theme] = themedUseStyletron();
    const customTheme = createTheme(lightThemePrimitives, {...theme, ...responsiveTheme});

    return (
        <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    )
}
