import {extendTheme} from '@chakra-ui/react';

const theme = extendTheme({
  config: {initialColorMode: 'light', useSystemColorMode: false},
  colors: {
    'priority.high': '#E32C1E',
    'priority.medium': '#FF9800',
    'priority.low': '#24A148',

    checkBoxColor: {
      50: '#0065FF',
      100: '#0065FF',
      200: '#0065FF',
      300: '#0065FF',
      400: '#0065FF',
      500: '#0065FF',
      600: '#0065FF',
      700: '#0065FF',
      800: '#0065FF',
      900: '#0065FF',
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          borderColor: '#6B778C',
          _checked: {
            bg: '#0065FF',
            borderColor: '#0065FF',
          },
        },
      },
    },
  },
});

export default theme;
