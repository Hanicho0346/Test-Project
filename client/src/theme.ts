import { extendTheme } from '@chakra-ui/react';

export const tokens = {
  gray: {
    50: "#f4f5f4",
    100: "#e4e5e4",
    200: "#cfd1cf",
    300: "#b8bbb8",
    400: "#a1a3a1",
    500: "#8a8b8a",
    600: "#707271",
    700: "#575958",
    800: "#3e3f3e",
    900: "#292a29",
  },
  primary: {
    50: "#f7f8f7",
    100: "#ebeceb",
    200: "#d4d6d4",
    300: "#bcc0bd",
    400: "#a5aaa7",
    500: "#8e9391",
    600: "#737876",
    700: "#5a5f5d",
    800: "#424745",
    900: "#292d2c",
  },
  secondary: {
    50: "#f8f9f8",
    100: "#ebeeec",
    200: "#d5d8d5",
    300: "#bec2be",
    400: "#a8aca8",
    500: "#919491",
    600: "#777979",
    700: "#5e605e",
    800: "#464946",
    900: "#2e302e",
  },
  tertiary: {
    50: "#f5f6f5",
    100: "#e5e7e5",
    200: "#ced1cf",
    300: "#b6bab7",
    400: "#9ea29f",
    500: "#868986",
    600: "#6b706b",
    700: "#525652",
    800: "#3a3e3a",
    900: "#232523",
  },
  background: {
    light: "#2d2d34",
    main: "#1f2026",
  },
};

const themeSettings = {
  colors: {
    gray: tokens.gray,
    primary: tokens.primary,
    secondary: tokens.secondary,
    tertiary: tokens.tertiary,
    background: tokens.background,
  },
  fonts: {
    body: ['Inter', 'sans-serif'].join(','),
    heading: ['Inter', 'sans-serif'].join(','),
    mono: 'Menlo, monospace', // Add a default font for monospace
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  fontSizes: {
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '20px',
    '3xl': '24px',
    '4xl': '28px',
  },
  typography: {
    h1: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: '28px',
      fontWeight: 700,
      color: tokens.primary[500],
    },
    h2: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: '24px',
      fontWeight: 500,
      color: tokens.secondary[500],
    },
    h3: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: '20px',
      fontWeight: 500,
      color: tokens.tertiary[500],
    },
    h4: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: '18px',
      fontWeight: 400,
      color: tokens.gray[700],
    },
  },

};


const theme = extendTheme(themeSettings);

export default theme;
