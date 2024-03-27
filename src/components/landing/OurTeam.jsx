import Slider from 'react-slick'
import { Avatar, Typography, styled, Box } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { OUR_TEAM } from '../../utils/constants/index'

const SETTINGS = {
   infinite: true,
   arrows: false,
   speed: 5000,
   autoplay: true,
   autoplaySpeed: 0,
   cssEase: 'linear',
   pauseOnHover: true,
   variableWidth: true,

   responsive: [
      {
         breakpoint: 1024,

         settings: {
            slidesToShow: 3,
         },
      },

      {
         breakpoint: 600,

         settings: {
            slidesToShow: 2,
         },
      },

      {
         breakpoint: 480,

         settings: {
            slidesToShow: 1,
         },
      },
   ],
}

const OurTeam = () => (
   <StyledContainer>
      <Typography variant="h2" className="title">
         Our Team
      </Typography>

      <StyledSlider {...SETTINGS}>
         {OUR_TEAM.map(({ img, name, role, customStyle, id }) => (
            <Box className="slide" key={id}>
               <Box className="avatar-box">
                  <StyledAvatar src={img} sx={customStyle} />
               </Box>

               <Typography className="name">{name}</Typography>

               <Typography className="role">{role}</Typography>
            </Box>
         ))}
      </StyledSlider>
   </StyledContainer>
)

export default OurTeam

const baseTypographyStyles = {
   fontStyle: 'normal',
   lineHeight: '130%',
}

const StyledContainer = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.secondary.main,
   padding: '7.60rem 0',

   '& > .title': {
      fontSize: '2.5rem',
      color: theme.palette.primary.dullBlue,
      textAlign: 'center',
      fontFamily: 'Gilroy',
      paddingBottom: '2.94rem',
   },
}))

const StyledSlider = styled(Slider)(({ theme }) => ({
   width: '100%',
   maxWidth: '1600px',
   margin: '0 auto',
   outline: 'none',
   paddingLeft: '5%',
   paddingRight: '5%',

   '& .slick-slide': {
      marginRight: '32px',
   },

   '& .slide': {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      '& > .avatar-box': {
         width: '11.25rem',
         height: '11.25rem',
      },

      '& > .name': {
         ...baseTypographyStyles,
         color: theme.palette.primary.main,
         fontSize: '1rem',
         fontWeight: 600,
         marginTop: '0.88rem',
         textAlign: 'center',
      },

      '& > .role': {
         ...baseTypographyStyles,
         color: 'var(--black, #020202)',
         textAlign: 'center',
         fontSize: '0.875rem',
         fontWeight: 400,
      },
   },
}))

const StyledAvatar = styled(Avatar)(() => ({
   width: '100%',
   height: '100%',
   borderRadius: '0 0 0 2.5rem',
}))
