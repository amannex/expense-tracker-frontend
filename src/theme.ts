import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
    accent: {
      50: '#e6fbff',
      100: '#b3f1ff',
      200: '#80e8ff',
      300: '#4ddfff',
      400: '#1ad6ff',
      500: '#00c7ff', // secondary
      600: '#00a3d6',
      700: '#007fad',
      800: '#005b84',
      900: '#00375c',
    },
  },
  fonts: {
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: '#f6f8f7',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.50',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          boxShadow: '0 4px 12px rgba(15, 23, 42, 0.06)',
          overflow: 'hidden',
        },
      },
    },
  },
});

export default theme;