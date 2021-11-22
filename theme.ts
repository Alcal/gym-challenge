import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {

  interface Palette {
    c1: Palette['primary'];
    c2: Palette['primary'];
    c3: Palette['primary'];
    c4: Palette['primary'];
    c5: Palette['primary'];
    c6: Palette['primary'];
    c7: Palette['primary'];
  }
  interface PaletteOptions {
    c1: PaletteOptions['primary'];
    c2: PaletteOptions['primary'];
    c3: PaletteOptions['primary'];
    c4: PaletteOptions['primary'];
    c5: PaletteOptions['primary'];
    c6: PaletteOptions['primary'];
    c7: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#ff7f66' },
    secondary: { main: '#677cc7' },
    c1: { main: '#E4593F', contrastText: '#fff' },
    c2: { main: '#2EA757', contrastText: '#fff' },
    c3: { main: '#493A9E', contrastText: '#fff' },
    c4: { main: '#FF7E66', contrastText: '#fff' },
    c5: { main: '#BC3E9D', contrastText: '#fff' },
    c6: { main: '#B0DB2A', contrastText: '#fff' },
    c7: { main: '#E7AE2C', contrastText: '#fff' },
  },
});

export default theme