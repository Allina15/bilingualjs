import { ThemeProvider, createTheme } from '@mui/material'

const theme = createTheme({
   palette: {
      primary: {
         main: '#3A10E5',
         white: '#ffffff',
         blackGrey: '#23212A',
         dullBlue: '#3752B4',
      },

      secondary: {
         main: '#FEF5E8',
         darkGrey: '#262626',
         mediumGray: '#666CA7',
         orange: '#FE9102',
      },

      linear: {
         main: 'linear-gradient(270deg, #C23677 0%, #C5397A 27.92%, #C43879 64.37%, #BB2E6F 100%)',
      },
   },
})

const Themes = ({ children }) => (
   <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

export default Themes
