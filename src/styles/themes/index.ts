import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#18bc9c',
      light: '#e4f4f1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#000000',
    },
    error: {
      main: '#EC1B40',
    },
  },
  typography: {
    fontWeightBold: 800,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontFamily: 'Manrope',
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiToggleButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: '#18bc9c',
          background: '#ffffff',
          transition: 'all .2s',

          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
            color: '#ffffff',
            background: '#18bc9c',
          },
        },
      },
    },
  },
})
