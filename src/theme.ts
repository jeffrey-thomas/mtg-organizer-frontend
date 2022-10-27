import { createTheme } from '@mui/material/styles' 

export const theme = createTheme({
  palette: {
    primary: {
      main: '#4d1010',
      contrastText: '#d9d9d9',
    },
    secondary: {
      main: '#f5cc00',
    },
    background: {
      default: '#fafaf0',
      paper: '#f0f0e0',
    },
  },
    typography:{
      fontFamily:"'Raleway', sans-serif",
      fontSize:16,
      subtitle1:{
        fontWeight:600
      },
      subtitle2:{
        fontWeight:550
      },
      h6:{
        fontWeight:700,
        p:'5px'
      },
      h5:{
        fontWeight:700,
        p:'5px'
      },
      body2:{
        fontSize:'0.75rem'
      }
    }

});