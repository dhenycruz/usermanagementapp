import { ThemeProvider } from 'styled-components';

const background = '#5f00db39';

const values = {
  colors: {
    background,
  },
};

export type ThemeType = typeof values;

export const Theme = ({ children }: any) => {
  return <ThemeProvider theme={ values }>{ children }</ThemeProvider>
};