/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
    return {
        mode: theme?.customization?.navType,
        common: {
            black: theme.colors?.darkPaper
        },
        primary: {
            light: theme.colors?.primary100,
            main: theme.colors?.primary500,
            dark: theme.colors?.primary600,
            200: theme.colors?.primary200,
            800: theme.colors?.primary800
        },
        secondary: {
            light: theme.colors?.primary100,
            main: theme.colors?.primary300,
            dark: theme.colors?.primary500,
            200: theme.colors?.primary200,
            800: theme.colors?.primary800
        },
        error: {
            light: theme.colors?.errorLight,
            main: theme.colors?.errorMain,
            dark: theme.colors?.errorDark
        },
        orange: {
            light: theme.colors?.orangeLight,
            main: theme.colors?.orangeMain,
            dark: theme.colors?.orangeDark
        },
        warning: {
            light: theme.colors?.warningLight,
            main: theme.colors?.warningMain,
            dark: theme.colors?.warningDark
        },
        success: {
            light: theme.colors?.successLight,
            200: theme.colors?.success200,
            main: theme.colors?.successMain,
            dark: theme.colors?.successDark
        },
        grey: {
            50: theme.colors?.grey50,
            100: theme.colors?.grey100,
            500: theme.darkTextSecondary,
            600: theme.heading,
            700: theme.darkTextPrimary,
            900: theme.textDark
        },
        dark: {
            light: theme.colors?.darkTextPrimary,
            main: theme.colors?.darkLevel1,
            dark: theme.colors?.darkLevel2,
            800: theme.colors?.darkBackground,
            900: theme.colors?.darkPaper
        },
        text: {
            primary: theme.darkTextPrimary,
            secondary: theme.darkTextSecondary,
            dark: theme.textDark,
            hint: theme.colors?.grey100
        },
        background: {
            paper: theme.paper,
            default: theme.backgroundDefault
        },
        status: {
            selected: theme.colors?.success600,
            rejected: theme.colors?.error600,
            expired: theme.colors?.expired600,
            sent: theme.colors?.sent600,
            onhold: theme.colors?.onhold600,
            waiting: theme.colors?.primary500,
            bgSelected: theme.colors?.success100,
            bgRejected: theme.colors?.error100,
            bgExpired: theme.colors?.expired100,
            bgSent: theme.colors?.sent100,
            bgOnhold: theme.colors.onhold100,
            bgWaiting: theme.colors?.primary100
        }
    };
}
