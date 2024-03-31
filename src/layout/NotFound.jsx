import { useNavigate } from 'react-router'
import { Typography, Box, styled, Button } from '@mui/material'
import { NotFoundImage } from '../assets/images'

const NotFound = () => {
   const navigate = useNavigate()

   const goBackHandler = () => navigate(-1)

   return (
      <StyledContainer>
         <img src={NotFoundImage} alt="404" />

         <Box className="text-content">
            <Typography variant="h2">Ooops...</Typography>

            <Typography variant="h4">Page not Found</Typography>

            <Typography>
               The page you are looking for doesnt exist or an other error
               occurred, go back to home page.
            </Typography>

            <Button className="go-back" onClick={goBackHandler}>
               GO BACK
            </Button>
         </Box>
      </StyledContainer>
   )
}

export default NotFound

const StyledContainer = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-around',
   width: '100%',
   height: '100vh',

   '& > .text-content': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      width: '25rem',
      textAlign: 'right',

      '& > h2': {
         fontWeight: 'bold',
         color: '#1b2e35',
      },

      '& > h4': {
         color: '#1f54d2',
      },

      '& > .go-back': {
         padding: '0.5rem',
         width: '30%',
         borderRadius: '1rem',
         border: '3px solid #1f54d2',
         textAlign: 'right',
         margin: 'auto',
         marginRight: '0rem',
         backgroundColor: '#1f54d2',
         fontWeight: 'bold',
         fontFamily: 'Poppins',
         textDecoration: 'none',
         color: 'white',

         '&:hover': {
            backgroundColor: 'white',
            border: '3px solid #1f54d2',
            color: '#1f54d2',
         },
      },
   },

   '& > img': {
      width: '35rem',
   },
}))
