import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Aos from 'aos'
import { motion } from 'framer-motion'
import { Box, Typography, keyframes, styled } from '@mui/material'
import LandingButton from '../UI/buttons/LandingButton'
import {
   BackgroundFirstLearnMoreIcon,
   FifthLearnMoreIcon,
   FirstLearnMoreIcon,
   FourthLearnMoreIcon,
   RoadmapIcon,
   SecondLearnMoreIcon,
   ThirdLearnMoreIcon,
} from '../../assets/icons'
import 'aos/dist/aos.css'
import { ROUTES } from '../../routes/routes'

const ROADMAPE_ANIMATE = keyframes`
        to  {
          stroke-dashoffset: 0;  
        } from {
          stroke-dashoffset: 300;
        }
`

const LearnMore = () => {
   const { isAuth } = useSelector((state) => state.auth)

   const navigate = useNavigate()

   const startHandler = () => {
      if (isAuth) navigate(ROUTES.USER.INDEX, { replace: true })
      else navigate(ROUTES.SIGN_IN)
   }

   useEffect(() => {
      Aos.init({
         easing: 'ease-in-quart',
         delay: 0,
         duration: 800,
      })
   }, [])

   return (
      <StyledContainer>
         <Box className="box">
            <Typography className="title" variant="h2">
               Learn More
            </Typography>

            <motion.div className="roadmap-box">
               <StyledRoadmapImage />
            </motion.div>

            <StyledTextBox>
               <Box data-aos="fade-right">
                  <StyledTitleText>Expand your applicant pool</StyledTitleText>

                  <StyledDescriptionText>
                     Tap into a diverse pool of candidates from 210+ countries
                     and territories of origin, who have taken the Bilingual
                     English Test because of its radical accessibility.
                  </StyledDescriptionText>
               </Box>

               <StyledGlobeImage />

               <StyledBackgroundFirstLearnMoreIcon />
            </StyledTextBox>

            <StyledTextBox>
               <Box>
                  <StyledImageOne />
               </Box>

               <Box data-aos="fade-left">
                  <StyledTitleText>
                     Built on the latest assessment sciencee
                  </StyledTitleText>

                  <StyledDescriptionText>
                     The Duolingo English Test is a computer adaptive test
                     backed by rigorous research, with results that are highly
                     correlated
                     <br />
                     with other major assessments such as the TOEFL and the
                     <br />
                     IELTS.
                  </StyledDescriptionText>
               </Box>
            </StyledTextBox>

            <StyledTextBox>
               <Box data-aos="fade-right">
                  <StyledTitleText>Innovative test security</StyledTitleText>

                  <StyledDescriptionText>
                     Industry-leading security protocols, individual test
                     proctoring, and computer adaptive technology help prevent
                     fraud and cheating and ensure results you can trust.
                  </StyledDescriptionText>
               </Box>

               <Box>
                  <StyledImageTwo />
               </Box>
            </StyledTextBox>

            <StyledTextBox>
               <Box>
                  <StyledImageThree />
               </Box>

               <Box data-aos="fade-left">
                  <StyledTitleText>
                     Convenient results dashboard
                  </StyledTitleText>

                  <StyledDescriptionText>
                     Access candidates’ certificates, video interviews, and
                     writing samples through a free and secure dashboard.
                     Quickly and easily view applicant data with filtering
                     tools.
                  </StyledDescriptionText>
               </Box>
            </StyledTextBox>

            <StyledTextBox>
               <Box data-aos="fade-right">
                  <StyledTitleText>Secure Design</StyledTitleText>

                  <StyledDescriptionText>
                     Adaptive test engine dynamically administers test questions
                     from a database of hundreds of thousands of items. <br />
                     Someone would have to take the test more than 1,000 times
                     <br />
                     to see a question repeated.
                  </StyledDescriptionText>
               </Box>

               <Box>
                  <StyledImageFour />
               </Box>
            </StyledTextBox>

            <motion.div
               className="button-box"
               animate={{
                  scale: [0.95, 1, 0.95, 1],
               }}
               transition={{
                  ease: 'easeOut',
                  duration: 4,
                  repeat: Infinity,
               }}
            >
               <LandingButton onClick={startHandler} />
            </motion.div>
         </Box>
      </StyledContainer>
   )
}

export default LearnMore

const StyledContainer = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.secondary.main,
   width: '100%',
   overflow: 'hidden',

   '& > .box': {
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      position: 'relative',
      maxWidth: '1440px',
      width: '100%',

      [theme.breakpoints.down('lg')]: {
         maxWidth: '1200px',
      },

      '& > .title': {
         color: theme.palette.primary.dullBlue,
         fontFamily: 'Gilroy',
         fontSize: '2.5rem',

         [theme.breakpoints.down('lg')]: {
            fontSize: '2rem',
            textAlign: 'center',
         },
      },

      '& > .roadmap-box': {
         opacity: 1,
         position: 'absolute',
         top: '10rem',
         left: '0',
         width: '100%',
         overflow: 'hidden',

         [theme.breakpoints.down('lg')]: {
            left: '10rem',
         },
      },

      '& > .button-box': {
         marginTop: '7rem',

         [theme.breakpoints.down('lg')]: {
            maxWidth: '1200px',
            marginTop: '4rem',
         },
      },
   },
}))

const StyledTextBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'row',
   alignItems: 'center',
   justifyContent: 'space-between',
   width: '1440px',
   paddingTop: '2rem',
   paddingLeft: '4.5rem',
   paddingRight: '2rem',

   [theme.breakpoints.down('lg')]: {
      maxWidth: '1180px',
      paddingTop: '5.5rem',
   },
}))

const StyledTitleText = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.blackGray,
   fontSize: ' 1.5rem',
   fontWeight: '600',
   paddingTop: '6rem',

   [theme.breakpoints.down('lg')]: {
      fontSize: ' 1.1rem',
      paddingTop: '2.5rem',
   },
}))

const StyledDescriptionText = styled(Typography)(({ theme }) => ({
   width: '30.875rem',
   paddingTop: '0.6rem',
   paddingRight: '2rem',
   fontSize: '1rem',

   [theme.breakpoints.down('lg')]: {
      width: '28rem',
      paddingTop: '0.5rem',
      paddingRight: '2rem',
      fontSize: '0.9rem',
   },
}))

const StyledRoadmapImage = styled(RoadmapIcon)(({ theme }) => ({
   width: '100%',
   height: '78rem',
   objectFit: 'cover',
   zIndex: 2,

   '& path': {
      strokeDasharray: '18.56 18.56',
      animation: `${ROADMAPE_ANIMATE} 3.5s infinite linear forwards`,
   },

   [theme.breakpoints.down('lg')]: {
      height: '70rem',
      right: '10rem',
      objectFit: 'cover',
      marginLeft: '-10rem',
   },
}))

const StyledGlobeImage = styled(FirstLearnMoreIcon)(({ theme }) => ({
   position: 'absolute',
   top: '11.2rem',
   left: '41.8rem',
   zIndex: 2,

   [theme.breakpoints.down('lg')]: {
      width: '8.5rem',
      height: '8.5rem',
      left: '32rem',
      top: '11rem',
   },
}))

const StyledBackgroundFirstLearnMoreIcon = styled(BackgroundFirstLearnMoreIcon)(
   ({ theme }) => ({
      position: 'absolute',
      top: '11.2rem',
      left: '37rem',
      zIndex: 2,

      '& path': {
         strokeDasharray: '40',
         animation: `${ROADMAPE_ANIMATE} 7.5s infinite linear forwards`,
      },

      [theme.breakpoints.down('lg')]: {
         width: '16.5rem',
         height: '16.5rem',
         left: '28rem',
         top: '7rem',
      },
   })
)

const StyledImageOne = styled(SecondLearnMoreIcon)(({ theme }) => ({
   position: 'absolute',
   top: '28.8rem',
   left: '22rem',

   '& path': {
      strokeDasharray: '80',
      animation: `${ROADMAPE_ANIMATE} 8.5s infinite linear forwards`,
   },

   [theme.breakpoints.down('lg')]: {
      width: '16.5rem',
      height: '16.5rem',
      top: '23rem',
      left: '22rem',
      zIndex: 0,
   },
}))

const StyledImageTwo = styled(ThirdLearnMoreIcon)(({ theme }) => ({
   position: 'absolute',
   top: '43.5rem',
   right: '26rem',
   zIndex: 1,

   '& path': {
      strokeDasharray: '80',
      animation: `${ROADMAPE_ANIMATE} 8.5s infinite linear forwards`,
   },

   [theme.breakpoints.down('lg')]: {
      width: '15rem',
      height: '15rem',
      top: '37.5rem',
      left: '37rem',
      zIndex: 0,
   },
}))

const StyledImageThree = styled(FourthLearnMoreIcon)(({ theme }) => ({
   position: 'absolute',
   top: '60rem',
   left: 365,
   zIndex: 1,

   '& path': {
      strokeDasharray: '300',
      animation: `${ROADMAPE_ANIMATE} 8.5s infinite linear forwards`,
   },

   [theme.breakpoints.down('lg')]: {
      width: '16.5rem',
      height: '16.5rem',
      top: '51.5rem',
      left: '20rem',
      zIndex: 0,
   },
}))

const StyledImageFour = styled(FifthLearnMoreIcon)(({ theme }) => ({
   position: 'absolute',
   top: '76rem',
   right: '24rem',
   zIndex: 1,

   '& path': {
      strokeDasharray: '300',
      animation: `${ROADMAPE_ANIMATE} 8.5s infinite linear forwards`,
   },

   [theme.breakpoints.down('lg')]: {
      width: '16.5rem',
      height: '16.5rem',
      top: '66rem',
      left: '36rem',
      zIndex: 0,
   },
}))
