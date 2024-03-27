import Slider from 'react-slick'
import { styled, Box, Typography } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { PARTNERS } from '../../utils/constants/index'

const SETTINGS = {
   dots: false,
   arrows: false,
   infinite: true,
   slidesToShow: 4.65,
   slidesToScroll: 1,
   centerMode: true,
   centerPadding: '0px',
   autoplay: true,
   autoplaySpeed: 0,
   speed: 5000,
   cssEase: 'linear',
   responsive: [
      {
         breakpoint: 1024,

         settings: {
            slidesToShow: 3,
         },
      },

      {
         breakpoint: 768,

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

const Partners = () => (
   <StyledContainer>
      <Box className="box">
         <Typography className="title" variant="h2">
            Partners
         </Typography>

         <StyledSlider {...SETTINGS}>
            {PARTNERS.map(({ id, partner, name }) => (
               <Box key={id} className="slide">
                  <Box className="image-box">
                     <img src={partner} alt={name} />
                  </Box>
               </Box>
            ))}
         </StyledSlider>
      </Box>
   </StyledContainer>
)

export default Partners

const StyledContainer = styled(Box)(({ theme }) => ({
   backgroundColor: '#FEF5E8',
   padding: '30px 0 120px',

   '& > .box': {
      maxWidth: '1600px',
      margin: '0 auto',

      '& > .title': {
         color: theme.palette.primary.dullBlue,
         fontSize: '2.5rem',
         textAlign: 'center',
         padding: '2.5rem',
         fontFamily: 'Gilroy',
         background: theme.palette.secondary.main,
      },
   },
}))

const StyledSlider = styled(Slider)(({ theme }) => ({
   background: theme.palette.secondary.main,

   '& .slick-slide': {
      outline: 'none',
   },

   '& .slide': {
      display: 'flex',
      justifyContent: 'center',

      '& > .image-box': {
         margin: '0.9375rem',
         width: '15.9375rem',
         height: '7.875rem',
         overflow: 'hidden',
         borderRadius: '1.25rem',
         border: '1px solid #E4E4E4',
         background: theme.palette.primary.white,
         display: 'inline-flex',

         '& > img': {
            width: '10.9375rem',
            height: '5.375rem',
            objectFit: 'contain',
            objectPosition: 'center',
            margin: 'auto',
         },
      },
   },
}))
