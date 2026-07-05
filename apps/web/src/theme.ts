import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#efe5ff',
    100: '#d4beff',
    200: '#b794ff',
    300: '#9b6aff',
    400: '#8040ff',
    500: '#6626e6',
    600: '#4f1db4',
    700: '#391482',
    800: '#230c51',
    900: '#0e0321',
  },
};

export const theme = extendTheme({ config, colors });
