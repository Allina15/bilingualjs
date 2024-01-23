import { styled } from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { INFO } from '../../utils/constants'
import { SlickNext, SlickPrev } from '../../assets/icons'

const PrevArrow = ({ onClick, className }) => (
   <SlickPrev onClick={onClick} className={className} />
)
const NextArrow = ({ onClick, className }) => (
   <SlickNext onClick={onClick} className={className} />
)

const CheckOut = () => {
   const settings = {
      dots: true,
      infinite: true,
      lazyLoad: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: 0,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />,
   }

   return (
      <StyledContainer>
         <StyledHeading>Check out each question type</StyledHeading>

         <StyledContent>
            <StyledSlider {...settings}>
               {INFO.map(({ id, background, titleColor, title, text, img }) => (
                  <StyledCard key={id} background={background}>
                     <StyledText>
                        <StyledTitle titleColor={titleColor}>
                           {title}
                        </StyledTitle>
                        <StyledDescription>{text}</StyledDescription>
                     </StyledText>
                     <StyledImageContent>
                        <StyledImage src={img} alt="globus" />
                     </StyledImageContent>
                  </StyledCard>
               ))}
            </StyledSlider>
         </StyledContent>
      </StyledContainer>
   )
}

export default CheckOut

const StyledContainer = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   margin: 'auto',
}))

const StyledContent = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   gap: '3rem',
}))

const StyledHeading = styled('p')(() => ({
   color: '#3752B4',
   fontFamily: 'Gilroy',
   fontSize: '2.5rem',
   fontWeight: '700',
   textAlign: 'center',
}))

const StyledCard = styled('div')(({ background, theme }) => ({
   width: ' 64.25rem',
   height: '27.5rem',
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   gap: '1.62rem',
   borderRadius: '4.375rem 4.375rem 4.375rem 0rem',
   backgroundColor: background,
   padding: '2.88rem 2.75rem',
   boxShadow: '11px 16px 20px 0px rgba(0, 0, 0, 0.30)',

   [theme.breakpoints.down('lg')]: {
      width: '30rem',
   },
}))

const StyledText = styled('div')(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '1.61rem',
}))

const StyledTitle = styled('h1')(({ titleColor, theme }) => ({
   width: '31.75431rem',
   height: '6.63531rem',
   color: titleColor,
   fontFamily: 'Gilroy',
   fontSize: '2.375rem',
   fontWeight: '700',

   [theme.breakpoints.down('lg')]: {
      fontSize: '2.200rem',
      width: '30rem',
   },
}))

const StyledDescription = styled('p')(({ theme }) => ({
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
}))

const StyledImageContent = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'flex-end',
   marginTop: '-21rem',
}))

const StyledImage = styled('img')(() => ({
   width: '16.40763rem',
   height: '19.965rem',
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
      left: '40rem',
      top: '2.8rem',
      width: '3.75rem',
      height: '3.75rem',

      [theme.breakpoints.down('lg')]: {
         left: '35rem',
      },
   },

   '& .slick-prev': {
      position: 'relative',
      left: '26rem',
      top: '36.200rem',
      width: '3.75rem',
      height: '3.75rem',

      [theme.breakpoints.down('lg')]: {
         left: '21.8rem',
      },
   },

   '& .slick-next:hover, .slick-prev:hover': {
      content: 'none',
      circle: {
         fill: '#3A10E5',
      },

      path: {
         fill: '#fff',
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
      },

      '& li > button': {
         height: '20px',
         background: '#d7c7e8',
         borderRadius: '5px',
         width: '100%',
         transition: 'all 1s',
      },
      '& li > button:before': {
         color: 'transparent',
      },

      '& .slick-active': {
         height: '50px',
      },

      '& .slick-active > button': {
         background: '#3A10E5',
         height: '100%',
      },
   },
}))