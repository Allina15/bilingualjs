import { Typography, styled, IconButton, Box } from '@mui/material'
import FAQ from '../components/landing/FAQ'
import { FooterLogoImage } from '../assets/images'
import { FacebookIcon, InstagramIcon, YouTubeIcon } from '../assets/icons'

const Footer = () => (
   <StyledContainer>
      <Box className="box">
         <FAQ />

         <StyledFooter>
            <img src={FooterLogoImage} alt="logo" className="logo" />

            <Box>
               <IconButton href="https://www.youtube.com/@peaksofthouse2429">
                  <img src={YouTubeIcon} alt="youtube" className="youtube" />
               </IconButton>

               <IconButton href="https://ru-ru.facebook.com/">
                  <FacebookIcon />
               </IconButton>

               <IconButton href="https://www.instagram.com/peaksoft.house/">
                  <InstagramIcon />
               </IconButton>
            </Box>
         </StyledFooter>

         <Typography className="reserved">
            © Copyright PeakSoft. All Rights Reserved
         </Typography>
      </Box>
   </StyledContainer>
)

export default Footer

const StyledContainer = styled(Box)(() => ({
   background: '#262626',

   '& > .box': {
      maxWidth: '1600px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      padding: '120px 0 12px 0',

      '& > .reserved': {
         color: '#98A2B3',
         fontSize: '0.875rem',
         lineHeight: '1.5rem',
         fontWeight: '400',
         fontFamily: 'Poppins',
      },
   },
}))

const StyledFooter = styled(Box)(() => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'space-between',
   color: '#FFF',
   fontSize: '1rem',
   padding: '2rem 30px',
   textAlign: 'center',
   width: '100%',

   '& .logo': {
      width: '12.06763rem',
      height: '2.875rem',
   },

   '& .icon-button': {
      width: '3.5rem',
      height: '4.5rem',
   },

   '& .youtube': {
      width: '2rem',
      borderRadius: '2rem',
      margin: '0.10rem 0 0 0 ',
   },
}))
