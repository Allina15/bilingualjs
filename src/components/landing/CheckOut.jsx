import Slider from 'react-slick'
import { Box, Typography, styled } from '@mui/material'
import { SlickNextIcon, SlickPrevIcon } from '../../assets/icons'
import { CHECK_OUT } from '../../utils/constants'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const PrevArrow = ({ onClick, className }) => (
   <SlickPrevIcon onClick={onClick} className={className} />
)

const NextArrow = ({ onClick, className }) => (
   <SlickNextIcon onClick={onClick} className={className} />
)

const SETTINGS = {
   dots: true,
   infinite: true,
   lazyLoad: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   centerMode: true,
   centerPadding: 0,
   autoplay: true,
   nextArrow: <NextArrow />,
   prevArrow: <PrevArrow />,
}

const CheckOut = () => (
   <StyledContainer>
      <Typography className="title" variant="h2">
         Check out each question type
      </Typography>

      <Box className="slider-box">
         <StyledSlider {...SETTINGS}>
            {CHECK_OUT.map(
               ({ id, background, titleColor, title, text, image }) => (
                  <StyledSlide
                     key={id}
                     background={background}
                     titlecolor={titleColor.toString()}
                  >
                     <Box className="texts-box">
                        <Typography className="title" variant="h1">
                           {title}
                        </Typography>

                        <Typography className="description">{text}</Typography>
                     </Box>

                     <Box className="image-box">
                        <img src={image} alt="globus" />
                     </Box>
                  </StyledSlide>
               )
            )}
         </StyledSlider>
      </Box>
   </StyledContainer>
)

export default CheckOut

const StyledContainer = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   margin: 'auto',
   background: theme.palette.secondary.main,
   padding: '2rem',

   '& > .title': {
      color: theme.palette.primary.dullBlue,
      fontFamily: 'Gilroy',
      fontSize: '2.5rem',
      fontWeight: '700',
      textAlign: 'center',
   },

   '& > .slider-box': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '3rem',
   },
}))

const StyledSlider = styled(Slider)(({ theme }) => ({
   '& .slick-track': {
      display: 'flex',
      gap: '7rem',
      padding: '0 0 35px 0',
   },

   '& .slick-slide:not(.slick-center)': {
      transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
      transform: 'scale(0.8)',
      opacity: '0.8',
   },

   '& .slick-slide.slick-center': {
      transform: 'scale(1) ease-in-out',
      opacity: '1',
   },

   '& .slick-list': {
      width: '72rem',
      borderRadius: '1rem',

      [theme.breakpoints.down('lg')]: {
         width: '62.625rem',
      },
   },

   '& .slick-arrow': {
      cursor: 'pointer',
      zIndex: 11,
      position: 'relative',
      top: '200px',
   },

   '& .slick-next': {
      position: 'relative',
      left: '41rem',
      top: '2.76rem',
      width: '3.75rem',
      height: '3.90rem',

      [theme.breakpoints.down('lg')]: {
         left: '35rem',
      },
   },

   '& .slick-prev': {
      position: 'relative',
      left: '25rem',
      top: '36.200rem',
      width: '3.75rem',
      height: '3.75rem',

      [theme.breakpoints.down('lg')]: {
         left: '21.8rem',
      },
   },

   '& .slick-next:hover, .slick-prev:hover': {
      content: 'none',

      '& circle': {
         fill: theme.palette.primary.main,
      },

      '& path': {
         fill: theme.palette.primary.white,
      },
   },

   '& .slick-dots': {
      bottom: '0rem',
      right: '1rem',
      display: 'flex !important',
      justifyContent: 'center',
      alignItems: 'flex-end',

      '& li': {
         width: '7px',
         transition: 'all 500ms',

         '& > button': {
            height: '20px',
            background: '#d7c7e8',
            borderRadius: '5px',
            width: '100%',
            transition: 'all 1s',

            '&:before': {
               color: 'transparent',
               content: "''",
            },
         },
      },

      '& .slick-active': {
         height: '50px',

         '& > button': {
            background: theme.palette.primary.main,
            height: '100%',
         },
      },
   },
}))

const StyledSlide = styled(Box)(({ titlecolor, background, theme }) => ({
   width: ' 64.25rem',
   height: '27.5rem',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   cursor: 'pointer',
   gap: '1.62rem',
   borderRadius: '4.375rem 4.375rem 4.375rem 0rem',
   backgroundColor: background,
   padding: '2.88rem 2.75rem',
   boxShadow: '11px 16px 20px 0px rgba(0, 0, 0, 0.30)',

   [theme.breakpoints.down('lg')]: {
      width: '30rem',
   },

   '& .texts-box': {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.61rem',

      '& > .title': {
         width: '31.75431rem',
         height: '6.63531rem',
         color: titlecolor,
         fontFamily: 'Gilroy',
         fontSize: '2.375rem',
         fontWeight: '700',

         [theme.breakpoints.down('lg')]: {
            fontSize: '2.200rem',
            width: '30rem',
         },
      },

      '& > .description': {
         width: '36.1875rem',
         color: theme.palette.primary.white,
         fontSize: '1.5rem',
         fontFamily: 'Poppins',
         fontWeight: '400',
         marginBottom: '6rem',

         [theme.breakpoints.down('lg')]: {
            fontSize: '1.4rem',
            width: '34rem',
         },
      },
   },

   '& > .image-box': {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '-21rem',

      '& > img': {
         width: '16.40763rem',
         height: '19.965rem',
      },
   },
}))
