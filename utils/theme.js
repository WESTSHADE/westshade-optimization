import {createThemedUseStyletron} from "baseui";

export const themedUseStyletron = createThemedUseStyletron();

const breakpoints = {
    small: 320,
    medium: 672,
    large: 1056,
};

export const responsiveTheme = Object.keys(breakpoints).reduce(
    (acc, key) => {
        acc.mediaQuery[key] = `@media screen and (min-width: ${breakpoints[key]}px)`;
        return acc;
    },
    {breakpoints, mediaQuery: {}}
);