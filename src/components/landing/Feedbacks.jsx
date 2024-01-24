import { useState } from 'react'
import { Box, Rating, Typography, styled } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FEEDBACKS } from '../../utils/constants'
import {
   NextArrowIcon,
   PaginationActiveIcon,
   PaginationIcon,
   PrevArrowIcon,
} from '../../assets/icons'

const PrevArrow = ({ onClick, className }) => (
   <PrevArrowIcon onClick={onClick} className={className} />
)

const NextArrow = ({ onClick, className }) => (
   <NextArrowIcon onClick={onClick} className={className} />
)

const Feedbacks = () => {
   const [index, setIndex] = useState(0)

   const paginatonActive = (i) =>
      i === index ? <PaginationActiveIcon /> : <PaginationIcon />

   const settings = {
      focusOnSelect: true,
      className: 'center',
      centerMode: true,
      centerPadding: 0,
      infinite: true,
      slidesToShow: 3,
      speed: 300,
      autoplaySpeed: 3000,
      dots: true,
      rtlMode: true,
      autoplay: true,
      customPaging: (i) => paginatonActive(i),
      swipeToSlide: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
      beforeChange: (next) => setIndex(next),
      afterChange: (current) => setIndex(current),
   }

   return (
      <StyledContainer>
         <Typography className="title">Why people love Bilingual</Typography>

         <Box className="slider-box">
            <StyledSlider {...settings}>
               {FEEDBACKS.map(
                  ({ id, name, description, rating, avatar }, dataIndex) => (
                     <StyledSlide key={id} isActive={dataIndex === index}>
                        <img src={avatar} alt={name} />

                        <Typography>{description}</Typography>

                        <Typography variant="h4">{name}</Typography>

                        <Rating value={rating} readOnly />
                     </StyledSlide>
                  )
               )}
            </StyledSlider>
         </Box>
      </StyledContainer>
   )
}

export default Feedbacks

const StyledContainer = styled(Box)({
   display: 'flex',
   backgroundColor: '#FEF5E8',
   backgroundSize: 'cover',
   backgroundRepeat: 'no-repeat',
   flexDirection: 'column',

   '& > .title': {
      color: '#3752B4',
      fontFamily: 'Gilroy',
      fontSize: '2.5rem',
      fontWeight: 700,
      textAlign: 'center',
      paddingBottom: '1rem',

      '@media screen and (max-width: 1200px)': {
         fontSize: '2rem',
         paddingBottom: '0.2rem',
      },
   },

   '& .slider-box': {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '120px',
      overflow: 'hidden',
      maxWidth: '1400px',
      margin: 'auto',
   },
})

const StyledSlider = styled(Slider)(({ theme }) => ({
   padding: '0 30px',
   display: 'grid',
   gridTemplateColumns: 'repeat(3, auto)',
   gridTemplateRows: 'repeat(1, auto)',
   alignItems: 'center',
   justifyItems: 'center',
   gridAutoFlow: 'dense',
   position: 'relative',

   '& .slick-slide': {
      transition: 'transform 2s ease',
   },

   '& .slick-center, .slick-center h4': {
      color: 'white',
   },

   '& h4': {
      position: 'absolute',
      bottom: '4.5rem',
      left: '50%',
      transform: 'translateX(-50%)',
      color: theme.palette.primary.main,
      fontSize: '1rem',
      fontWeight: 600,
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
   },

   '& .MuiRating-root': {
      display: 'flex',
      justifyContent: 'center',
      position: 'absolute',
      bottom: '4rem',
      left: '50%',
      transform: 'translateX(-50%)',
   },

   '& .slick-slide:not(.slick-center)': {
      transform: 'scale(0.8)',
      opacity: '0.8',
   },

   '& .slick-slide.slick-center': {
      transform: 'scale(1)',
      opacity: '1',
   },

   '& .slick-track': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingTop: '50px',
   },

   '& .slick-list': {
      width: '80%',
      height: '760px',
      overflow: 'hidden',
      padding: '50px',
   },

   '& .slick-arrow': {
      display: 'flex',
      alignItems: 'center',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      cursor: 'pointer',
   },

   '& .slick-prev': {
      display: 'flex',
      justifyContent: 'flex-end',
      marginLeft: '8rem',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      cursor: 'pointer',
      top: '20rem',

      '@media screen and (max-width: 1200px)': {
         top: '18rem',
         width: '50px',
         height: '50px',
      },
   },

   '& .slick-next': {
      display: 'flex',
      justifyContent: 'flex-start',
      marginRight: '8rem',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      cursor: 'pointer',
      top: '20rem',

      '@media screen and (max-width: 1200px)': {
         top: '18rem',
         width: '50px',
         height: '50px',
      },
   },

   '& .slick-next:hover,.slick-prev:hover': {
      content: 'none',
      circle: {
         fill: '#3A10E5',
      },
      path: {
         fill: '#fff',
      },
   },

   '& .slick-dots': {
      bottom: '4.5rem',
      direction: 'rtl',

      '& li': {
         position: 'relative',
         display: 'inline-block',
         width: '20px',
         height: '20px',
         padding: 0,
         margin: '-1rem',
         cursor: 'pointer',

         '@media screen and (max-width: 1200px)': {
            width: '10px',
            height: '10px',
            padding: 0,
            margin: 0,
            bottom: '7.8rem',
         },
      },
   },
}))

const StyledSlide = styled('div')(({ isActive }) => ({
   position: 'relative',
   textAlign: 'center',
   height: '35.25rem',
   maxHeight: '38.25rem',
   maxWidth: '22.875rem',
   cursor: 'pointer',
   background: isActive ? '#666CA7' : '#E5E5E5',
   transition: 'background 0.2s ease, transform 0.5s ease, filter 0.5s ease',
   borderRadius: '40px',

   '& .MuiTypography-root': {
      width: '19.125rem',
      margin: 'auto',
      paddingTop: '2.38rem',
   },

   '& .MuiRating-iconEmpty': {
      color: isActive ? 'white' : '#9A9A9A',
   },

   '& img': {
      width: isActive ? '16.25rem' : '11.25rem',
      height: isActive ? '16.25rem' : '11.25rem',
      borderRadius: '50%',
      margin: 'auto',
      marginTop: isActive ? '2rem' : '4.38rem',
      transition:
         'width 0.4s ease, height 0.4s ease, margin-top 0.4s ease, filter 0.8s ease',
      zIndex: 1,
   },

   '@media screen and (max-width: 1200px)': {
      maxWidth: '1200px',
      height: '29rem',
      transition: 'background 0.2s ease, transform 0.5s ease, filter 0.5s ease',
      position: 'relative',

      '& img': {
         maxWidth: '12rem',
         maxHeight: '12rem',
         borderRadius: '50%',
         margin: 'auto',
         marginTop: '2rem',
         transition:
            'width 0.4s ease, height 0.4s ease, margin-top 0.4s ease, filter 0.8s ease',
      },

      '& h4': {
         fontSize: '0.9rem',
         marginLeft: '-1rem',
         top: '21rem',
      },

      '& span': {
         fontSize: '1.2rem',
         top: '24rem',
         right: '6rem',
      },

      '& p': {
         fontSize: '0.8rem',
         maxWidth: '80%',
      },
   },
}))
